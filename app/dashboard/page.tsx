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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {EXAMS.map((exam) => (
                        <Card key={exam.id} className="flex flex-col overflow-hidden border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="bg-zinc-100/50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                                <CardTitle className="text-xl font-bold">{exam.title}</CardTitle>
                                <CardDescription className="line-clamp-2 min-h-[3rem]">
                                    {exam.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pt-6 space-y-6">
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">실습 준비</h3>
                                    <div className="flex items-center gap-2 p-3 bg-zinc-100 dark:bg-zinc-900 rounded-md border border-zinc-200 dark:border-zinc-800">
                                        <code className="text-xs truncate flex-1 font-mono text-zinc-600 dark:text-zinc-400">
                                            {exam.dataUrl}
                                        </code>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleCopyDataUrl(exam.dataUrl)}
                                            title="데이터 URL 복사"
                                        >
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">실습 및 제출</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button asChild variant="default" className="w-full">
                                            <a href={exam.colabUrl} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="mr-2 h-4 w-4" /> Colab 시작
                                            </a>
                                        </Button>
                                        <Button asChild variant="outline" className="w-full">
                                            <a href={exam.formUrl} target="_blank" rel="noopener noreferrer">
                                                <CheckCircle className="mr-2 h-4 w-4" /> 답안 제출
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-zinc-50 dark:bg-zinc-900/20 py-4">
                                <Button asChild variant="link" className="w-full text-zinc-600 dark:text-zinc-400">
                                    <a href={exam.solutionUrl}>
                                        <FileText className="mr-2 h-4 w-4" /> 정답 및 해설 확인
                                    </a>
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
