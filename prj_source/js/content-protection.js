/* Content Protection Module - 콘텐츠 보호 기능 */

/**
 * 우클릭 방지
 */
function disableRightClick() {
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
}

/**
 * 텍스트 드래그 방지
 */
function disableTextSelection() {
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';
}

/**
 * 개발자 도구 열기 방지 (선택적)
 */
function disableDevTools() {
    // F12 방지
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+I 방지
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+J 방지
        if (e.ctrlKey && e.shiftKey && e.key === 'J') {
            e.preventDefault();
            return false;
        }

        // Ctrl+U 방지 (소스 보기)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }
    });
}

/**
 * 인쇄 방지
 */
function disablePrint() {
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            body {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * 콘텐츠 보호 기능 활성화
 * @param {Object} options - 보호 옵션
 */
function enableContentProtection(options = {}) {
    const {
        rightClick = true,
        textSelection = true,
        devTools = false,  // 기본적으로 비활성화
        print = true
    } = options;

    if (rightClick) disableRightClick();
    if (textSelection) disableTextSelection();
    if (devTools) disableDevTools();
    if (print) disablePrint();
}

// DOM 로드 완료 시 콘텐츠 보호 활성화
document.addEventListener('DOMContentLoaded', () => {
    // 학습 화면과 인증 화면에서 콘텐츠 보호 활성화
    if (window.location.pathname.includes('learning.html') ||
        window.location.pathname.includes('auth.html')) {
        enableContentProtection({
            rightClick: true,
            textSelection: true,
            devTools: false,  // 사용자 편의를 위해 기본적으로 비활성화
            print: true
        });
    }
});
