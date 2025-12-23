/**
 * 파일명: app/auth/page.tsx
 * 작성일자: 2025-12-22
 * 용도: 인증 페이지입니다. 기기 환경 체크 및 인증 폼을 노출합니다.
 */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { DeviceWarning } from "@/components/device-warning";
import { Toaster } from "@/components/ui/sonner";
import { Home } from "lucide-react";

export default function AuthPage() {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        // 간단한 모바일 체크 (User-Agent 또는 화면 너비)
        const ua = navigator.userAgent;
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        const isMobileDevice = mobileRegex.test(ua) || window.innerWidth < 768;

        if (isMobileDevice) {
            setIsMobile(true);
            setShowWarning(true);
        }
    }, []);

    const handleSuccess = () => {
        router.push("/dashboard");
    };

    const handleIgnoreWarning = () => {
        setShowWarning(false);
    };

    if (!isClient) return null;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-black relative pt-20">
            <div className="w-full max-w-md">
                {showWarning ? (
                    <DeviceWarning onIgnore={handleIgnoreWarning} />
                ) : (
                    <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center space-y-4 mb-4">
                            <div className="w-12 h-12 bg-black dark:bg-zinc-50 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-white dark:text-black font-bold">CTX</span>
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">독자 인증</h2>
                        </div>
                        <AuthForm onSuccess={handleSuccess} />
                    </div>
                )}
            </div>
            <Toaster position="top-center" />
        </div>
    );
}
