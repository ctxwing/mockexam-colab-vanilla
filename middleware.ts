/**
 * 파일명: middleware.ts
 * 작성일자: 2025-12-22
 * 용도: 접근 제어를 수행하는 미들웨어입니다.
 * 주의 사항: 인증되지 않은 사용자가 /dashboard 하위 경로에 접근하는 것을 제한합니다.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // /dashboard 경로에 접근하는 경우 인증 확인
    if (pathname.startsWith("/dashboard")) {
        const authToken = request.cookies.get("auth_token");

        if (!authToken || authToken.value !== "true") {
            // 인증되지 않은 경우 /auth 페이지로 리다이렉트
            return NextResponse.redirect(new URL("/auth", request.url));
        }
    }

    return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정
export const config = {
    matcher: ["/dashboard/:path*"],
};
