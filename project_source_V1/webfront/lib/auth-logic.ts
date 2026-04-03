import { AUTH_CODES } from "./auth-codes";

/**
 * 환경 변수 또는 상수에서 인증 코드 리스트를 가져옵니다.
 */
function getAuthCodes(): string[] {
    const envCodes = process.env.AUTH_CODES_JSON;
    if (envCodes) {
        try {
            return JSON.parse(envCodes);
        } catch (e) {
            console.error("인증 코드 환경 변수 파싱 실패:", e);
        }
    }
    return AUTH_CODES;
}

/**
 * 입력된 코드가 유효한지 검사합니다. (동기 - 서버 사이드 환경 변수/상수 기반)
 * @param input 사용자가 입력한 코드 (하이픈 포함 가능)
 * @returns 유효 여부
 */
export function validateAuthCode(input: string): boolean {
    const codes = getAuthCodes();
    // 1. 하이픈 제거 및 대문자로 변환
    const sanitizedInput = input.replace(/-/g, "").toUpperCase();

    // 2. 유효 코드 리스트도 동일하게 처리하여 비교
    return codes.some((code) => {
        const sanitizedCode = String(code).replace(/-/g, "").toUpperCase();
        return sanitizedCode === sanitizedInput;
    });
}

/**
 * Google Apps Script API를 사용하여 인증 코드를 검증합니다. (비동기)
 */
export async function validateAuthCodeAsync(input: string): Promise<boolean> {
    // 보안: 서버 전용 환경 변수를 우선 사용합니다.
    const gasUrl = process.env.GAS_API_URL || process.env.NEXT_PUBLIC_GAS_API_URL;

    // GAS URL이 설정되지 않은 경우 로컬 로직으로 폴백
    if (!gasUrl) {
        return validateAuthCode(input);
    }

    try {
        const response = await fetch(`${gasUrl}?action=validateCode&code=${encodeURIComponent(input)}`);
        if (!response.ok) throw new Error("GAS auth validation failed");

        const data = await response.json();
        return data.isValid === true;
    } catch (error) {
        console.error("GAS 인증 검증 오류:", error);
        // 오류 발생 시 로컬 로직으로 폴백하여 서비스 중단 방지
        return validateAuthCode(input);
    }
}
