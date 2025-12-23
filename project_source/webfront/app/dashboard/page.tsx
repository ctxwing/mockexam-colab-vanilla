/**
 * 파일명: app/dashboard/page.tsx
 * 용도: 대시보드 메인 페이지 (서버 컴포넌트)
 * 특징: ISR(Incremental Static Regeneration)을 적용하여 GAS 연동 속도 문제를 완전히 해결합니다.
 */

import React from "react";
import { getExams } from "@/lib/exam-data";
import DashboardClient from "./dashboard-client";

// ISR 설정: 1시간(3600초) 동안 페이지를 캐싱합니다.
export const revalidate = 3600;

export default async function DashboardPage() {
    // 서버 사이드에서 GAS 데이터를 미리 가져옵니다.
    // getExams 내부의 fetch는 이미 revalidate 설정이 되어 있어 서버 레벨에서 캐싱됩니다.
    const exams = await getExams();

    return <DashboardClient initialExams={exams} />;
}
