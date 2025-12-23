/**
 * 파일명: app/api/auth/logout/route.ts
 * 작성일자: 2025-12-22
 * 용도: 로그아웃(세션 종료)을 위한 API Route입니다.
 * 주의 사항: 쿠키를 삭제하고 메인 페이지로 이동을 응답합니다.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();

    // 인증 쿠키 삭제
    cookieStore.delete("auth_token");

    return NextResponse.json({ success: true });
}
