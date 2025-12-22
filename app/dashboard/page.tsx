/**
 * 파일명: app/dashboard/page.tsx
 * 작성일자: 2025-12-22
 * 용도: 인증 후 접근 가능한 모의고사 대시보드 페이지입니다.
 * 주의 사항: 
 */

"use client";

import React from "react";
import { EXAMS } from "@/lib/exam-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

export default function DashboardPage() {
    const handleCopyDataUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success("데이터 URL이 복사되었습니다.");
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 sm:p-12">
            <div className="max-w-5xl mx-auto space-y-8">
                <header className="space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                        모의고사 대시보드
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400">
                        준비된 모의고사를 선택하여 Google Colab 실습을 시작하세요.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
                    {EXAMS.map((exam) => (
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
                                        <Button asChild size="lg" className="w-full rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 shadow-lg shadow-zinc-200 dark:shadow-none transition-all duration-300 active:scale-95">
                                            <a href={exam.colabUrl} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="mr-2 h-4 w-4" /> Colab 접속
                                            </a>
                                        </Button>
                                        <Button asChild size="lg" variant="outline" className="w-full rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-300 active:scale-95">
                                            <a href={exam.formUrl} target="_blank" rel="noopener noreferrer">
                                                <CheckCircle className="mr-2 h-4 w-4" /> 답안 제출
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-zinc-50/50 dark:bg-black/20 py-5 border-t border-zinc-100 dark:border-zinc-800/50">
                                <Button asChild variant="ghost" className="w-full text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium">
                                    <Link href={exam.solutionUrl}>
                                        <FileText className="mr-2 h-4 w-4" /> 모범답안 및 해설 보기
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
            <Toaster position="bottom-right" />
        </div>
    );
}
