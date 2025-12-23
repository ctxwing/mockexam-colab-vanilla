/**
 * 파일명: proxy.ts
 * 용도: Next.js 16+ 표준 'proxy'를 통한 경로 보호 및 리다이렉션 관리
 * 주의: Next.js 16 컨벤션에 따라 파일명은 'proxy.ts'여야 하며, 함수 이름은 'proxy'여야 합니다.
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
    const authCode = request.cookies.get('auth_code');
    const { pathname } = request.nextUrl;

    // 1. 대시보드 접근 시 인증 체크 (auth_code 쿠키가 있어야 함)
    if (pathname.startsWith('/dashboard')) {
        if (!authCode || !authCode.value) {
            // 원래 가려던 경로를 쿼리 파라미터로 저장
            const authUrl = new URL('/auth', request.url);
            authUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(authUrl);
        }
    }

    // 2. 이미 인증된 사용자가 로그인 페이지 접근 시 대시보드로 이동
    if (pathname === '/auth') {
        if (authCode && authCode.value) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth'],
};
