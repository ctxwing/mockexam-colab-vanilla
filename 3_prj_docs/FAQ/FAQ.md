# FAQ - 자주 묻는 질문

## 목차

1. [시험 문제 및 해설은 어떻게 추가하나요?](#1-시험-문제-및-해설은-어떻게-추가하나요)
2. [모바일 및 반응형 대응은 어떻게 하나요?](#2-모바일-및-반응형-대응은-어떻게-하나요)
3. [OTP 인증 코드는 어떻게 관리(추가/삭제)하나요?](#3-otp-인증-코드는-어떻게-관리추가삭제하나요)

---

## 1. 시험 문제 및 해설은 어떻게 추가하나요?

### 데이터 관리 구조

GitHub Pages에서 시험 문제, 답안, 해설 등을 추가하는 방법은 다음과 같습니다:

```
prj_source/data/
├── exams.json          # 모의고사 회차별 메타데이터
├── otp-list.json       # 인증 코드 목록
└── solutions/          # 해설 파일
    ├── aice-01.md
    ├── aice-02.md
    └── ...
```

### exams.json 구조 예시

```json
[
  {
    "id": 1,
    "title": "AICE 모의고사 1회차",
    "description": "Python 기초 문법 중심",
    "colabUrl": "https://colab.research.google.com/...",
    "solutionUrl": "solutions/aice-01.md",
    "lectureUrl": "https://example.com/lecture/1"
  }
]
```

### 콘텐츠 추가 방법

1. **새 회차 추가**: `exams.json`에 새 객체 추가
2. **해설 파일**: `data/solutions/` 디렉토리에 `.md` 파일로 작성
3. **Colab 노트북**: `public/colab/`에 `.ipynb` 파일 배치

### 운영 매뉴얼

자세한 데이터 수정 방법은 `3_prj_docs/TASK_7_완료내역.md`를 참조하세요.
- JSON 스키마 설명 및 샘플 포함
- 서버/DB 없이 순수 정적 파일로 콘텐츠 관리 가능

---

## 2. 모바일 및 반응형 대응은 어떻게 하나요?

### 디바이스 감지 및 리다이렉트

시스템은 사용자 에이전트와 화면 너비를 통해 모바일/PC를 자동으로 감지합니다.

1. **모바일 접속 시**: `mobile-intro.html`로 리다이렉트
   - 상단: AICE 로고
   - 중앙: 도서 표지 이미지 + "PC 실습 환경에 최적화된 서비스입니다" 안내
   - 하단: URL 복사, 카카오톡 공유 버튼

2. **PC 접속 시**: `auth.html` 인증 페이지 노출

### 반응형 레이아웃

- **브레이크포인트**: 768px (모바일), 1024px (태블릿)
- **모바일**: 1컬럼 레이아웃, 터치 타겟 최소 44x44px
- **PC**: 2컬럼 그리드 레이아웃 (모의고사 카드)
- **사이드바**: 우측 고정, 회차 네비게이션 및 학습 이력 표시

### 구현 상세

- `js/device-detect.js`: 사용자 에이전트 분석 및 리다이렉트
- `css/responsive.css`: 미디어 쿼리 기반 반응형 스타일
- Viewport meta tag로 모바일 최적화

---

## 3. OTP 인증 코드는 어떻게 관리(추가/삭제)하나요?

### GitHub Pages 배포 환경에서의 OTP 관리

GitHub Pages는 정적 호스팅 서비스로, 데이터베이스나 관리자 페이지가 없습니다. OTP 코드는 파일 기반으로 관리하며 **보안을 위해 해시 변환 과정**이 필요합니다.

### 관리 절차

#### 1단계: 원본 OTP 코드 수정

로컬 개발 환경에서 `prj_source/data/otp-codes.json` 파일을 수정합니다:

```json
{
  "codes": [
    "AICE2025",
    "AICE2026",
    "NEWCODE01"   // 새 코드 추가
  ]
}
```

#### 2단계: 해시 생성

**방법 A: 브라우저 도구 사용 (권장)**

1. `tools/generate-otp-hashes.html`을 브라우저에서 엽니다
2. 수정된 `otp-codes.json` 내용을 textarea에 붙여넣습니다
3. "해시 생성" 버튼 클릭
4. 생성된 해시 목록을 복사합니다

**방법 B: 개발자 콘솔 사용**

```javascript
// auth.js의 sha256 함수를 사용
const codes = ["AICE2025", "AICE2026", "NEWCODE01"];
const hashes = codes.map(code => sha256(code));
console.log(JSON.stringify({ hashes }, null, 2));
```

#### 3단계: 배포 파일 업데이트

생성된 해시를 `prj_source/data/otp-list.json`에 저장합니다:

```json
{
  "hashes": [
    "1daa23f398fc44f6e8b6bd9cd2092b984d91f87ecc1c85b42eb7df58d84c2132",
    "0bbbd86486e7d405476906d6d41342b842d8a208502c2b0eb3adf71c61c27de7",
    "새로운해시값..."
  ]
}
```

#### 4단계: 배포

```bash
git add prj_source/data/otp-list.json
git commit -m "Update OTP codes"
git push origin main
./deploy-ghpages.sh  # GitHub Pages 배포
```

### 보안 주의사항

| 항목 | 설명 |
|------|------|
| **원본 코드** | `otp-codes.json` - `.gitignore`로 관리, Git에 절대 커밋하지 않음 |
| **배포 파일** | `otp-list.json` - 해시만 포함, GitHub에 안전하게 커밋 가능 |
| **해시 알고리즘** | SHA-256 단방향 해시, 역공매 불가 |
| **대소문자** | 자동 대문자 변환으로 `aice2025` = `AICE2025` |

### 자주 하는 작업별 명령어

#### 새 OTP 코드 추가
```bash
# 1. otp-codes.json 수정
vim prj_source/data/otp-codes.json

# 2. 브라우저에서 generate-otp-hashes.html 실행 후 해시 생성

# 3. otp-list.json 업데이트
vim prj_source/data/otp-list.json

# 4. 테스트
./start.sh
# http://localhost:53500/pages/auth.html 접속 후 테스트

# 5. 배포
git add prj_source/data/otp-list.json
git commit -m "Add new OTP codes"
git push
./deploy-ghpages.sh
```

#### OTP 코드 삭제
```bash
# 1. otp-codes.json에서 해당 코드 삭제
# 2. 해시 재생성
# 3. otp-list.json 업데이트
# 4. 배포
```

#### 일괄 변경 (예: 연도별 코드 갱신)
```bash
# otp-codes.json 전체 교체 후 해시 재생성
# 갱신된 otp-list.json 배포
```

### 파일 구조

```
prj_source/data/
├── otp-codes.json      # 원본 코드 (개발용, .gitignore 관리)
└── otp-list.json       # 해시 목록 (배포용, Git 관리)

tools/
└── generate-otp-hashes.html   # 해시 생성 도구
```

### 문제 해결

**Q: 배포 후 OTP 인증이 안 됩니다**
- `otp-list.json`이 정상적으로 배포되었는지 확인
- 브라우저 개발자 도구 → 네트워크 탭에서 `otp-list.json` 로그 확인

**Q: 해시 생성이 복잡합니다**
- 자주 변경해야 한다면 별도 스크립트 작성 가능
- 단, Node.js 등 런타임 없이 순수 브라우저 환경에서 실행

**Q: 원본 코드가 노출될까요?**
- SHA-256 단방향 해시 사용으로 역공매 매우 어려움
- `otp-codes.json`은 `.gitignore`로 Git에 저장되지 않음
- 완전한 보안이 필요하면 별도 인증 서버 구축 권장

---

*마지막 업데이트: 2026-04-03*
