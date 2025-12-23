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
            {/* 상단 네비게이션 바는 app/layout.tsx의 Navbar 컴포넌트에서 제공됨 */}
            <main>{children}</main>
            <Toaster position="bottom-right" />
        </div>
    );
}
