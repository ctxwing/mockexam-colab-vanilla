# Next.js Middleware에서 Proxy로의 전환 가이드

## 1. 개요
Next.js 최신 버전(v16+)에서는 기존의 `middleware.ts` 대신 `proxy.ts`를 표준으로 권장하거나 특정 환경에서 강제할 수 있습니다. 본 문서에서는 두 파일의 충돌 이슈와 해결 방법을 정리합니다.

## 2. 발생 현상 (Error Message)
`middleware.ts`와 `proxy.ts`가 프로젝트 내에 동시에 존재할 경우, 빌드 시 또는 서버 실행 시 다음과 같은 치명적 오류가 발생합니다.

```text
⨯ unhandledRejection: Error: Both middleware file "./middleware.ts" and proxy file "./proxy.ts" are detected. 
Please use "./proxy.ts" only. 
Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
```

## 3. 전환 이유
*   **표준화**: 최신 Next.js 컨벤션에 따라 인증 필터, 경로 보호, API 프록시 기능은 `proxy.ts`로 통합 관리됩니다.
*   **충돌 방지**: 두 파일이 모두 존재할 경우 실행 순서가 모호해지며 시스템 리소스를 중복으로 사용하게 됩니다.
*   **엣지 런타임 최적화**: `proxy.ts`는 Vercel Edge Runtime 등에 최적화되어 더 빠른 응답 속도를 보장합니다.

## 4. 해결 방법 (Action Plan)
1.  **로직 통합**: `middleware.ts`에 작성된 모든 인증 및 가드 로직을 `proxy.ts`의 `proxy` 함수 내로 이전합니다.
2.  **파일 이름/함수 규칙 준수**: 
    - 파일명은 반드시 **`proxy.ts`**여야 합니다.
    - 함수명은 반드시 **`proxy`**여야 합니다 (default export).
3.  **파일 삭제**: 중복되는 **`middleware.ts`를 즉시 삭제**합니다.

## 5. 프로젝트 표준 코드 구조 (`proxy.ts`)
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
    const authCode = request.cookies.get('auth_code');
    const { pathname } = request.nextUrl;

    // 대시보드 접근 보호
    if (pathname.startsWith('/dashboard')) {
        if (!authCode) {
            const authUrl = new URL('/auth', request.url);
            authUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(authUrl);
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth'],
};
```

---
**업데이트 일자**: 2025-12-23
**주의**: 본 프로젝트에서는 모든 경로 보호 로직을 `proxy.ts`에서만 관리합니다.
