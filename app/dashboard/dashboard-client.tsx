/**
 * 파일명: app/dashboard/dashboard-client.tsx
 * 용도: 대시보드의 클라이언트 측 인터랙션을 담당합니다.
 * 특징: 서버에서 가져온 초기 데이터를 즉시 보여주어 로딩 속도를 극대화합니다.
 */

"use client";

import React, { useEffect, useState } from "react";
import { getExams, Exam } from "@/lib/exam-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, FileText, CheckCircle, Monitor } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

interface DashboardClientProps {
    initialExams: Exam[];
}

export default function DashboardClient({ initialExams }: DashboardClientProps) {
    const [exams, setExams] = useState<Exam[]>(initialExams);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [authCode, setAuthCode] = useState<string>("");
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileWarning, setShowMobileWarning] = useState<string | null>(null);

    const CACHE_KEY = "ctx_exam_data_cache";

    const loadData = async (force = false) => {
        if (force) setIsRefreshing(true);
        else setIsLoading(true);

        try {
            // 1. 만약 강제 갱신(force)이라면 서버 캐시도 먼저 파기 요청
            if (force) {
                try {
                    await fetch('/api/revalidate?path=/dashboard&secret=ctx-admin-secret');
                } catch (e) {
                    console.error("Server revalidation failed", e);
                }
            }

            // 2. 최신 데이터 가져오기 (GAS 호출)
            const data = await getExams(force);
            setExams(data);

            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data,
                timestamp: Date.now()
            }));

            if (force) toast.success("전체 서버 데이터가 최신으로 동기화되었습니다.");
        } catch (error) {
            console.error("Failed to load dashboard data:", error);
            toast.error("데이터 로드 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        const ua = navigator.userAgent;
        const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        const isMobileDevice = mobileRegex.test(ua) || window.innerWidth < 768;
        setIsMobile(isMobileDevice);

        // 초기 데이터가 EXAMS(기본값)이고 로컬 머신에 캐시가 있다면 캐시를 우선 보여줌
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached && initialExams.length === 0) {
            try {
                const { data } = JSON.parse(cached);
                setExams(data);
            } catch (e) {
                console.error("Cache parse error", e);
            }
        }

        const getCode = () => {
            const cookies = document.cookie.split('; ');
            const authCodeCookie = cookies.find(row => row.startsWith('auth_code='));
            if (authCodeCookie) return decodeURIComponent(authCodeCookie.split('=')[1]);
            return localStorage.getItem("ctx_auth_code") || "";
        };

        const code = getCode();
        if (code) {
            setAuthCode(code);
            if (!localStorage.getItem("ctx_auth_code")) {
                localStorage.setItem("ctx_auth_code", code);
            }
        }
    }, [initialExams]);

    const handleCopyDataUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success("데이터 URL이 복사되었습니다.");
    };

    const handleColabClick = (colabUrl: string) => {
        if (isMobile) setShowMobileWarning(colabUrl);
        else window.open(colabUrl, '_blank');
    };

    const handleCopyUrl = () => {
        const url = typeof window !== 'undefined' ? window.location.origin : '';
        navigator.clipboard.writeText(url);
        toast.success("링크가 복사되었습니다. PC에서 접속해 주세요!");
    };

    const getPrefilledFormUrl = (exam: Exam) => {
        if (!exam.formUrl) return "#";
        if (!authCode) return exam.formUrl;
        const entryId = exam.formPrefillId || "123456789";
        const separator = exam.formUrl.includes("?") ? "&" : "?";
        return `${exam.formUrl}${separator}entry.${entryId}=${encodeURIComponent(authCode)}`;
    };

    return (
        <div className="p-6 sm:p-12">
            <div className="max-w-5xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                                모의고사 대시보드
                            </h1>
                            {isRefreshing && <div className="animate-spin h-4 w-4 border-2 border-zinc-400 border-t-transparent rounded-full" />}
                        </div>
                        <p className="text-xl text-zinc-600 dark:text-zinc-400">
                            준비된 모의고사를 선택하여 실무 실습을 시작하세요.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => loadData(true)}
                            disabled={isRefreshing}
                            variant="outline"
                            size="sm"
                            className="rounded-full px-5 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-95 font-semibold"
                        >
                            <svg className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {isRefreshing ? '갱신 중...' : '데이터 갱신'}
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
                    {exams.map((exam) => (
                        <Card key={exam.id} className="group relative flex flex-col overflow-hidden border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <CardHeader className="bg-zinc-100/30 dark:bg-zinc-900/30 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-6">
                                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
                                    {exam.title}
                                </CardTitle>
                                <CardDescription className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
                                    {exam.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pt-8 space-y-8">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">실습 데이터셋</h3>
                                        <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-500 font-mono italic">.csv</span>
                                    </div>
                                    <div className="group/copy flex items-center gap-2 p-4 bg-zinc-50 dark:bg-black/40 rounded-xl border border-zinc-100 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors">
                                        <code className="text-xs truncate flex-1 font-mono text-zinc-500 group-hover/copy:text-zinc-900 dark:group-hover/copy:text-zinc-200 transition-colors">
                                            {exam.dataUrl}
                                        </code>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-lg hover:bg-white dark:hover:bg-zinc-800 shadow-sm"
                                            onClick={() => handleCopyDataUrl(exam.dataUrl)}
                                        >
                                            <Copy className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">워크플로우</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button
                                            size="lg"
                                            className="w-full rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 shadow-lg shadow-zinc-200 dark:shadow-none transition-all duration-300 active:scale-95"
                                            onClick={() => handleColabClick(exam.colabUrl)}
                                        >
                                            <ExternalLink className="mr-2 h-4 w-4" /> Colab 접속
                                        </Button>
                                        <Button asChild size="lg" variant="outline" className="w-full rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-300 active:scale-95">
                                            <a href={getPrefilledFormUrl(exam)} target="_blank" rel="noopener noreferrer">
                                                <CheckCircle className="mr-2 h-4 w-4" /> 답안 제출
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-zinc-50/50 dark:bg-black/20 py-5 border-t border-zinc-100 dark:border-zinc-800/50">
                                <Button asChild variant="ghost" className="w-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium">
                                    <Link href={`/dashboard/solution/${exam.id}`}>
                                        <FileText className="mr-2 h-4 w-4" /> 모범답안 및 해설 보기 (내부 뷰어)
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Mobile Warning Modal for Colab */}
            {showMobileWarning && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-300">
                        <div className="p-8 flex flex-col items-center text-center space-y-6">
                            <div className="bg-amber-100 dark:bg-amber-900/30 p-5 rounded-full ring-8 ring-amber-50 dark:ring-amber-900/10">
                                <Monitor className="w-10 h-10 text-amber-600 dark:text-amber-500" />
                            </div>

                            <div className="space-y-3">
                                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">PC 접속을 권장합니다</h2>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed px-4">
                                    Colab 실습 환경은 모바일에서 원활한 조작이 어려울 수 있습니다. <strong>PC 브라우저</strong> 사용을 강력히 추천드립니다.
                                </p>
                            </div>

                            <div className="flex flex-col w-full gap-3">
                                <Button
                                    onClick={handleCopyUrl}
                                    className="w-full h-14 gap-2 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl shadow-lg shadow-amber-600/20 text-base font-bold transition-all active:scale-95"
                                >
                                    <Copy className="w-4 h-4" /> 현재 CoLab 주소 복사하기
                                </Button>
                                <Button
                                    onClick={() => {
                                        window.open(showMobileWarning, '_blank');
                                        setShowMobileWarning(null);
                                    }}
                                    variant="outline"
                                    className="w-full h-14 rounded-2xl border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95"
                                >
                                    무시하고 접속하기
                                </Button>
                                <button
                                    onClick={() => setShowMobileWarning(null)}
                                    className="text-xs text-zinc-400 hover:text-zinc-500 underline underline-offset-4 pt-2"
                                >
                                    나중에 하겠습니다
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
