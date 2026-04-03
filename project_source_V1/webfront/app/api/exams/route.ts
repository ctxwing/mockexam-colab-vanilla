/**
 * 파일명: app/api/exams/route.ts
 * 용도: GAS API 주소 노출 방지를 위한 프록시 API Route입니다.
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";

    // 보안: 서버 환경 변수에서만 GAS URL을 가져옵니다.
    const gasUrl = process.env.GAS_API_URL || process.env.NEXT_PUBLIC_GAS_API_URL;

    if (!gasUrl) {
        return NextResponse.json({ error: "GAS API URL not configured" }, { status: 500 });
    }

    try {
        const url = new URL(gasUrl);
        url.searchParams.set('action', 'getExams');
        if (force) url.searchParams.set('t', Date.now().toString());

        const response = await fetch(url.toString(), {
            cache: force ? 'no-store' : 'default',
            next: { revalidate: 3600 }
        });

        if (!response.ok) throw new Error("GAS API response not ok");

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Exams proxy error:", error);
        return NextResponse.json({ error: "Failed to fetch data from GAS" }, { status: 500 });
    }
}
