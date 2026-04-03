# Vercel 자동 배포 및 설정 가이드 (최신)

본 프로젝트는 Next.js 프레임워크를 기반으로 하며, Vercel을 통한 자동 배포(CI/CD) 및 운영 환경 최적화 설정에 특화되어 있습니다.

---

## 🚀 1. Vercel 배포 상세 절차

### 1-1. 프로젝트 생성 및 소스 연결
1. Vercel 대시보드 진입 후 **[Add New] > [Project]** 클릭.
2. GitHub 저장소 `qr-mockexam-colab-nextjs` 선택 및 **[Import]**.
3. **Framework Preset**: `Next.js`로 자동 인식됨을 확인.
4. **Root Directory**: `./project_source/webfront` 로 설정 (가장 중요).

### 1-2. 보안 환경 변수 (Environment Variables) 설정
브라우저에 노출되지 않아야 하는 중요한 변수들을 설정합니다. 배포 전 반드시 추가해야 합니다.

| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| `GAS_API_URL` | https://script.google.com/.../exec | 실제 GAS API 주소 (서버 사이드 프록시용) |
| `REVALIDATE_SECRET` | (구글 시트 설정값) | ISR 캐시 강제 갱신용 보안 키 |
| `AUTH_CODES_JSON` | `["CODE1", "CODE2", ...]` | (선택) 하드코딩 대신 환경변수로 인증코드 관리 |
| `NODE_ENV` | `production` | 상용 모드 활성화 |

### 1-3. 배포 및 도메인 연결
1. **[Deploy]** 클릭 후 빌드 완료 대기.
2. **Settings > Domains**에서 커스텀 도메인(예: `exam.ctx.com`)을 연결하여 서비스를 게시합니다.

---

## 🔄 2. 자동 배포 및 데이터 갱신 (CI/CD)

### 2-1. Push 즉시 반영
- 연결된 GitHub 저장소의 `main` 브랜치에 코드를 `git push` 하면, Vercel이 이를 감지하여 **자동으로 빌드하고 배포**합니다.

### 2-2. 실시간 데이터 갱신 (ISR & Purge)
- 구글 시트에서 문제 정보를 수정한 뒤 웹사이트에 즉시 반영하고 싶을 때는 구글 시트 상단 메뉴를 이용합니다.
- **💎 [모의고사 통합 관리] > [⚡ 3. 수정한 내용 서버 즉시 반영 (Purge)]** 클릭.
- 이 기능은 Vercel 서버의 캐시를 즉시 파기(Revalidate)하고 최신 데이터를 불러옵니다.

---

## 🛠 3. 문제 해결 (FAQ)

- **Q. 사이트에 데이터가 뜨지 않아요.**
  - Vercel 설정에서 `GAS_API_URL` 또는 `NEXT_PUBLIC_GAS_API_URL`이 정확한지 확인하세요.
- **Q. 빌드 오류가 발생합니다.**
  - `Root Directory`가 `./project_source/webfront`로 정확히 설정되어 있는지 확인하세요.
- **Q. 캐시 갱신이 안 됩니다.**
  - `REVALIDATE_SECRET` 환경 변수가 구글 시트의 Apps Script 내 설정된 보안 키와 일치하는지 확인하십시오.

---
**최종 갱신일**: 2025-12-24
