/* Device Detection Module */

/**
 * 모바일 기기 여부 확인
 * @returns {boolean}
 */
function isMobile() {
    // 화면 너비 확인
    if (window.innerWidth <= 768) {
        return true;
    }

    // 사용자 에이전트 확인
    const ua = navigator.userAgent.toLowerCase();
    const mobileKeywords = [
        'android',
        'webos',
        'iphone',
        'ipad',
        'ipod',
        'blackberry',
        'windows phone',
        'mobile'
    ];

    return mobileKeywords.some(keyword => ua.includes(keyword));
}

/**
 * 디바이스에 따른 페이지 리다이렉트
 * @param {string} mobileUrl - 모바일 리다이렉트 URL
 * @param {string} pcUrl - PC 리다이렉트 URL
 */
function redirectByDevice(mobileUrl = 'pages/mobile-intro.html', pcUrl = 'pages/auth.html') {
    if (isMobile()) {
        window.location.href = mobileUrl;
    } else {
        window.location.href = pcUrl;
    }
}

/**
 * 인증 상태 확인 및 리다이렉트
 * @param {string} redirectUrl - 인증되지 않았을 때 리다이렉트 URL
 */
function requireAuth(redirectUrl = 'pages/auth.html') {
    const authToken = localStorage.getItem('auth_token');
    if (!authToken) {
        window.location.href = redirectUrl;
        return false;
    }
    return true;
}

/**
 * 이미 인증된 사용자를 로비로 리다이렉트
 */
function redirectIfAuthenticated() {
    const authToken = localStorage.getItem('auth_token');
    if (authToken) {
        window.location.href = 'pages/lobby.html';
        return true;
    }
    return false;
}

// index.html에서 자동 리다이렉트 실행
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    document.addEventListener('DOMContentLoaded', () => {
        redirectByDevice();
    });
}
