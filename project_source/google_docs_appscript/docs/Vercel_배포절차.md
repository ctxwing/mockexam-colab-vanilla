# Vercel 자동 배포 및 설정 가이드

본 프로젝트는 Next.js 프레임워크를 기반으로 하며, Vercel을 통한 자동 배포(CI/CD)에 최적화되어 있습니다. 아래의 절차를 따라 서비스를 배포하고 운영 환경을 설정할 수 있습니다.

## 1. 사전 준비 사항
- **GitHub 계정**: 프로젝트 소스 코드가 업로드된 저장소 권한이 필요합니다.
- **Vercel 계정**: [vercel.com](https://vercel.com)에 가입되어 있어야 합니다. (GitHub 계정으로 연동 가능)

## 2. 배포 절차 (최초 1회)

1. **Vercel 로그인 및 프로젝트 생성**:
   - Vercel 대시보드에서 **[Add New...] > [Project]**를 클릭합니다.
   - GitHub 저장소를 연결하고 본 프로젝트(`qr-mockexam-colab-nextjs`)를 선택하여 **[Import]**합니다.

2. **환경 변수(Environment Variables) 설정**:
   - 배포 시작 전, 하단의 `Environment Variables` 섹션에 아래 항목들을 반드시 추가해야 합니다.
   - **`NEXT_PUBLIC_GAS_API_URL`**: 구글 시트에서 배포한 Apps Script의 웹 앱 URL (예: `https://script.google.com/macros/s/.../exec`)
   - **`REVALIDATE_SECRET`**: 서버 캐시 갱신을 위한 암호 키 (기본값: `ctx-admin-secret`, 구글 시트의 `settings` 탭과 일치해야 함)
   - **`AUTH_CODES_JSON`**: (선택 사항) 서버 환경변수로 관리하고자 하는 인증 코드 리스트 (JSON 배열 형식 `["XXXX-XXXX-XXXX-XXXX", ...]`)

3. **빌드 및 배포**:
   - 설정을 마친 후 **[Deploy]** 버튼을 클릭합니다.
   - 약 1~2분 후 배포가 완료되며, Vercel에서 제공하는 도메인(예: `your-project.vercel.app`)이 생성됩니다.

## 3. 자동 배포 (CI/CD)
- **Push 즉시 반영**: 연결된 GitHub 저장소의 `main` 브랜치에 코드를 `git push` 하면, Vercel이 이를 감지하여 **자동으로 다시 빌드하고 배포**합니다.
- 별도의 수동 조작 없이 항상 최신 소스 코드가 서버에 유지됩니다.

## 4. 실시간 데이터 갱신 (ISR & Purge)
- 본 사이트는 성능 향상을 위해 **ISR(Incremental Static Regeneration)** 기술을 사용합니다.
- 구글 시트에서 내용을 수정한 뒤 웹사이트에 즉시 반영하고 싶을 때는 구글 시트의 상단 메뉴:
  - **💎 [모의고사 통합 관리] > [⚡ 3. 수정한 내용 서버 즉시 반영 (Purge)]**를 클릭하세요.
  - 이 기능은 Vercel 서버의 캐시를 즉시 파기하고 최신 데이터를 불러옵니다.

## 5. FAQ 및 문제 해결
- **Q. 사이트에 데이터가 뜨지 않아요.**
  - Vercel 설정에서 `NEXT_PUBLIC_GAS_API_URL`이 정확한지 확인하세요.
- **Q. 빌드 오류가 발생합니다.**
  - `package.json`의 의존성 라이브러리가 모두 설치되어 있는지 확인하고, 로컬 환경에서 `npm run build`가 정상적으로 수행되는지 먼저 체크하세요.
- **Q. 도메인을 바꾸고 싶어요.**
  - Vercel 대시보드의 **[Settings] > [Domains]**에서 본인 소유의 커스텀 도메인을 추가할 수 있습니다.
