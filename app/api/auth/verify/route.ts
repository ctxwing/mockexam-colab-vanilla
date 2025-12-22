/**
 * 파일명: app/api/auth/verify/route.ts
 * 작성일자: 2025-12-22
 * 용도: 인증 코드 검증을 위한 API API Route입니다.
 * 주의 사항: 보안을 위해 서버 사이드에서 검증을 수행합니다.
 */

import { NextRequest, NextResponse } from "next/server";
import { validateAuthCode } from "@/lib/auth-logic";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const { code } = await request.json();

        if (!code) {
            return NextResponse.json({ success: false, message: "코드가 없습니다." }, { status: 400 });
        }

        const isValid = validateAuthCode(code);

        if (isValid) {
            // 인증 성공 시 쿠키 설정
            const cookieStore = await cookies();
            cookieStore.set("auth_token", "true", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24, // 1일 유지
            });

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: "유효하지 않은 코드입니다." }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "서버 오류" }, { status: 500 });
    }
}
