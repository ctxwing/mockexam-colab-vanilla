# Task 관리: 접근 제어 및 로그아웃 구현

## 1. 인증 정보 유지 (Cookie-based)
- [ ] 1.1 `app/api/auth/verify/route.ts` 수정: 인증 성공 시 HTTP-Only 쿠키(`auth_token`) 설정
- [ ] 1.2 `lib/auth-logic.ts`에 쿠키 검증 유틸리티 추가

## 2. 접근 제어 (Middleware)
- [ ] 2.1 `middleware.ts` 생성: `/dashboard` 접근 시 쿠키 확인 및 미인증 사용자 `/auth` 리다이렉트

## 3. 로그아웃 및 UI 개선
- [ ] 3.1 `app/dashboard/layout.tsx` 또는 상단 바 생성: 로그아웃 버튼 추가
- [ ] 3.2 로그아웃 API(`app/api/auth/logout/route.ts`) 구현
- [ ] 3.3 대시보드 및 결과 페이지 마이크로 인터랙션 및 애니메이션 강화 (Framer Motion 등 검토)

## 4. 최종 통합 테스트
- [ ] 4.1 직접 URL 입력 시 차단 확인
- [ ] 4.2 로그아웃 후 접근 차단 확인
- [ ] 4.3 Git 커밋/푸시 (한글)
