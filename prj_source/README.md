# AICE 모의고사 - Vanilla JS 정적 웹사이트

Python 모의고사 학습을 위한 Vanilla JS 기반 정적 웹사이트입니다.

## 개요

이 프로젝트는 Next.js 기반의 동적 웹사이트를 Vanilla JS 기반 정적 웹사이트로 마이그레이션하여 GitHub Pages를 통한 배포와 서버 운영 비용 최소화를 목표로 합니다.

## 주요 기능

- **OTP 기반 도서 인증**: 8자리 난수를 통한 클라이언트 인증
- **회차별 학습 리스트**: 2컬럼 그리드 레이아웃
- **학습 화면**: 문제 표시, 해설 토글, Google Colab 연동
- **모바일 안내**: 디바이스 감지 및 PC 접속 안내
- **Local Storage 인증**: 클라이언트 기반 인증 상태 관리

## 디렉토리 구조

```
prj_source/
├── assets/
│   ├── images/     # 로고, 도서 이미지
│   └── icons/      # 파비콘 등
├── css/
│   ├── reset.css       # CSS 초기화
│   ├── variables.css   # CSS 변수 정의
│   ├── common.css      # 공통 컴포넌트 스타일
│   └── responsive.css  # 반응형 미디어 쿼리
├── js/
│   ├── common.js          # 공통 유틸리티 함수
│   ├── device-detect.js   # 디바이스 감지 로직
│   ├── storage.js         # Local Storage 래퍼
│   ├── auth.js            # 인증 로직
│   ├── lobby.js           # 로비 화면 로직
│   ├── learning.js        # 학습 화면 로직
│   └── mobile.js          # 모바일 화면 로직
├── data/
│   ├── exams.json      # 회차별 학습 데이터
│   └── otp-list.json   # OTP 인증 코드 목록
├── pages/
│   ├── auth.html           # 도서 인증 페이지
│   ├── lobby.html          # 모의고사 로비 페이지
│   ├── learning.html       # 학습 화면 페이지
│   └── mobile-intro.html   # 모바일 안내 페이지
└── index.html          # 메인 진입점 (디바이스 감지)
```

## 로컬 개발 서버 실행

Python 내장 서버를 사용하여 로컬에서 개발 서버를 실행할 수 있습니다.

```bash
# prj_source 디렉토리로 이동
cd prj_source

# Python 3 내장 서버 실행 (포트 8080)
python3 -m http.server 8080

# 또는 Python 2 내장 서버 실행
python -m SimpleHTTPServer 8080
```

그런 후 브라우저에서 `http://localhost:8080`으로 접속합니다.

## 배포

GitHub Pages를 통한 배포를 지원합니다.

1. `prj_source` 디렉토리의 내용을 `gh-pages` 브랜치에 푸시
2. GitHub Repository Settings > Pages에서 배포 설정

## 라이선스

이 프로젝트는 AICE 모의고사 학습 플랫폼을 위한 전용 프로젝트입니다.
