# Change: Vanilla JS 기반 정적 웹사이트 마이그레이션 (v2-01)

## Why
- 서버 운영 비용 최소화를 위한 정적 웹사이트 전환
- Next.js 기반 동적 웹사이트를 Vanilla JS 기반 정적 웹사이트로 마이그레이션
- Local Storage 기반 클라이언트 인증으로 서버 의존성 제거

## What Changes
- **기술 스택**: Next.js → Vanilla JS (HTML/CSS/JS)
- **인증 방식**: 서버 인증 → Local Storage 기반 클라이언트 인증
- **데이터 소스**: 서버 API → JSON 파일 기반 동적 로딩
- **배포 플랫폼**: Vercel/Netlify → GitHub Pages
- **스타일링**: Vanilla CSS 유지 (프레임워크 없음)
- **소스 위치**: `./prj_source/` 디렉토리에 신규 구축

## Impact
- Affected specs: auth, lobby, learning, mobile
- Affected code: 전체 코드베이스 재작성
- **BREAKING**: 기존 Next.js 기반 구조 완전 제거, 새로운 정적 웹사이트 구조 도입
- **Note**: 기존 `./project_source_V1/`는 참고용으로만 사용
