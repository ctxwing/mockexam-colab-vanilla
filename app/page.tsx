/**
 * 파일명: app/page.tsx
 * 작성일자: 2025-12-22
 * 용도: 메인 랜딩 페이지입니다. 프리미엄 디자인이 적용된 첫 화면입니다.
 */

import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Monitor, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black overflow-hidden relative">
      {/* 배경 데코레이션 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-32">
        <div className="flex flex-col items-center text-center space-y-12">
          {/* 배지 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            <Terminal className="w-3 h-3 text-blue-500" />
            <span>AICE & 빅데이터 분석기사 공식 실습 플랫폼</span>
          </div>

          {/* 헤드라인 */}
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
              도서 독자를 위한 <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
                가상 모의고사 브릿지
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              별도의 설치 없이 QR 코드 스캔 한 번으로 <br className="hidden sm:inline" />
              Google Colab 실습 환경에 바로 접속하세요.
            </p>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link
              href="/auth"
              className="group relative flex h-14 items-center justify-center gap-2 rounded-2xl bg-zinc-900 dark:bg-zinc-50 px-10 text-lg font-bold text-white dark:text-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-zinc-900/10 dark:shadow-zinc-100/10"
            >
              시작하기
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://www.wishket.com/project/151596/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center px-10 text-lg font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
            >
              프로젝트 정보
            </a>
          </div>

          {/* 피처 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-24 w-full">
            <FeatureCard
              icon={<BookOpen className="w-6 h-6 text-blue-500" />}
              title="간편한 독자 인증"
              description="별도의 회원가입 없이 도서 내 인쇄된 인증 코드만으로 즉시 이용 가능합니다."
            />
            <FeatureCard
              icon={<Monitor className="w-6 h-6 text-indigo-500" />}
              title="최적화된 UX"
              description="PC 환경에 최적화된 인터페이스와 모바일 접속 안내 기능을 제공합니다."
            />
            <FeatureCard
              icon={<Terminal className="w-6 h-6 text-purple-500" />}
              title="Colab 즉시 연결"
              description="Pandas 데이터 로딩부터 구글 폼 답안 제출까지 한 번에 연결됩니다."
            />
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/50 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
          <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-50 rounded-lg flex items-center justify-center">
            <span className="text-white dark:text-black font-bold text-[10px]">CTX</span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 font-medium">
            © 2025 AICE & 빅데이터 분석기사 모의고사 시스템 프레임워크.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800 text-left space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group">
      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
        {description}
      </p>
    </div>
  );
}
