/**
 * Google Drive Folder (GDF) 방식 백엔드 API
 * 버전: 1.0.0
 * 작성일: 2025-12-23
 * 
 * [설정 방법]
 * 1. Google Sheets (문항관리) 생성
 * 2. '확장 프로그램' > 'Apps Script' 클릭
 * 3. 본 코드를 복사하여 붙여넣기
 * 4. '배포' > '새 배포' > 유형: 웹 앱
 * 5. 액세스 권한: 모든 사용자(Anyone)
 * 6. 생성된 웹 앱 URL을 .env.local의 NEXT_PUBLIC_GAS_API_URL에 입력
 */

const CONFIG = {
  EXAMS_SHEET_NAME: 'exams',
  AUTH_CODES_SHEET_NAME: 'auth_codes',
  SETTINGS_SHEET_NAME: 'settings'
};

/**
 * GET 요청 처리
 */
function doGet(e) {
  const action = e.parameter.action;
  
  try {
    switch (action) {
      case 'getExams':
        return createJsonResponse(getExamsData());
      case 'validateCode':
        const code = e.parameter.code;
        return createJsonResponse({ isValid: validateAuthCode(code) });
      default:
        return createJsonResponse({ error: 'Invalid action: ' + action }, 400);
    }
  } catch (error) {
    console.error(error);
    return createJsonResponse({ error: error.toString() }, 500);
  }
}

/**
 * 모의고사 목록 조회
 */
function getExamsData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.EXAMS_SHEET_NAME);
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  
  const headers = data[0];
  const rows = data.slice(1);
  
  return rows
    .filter(row => {
      const isActiveIndex = headers.indexOf('isActive');
      return isActiveIndex !== -1 ? (row[isActiveIndex] === true || row[isActiveIndex] === 'TRUE') : true;
    })
    .map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        if (header) obj[header] = row[index];
      });
      return obj;
    })
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
}

/**
 * 인증 코드 검증
 */
function validateAuthCode(inputCode) {
  if (!inputCode) return false;
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.AUTH_CODES_SHEET_NAME);
  if (!sheet) return false;
  
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return false;
  
  const headers = data[0];
  const rows = data.slice(1);
  
  const codeIndex = headers.indexOf('code');
  const activeIndex = headers.indexOf('isActive');
  
  if (codeIndex === -1) return false;
  
  // 하이픈 제거 및 대문자 변환
  const sanitizedInput = inputCode.replace(/-/g, '').toUpperCase();
  
  return rows.some(row => {
    if (activeIndex !== -1 && row[activeIndex] !== true && row[activeIndex] !== 'TRUE') return false;
    const sanitizedStored = String(row[codeIndex]).replace(/-/g, '').toUpperCase();
    return sanitizedStored === sanitizedInput;
  });
}

/**
 * JSON 응답 생성
 */
function createJsonResponse(data, status = 200) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 시트 내 드롭다운 자동화를 위한 로직 (Solutions, Forms 폴더 동기화)
 */
function onOpen() {
  updateDropdowns();
}

function updateDropdowns() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settingsSheet = ss.getSheetByName(CONFIG.SETTINGS_SHEET_NAME);
  if (!settingsSheet) return;
  
  const settingsData = settingsSheet.getDataRange().getValues();
  
  let solutionsFolderId = '';
  let formsFolderId = '';
  
  settingsData.forEach(row => {
    if (row[0] === 'solutionsFolderId') solutionsFolderId = row[1];
    if (row[0] === 'formsFolderId') formsFolderId = row[1];
  });
  
  if (!solutionsFolderId || !formsFolderId) return;
  
  try {
    // Solutions 폴더 파일 목록
    const solFiles = DriveApp.getFolderById(solutionsFolderId).getFiles();
    const solList = [];
    while (solFiles.hasNext()) {
      const file = solFiles.next();
      solList.push(file.getName());
    }
    
    // Forms 폴더 파일 목록
    const formFiles = DriveApp.getFolderById(formsFolderId).getFiles();
    const formList = [];
    while (formFiles.hasNext()) {
      const file = formFiles.next();
      formList.push(file.getName());
    }
    
    const examSheet = ss.getSheetByName(CONFIG.EXAMS_SHEET_NAME);
    if (!examSheet) return;
    
    const headers = examSheet.getDataRange().getValues()[0];
    
    const solCol = headers.indexOf('solutionDoc') + 1;
    const formCol = headers.indexOf('formName') + 1;
    
    // 드롭다운 설정
    if (solList.length > 0 && solCol > 0) {
      const solRule = SpreadsheetApp.newDataValidation().requireValueInList(solList).build();
      examSheet.getRange(2, solCol, 99).setDataValidation(solRule);
    }
    
    if (formList.length > 0 && formCol > 0) {
      const formRule = SpreadsheetApp.newDataValidation().requireValueInList(formList).build();
      examSheet.getRange(2, formCol, 99).setDataValidation(formRule);
    }
  } catch (e) {
    console.error('드롭다운 업데이트 실패: ' + e.toString());
  }
}

/**
 * 편집 시 ID 및 URL 자동 완성
 */
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  if (sheet.getName() !== CONFIG.EXAMS_SHEET_NAME) return;
  
  const range = e.range;
  const col = range.getColumn();
  const row = range.getRow();
  if (row < 2) return;
  
  const headers = sheet.getDataRange().getValues()[0];
  const solDocCol = headers.indexOf('solutionDoc') + 1;
  const formNameCol = headers.indexOf('formName') + 1;
  
  if (col === solDocCol) {
    const fileName = e.value;
    updateFileData(sheet, row, fileName, 'solutionDocId', 'solutionUrl', 'solutionsFolderId');
  } else if (col === formNameCol) {
    const fileName = e.value;
    updateFileData(sheet, row, fileName, '', 'formUrl', 'formsFolderId');
  }
}

function updateFileData(sheet, row, fileName, idColName, urlColName, folderIdSettingName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settingsSheet = ss.getSheetByName(CONFIG.SETTINGS_SHEET_NAME);
  const settingsData = settingsSheet.getDataRange().getValues();
  
  let folderId = '';
  settingsData.forEach(r => {
    if (r[0] === folderIdSettingName) folderId = r[1];
  });
  
  if (!folderId || !fileName) return;
  
  try {
    const files = DriveApp.getFolderById(folderId).getFilesByName(fileName);
    if (files.hasNext()) {
      const file = files.next();
      const headers = sheet.getDataRange().getValues()[0];
      
      if (idColName && headers.indexOf(idColName) !== -1) {
        const idCol = headers.indexOf(idColName) + 1;
        sheet.getRange(row, idCol).setValue(file.getId());
      }
      
      if (urlColName && headers.indexOf(urlColName) !== -1) {
        const urlCol = headers.indexOf(urlColName) + 1;
        let url = file.getUrl();
        if (idColName === 'solutionDocId') {
          // Docs Preview URL로 변환
          url = 'https://docs.google.com/document/d/' + file.getId() + '/preview';
        }
        sheet.getRange(row, urlCol).setValue(url);
      }
    }
  } catch (e) {
    console.error('파일 데이터 업데이트 실패: ' + e.toString());
  }
}
