# 프로젝트 종료 
- 26.04.04 마감의 일정을 못 마침 . 
- 26.04.06에 확인후 종료함
# AICE 자격증 가상 모의고사 웹 서비스

> **Vanilla JS 기반 정적 웹사이트** - 서버/DB 없는 저비용 고효율 운영

AICE(AI Certificate for Everyone) 및 빅데이터 분석기사 실기 학습자를 위한 **가상 모의고사 웹 서비스**입니다. 도서 독자가 QR 코드를 통해 접속하여 간단한 인증 후, 최적화된 실습 환경과 학습 콘텐츠에 접근할 수 있습니다.

## 🎯 프로젝트 특징

- **Zero Server Cost**: GitHub Pages 기반 정적 웹사이트로 서버 운영 비용 0원
- **No Database**: JSON 데이터 파일 및 Local Storage 기반 클라이언트 인증
- **Vanilla JS**: 프레임워크 없는 순수 자바스크립트로 가볍고 빠른 성능
- **Mobile First**: 반응형 디자인으로 모바일/PC 환경 모두 지원

## ✨ 핵심 기능

### 1. 지능형 인증 시스템
- 도서 내 8자리 난수 코드(OTP)를 통한 간편 인증
- 대소문자 무시 및 하이픈(-) 자동 보정
- Local Storage 기반 인증 상태 유지 (재방문 시 재인증 불필요)
- SHA-256 해시 기반 보안 (관리자 도구 제공)

### 2. 모의고사 로비
- 회차별 학습 리스트 2열 그리드 레이아웃
- Google Colab 바로가기
- 정답/해설 페이지 연동
- 반응형 카드 UI

### 3. 학습 화면
- 문제 표시 및 해설 토글 기능
- Google Colab 실습 환경 연동
- 구글 Programmable Search Engine 통합 (공식 문서 검색)
- 우클릭/드래그 방지 콘텐츠 보호

### 4. 해설 뷰어
- 회차별 정답 및 해설 표시
- 모의고사 데이터 연동
- 간편한 네비게이션

### 5. 관리자 도구
- OTP 코드 생성 및 해시 변환
- 난수 목록 관리
- 테스트 기능 내장

### 6. 모바일 최적화
- 디바이스 자동 감지
- 모바일 접속 시 PC 환경 권장 안내
- URL 복사 및 카카오톡 공유 기능

## 📁 프로젝트 구조

```
mockexam-colab-vanilla/
├── prj_source/              # 메인 웹사이트 소스 (GitHub Pages 배포)
│   ├── assets/              # 이미지, 아이콘 리소스
│   ├── css/                 # 스타일시트
│   │   ├── reset.css
│   │   ├── variables.css
│   │   ├── common.css
│   │   └── responsive.css
│   ├── js/                  # 자바스크립트 모듈
│   │   ├── common.js        # 공통 유틸리티
│   │   ├── auth.js          # 인증 로직
│   │   ├── lobby.js         # 로비 화면
│   │   ├── learning.js      # 학습 화면
│   │   ├── mobile.js        # 모바일 안내
│   │   ├── admin.js         # 관리자 도구
│   │   └── storage.js       # Local Storage 래퍼
│   ├── pages/               # HTML 페이지
│   │   ├── auth.html        # 도서 인증
│   │   ├── lobby.html       # 로비
│   │   ├── learning.html    # 학습 화면
│   │   ├── solution.html    # 해설 뷰어
│   │   ├── admin.html       # 관리자 도구
│   │   ├── mobile-intro.html # 모바일 안내
│   │   └── 404.html         # 에러 페이지
│   ├── data/                # JSON 데이터
│   │   ├── exams.json       # 회차별 학습 데이터
│   │   └── otp-codes.json   # OTP 인증 코드
│   ├── solutions/           # 해설 문서
│   └── index.html           # 메인 진입점
├── 1_prd/                   # 고객 요구사항 문서
├── 2_ctx_docs/              # 컨텍스트 문서
├── 3_prj_docs/              # 프로젝트 문서
├── scripts/                 # 유틸리티 스크립트
├── serve.py                 # 로컬 개발 서버
├── start.sh                 # 시작 스크립트
└── README.md                # 이 파일
```

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| **프론트엔드** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **배포** | GitHub Pages |
| **데이터 관리** | JSON 파일, Local Storage |
| **보안** | SHA-256 해싱 (Web Crypto API) |
| **외부 연동** | Google Colab, Google Programmable Search |
| **개발 서버** | Python http.server |

## 🚀 시작하기

### 로컬 개발

```bash
# 방법 1: Python 스크립트 사용
./start.sh

# 방법 2: 직접 Python 서버 실행
cd prj_source
python3 -m http.server 8080

# 브라우저 접속
http://localhost:8080
```

### 배포

```bash
# GitHub Pages에 배포
./deploy-ghpages.sh
```

## 📊 개발 진행 현황

### 완료된 기능

| 단계 | 기능 | 상태 |
|------|------|:----:|
| Phase 1 | 프로젝트 구조 설정 | ✅ |
| Phase 2 | 기본 UI/UX 디자인 | ✅ |
| Phase 3 | OTP 인증 시스템 | ✅ |
| Phase 4 | 학습 화면 구현 | ✅ |
| Phase 5 | 모바일 안내 화면 | ✅ |
| Phase 6 | 보안 및 UX 개선 | ✅ |
| Phase 7 | 데이터 매뉴얼 | ✅ |
| Phase 8 | 배포 설정 | ✅ |
| Phase 9 | 통합 테스트 | ✅ |
| - | 해설 페이지 추가 | ✅ |
| - | 관리자 도구 | ✅ |
| - | OTP 붙여넣기 개선 | ✅ |
| - | E2E 자체 검증 | ✅ |

### 최근 업데이트

- `feat`: 시험 데이터 및 해설 파일 추가
- `docs`: OTP 관리 방법 문서 추가
- `feat`: OTP 인증 시스템 개선 및 관리자 도구 추가
- `fix`: auth.js 문법 오류 수정 및 로고 이미지 404 해결
- `fix`: OTP 입력란 카드 폭 맞춤
- `fix`: OTP 붙여넣기 기능 개선

## 📖 문서

| 문서 | 설명 |
|------|------|
| [1_prd/1_고객요구사항.md](1_prd/1_고객요구사항.md) | 고객 요구사항 정의서 |
| [prj_source/README.md](prj_source/README.md) | 소스 코드 상세 가이드 |

## 🔐 보안

- 클라이언트 사이드 인증 (Local Storage)
- SHA-256 해시 기반 OTP 검증
- 콘텐츠 보호 (우클릭/드래그 방지)
- HTTPS 강제 (GitHub Pages 기본 제공)

## 📝 라이선스

© 2026 CTX AICE & 빅데이터 분석기사 모의고사 시스템.
