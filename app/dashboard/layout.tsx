/**
 * 파일명: app/dashboard/layout.tsx
 * 작성일자: 2025-12-22
 * 용도: 대시보드 및 하위 페이지의 공통 레이아웃입니다.
 * 주의 사항: 상단 네비게이션 바와 로그아웃 기능을 포함합니다.
 */

"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", { method: "POST" });
            if (response.ok) {
                toast.success("로그아웃 되었습니다.");
                router.push("/");
            }
        } catch (error) {
            toast.error("로그아웃 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            {/* 상단 네비게이션 바 */}
            <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-black/70 backdrop-blur-md">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                            <span className="text-white dark:text-black font-bold text-xs">CTX</span>
                        </div>
                        <span className="font-bold tracking-tight text-zinc-900 dark:text-zinc-50 hidden sm:inline-block">
                            AICE & 빅데이터 분석기사
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                        className="text-zinc-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        <LogOut className="mr-2 h-4 w-4" /> 로그아웃
                    </Button>
                </div>
            </nav>

            <main>{children}</main>
            <Toaster position="bottom-right" />
        </div>
    );
}
