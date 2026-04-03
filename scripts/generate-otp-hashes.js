#!/usr/bin/env node
/**
 * OTP 코드 → SHA-256 해시 변환 스크립트
 * 프론트엔드에 원본 코드 노출 방지를 위해 단방향 해시 사용
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// 입력 파일 경로
const inputPath = path.join(__dirname, '../prj_source/data/otp-codes.json');
const outputPath = path.join(__dirname, '../prj_source/data/otp-list.json');

function sha256(text) {
    return crypto.createHash('sha256').update(text.toUpperCase()).digest('hex');
}

function generateHashes() {
    console.log('🔐 OTP 코드 해시 변환 시작...');

    // 원본 코드 읽기
    const rawData = fs.readFileSync(inputPath, 'utf8');
    const otpData = JSON.parse(rawData);

    // 각 코드를 SHA-256 해시로 변환
    const hashes = otpData.codes.map(code => {
        const hash = sha256(code);
        console.log(`  ${code} → ${hash.substring(0, 16)}...`);
        return hash;
    });

    // 해시 목록 저장
    const outputData = { hashes };
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

    console.log(`\n✅ ${hashes.length}개 코드 해시 변환 완료!`);
    console.log(`📁 저장 위치: ${outputPath}`);
}

// 실행
generateHashes();
