/**
 * 파일명: components/device-warning.tsx
 * 작성일자: 2025-12-22
 * 용도: 모바일 접속 사용자에게 PC 접속을 권장하는 안내 컴포넌트입니다.
 * 주의 사항: 클라이언트 사이드에서 작동합니다.
 */

"use client";

import React from "react";
import { Monitor, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeviceWarningProps {
    onIgnore: () => void;
}

export function DeviceWarning({ onIgnore }: DeviceWarningProps) {
    const handleCopyUrl = () => {
        // 실제 운영 환경에서는 window.location.origin을 사용
        const url = typeof window !== 'undefined' ? window.location.origin : '';
        navigator.clipboard.writeText(url);
        toast.success("링크가 복사되었습니다. PC에서 접속해 주세요!");
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-6 text-center p-8 bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 max-w-md">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full">
                <Monitor className="w-12 h-12 text-amber-600 dark:text-amber-500" />
            </div>

            <div className="space-y-3">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">PC 접속 권장</h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                    본 교육용 모의고사는 <strong>Google Colab</strong> 실습 환경을 포함하고 있어, <strong>PC 환경</strong>에서 가장 원활하게 이용하실 수 있습니다.
                </p>
            </div>

            <div className="flex flex-col w-full gap-3">
                <Button onClick={handleCopyUrl} className="w-full h-12 gap-2 bg-amber-600 hover:bg-amber-700 text-white border-none shadow-lg shadow-amber-600/20">
                    <Copy className="w-4 h-4" /> 주소 복사하기
                </Button>
                <Button onClick={onIgnore} variant="outline" className="w-full h-12 text-zinc-500 hover:text-zinc-900 transition-colors">
                    무시하고 계속 진행하기
                </Button>
            </div>

            <p className="text-[11px] text-zinc-400">
                복사한 주소를 PC 브라우저에 붙여넣어 접속해 주세요.
            </p>
        </div>
    );
}
