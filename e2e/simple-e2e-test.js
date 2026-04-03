#!/usr/bin/env node
/**
 * 간단한 E2E 검증 스크립트
 * Playwright 없이 node-fetch와 console.log로 기본 검증 수행
 */

const http = require('http');

const BASE_URL = 'http://localhost:53500';

function fetchPage(path) {
    return new Promise((resolve, reject) => {
        http.get(`${BASE_URL}${path}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({ statusCode: res.statusCode, data });
            });
        }).on('error', reject);
    });
}

async function runTests() {
    let passed = 0;
    let failed = 0;

    console.log('=== AICE 모의고사 E2E 검증 시작 ===\n');

    // 테스트 1: 메인 페이지
    try {
        const res = await fetchPage('/');
        if (res.statusCode === 200 && res.data.includes('device-detect.js')) {
            console.log('✅ 1. 메인 페이지 로드 성공');
            passed++;
        } else {
            console.log('❌ 1. 메인 페이지 로드 실패');
            failed++;
        }
    } catch (e) {
        console.log('❌ 1. 메인 페이지 에러:', e.message);
        failed++;
    }

    // 테스트 2: 인증 페이지
    try {
        const res = await fetchPage('/pages/auth.html');
        if (res.statusCode === 200 && res.data.includes('otp-input')) {
            console.log('✅ 2. 인증 페이지 로드 성공');
            passed++;
        } else {
            console.log('❌ 2. 인증 페이지 로드 실패');
            failed++;
        }
    } catch (e) {
        console.log('❌ 2. 인증 페이지 에러:', e.message);
        failed++;
    }

    // 테스트 3: 로비 페이지
    try {
        const res = await fetchPage('/pages/lobby.html');
        if (res.statusCode === 200 && res.data.includes('exam-cards')) {
            console.log('✅ 3. 로비 페이지 로드 성공');
            passed++;
        } else {
            console.log('❌ 3. 로비 페이지 로드 실패');
            failed++;
        }
    } catch (e) {
        console.log('❌ 3. 로비 페이지 에러:', e.message);
        failed++;
    }

    // 테스트 4: 학습 화면
    try {
        const res = await fetchPage('/pages/learning.html');
        if (res.statusCode === 200 && res.data.includes('learning-header')) {
            console.log('✅ 4. 학습 화면 로드 성공');
            passed++;
        } else {
            console.log('❌ 4. 학습 화면 로드 실패');
            failed++;
        }
    } catch (e) {
        console.log('❌ 4. 학습 화면 에러:', e.message);
        failed++;
    }

    // 테스트 5: 모바일 인트로
    try {
        const res = await fetchPage('/pages/mobile-intro.html');
        if (res.statusCode === 200 && res.data.includes('mobile-intro')) {
            console.log('✅ 5. 모바일 인트로 페이지 로드 성공');
            passed++;
        } else {
            console.log('❌ 5. 모바일 인트로 페이지 로드 실패');
            failed++;
        }
    } catch (e) {
        console.log('❌ 5. 모바일 인트로 페이지 에러:', e.message);
        failed++;
    }

    // 테스트 6: 404 페이지
    try {
        const res = await fetchPage('/pages/404.html');
        if (res.statusCode === 200 && res.data.includes('404')) {
            console.log('✅ 6. 404 페이지 로드 성공');
            passed++;
        } else {
            console.log('❌ 6. 404 페이지 로드 실패');
            failed++;
        }
    } catch (e) {
        console.log('❌ 6. 404 페이지 에러:', e.message);
        failed++;
    }

    // 테스트 7: exams.json 데이터
    try {
        const res = await fetchPage('/data/exams.json');
        if (res.statusCode === 200) {
            const data = JSON.parse(res.data);
            if (data.exams && data.exams.length === 8) {
                console.log('✅ 7. exams.json 데이터 로드 성공 (8회차)');
                passed++;
            } else {
                console.log('❌ 7. exams.json 데이터 형식 오류');
                failed++;
            }
        } else {
            console.log('❌ 7. exams.json 로드 실패');
            failed++;
        }
    } catch (e) {
        console.log('❌ 7. exams.json 에러:', e.message);
        failed++;
    }

    // 테스트 8: otp-list.json 데이터
    try {
        const res = await fetchPage('/data/otp-list.json');
        if (res.statusCode === 200) {
            const data = JSON.parse(res.data);
            if (data.codes && data.codes.length > 0) {
                console.log('✅ 8. otp-list.json 데이터 로드 성공');
                passed++;
            } else {
                console.log('❌ 8. otp-list.json 데이터 형식 오류');
                failed++;
            }
        } else {
            console.log('❌ 8. otp-list.json 로드 실패');
            failed++;
        }
    } catch (e) {
        console.log('❌ 8. otp-list.json 에러:', e.message);
        failed++;
    }

    // 테스트 9: CSS 파일
    try {
        const res = await fetchPage('/css/common.css');
        if (res.statusCode === 200 && res.data.length > 100) {
            console.log('✅ 9. common.css 로드 성공');
            passed++;
        } else {
            console.log('❌ 9. common.css 로드 실패');
            failed++;
        }
    } catch (e) {
        console.log('❌ 9. common.css 에러:', e.message);
        failed++;
    }

    // 테스트 10: JS 파일
    try {
        const res = await fetchPage('/js/auth.js');
        if (res.statusCode === 200 && res.data.length > 100) {
            console.log('✅ 10. auth.js 로드 성공');
            passed++;
        } else {
            console.log('❌ 10. auth.js 로드 실패');
            failed++;
        }
    } catch (e) {
        console.log('❌ 10. auth.js 에러:', e.message);
        failed++;
    }

    console.log(`\n=== 검증 결과 ===`);
    console.log(`✅ 통과: ${passed}`);
    console.log(`❌ 실패: ${failed}`);
    console.log(`총 테스트: ${passed + failed}`);

    if (failed === 0) {
        console.log('\n🎉 모든 테스트가 통과했습니다!');
    } else {
        console.log('\n⚠️ 일부 테스트가 실패했습니다. 확인이 필요합니다.');
    }

    process.exit(failed > 0 ? 1 : 0);
}

runTests();
