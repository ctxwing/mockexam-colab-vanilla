# AICE 및 빅데이터 분석기사 교육용 모의고사 시스템

본 프로젝트는 **AICE(AI Certificate for Everyone) 및 빅데이터 분석기사 실기** 학습자를 위한 **Google Colab 기반 가상 모의고사 브릿지 시스템**입니다. 도서 독자가 QR 코드를 통해 접속하여 간단한 인증 후, 최적화된 실습 환경과 학습 콘텐츠에 접근할 수 있도록 돕습니다.

## ✨ 핵심 기능

1.  **Stateless 인증 시스템**
    *   도서 내 인쇄된 16자리 난수 코드를 통한 간단한 인증.
    *   대소문자 무시 및 하이픈(-) 자동 처리 로직 적용.
    *   별도의 데이터베이스 없이 서버 사이드 로직 및 환경 변수로 보안 유지.
2.  **프리미엄 대시보드 UI**
    *   Glassmorphism 및 미려한 그라데이션이 적용된 모던한 디자인.
    *   회차별 실습 데이터(CSV), Colab 링크, 답안 제출 폼 원클릭 접근.
3.  **기기별 최적화 UX**
    *   모바일 접속 시 환경 감지를 통한 PC 접속 권장 안내 기능 제공.
4.  **확장 가능한 콘텐츠 관리**
    *   정적 파일을 통한 쉬운 모의고사 회차 및 데이터 업데이트.

## 🛠 기술 스택

*   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
*   **Library**: [React 19](https://react.dev/), [shadcn/ui](https://ui.shadcn.com/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Language**: TypeScript
*   **Deployment**: Vercel (Serverless)

## 🚀 시작하기

### 1. 환경 설정
로컬 테스트를 위해 프로젝트 루트에 `.env.local` 파일을 생성하고 인증 코드를 설정할 수 있습니다.

```env
# JSON 배열 형식으로 인증 코드 설정
AUTH_CODES_JSON='["ABCD-EFGH-IJKL-MNOP", "1234-5678-90AB-CDEF"]'
```

### 2. 개발 서버 실행

루트 디렉토리의 `start.sh` 스크립트를 사용하여 서버를 실행할 수 있습니다.

```bash
./start.sh
```

브라우저에서 [http://localhost:57080](http://localhost:57080)을 열어 확인하세요.

## 📁 프로젝트 구조

본 프로젝트는 웹 프론트엔드와 구글 앱스 스크립트(GAS) 소스를 분리하여 관리합니다.

*   `project_source/`
    *   `webfront/`: Next.js 16 기반의 웹 서비스 소스 (App Router 사용).
        *   `app/`, `components/`, `lib/`, `public/` 등
    *   `google_docs_appscript/`: 상시 운영 및 초기 빌드용 GAS 소스(`.gs`).
        *   `docs/`: 관리자 및 운영 매뉴얼.
*   `3_prj_docs/`: 설계 문서 및 단계별 완료 보고서.
*   `start.sh`: 웹 서비스 개발 서버 시작 스크립트.

## ⚙️ 운영 및 관리

### 데이터 동기화 (ISR)
*   본 시스템은 Google Sheets를 DB로 사용하며, 성능을 위해 ISR(Incremental Static Regeneration)을 적용합니다.
*   시트 수정 후 즉시 반영하려면 GAS 메뉴의 **[⚡ 3. 수정한 내용 서버 즉시 반영]** 기능을 사용하십시오.

### 인증 코드 및 콘텐츠 관리
*   모든 인증 코드와 시험 회차 정보는 Google Sheets에서 관리되며, 웹사이트 수정 없이 시트 업데이트만으로 운영이 가능합니다.


## 📄 가이드 문서
상세한 운영 방법은 [운영 가이드](./project_source/google_docs_appscript/docs/운영가이드.md)를 참고하시기 바랍니다.


---
© 2025 AICE & 빅데이터 분석기사 모의고사 시스템 프레임워크.
