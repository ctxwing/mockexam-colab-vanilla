// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:53500';

test.describe('AICE 모의고사 E2E 테스트', () => {
  
  test('1. 메인 페이지 리다이렉트', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // 모바일 또는 PC로 리다이렉트되어야 함
    await page.waitForURL(/\/pages\/(auth\.html|mobile-intro\.html)$/);
    
    const url = page.url();
    expect(url).toMatch(/\/pages\/(auth\.html|mobile-intro\.html)$/);
  });

  test('2. 인증 페이지 로드 및 OTP 입력 UI 확인', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/auth.html`);
    
    // 로고 확인
    const logo = page.locator('.logo img');
    await expect(logo).toBeVisible();
    
    // OTP 입력 필드 8개 확인
    const otpInputs = page.locator('.otp-input');
    await expect(otpInputs).toHaveCount(8);
    
    // 인증하기 버튼 확인
    const authBtn = page.locator('.btn-auth');
    await expect(authBtn).toBeVisible();
    
    // 체크박스 확인
    const rememberCheckbox = page.locator('#remember-auth');
    await expect(rememberCheckbox).toBeVisible();
  });

  test('3. OTP 입력 자동 포커스 테스트', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/auth.html`);
    
    const otpInputs = page.locator('.otp-input');
    
    // 첫 번째 입력란에 포커스
    await otpInputs.first().click();
    await expect(otpInputs.first()).toBeFocused();
    
    // 숫자 입력 시 다음 입력란으로 포커스 이동
    await otpInputs.nth(0).fill('1');
    await expect(otpInputs.nth(1)).toBeFocused();
    
    await otpInputs.nth(1).fill('2');
    await expect(otpInputs.nth(2)).toBeFocused();
  });

  test('4. 로비 페이지 로드 및 인증 확인', async ({ page }) => {
    // 인증 토큰 설정
    await page.goto(`${BASE_URL}/pages/auth.html`);
    await page.evaluate(() => {
      localStorage.setItem('auth_token', 'test-token');
    });
    
    // 로비로 이동
    await page.goto(`${BASE_URL}/pages/lobby.html`);
    
    // 로비 페이지가 정상 로드되어야 함 (리다이렉트되지 않음)
    await expect(page.locator('.gnb')).toBeVisible();
    
    // 시험 카드 컨테이너 확인
    const examCards = page.locator('#exam-cards');
    await expect(examCards).toBeVisible();
  });

  test('5. 학습 화면 로드 및 URL 파라미터 처리', async ({ page }) => {
    // 인증 토큰 설정
    await page.goto(`${BASE_URL}/pages/lobby.html`);
    await page.evaluate(() => {
      localStorage.setItem('auth_token', 'test-token');
    });
    
    // 학습 화면으로 이동 (회차 1)
    await page.goto(`${BASE_URL}/pages/learning.html?exam=1`);
    
    // 학습 화면이 로드되어야 함
    await expect(page.locator('.learning-header')).toBeVisible();
    
    // 액션 버튼들 확인
    const colabBtn = page.locator('#colab-btn');
    const solutionBtn = page.locator('#solution-toggle-btn');
    const lectureBtn = page.locator('#lecture-btn');
    
    await expect(colabBtn).toBeVisible();
    await expect(solutionBtn).toBeVisible();
    await expect(lectureBtn).toBeVisible();
  });

  test('6. 모바일 인트로 페이지 로드', async ({ page }) => {
    // 뷰포트를 모바일로 설정
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto(`${BASE_URL}/pages/mobile-intro.html`);
    
    // 로고 확인
    const logo = page.locator('.mobile-logo');
    await expect(logo).toBeVisible();
    
    // 도서 표지 확인
    const bookCover = page.locator('.book-cover');
    await expect(bookCover).toBeVisible();
    
    // 안내 문구 확인
    const message = page.locator('.intro-message');
    await expect(message).toContainText('PC 실습 환경에 최적화된 서비스입니다');
    
    // URL 복사 버튼 확인
    const copyBtn = page.locator('#copy-url-btn');
    await expect(copyBtn).toBeVisible();
    
    // 카카오톡 공유 버튼 확인
    const kakaoBtn = page.locator('#kakao-share-btn');
    await expect(kakaoBtn).toBeVisible();
  });

  test('7. 반응형 레이아웃 - 모바일', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/lobby.html`);
    await page.evaluate(() => {
      localStorage.setItem('auth_token', 'test-token');
    });
    
    // 모바일 뷰포트
    await page.setViewportSize({ width: 375, height: 667 });
    
    // GNB가 모바일 레이아웃으로 표시되는지 확인
    const gnb = page.locator('.gnb');
    await expect(gnb).toBeVisible();
    
    // 검색박스가 아래로 내려가는지 확인
    const searchBox = page.locator('.search-box');
    await expect(searchBox).toBeVisible();
  });

  test('8. 404 에러 페이지', async ({ page }) => {
    await page.goto(`${BASE_URL}/pages/nonexistent.html`);
    
    // 404 페이지가 표시되어야 함
    const errorHeading = page.locator('h1');
    await expect(errorHeading).toContainText('404');
  });
});
