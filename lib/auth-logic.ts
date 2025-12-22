/**
 * 파일명: lib/auth-logic.ts
 * 작성일자: 2025-12-22
 * 용도: 인증 코드 검증 로직을 담당합니다.
 * 주의 사항: 대소문자 무시 및 하이픈 제거 후 비교를 수행합니다.
 */

import { AUTH_CODES } from "./auth-codes";

/**
 * 입력된 코드가 유효한지 검사합니다.
 * @param input 사용자가 입력한 코드 (하이픈 포함 가능)
 * @returns 유효 여부
 */
export function validateAuthCode(input: string): boolean {
    // 1. 하이픈 제거 및 대문자로 변환
    const sanitizedInput = input.replace(/-/g, "").toUpperCase();

    // 2. 유효 코드 리스트도 동일하게 처리하여 비교
    return AUTH_CODES.some((code) => {
        const sanitizedCode = code.replace(/-/g, "").toUpperCase();
        return sanitizedCode === sanitizedInput;
    });
}
