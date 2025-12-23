/**
 * 파일명: app/dashboard/layout.tsx
 * 작성일자: 2025-12-22
 * 수정일자: 2025-12-23
 * 용도: 대시보드 및 하위 페이지의 공통 레이아웃입니다.
 * 주의 사항: 상단 네비게이션 바를 포함합니다.
 */

import React from "react";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            {/* 상단 네비게이션 바 */}
            <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-black/70 backdrop-blur-md">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                            <span className="text-white dark:text-black font-bold text-xs">CTX</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-50 hidden sm:inline-block">
                            AICE & 빅데이터 분석기사
                        </span>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
            <Toaster position="bottom-right" />
        </div>
    );
}
