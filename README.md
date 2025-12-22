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

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📁 주요 프로젝트 구조

*   `app/`: Next.js App Router 기반의 페이지 및 API Route.
*   `components/`: 공통 UI 컴포넌트 및 비즈니스 로직 컴포넌트.
*   `lib/`: 인증 로직(`auth-logic.ts`), 상수 데이터(`auth-codes.ts`, `exam-data.ts`) 관리.
*   `public/`: 로고, 아이콘 등 정적 자산.
*   `3_prj_docs/`: 운영 가이드 및 단계별 완료 기록 문서.

## ⚙️ 운영 및 관리

### 인증 코드 업데이트
*   `lib/auth-codes.ts`의 `AUTH_CODES` 배열을 수정하거나, Vercel 환경 변수(`AUTH_CODES_JSON`)를 통해 실시간으로 업데이트할 수 있습니다.

### 모의고사 회차 관리
*   `lib/exam-data.ts` 파일에서 시험 제목, Colab URL, 데이터 URL 등을 수정하여 새로운 콘텐츠를 즉시 반영할 수 있습니다.

## 📄 가이드 문서
상세한 운영 방법은 [운영 가이드](./3_prj_docs/운영가이드.md)를 참고하시기 바랍니다.

---
© 2025 AICE & 빅데이터 분석기사 모의고사 시스템 프레임워크.
