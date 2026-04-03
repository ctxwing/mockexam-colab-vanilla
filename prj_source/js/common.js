/* Common Utility Functions */

/**
 * DOM 요소 조회
 * @param {string} selector - CSS 선택자
 * @returns {HTMLElement|null}
 */
function $(selector) {
    return document.querySelector(selector);
}

/**
 * 여러 DOM 요소 조회
 * @param {string} selector - CSS 선택자
 * @returns {NodeList}
 */
function $$(selector) {
    return document.querySelectorAll(selector);
}

/**
 * 이벤트 리스너 등록
 * @param {string} event - 이벤트 이름
 * @param {Function} handler - 이벤트 핸들러
 * @param {string|HTMLElement} target - 대상 요소 또는 선택자
 */
function on(event, handler, target = document) {
    if (typeof target === 'string') {
        document.addEventListener(event, (e) => {
            const el = e.target.closest(target);
            if (el) handler.call(el, e);
        });
    } else {
        target.addEventListener(event, handler);
    }
}

/**
 * URL 파라미터 가져오기
 * @param {string} param - 파라미터 이름
 * @returns {string|null}
 */
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * 페이지 이동
 * @param {string} url - 이동할 URL
 */
function navigateTo(url) {
    window.location.href = url;
}

/**
 * 토스트 메시지 표시
 * @param {string} message - 표시할 메시지
 * @param {number} duration - 표시 시간 (ms)
 */
function showToast(message, duration = 2000) {
    const toast = $('#toast-message');
    if (toast) {
        toast.textContent = message;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, duration);
    }
}

/**
 * 로딩 상태 표시/숨김
 * @param {boolean} show - 표시 여부
 */
function setLoading(show) {
    const loading = $('#loading');
    const error = $('#error');
    if (loading) loading.style.display = show ? 'block' : 'none';
    if (error) error.style.display = 'none';
}

/**
 * 에러 상태 표시
 * @param {string} message - 에러 메시지
 */
function showError(message) {
    const loading = $('#loading');
    const error = $('#error');
    if (loading) loading.style.display = 'none';
    if (error) {
        error.textContent = message;
        error.style.display = 'block';
    }
}

/**
 * JSON 데이터 로드
 * @param {string} url - JSON 파일 URL
 * @returns {Promise<Object>}
 */
async function loadJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('JSON 로드 실패:', error);
        throw error;
    }
}

/**
 * 마크다운 텍스트를 HTML로 변환 (간단한 버전)
 * @param {string} markdown - 마크다운 텍스트
 * @returns {string}
 */
function markdownToHtml(markdown) {
    return markdown
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
        .replace(/`([^`]+)`/gim, '<code>$1</code>')
        .replace(/\n/gim, '<br>');
}

/**
 * 날짜 포맷팅
 * @param {Date} date - 날짜 객체
 * @param {string} format - 포맷 문자열 (기본: 'YYYY-MM-DD')
 * @returns {string}
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    return format
        .replace('YYYY', d.getFullYear())
        .replace('MM', String(d.getMonth() + 1).padStart(2, '0'))
        .replace('DD', String(d.getDate()).padStart(2, '0'));
}
