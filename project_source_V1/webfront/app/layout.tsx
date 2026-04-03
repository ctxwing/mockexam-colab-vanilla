/**
 * 파일명: app/layout.tsx
 * 작성일자: 2025-12-22
 * 용도: Root Layout 컴포넌트입니다. 애플리케이션의 기본 HTML 구조와 글로벌 스타일, 폰트를 정의합니다.
 * 주의 사항: 전역적인 레이아웃 변경 시에만 수정하십시오.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AICE 및 빅데이터 분석기사 가상 모의고사",
  description: "QR 코드를 통한 모의고사 접속 브릿지 웹사이트",
};

import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="pt-16 min-h-screen">
          {children}
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
