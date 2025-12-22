/**
 * 파일명: app/dashboard/solution/[id]/page.tsx
 * 작성일자: 2025-12-22
 * 용도: 회차별 정답 및 해설을 보여주는 페이지입니다.
 * 주의 사항: 
 */

import React from "react";
import { EXAMS } from "@/lib/exam-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

export default async function SolutionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const exam = EXAMS.find((e) => e.id === id);

    if (!exam) {
        notFound();
    }

    return (
        <div className="p-6 sm:p-12">
            <div className="max-w-3xl mx-auto space-y-8">
                <Button asChild variant="ghost" className="mb-4">
                    <Link href="/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" /> 대시보드로 돌아가기
                    </Link>
                </Button>

                <header className="space-y-4 border-b pb-8 border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3 text-zinc-500 mb-2">
                        <BookOpen className="h-5 w-5" />
                        <span className="font-medium">정답 및 해설</span>
                    </div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                        {exam.title}
                    </h1>
                </header>

                <section className="prose dark:prose-invert max-w-none">
                    <div className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center space-y-6">
                        <h2 className="text-xl font-semibold">콘텐츠 준비 중</h2>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            해당 회차의 상세 정답 및 해설 콘텐츠를 준비하고 있습니다. <br />
                            잠시만 기다려 주세요!
                        </p>
                        <div className="flex justify-center gap-4">
                            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
