/**
 * [파일 1: MockExamOperation.gs] - v3.4.1 MASTER (상시 운용 파일)
 * 용도: 상시 운용용 (API 핸들러, 드롭다운 업데이트, 기본 유틸리티)
 * 특징: 3번 서버 즉시 반영(Purge) 메뉴 고정 및 설정 누락 시 팝업 안내 강화.
 */

const CONFIG = {
  EXAMS_SHEET_NAME: 'exams',
  AUTH_CODES_SHEET_NAME: 'auth_codes',
  SETTINGS_SHEET_NAME: 'settings',
  GUIDE_SHEET_NAME: '사용법'
};

/**
 * [API] 웹 서버 요청 핸들러 (doGet)
 * Next.js 대시보드에서 시험 목록을 가져갈 때 사용함.
 */
function doGet(e) {
  const action = e.parameter.action;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (action === 'getExams') {
    const sheet = ss.getSheetByName(CONFIG.EXAMS_SHEET_NAME);
    if (!sheet) return createJsonResponse({error: 'Exams sheet not found'});
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1)
      .filter(r => String(r[headers.indexOf('isActive')]).toLowerCase() === 'true')
      .map(r => {
        let obj = {};
        headers.forEach((h, i) => obj[h] = r[i]);
        return obj;
      })
      .sort((a,b) => a.order - b.order);
      
    return createJsonResponse(rows);
  }

  if (action === 'validateCode') {
    const code = (e.parameter.code || '').replace(/-/g, '').toUpperCase();
    const sheet = ss.getSheetByName(CONFIG.AUTH_CODES_SHEET_NAME);
    if (!sheet) return createJsonResponse({isValid: false, error: 'Sheet not found'});

    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const codeIdx = headers.indexOf('code');
    const activeIdx = headers.indexOf('isActive');

    const isValid = data.slice(1).some(row => {
      const dbCode = String(row[codeIdx]).replace(/-/g, '').toUpperCase();
      const isActive = String(row[activeIdx]).toLowerCase() === 'true';
      return dbCode === code && isActive;
    });

    return createJsonResponse({isValid: isValid});
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * [이벤트] 스프레드시트 오픈 시 메뉴 생성
 */
function onOpen() { 
  SpreadsheetApp.getUi().createMenu('💎 [모의고사 통합 관리]')
    .addItem('🚀 1. 시스템 초기 빌드 (Build) [❗최초 1회만!]', 'runFullSetup')
    .addSeparator()
    .addItem('🔄 2. 드롭다운 목록 파일 동기화 (Sync)', 'updateDropdowns')
    .addItem('⚡ 3. 수정한 내용 서버 즉시 반영 (Purge) [⚠️ 주의!]', 'forceSyncToServer')
    .addToUi(); 
}

/**
 * [상시] 드롭다운 업데이트
 * Solutions 폴더나 Forms 폴더에 파일을 새로 올렸을 때 목록을 갱신함.
 */
function updateDropdowns() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert('✅ [안전] 목록 동기화 안내', 
    '이 작업은 데이터 삭제 없이 "파일 목록"만 새로고침하는 안전한 기능입니다. \n\n' +
    '드라이브(Solutions, Forms 폴더)에 새 파일을 올린 후 목록에 안 보일 때 사용하세요. \n' +
    '지금 목록을 동기화할까요?', 
    ui.ButtonSet.YES_NO);
  
  if (response !== ui.Button.YES) return;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settingsSheet = ss.getSheetByName(CONFIG.SETTINGS_SHEET_NAME);
  if (!settingsSheet) return;
  
  const settings = settingsSheet.getDataRange().getValues();
  let solId = getSetting(settings, 'solutionsFolderId');
  let formId = getSetting(settings, 'formsFolderId');
  
  const examSheet = ss.getSheetByName(CONFIG.EXAMS_SHEET_NAME);
  const headers = examSheet.getDataRange().getValues()[0];
  
  const getFileList = (id) => { 
    if (!id) return [];
    let list = []; 
    let files = DriveApp.getFolderById(id).getFiles(); 
    while(files.hasNext()) list.push(files.next().getName()); 
    return list; 
  };
  
  const solList = getFileList(solId); 
  const formList = getFileList(formId);
  
  if (solList.length) {
    examSheet.getRange(2, headers.indexOf('solutionDoc')+1, 100)
      .setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(solList).build());
  }
  if (formList.length) {
    examSheet.getRange(2, headers.indexOf('formName')+1, 100)
      .setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(formList).build());
  }
  
  Browser.msgBox('드롭다운 목록이 최신 파일 기반으로 업데이트되었습니다.');
}

/**
 * [유틸] 설정값 가져오기
 */
function getSetting(settings, key) {
  const row = settings.find(r => r[0] === key);
  return row ? row[1] : null;
}

/**
 * [공통 유틸리티] 시트 초기화, 폴더 생성 등
 */
function initSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setFontWeight('bold')
    .setBackground('#efefef')
    .setVerticalAlignment('middle')
    .setHorizontalAlignment('center');
  sheet.setFrozenRows(1);
}

/**
 * [강력 추천] Next.js 서버의 ISR 캐시를 즉시 파기합니다.
 * 시트에서 내용을 수정하거나 '파일 동기화'를 마친 뒤 이 함수를 실행하면
 * Vercel 배포 서버에 즉시 반영됩니다.
 */
function forceSyncToServer() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settingsSheet = ss.getSheetByName(CONFIG.SETTINGS_SHEET_NAME);
  
  // 1. 설정 시트에서 서버 주소 및 시크릿 확인
  let serverUrl = "https://your-site.com"; // 기본값
  let secret = "ctx-admin-secret";         // 기본값
  
  if (settingsSheet) {
    const settings = settingsSheet.getDataRange().getValues();
    const envUrl = getSetting(settings, 'vercelUrl');
    const envSecret = getSetting(settings, 'revalidateSecret');
    if (envUrl) serverUrl = envUrl;
    if (envSecret) secret = envSecret;
  }

  // 설정 확인
  if (!serverUrl || serverUrl.includes('your-site.com')) {
    ui.alert('⚠️ 설정이 필요합니다', 
      '구글 시트의 "settings" 탭에서 [vercelUrl]을 실제 웹사이트 주소로 수정해 주세요.\n' +
      '예: https://qr-mockexam-colab.vercel.app', 
      ui.ButtonSet.OK);
    return;
  }


  // 2. 최종 확인 알림
  const response = ui.alert('⚡ 서버 즉시 반영 안내', 
    '이 작업은 Vercel 서버에 저장된 옛날 캐시를 강제로 삭제하고 최신 시트 내용을 불러오게 만듭니다. \n\n' +
    '수정하신 내용이 모든 사용자에게 즉시(1~2초 내) 노출됩니다. \n' +
    '지금 서버를 갱신할까요?', 
    ui.ButtonSet.YES_NO);
  
  if (response !== ui.Button.YES) return;

  // 3. API 호출
  const apiPath = "/api/revalidate?path=/dashboard&secret=" + secret;
  const fullUrl = serverUrl.replace(/\/$/, "") + apiPath;

  try {
    const fetchResponse = UrlFetchApp.fetch(fullUrl);
    const result = JSON.parse(fetchResponse.getContentText());
    
    if (result.revalidated) {
      ui.alert('✅ 동기화 성공', 'Vercel 서버 캐시가 성공적으로 갱신되었습니다. \n이제 사용자들이 최신 데이터를 즉시 볼 수 있습니다.', ui.ButtonSet.OK);
    } else {
      ui.alert('⚠️ 확인 필요', '응답은 왔으나 갱신 여부가 불분명합니다: ' + fetchResponse.getContentText(), ui.ButtonSet.OK);
    }
  } catch(e) {
    ui.alert('❌ 동기화 실패', '서버 연결 중 오류가 발생했습니다. URL 및 Secret 설정을 확인하세요. \n오류 내용: ' + e.toString(), ui.ButtonSet.OK);
  }
}

function getOrCreateFolder(parent, name) {
  const folders = parent.getFoldersByName(name); 
  return folders.hasNext() ? folders.next() : parent.createFolder(name);
}
