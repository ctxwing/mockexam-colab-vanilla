/**
 * [InitialSetup.gs] - v3.7.1 MASTER (Ultimate Content & Visual Manual)
 * 용도: 시스템 초기 빌드 및 데이터/매뉴얼 생성
 * 특징: 마스터 빌드 완료 메시지 최신화 및 3번 메뉴 즉시 활성화 로직 포함.
 */

const SETUP_MASTER_SOLUTIONS = {
  '빅분기_1회_해설': `# 🏆 제7회 빅데이터 분석기사 실기 복원 해설

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
본 해설은 실제 기출문제를 분석하여 수험생들이 가장 많이 실수하는 포인트를 정밀하게 짚어줍니다.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📋 [작업형 제 1유형] 데이터 전처리 전문가 가이드

### Q1. Factory 데이터 분석
- **분석 방법**: groupby()와 mean()을 사용하여 공장별 통계량을 산출합니다.
- **핵심 포인트**: 소수점 반올림(round) 처리 기준을 반드시 확인하세요.
💻 CODE
import pandas as pd
df = pd.read_csv('https://raw.githubusercontent.com/YoungjinBD/data/main/exam/07_1_1.csv')
result = df.groupby('Factory')['Processing_Time'].mean().round(2).sort_values().head(3).index.tolist()
print(f"정답: {result}")

### Q2. 주소 기반 지역구 추출
- **핵심 포인트**: Address 컬럼의 문자열을 공백 기준으로 split하여 2번째 값(구 이름)을 가져오는 것이 핵심입니다.
💻 CODE
df['Gu'] = df['Address'].str.split().str[1]
mapo_mean = df[df['Gu'] == '마포구']['Distance'].mean()
seongdong_mean = df[df['Gu'] == '성동구']['Distance'].mean()
print(f"절대값 차이: {round(abs(mapo_mean - seongdong_mean), 2)}")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🤖 [작업형 제 2유형] 학생 상태 분류 모델링

### 모델 구축 전략
1. **데이터 전처리**: 문자열(Target) 데이터를 숫자로 인코딩하거나 원-핫 인코딩을 수행합니다.
2. **모델 선택**: 분류 성능이 우수한 RandomForestClassifier를 추천합니다.
3. **결과 제출**: 반드시 ID 컬럼과 예측값을 포함한 result.csv를 생성해야 합니다.

💻 CODE
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
pred = model.predict(X_val)
print(f"검증셋 정확도: {accuracy_score(y_val, pred)}")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📊 [작업형 제 3유형] 통계적 가설 검정

### Q5~Q10 통계 문제 풀이
- **t-검정**: stats.ttest_rel(pre, post)를 사용하여 대응표본 검정을 수행합니다.
- **유의수준**: p-value가 0.05보다 작을 경우 귀무가설을 기각합니다.
💻 CODE
from scipy.stats import ttest_rel
stat, p = ttest_rel(df['pre'], df['post'])
print(f"t-통계량: {round(stat, 2)}, p-value: {p}")`,

  '빅분기_2회_해설': `# 🏆 제10회 빅데이터 분석기사 실기 복원 해설 (2025.06)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
최신 유형인 10회 기출문제를 바탕으로 구성된 실전 해설입니다.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📋 [작업형 제 1유형] 데이터 가공 전문 역량

### Q1. 소주제별 정답률 순위
- **로직**: sub_topic별 answer의 평균을 구한 뒤 내림차순 정렬하여 3번째 값을 추출합니다.
💻 CODE
rates = df.groupby('sub_topic')['answer'].mean().round(2)
ans = rates.sort_values(ascending=False).iloc[2]
print(f"3위 정답률: {ans}")

### Q2. 시계열 매출 분석
- **로직**: pd.to_datetime으로 날짜형 변환 후, dt.to_period('M')을 활용해 월별 집계를 수행합니다.
💻 CODE
df['date'] = pd.to_datetime(df['date'])
df['YM'] = df['date'].dt.to_period('M')
monthly_sum = df.groupby('YM')['price'].sum().sort_values(ascending=False)
print(f"두 번째 큰 매출: {int(monthly_sum.iloc[1])}")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🤖 [작업형 제 2유형] 에너지 소비량 예측 (Regression)

### 모델링 가이드
- **데이터셋**: 빌딩 상권 데이터 기반 연간 총 가스 소비량(gas_totl) 예측
- **성능지표**: RMSE (Root Mean Squared Error)를 최소화하는 모델 탐색
💻 CODE
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import numpy as np

model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)
pred = model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_val, pred_val))
print(f"Final RMSE: {round(rmse, 2)}")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📊 [작업형 제 3유형] 로지스틱 회귀 및 다중회귀

### Q5. 나이에 따른 이직 오즈비 (Odds Ratio)
- **오즈비 산출**: np.exp(회귀계수) 공식을 적용하여 직관적인 영향력을 분석합니다.
💻 CODE
import numpy as np
coef = model.params['age']
odds_ratio = np.exp(coef)
print(f"나이 1세 증가 시 이직 오즈비: {round(odds_ratio, 3)}")`,

  'AICE_1회_해설': `# 🏆 AICE 실기 모의고사 1회 정답 및 해설

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📋 [Part 1] 데이터 품질 향상 (Preprocessing)
- 목적: 내비게이션 주행 데이터에서 비정상 데이터(속도 0 이하 등)를 필터링하고 결측치를 처리합니다.
- 핵심 함수: df.dropna(), df.query('Speed_Per_Hour > 0')

## 🤖 [Part 2] 머신러닝 모형 구축 (ML)
- 알고리즘: DecisionTreeRegressor
- 목표: 도착 예정 시간(ETA) 예측 오차 최소화
- 평가 도구: MAE (Mean Absolute Error)

## 🧠 [Part 3] 딥러닝 심화 (Deep Learning)
- 구조: Keras Sequential (Dense layers)
- 전략: 배치 정규화와 Dropout을 활용하여 과적합을 방지합니다.`,

  'AICE_2회_해설': `# 🏆 AICE 실기 모의고사 2회 정답 및 해설

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 📋 [Part 1] 범주형 데이터 인코딩
- 항공사 고객 만족도 조사 데이터의 범주형 변수를 One-Hot Encoding 처리합니다.
- 결측 수치 데이터는 평균값(mean)으로 대체합니다.

## 🤖 [Part 2] 지도학습 성능 비교
- 비교 모델: Logistic Regression vs Random Forest
- 선정 기준: F1-Score와 AUC를 종합적으로 판단하여 최적 모델을 선정합니다.

## 🧠 [Part 3] 딥러닝 최적화 (Optimization)
- 손실 함수: binary_crossentropy
- 최적화기: Adam (learning_rate=0.001)
- 규제 기법: EarlyStopping 콜백을 사용하여 가장 성능이 좋은 시점에 학습을 종료합니다.`
};

const SETUP_MASTER_EXAMS = [
  {
    id: 'bigdata-01', title: '빅데이터 분석기사 실기 1회', description: '제7회 기출 복원 (전처리/모델링/통계)', category: 'bigdata', order: 1,
    solutionName: '빅분기_1회_해설', formName: '빅분기_1회_제출폼',
    colabUrl: 'https://colab.research.google.com/drive/example-1',
    dataUrl: 'https://raw.githubusercontent.com/YoungjinBD/data/main/exam/',
    questions: [
      {title: 'Q1. 평균 처리시간 최단 공장 3곳', type: 'text'},
      {title: 'Q2. 이동거리 차이(절댓값)', type: 'text'},
      {title: 'Q3. 매출 최고 연도 및 분기', type: 'text'},
      {title: 'Q4. 작업형 2 유형 결과 파일 (csv)', type: 'file'},
      {title: 'Q5. pre 평균 및 표준편차', type: 'text'},
      {title: 'Q6. t-검정 통계량', type: 'text'},
      {title: 'Q10. 최종 오분류율', type: 'text'}
    ]
  },
  {
    id: 'bigdata-02', title: '빅데이터 분석기사 실기 2회', description: '제10회 기출 기반 (최신 유형 완벽 반영)', category: 'bigdata', order: 2,
    solutionName: '빅분기_2회_해설', formName: '빅분기_2회_제출폼',
    colabUrl: 'https://colab.research.google.com/drive/example-2',
    dataUrl: 'https://raw.githubusercontent.com/YoungjinBD/data/main/exam/',
    questions: [
      {title: 'Q1. 소주제별 정답률 3위', type: 'text'},
      {title: 'Q2. 두 번째 큰 매출액', type: 'text'},
      {title: 'Q3. 스팸/햄 평균 단어 수 차이', type: 'text'},
      {title: 'Q4. 가스 소비량 예측파일 (csv)', type: 'file'},
      {title: 'Q5. 이직 오즈비', type: 'text'},
      {title: 'Q6. 주택 가격 예측치', type: 'text'}
    ]
  },
  {
    id: 'aice-01', title: 'AICE 실기 모의고사 1회', description: '내비게이션 주행 데이터 기반 목적지 도착 예측', category: 'aice', order: 3,
    solutionName: 'AICE_1회_해설', formName: 'AICE_1회_제출폼',
    colabUrl: 'https://colab.research.google.com/drive/example-aice-01',
    questions: [
      {title: 'Part 2. DecisionTree MAE', type: 'text'},
      {title: 'Part 3. DNN 최종 Loss', type: 'text'}
    ]
  },
  {
    id: 'aice-02', title: 'AICE 실기 모의고사 2회', description: '항공사 고객 만족도 예측 및 모델 최적화', category: 'aice', order: 4,
    solutionName: 'AICE_2회_해설', formName: 'AICE_2회_제출폼',
    colabUrl: 'https://colab.research.google.com/drive/example-aice-02',
    questions: [
      {title: 'Part 2. RF Accuracy', type: 'text'},
      {title: 'Part 3. Val Accuracy', type: 'text'}
    ]
  }
];

/**
 * [마스터 실행] 초기 시스템 빌드
 */
function runFullSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.alert('🚨 [중요] 시스템 마스터 빌드 (재설치)', 
    '현재 시트에 있는 모든 데이터(시험 목록, 인증 코드 등)를 "초기 데이터"로 완전히 교체합니다. \n\n' +
    '이 작업은 약 2분 이상 정도 소요되며, 운영 중인 데이터가 있다면 미리 백업해 주세요. \n' +
    '정말로 시스템 마스터 빌드 (재설치)를 시작할까요?', 
    ui.ButtonSet.YES_NO);
  
  if (response !== ui.Button.YES) {
    ss.toast('작업이 안전하게 취소되었습니다.', '✅ 안내');
    return;
  }

  ss.toast('🚀 마스터 빌드를 시작합니다. 창을 닫지 마세요!', '시작', 10);
  
  const mainFolder = DriveApp.getFileById(ss.getId()).getParents().next();
  const solFolder = getOrCreateFolder(mainFolder, 'Solutions');
  const formFolder = getOrCreateFolder(mainFolder, 'Forms');
  
  // 1. 기초 시트 구조 생성
  initSheet(ss, 'exams', ['order', 'isActive', 'id', 'title', 'description', 'category', 'solutionDoc', 'solutionDocId', 'solutionUrl', 'formName', 'formUrl', 'formPrefillId', 'colabUrl', 'dataUrl']);
  initSheet(ss, 'auth_codes', ['code', 'isActive', 'note']);
  initSheet(ss, 'settings', ['Key', 'Value']);
  
  ss.getSheetByName('settings').getRange(2, 1, 4, 2).setValues([
    ['solutionsFolderId', solFolder.getId()],
    ['formsFolderId', formFolder.getId()],
    ['vercelUrl', 'https://your-site.vercel.app'],
    ['revalidateSecret', 'ctx-admin-secret']
  ]);

  // 2. 고퀄리티 매뉴얼 작성
  ss.toast('📖 프리미엄 웹 대시보드 관리자 매뉴얼 제작 중...', '2단계');
  createPremiumManual(ss);
  
  // 3. 인증 코드 20개 생성
  ss.toast('🔑 수험생용 인증 코드 20개 자동 발행 중...', '3단계');
  createInitialAuthCodes(ss);
  
  // 4. 시험 데이터 생성 (잘림 없는 해설지 + 스마트 폼)
  ss.toast('📑 전문 해설지 4종 및 스마트 응시 폼 생성 중...', '4단계');
  buildMasterExams(ss, solFolder, formFolder);
  
  ss.toast('🎉 모든 데이터가 완벽하게 세팅되었습니다!', '완료', 5);
  
  console.log('--------------------------------------------------');
  console.log('ℹ️ 안내: 모든 서버측 연산이 성공적으로 끝났습니다.');
  console.log('지금 바로 [스프레드시트 탭]으로 이동하여 화면 중앙의 [확인] 버튼을 클릭해 주세요!');
  console.log('버튼을 클릭해야 스크립트 실행이 전적으로 종료됩니다.');
  console.log('--------------------------------------------------');
  
  Browser.msgBox('💎 CTX 모의고사 마스터 배포 및 서버 연동 완료!\\n\\n' +
    '현재 웹 서비스와 구글 시트가 성공적으로 연결되었습니다.\\n\\n' +
    '1. [문항 관리] "exams" 시트에서 시험 목록과 링크를 관리하세요.\\n' +
    '2. [인증 관리] "auth_codes" 시트에서 수험생용 코드를 활성화/비활성화할 수 있습니다.\\n' +
    '3. [실시간 반영] "settings" 시트에 사이트 주소를 입력한 후, 상단 메뉴 [💎 [모의고사 통합 관리]] -> [⚡ 3. 서버 즉시 반영]을 누르면 웹사이트에 즉시 적용됩니다.');
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
 */
function updateDropdowns() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert('✅ 목록 동기화', '드라이브 폴더의 최신 파일 목록을 시트 드롭다운에 반영하시겠습니까?', ui.ButtonSet.YES_NO);
  if (response !== ui.Button.YES) return;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settingsSheet = ss.getSheetByName('settings');
  if (!settingsSheet) return;
  
  const settings = settingsSheet.getDataRange().getValues();
  const solId = getSetting(settings, 'solutionsFolderId');
  const formId = getSetting(settings, 'formsFolderId');
  
  const examSheet = ss.getSheetByName('exams');
  const headers = examSheet.getDataRange().getValues()[0];
  
  const getFileList = (id) => { 
    if (!id) return [];
    let list = []; 
    try {
      let files = DriveApp.getFolderById(id).getFiles(); 
      while(files.hasNext()) list.push(files.next().getName());
    } catch(e) { console.error(e); }
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
  
  ui.alert('완료', '드롭다운 목록이 최신화되었습니다.', ui.ButtonSet.OK);
}

/**
 * [강력 추천] 서버 즉시 반영
 */
function forceSyncToServer() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settingsSheet = ss.getSheetByName('settings');
  
  let serverUrl = ""; 
  let secret = ""; 
  
  if (settingsSheet) {
    const settings = settingsSheet.getDataRange().getValues();
    serverUrl = getSetting(settings, 'vercelUrl');
    secret = getSetting(settings, 'revalidateSecret');
  }

  if (!serverUrl || serverUrl.includes('your-site')) {
    ui.alert('설정 필요', '"settings" 시트에서 vercelUrl을 먼저 설정해 주세요.', ui.ButtonSet.OK);
    return;
  }

  const response = ui.alert('⚡ 서버 즉시 반영', '수정하신 내용을 웹사이트에 즉시 반영하시겠습니까?', ui.ButtonSet.YES_NO);
  if (response !== ui.Button.YES) return;

  const apiPath = "/api/revalidate?path=/dashboard&secret=" + secret;
  const fullUrl = serverUrl.replace(/\/$/, "") + apiPath;

  try {
    const fetchResponse = UrlFetchApp.fetch(fullUrl);
    const result = JSON.parse(fetchResponse.getContentText());
    if (result.revalidated) {
      ui.alert('✅ 성공', '웹사이트에 실시간 반영되었습니다.', ui.ButtonSet.OK);
    } else {
      ui.alert('확인 필요', '서버 응답: ' + fetchResponse.getContentText(), ui.ButtonSet.OK);
    }
  } catch(e) {
    ui.alert('❌ 실패', '서버 연결 오류: ' + e.toString(), ui.ButtonSet.OK);
  }
}

function getSetting(settings, key) {
  const row = settings.find(r => r[0] === key);
  return row ? row[1] : null;
}

/**
 * [매뉴얼] 실무자를 위한 미려한 디자인 매뉴얼
 */
function createPremiumManual(ss) {
  let sheet = ss.getSheetByName('사용법') || ss.insertSheet('사용법', 0);
  sheet.clear();
  
  const content = [
    ['💎 CTX 모의고사 통합 관리 시스템 마스터 매뉴얼 (v3.8)'],
    ['본 시스템은 구글 문서(해설), 구글 폼(응시), 스프레드시트(데이터베이스)를 유기적으로 연결합니다.'],
    [''],
    ['1️⃣ 현재 시스템 연동 상태 (Connection Status)'],
    [' ① 구글 드라이브 연동 : "Solutions" 폴더 및 "Forms" 폴더가 정상적으로 생성 및 연결되었습니다.'],
    [' ② 가상 API 데이터 배포 : 웹 앱 배포 URL이 Next.js 서버에 등록되어 실시간 데이터 연동 중입니다.'],
    [' ③ 웹사이트 반영 확인 : 시트에서 데이터를 수정한 후 상단 메뉴의 "⚡ 서버 즉시 반영"을 클릭하세요.'],

    [''],
    ['2️⃣ 일상적인 문항 및 학생 관리'],
    [' • exams 시트 : 새로운 시험을 추가하거나, order(순서)를 바꾸고 isActive(노출여부)를 조절합니다.'],
    [' • auth_codes 시트 : 학생들에게 나눠줄 16자리 코드가 20개 준비되어 있습니다. 더 필요하면 아래에 그냥 쓰세요.'],
    [' • 📝 반영 안내 : 시트 수정 후 최대 1시간 내 자동 반영되지만, 즉시 반영을 원할 땐 아래 기능을 사용하세요.'],
    [''],
    ['3️⃣ 고급 유지보수 및 즉시 배포'],
    [' • ⚡ 서버 즉시 반영 : 상단 메뉴 [💎 [모의고사 통합 관리]] > [⚡ 3. 수정한 내용 서버 즉시 반영]을 누르세요.'],
    [' • 🔄 파일 목록 동기화 : Solutions/Forms 폴더에 파일을 올린 뒤 [🔄 2. 동기화]를 누르면 목록이 갱신됩니다.'],
    [' • 📄 해설지 수정 : "Solutions" 폴더 안의 구글 문서를 그냥 수정하세요. 웹사이트 내부 뷰어에 즉시 반영됩니다.'],
    [''],
    ['🚨 장애 발생 시 자가 조치'],
    [' • 웹사이트에 시험이 안 떠요! -> "exams" 시트의 isActive가 TRUE 인지 확인 후 "서버 즉시 반영"을 실행하세요.'],
    [' • 세팅 값이 초기화됐어요! -> "settings" 시트의 vercelUrl과 revalidateSecret이 올바른지 확인하세요.'],
    [' • 인증 코드가 적용 안 돼요! -> "auth_codes" 시트에서 해당 코드의 isActive가 체크되어 있는지 확인하세요.']
  ];
  
  sheet.getRange(1, 1, content.length, 1).setValues(content);
  
  // 스타일링
  sheet.getRange('A1').setFontWeight('bold').setFontSize(22).setFontColor('#1a73e8').setBackground('#f8f9fa');
  sheet.getRange('A2').setFontStyle('italic').setFontColor('#5f6368');
  
  const headers = [4, 9, 14, 19];
  headers.forEach(row => {
    sheet.getRange(row, 1).setFontWeight('bold').setFontSize(14).setBackground('#e8f0fe').setBorder(true, true, true, true, null, null);
  });
  
  sheet.getRange('A19').setBackground('#fdf4e3').setFontColor('#b45309'); // 서버 반영 섹션 (호박색)
  sheet.getRange('A24').setBackground('#feebec').setFontColor('#d93025'); // 경고 섹션
  sheet.setColumnWidth(1, 1000);
  sheet.setRowHeights(1, content.length, 25);
}

function createInitialAuthCodes(ss) {
  const sheet = ss.getSheetByName('auth_codes');
  if (sheet.getLastRow() > 1) return;
  const codes = [];
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  for (let i = 0; i < 20; i++) {
    let r = ''; for (let j = 0; j < 16; j++) { r += chars.charAt(Math.floor(Math.random() * chars.length)); if ((j+1)%4===0 && j!==15) r += '-'; }
    codes.push([r, true, '초기 발행 (신규 유저용)']);
  }
  sheet.getRange(2, 1, 20, 3).setValues(codes);
}

function buildMasterExams(ss, solFolder, formFolder) {
  const sheet = ss.getSheetByName('exams');
  if (sheet.getLastRow() > 1) return;
  
  const rows = SETUP_MASTER_EXAMS.map((exam, i) => {
    console.log(` > ${exam.title} 생성 중...`);
    const doc = buildPremiumDoc(solFolder, exam.solutionName, SETUP_MASTER_SOLUTIONS[exam.solutionName]);
    const form = buildSmartForm(formFolder, exam.formName, exam.title, exam.questions);
    return [
      exam.order, true, exam.id, exam.title, exam.description, exam.category,
      exam.solutionName, doc.getId(), `https://docs.google.com/document/d/${doc.getId()}/preview`,
      exam.formName, form.url, form.prefillId, exam.colabUrl, exam.dataUrl || ''
    ];
  });
  sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
}

function buildPremiumDoc(folder, name, content) {
  const files = folder.getFilesByName(name); if (files.hasNext()) return files.next();
  const d = DocumentApp.create(name); const b = d.getBody(); b.clear();
  content.split('\n').forEach(l => {
    if (l.startsWith('# ')) {
      b.appendParagraph(l.substring(2)).setHeading(DocumentApp.ParagraphHeading.HEADING1).setAlignment(DocumentApp.HorizontalAlignment.CENTER);
      b.appendHorizontalRule();
    } else if (l.startsWith('## ')) {
      let p = b.appendParagraph(l.substring(3)).setHeading(DocumentApp.ParagraphHeading.HEADING2);
      p.editAsText().setForegroundColor('#1a73e8');
      p.setSpacingBefore(15);
    } else if (l.startsWith('### ')) {
      b.appendParagraph(l.substring(4)).setHeading(DocumentApp.ParagraphHeading.HEADING3);
    } else if (l.includes('━━━━')) {
      b.appendHorizontalRule();
    } else if (l.startsWith('💻')) {
      let p = b.appendParagraph(l);
      p.editAsText().setBold(true).setBackgroundColor('#f1f3f4');
      p.setIndentStart(20).setSpacingBefore(10);
    } else {
      let p = b.appendParagraph(l);
      p.editAsText().setFontFamily('Arial').setFontSize(10);
      p.setLineSpacing(1.5).setSpacingAfter(5);
    }
  });
  d.saveAndClose(); DriveApp.getFileById(d.getId()).moveTo(folder); return DriveApp.getFileById(d.getId());
}

function buildSmartForm(folder, name, title, questions) {
  const files = folder.getFilesByName(name); 
  let f;
  if (files.hasNext()) { 
    f = FormApp.openById(files.next().getId()); 
  } else {
    f = FormApp.create(name).setTitle(title).setCollectEmail(true);
    DriveApp.getFileById(f.getId()).moveTo(folder);
  }

  // 인증 코드 항목 찾기 또는 생성
  let items = f.getItems();
  let authItem = items.find(it => it.getTitle() === '인증 코드');
  let authTextItem;
  
  if (!authItem) {
    authTextItem = f.addTextItem().setTitle('인증 코드')
      .setHelpText('대시보드에서 자동으로 채워지는 항목입니다. 수정하지 마세요.')
      .setRequired(true);
  } else {
    authTextItem = authItem.asTextItem(); // 기존 아이템을 TextItem으로 변환
  }

  // [중요] 실제 prefill용 entry ID 추출 로직
  const response = f.createResponse();
  const itemResponse = authTextItem.createResponse("AUTHTEST");
  response.withItemResponse(itemResponse);
  
  // FormResponse에서는 getPrefillUrl이 아니라 toPrefilledUrl()을 사용해야 합니다.
  const prefillUrl = response.toPrefilledUrl();
  const match = prefillUrl.match(/entry\.(\d+)=AUTHTEST/);
  const realPrefillId = match ? match[1] : authTextItem.getId().toString();

  // 나머지 질문 추가 (기존에 없을 때만)
  if (items.length < 2 && questions) {
    questions.forEach(q => { 
      if (q.type === 'file') {
        try { f.addFileUploadItem().setTitle(q.title).setRequired(true); } 
        catch(e) { f.addTextItem().setTitle(q.title + ' (파일 드라이브 링크 제출)'); }
      } else f.addTextItem().setTitle(q.title); 
    });
  }

  return { url: f.getPublishedUrl(), prefillId: realPrefillId };
}

function getOrCreateFolder(p, n) { let f = p.getFoldersByName(n); return f.hasNext() ? f.next() : p.createFolder(n); }
function initSheet(ss, n, h) { let s = ss.getSheetByName(n) || ss.insertSheet(n); s.getRange(1,1,1,h.length).setValues([h]).setFontWeight('bold').setBackground('#efefef'); s.setFrozenRows(1); }
