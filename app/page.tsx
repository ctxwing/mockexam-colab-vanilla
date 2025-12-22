/**
 * 파일명: app/page.tsx
 * 작성일자: 2025-12-22
 * 용도: 메인 랜딩 페이지입니다. 사용자가 처음 접속했을 때 보여지는 화면입니다.
 * 주의 사항: 모바일 접속 안내 로직이 추가될 예정입니다.
 */

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-md text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            AICE 및 빅데이터 분석기사 모의고사 시스템에 오신 것을 환영합니다.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            도서에 포함된 인증 코드를 사용하여 Google Colab 실습 환경에 접속하세요.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black px-8 text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            href="/auth"
          >
            시작하기
          </a>
        </div>
      </main>
    </div>
  );
}
