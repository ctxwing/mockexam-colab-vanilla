/**
 * 파일명: app/auth/page.tsx
 * 작성일자: 2025-12-22
 * 용도: 인증 페이지입니다. 기기 환경 체크 및 인증 폼을 노출합니다.
 * 주의 사항: 
 */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { DeviceWarning } from "@/components/device-warning";
import { Toaster } from "@/components/ui/sonner";

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
        <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-black">
            <div className="w-full max-w-md">
                {showWarning ? (
                    <DeviceWarning onIgnore={handleIgnoreWarning} />
                ) : (
                    <AuthForm onSuccess={handleSuccess} />
                )}
            </div>
            <Toaster position="top-center" />
        </div>
    );
}
