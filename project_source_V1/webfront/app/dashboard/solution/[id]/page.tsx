/**
 * 파일명: app/dashboard/solution/[id]/page.tsx
 * 용도: 구글 문서를 임베드하여 웹사이트 내부에서 해설지를 보여줍니다.
 */

import React from "react";
import { getExams } from "@/lib/exam-data";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SolutionViewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const exams = await getExams();

    // ID가 일치하는 시험을 찾습니다. 만약 GAS 데이터의 ID가 숫자 형식이거나 다를 수 있으므로 유연하게 검색합니다.
    const exam = exams.find(e => String(e.id) === id);

    if (!exam) {
        console.error(`Exam not found for ID: ${id}. Available IDs: ${exams.map(e => e.id).join(', ')}`);
        return notFound();
    }

    // /edit 등의 끝단을 /preview로 바꿔서 깔끔한 뷰어 모드로 표시
    const previewUrl = exam.solutionUrl.replace(/\/(edit|view|copy)(\?.*)?$/, '/preview');

    return (
        <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
            {/* Header */}
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm z-10 gap-2">
                <div className="flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm" className="rounded-full shrink-0">
                        <Link href="/dashboard">
                            <ChevronLeft className="h-4 w-4 mr-1" /> 대시보드
                        </Link>
                    </Button>
                    <div className="hidden sm:block h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700 mx-1" />
                    <h1 className="hidden sm:block text-lg font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {exam.title} - <span className="text-indigo-600 dark:text-indigo-400">해설</span>
                    </h1>
                </div>
                {/* 모바일 전용 제목 */}
                <h1 className="sm:hidden text-base font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                    {exam.title}
                    <span className="block text-indigo-600 dark:text-indigo-400 text-sm font-medium mt-0.5">모범답안 및 해설</span>
                </h1>
            </header>

            {/* Google Docs Viewer */}
            <main className="flex-1 relative bg-[#DBDBDB] dark:bg-zinc-900 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-0 md:p-4">
                    <div className="w-full h-full max-w-5xl bg-white dark:bg-zinc-950 shadow-2xl overflow-hidden rounded-none md:rounded-lg">
                        <iframe
                            src={previewUrl}
                            className="w-full h-full border-none"
                            title="Solution Viewer"
                            allow="autoplay"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
