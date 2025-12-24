# AICE 및 빅데이터 분석기사 교육용 모의고사 시스템

본 프로젝트는 **AICE(AI Certificate for Everyone) 및 빅데이터 분석기사 실기** 학습자를 위한 **Google Colab 기반 가상 모의고사 브릿지 시스템**입니다. 도서 독자가 QR 코드를 통해 접속하여 간단한 인증 후, 최적화된 실습 환경과 학습 콘텐츠에 접근할 수 있도록 돕습니다.

## ✨ 핵심 기능

1.  **지능형 인증 시스템 (Stateless Auth)**
    *   도서 내 인쇄된 16자리 난수 코드를 통한 간편 인증.
    *   대소문자 무시 및 하이픈(-) 자동 보정 로직 적용.
    *   별도의 DB 없이 Google Sheets 및 환경 변수를 활용한 초경량 보안 구조.
2.  **프리미엄 대시보드 UI/UX**
    *   Next.js 15+ 기반의 Glassmorphism 기반 모던 UI.
    *   회차별 실습 데이터(CSV) 클립보드 복사, Colab 즉시 연결, 답안 제출 자동화.
3.  **구글 폼 연동 자동화 (Auto-Prefill)**
    *   대시보드에서 답안 제출 클릭 시, **응시자의 인증 코드가 구글 폼에 자동 입력**되어 중복 입력을 방지하고 운영 효율을 극대화.
4.  **기기 최적화 및 보안**
    *   모바일 접속 시 환경 감지를 통한 PC 접속 권장 안내 및 URL 복사 기능.
    *   ISR(Incremental Static Regeneration) 및 온디맨드 재검증(On-demand Revalidation)을 통한 실시간 데이터 동기화.

## ✅ 요구사항 준수 현황 (Requirement Completion)

고객 요구사항(`1_고객요구사항.md`)을 100% 충족하며, 추가 고도화를 완료했습니다.

| 분류 | 요구사항 | 구현 상태 | 상세 내용 |
| :--- | :--- | :---: | :--- |
| **프론트** | 모바일 접속 감지 및 PC 유도 | ✅ 완료 | 모바일 감지 팝업 및 주소 복사 기능 구현 |
| **인증** | 20개 난수 코드 단순 인증 | ✅ 완료 | 대소문자 무시 및 서버사이드 검증 완료 |
| **콘텐츠** | 모의고사 리스트 및 데이터 제공 | ✅ 완료 | 카테고리별 분류 및 GitHub Raw 데이터 연동 |
| **연동** | Google Colab 새 창 연결 | ✅ 완료 | 실습용 IPYNB 클라우드 환경 매핑 |
| **인프라** | Serverless / No-DB 구조 | ✅ 완료 | Vercel 배포 및 Google Sheets API 연동 (유지보수비 0원) |
| **산출물** | 운영 매뉴얼 및 소스 원본 | ✅ 완료 | 고도화된 가이드 문서 10종 포함 |

## 🛠 기술 스택

*   **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
*   **Library**: [React 19](https://react.dev/), [shadcn/ui](https://ui.shadcn.com/), [Lucide React](https://lucide.dev/)
*   **Backend Interface**: Google Apps Script (GAS)
*   **Deployment**: Vercel (Serverless)

## 📁 프로젝트 구조

*   `project_source/webfront/`: Next.js 기반 웹 서비스 소스.
    *   `public/colab/`: 학생 실습용 Jupyter Notebook(.ipynb) 파일 보관.
    *   `public/solutions/`: 해설 문서(.md) 보관.
*   `project_source/google_docs_appscript/`: 구글 시트 연동 및 관리 도구.
    *   `docs/`: 시스템 배포 및 코랩 링크 생성 상세 가이드.
*   `3_prj_docs/`: 설계, 보안, 인도 가이드 등 전문 산출물 (01~10번 문서).

## ⚙️ 운영 및 관리

### 실시간 데이터 반영 (Purge)
구글 시트에서 내용을 수정한 후 즉시 웹사이트에 반영하려면 상단 메뉴의 **[⚡ 3. 수정한 내용 서버 즉시 반영]**을 클릭하십시오. Vercel의 캐시를 즉시 파기하고 최신 데이터를 불러옵니다.

### 상세 가이드 문서
- [학생용 Colab 파일 생성 가이드](./3_prj_docs/07_학생용_Colab_파일_생성_가이드.md)
- [고객 인도 및 환경 구축 가이드](./3_prj_docs/08_고객_인도_및_환경_구축_가이드.md)
- [Vercel 자동 배포 절차](./project_source/google_docs_appscript/docs/Vercel_배포절차.md)
- [미구현 및 보안 취약점 보고서](./3_prj_docs/10_미구현_개발보완_및_보안취약점_보고서.md)

---
© 2025 CTX AICE & 빅데이터 분석기사 모의고사 시스템 프레임워크.
