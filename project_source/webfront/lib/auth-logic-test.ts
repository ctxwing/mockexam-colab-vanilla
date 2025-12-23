/**
 * 파일명: lib/auth-logic-test.ts
 * 작성일자: 2025-12-22
 * 용도: 인증 로직 검증 스크립트입니다.
 * 주의 사항: ts-node 등으로 실행하여 결과를 확인합니다.
 */

import { validateAuthCode } from "./auth-logic";

const testCases = [
    { input: "A1B2-C3D4-E5F6-G7H8", expected: true, desc: "정확한 매치" },
    { input: "a1b2-c3d4-e5f6-g7h8", expected: true, desc: "소문자 매치" },
    { input: "A1B2C3D4E5F6G7H8", expected: true, desc: "하이픈 없음 매치" },
    { input: "a1b2c3d4e5f6g7h8", expected: true, desc: "소문자 + 하이픈 없음 매치" },
    { input: "WRONG-CODE-1234", expected: false, desc: "잘못된 코드" },
    { input: "A1B2-C3D4-E5F6-G7H9", expected: false, desc: "끝자리 다름" },
    { input: "", expected: false, desc: "빈 문자열" },
];

console.log("=== 인증 로직 테스트 시작 ===");

testCases.forEach(({ input, expected, desc }) => {
    const result = validateAuthCode(input);
    const status = result === expected ? "✅ 통과" : "❌ 실패";
    console.log(`[${status}] ${desc}: 입력="${input}", 기대값=${expected}, 결과=${result}`);
});

console.log("=== 인증 로직 테스트 종료 ===");
