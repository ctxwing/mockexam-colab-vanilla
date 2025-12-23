/**
 * 파일명: components/navbar.tsx
 * 용도: 상단 네비게이션 바입니다. 로그인 상태 및 홈 링크를 제공합니다.
 */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, LogIn, Home } from "lucide-react";

export function Navbar() {
    const [authCode, setAuthCode] = useState<string>("");
    const pathname = usePathname();

    useEffect(() => {
        // 쿠키 또는 로컬스토리지에서 인증 코드 가져오기
        const getCode = () => {
            const cookies = document.cookie.split('; ');
            const authCodeCookie = cookies.find(row => row.startsWith('auth_code='));
            if (authCodeCookie) return decodeURIComponent(authCodeCookie.split('=')[1]);
            return localStorage.getItem("ctx_auth_code") || "";
        };
        setAuthCode(getCode());
    }, [pathname]);

    // 랜딩 페이지나 인증 페이지에서는 다른 스타일 적용 가능
    const isDashboard = pathname.startsWith("/dashboard");

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-black/70 backdrop-blur-md h-16">
            <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <span className="text-white dark:text-black font-bold text-xs">CTX</span>
                    </div>
                    <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-50 hidden sm:block">
                        AICE & 빅데이터 분석기사
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    {/* 홈 링크 (홈페이지가 아닐 때 노출) */}
                    {pathname !== "/" && (
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-xs font-medium transition-colors"
                        >
                            <Home className="w-3.5 h-3.5" />
                            <span className="hidden sm:block">홈으로</span>
                        </Link>
                    )}

                    {authCode ? (
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        >
                            <User className="w-3.5 h-3.5" />
                            <span className="hidden sm:block">{authCode}</span>
                            <span className="sm:hidden">인증됨</span>
                        </Link>
                    ) : (
                        !isDashboard && (
                            <Link
                                href="/auth"
                                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                            >
                                <LogIn className="w-3.5 h-3.5" />
                                로그인
                            </Link>
                        )
                    )}
                </div>
            </div>
        </nav>
    );
}
