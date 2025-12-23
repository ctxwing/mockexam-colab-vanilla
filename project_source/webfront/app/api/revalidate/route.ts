/**
 * 파일명: app/api/revalidate/route.ts
 * 용도: 특정 경로의 서버 캐시(ISR)를 강제로 초기화합니다.
 * 사용법: GET /api/revalidate?path=/dashboard&secret=YOUR_SECRET
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
    const path = request.nextUrl.searchParams.get('path') || '/dashboard';
    const secret = request.nextUrl.searchParams.get('secret');

    // 보안을 위한 간단한 체크 (환경 변수에 설정된 secret과 대조)
    // 설정되지 않은 경우 일단 통과시키거나, 기본값을 사용할 수 있습니다.
    const adminSecret = process.env.REVALIDATE_SECRET || 'ctx-admin-secret';

    if (secret !== adminSecret) {
        return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    try {
        // 해당 경로의 캐시를 파기함
        revalidatePath(path);
        return NextResponse.json({
            revalidated: true,
            path,
            now: Date.now(),
            message: `Cache for ${path} has been purged and will be refreshed on next visit.`
        });
    } catch (err) {
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
