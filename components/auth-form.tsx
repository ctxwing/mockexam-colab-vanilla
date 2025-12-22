/**
 * 파일명: components/auth-form.tsx
 * 작성일자: 2025-12-22
 * 용도: 인증 코드 입력 폼 컴포넌트입니다.
 * 주의 사항: 4자리마다 하이픈이 자동 삽입되며, 클라이언트 사이드에서 상태를 관리합니다.
 */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface AuthFormProps {
    onSuccess: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const formatCode = (value: string) => {
        // 영문자와 숫자만 추출
        const sanitized = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

        // 4자리마다 하이픈 삽입
        const parts = [];
        for (let i = 0; i < sanitized.length && i < 16; i += 4) {
            parts.push(sanitized.substring(i, i + 4));
        }
        return parts.join("-");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCode(e.target.value);
        setCode(formatted);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (code.replace(/-/g, "").length < 16) {
            toast.error("인증 코드는 16자리여야 합니다.");
            return;
        }

        setLoading(true);
        try {
            // 서버 액션 또는 API 호출을 대신하여 lib/auth-logic을 사용할 수 있으나 
            // 클라이언트에서 직접 호출 시 보안을 위해 Server Action 권장.
            // 여기서는 MVP 단계이므로 임시로 클라이언트에서 검증 로직을 타는 것처럼 구현하거나
            // 실제 API 라우트를 호출하도록 함.

            const response = await fetch("/api/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success("인증에 성공하였습니다!");
                onSuccess();
            } else {
                toast.error("잘못된 인증 코드입니다. 다시 확인해주세요.");
            }
        } catch (error) {
            toast.error("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md shadow-lg border-zinc-200 dark:border-zinc-800">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">인증 코드 입력</CardTitle>
                <CardDescription>
                    도서 뒷면에 인쇄된 16자리 인증 코드를 입력해주세요.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="auth-code">인증 코드 (XXXX-XXXX-XXXX-XXXX)</Label>
                        <Input
                            id="auth-code"
                            placeholder="A1B2-C3D4-E5F6-G7H8"
                            value={code}
                            onChange={handleChange}
                            className="text-center text-lg tracking-widest font-mono h-12"
                            maxLength={19}
                            disabled={loading}
                            autoComplete="off"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                        {loading ? "검증 중..." : "인증하기"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
