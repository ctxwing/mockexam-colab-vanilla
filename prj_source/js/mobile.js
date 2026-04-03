/* Mobile Module - 모바일 안내 화면 로직 */

/**
 * 모바일 안내 화면 초기화
 */
function initMobileIntro() {
    // URL 복사 버튼
    const copyUrlBtn = document.getElementById('copy-url-btn');
    if (copyUrlBtn) {
        copyUrlBtn.addEventListener('click', copyCurrentUrl);
    }

    // 카카오톡 공유 버튼
    const kakaoShareBtn = document.getElementById('kakao-share-btn');
    if (kakaoShareBtn) {
        kakaoShareBtn.addEventListener('click', shareToKakao);
    }

    // Kakao SDK 초기화
    initKakaoSdk();
}

/**
 * 현재 페이지 URL 복사
 */
async function copyCurrentUrl() {
    const url = window.location.href.replace('pages/mobile-intro.html', '');

    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(url);
            showToast('URL이 클립보드에 복사되었습니다.');
        } else {
            // 구형 브라우저 폴백
            fallbackCopyTextToClipboard(url);
        }
    } catch (error) {
        console.error('URL 복사 실패:', error);
        showToast('URL 복사에 실패했습니다.');
    }
}

/**
 * 구형 브라우저용 URL 복사 (폴백)
 * @param {string} text - 복사할 텍스트
 */
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast('URL이 클립보드에 복사되었습니다.');
        } else {
            showToast('URL 복사에 실패했습니다.');
        }
    } catch (err) {
        console.error('폴백 복사 실패:', err);
        showToast('URL 복사에 실패했습니다.');
    }

    document.body.removeChild(textArea);
}

/**
 * Kakao SDK 초기화
 */
function initKakaoSdk() {
    // Kakao SDK가 로드되었는지 확인
    if (typeof Kakao !== 'undefined') {
        // 실제 앱 키로 초기화 필요 (현재는 샘플 키)
        // Kakao.init('YOUR_APP_KEY');
        console.log('Kakao SDK 준비 (앱 키 설정 필요)');
    }
}

/**
 * 카카오톡 공유
 */
function shareToKakao() {
    if (typeof Kakao === 'undefined') {
        showToast('카카오톡 공유 기능을 사용할 수 없습니다.');
        return;
    }

    try {
        Kakao.Share.sendDefault({
            objectType: 'feed',
            content: {
                title: 'AICE 모의고사',
                description: 'Python 모의고사 학습 플랫폼',
                imageUrl: window.location.origin + '/assets/images/og-image.png',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href
                }
            },
            buttons: [
                {
                    title: '지금 시작하기',
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href
                    }
                }
            ]
        });
    } catch (error) {
        console.error('카카오톡 공유 실패:', error);
        showToast('카카오톡 공유에 실패했습니다.');
    }
}

// DOM 로드 완료 시 모바일 안내 화면 초기화
document.addEventListener('DOMContentLoaded', initMobileIntro);
