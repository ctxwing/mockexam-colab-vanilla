/**
 * 파일명: app/dashboard/solution/[id]/page.tsx
 * 작성일자: 2025-12-22
 * 용도: 회차별 정답 및 해설을 렌더링하는 페이지입니다.
 * 주의 사항: Markdown 파일을 읽어와서 미려하게 렌더링합니다.
 */

import React from "react";
import { EXAMS } from "@/lib/exam-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

export default async function SolutionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const exam = EXAMS.find((e) => e.id === id);

    if (!exam) {
        notFound();
    }

    // Markdown 파일 읽기
    let content = "";
    try {
        const filePath = path.join(process.cwd(), "public", "solutions", `${id}.md`);
        content = fs.readFileSync(filePath, "utf-8");
    } catch (error) {
        console.error("Markdown 파일을 찾을 수 없습니다:", error);
    }

    return (
        <div className="p-6 sm:p-12 min-h-screen bg-white dark:bg-black">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <Button asChild variant="ghost" className="hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                        <Link href="/dashboard">
                            <ArrowLeft className="mr-2 h-4 w-4" /> 대시보드로 돌아가기
                        </Link>
                    </Button>
                </div>

                <header className="space-y-6 border-b pb-8 border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-2">
                        <BookOpen className="h-6 w-6" />
                        <span className="font-bold tracking-widest uppercase text-sm">Official Solution</span>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                            {exam.title}
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
                            {exam.description}
                        </p>
                    </div>
                </header>

                <article className="prose prose-zinc dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight
                    prose-h1:text-3xl prose-h2:text-2xl prose-h2:border-b prose-h2:pb-2 prose-h2:border-zinc-100 dark:prose-h2:border-zinc-800
                    prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-relaxed
                    prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-2xl
                    prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-code:bg-blue-50 dark:prose-code:bg-blue-900/20 prose-code:px-1.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                    ">
                    {content ? (
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight, rehypeRaw]}
                        >
                            {content}
                        </ReactMarkdown>
                    ) : (
                        <div className="bg-zinc-50 dark:bg-zinc-900 p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center space-y-6">
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
                    )}
                </article>

                <footer className="pt-12 border-t border-zinc-100 dark:border-zinc-800">
                    <p className="text-sm text-zinc-500">
                        본 해설지는 교육용으로만 제공되며 무단 배포를 금합니다.
                    </p>
                </footer>
            </div>
        </div>
    );
}
