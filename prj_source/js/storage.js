/* Local Storage Wrapper Module */

const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    AUTH_REMEMBER: 'auth_remember',
    LEARNING_HISTORY: 'learning_history',
    EXAM_PROGRESS: 'exam_progress'
};

/**
 * Local Storage에 데이터 저장
 * @param {string} key - 저장 키
 * @param {*} value - 저장할 값
 */
function setStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Local Storage 저장 실패:', error);
        return false;
    }
}

/**
 * Local Storage에서 데이터 조회
 * @param {string} key - 조회 키
 * @returns {*}
 */
function getStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Local Storage 조회 실패:', error);
        return null;
    }
}

/**
 * Local Storage에서 데이터 삭제
 * @param {string} key - 삭제 키
 */
function removeStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Local Storage 삭제 실패:', error);
        return false;
    }
}

/**
 * 인증 토큰 저장
 * @param {string} token - 인증 토큰
 * @param {boolean} remember - 인증 상태 유지 여부
 */
function saveAuthToken(token, remember = false) {
    setStorage(STORAGE_KEYS.AUTH_TOKEN, token);
    setStorage(STORAGE_KEYS.AUTH_REMEMBER, remember);

    if (!remember) {
        // 세션 기반: 브라우저 종료 시 삭제되도록 설정
        // 실제로는 sessionStorage 사용 가능하지만, 여기서는 localStorage에 플래그로 관리
    }
}

/**
 * 인증 토큰 조회
 * @returns {string|null}
 */
function getAuthToken() {
    return getStorage(STORAGE_KEYS.AUTH_TOKEN);
}

/**
 * 인증 상태 확인
 * @returns {boolean}
 */
function isAuthenticated() {
    return !!getAuthToken();
}

/**
 * 인증 토큰 삭제 (로그아웃)
 */
function clearAuthToken() {
    removeStorage(STORAGE_KEYS.AUTH_TOKEN);
    removeStorage(STORAGE_KEYS.AUTH_REMEMBER);
}

/**
 * 학습 이력 저장
 * @param {number} examId - 회차 ID
 * @param {Object} data - 학습 데이터 (점수, 완료 여부 등)
 */
function saveLearningHistory(examId, data) {
    const history = getStorage(STORAGE_KEYS.LEARNING_HISTORY) || {};
    history[examId] = {
        ...data,
        completedAt: new Date().toISOString()
    };
    setStorage(STORAGE_KEYS.LEARNING_HISTORY, history);
}

/**
 * 학습 이력 조회
 * @param {number} examId - 회차 ID
 * @returns {Object|null}
 */
function getLearningHistory(examId) {
    const history = getStorage(STORAGE_KEYS.LEARNING_HISTORY) || {};
    return examId ? history[examId] : history;
}

/**
 * 모든 학습 이력 조회
 * @returns {Object}
 */
function getAllLearningHistory() {
    return getStorage(STORAGE_KEYS.LEARNING_HISTORY) || {};
}

/**
 * 학습 진행 상태 저장
 * @param {number} examId - 회차 ID
 * @param {Object} progress - 진행 상태
 */
function saveExamProgress(examId, progress) {
    const progressData = getStorage(STORAGE_KEYS.EXAM_PROGRESS) || {};
    progressData[examId] = progress;
    setStorage(STORAGE_KEYS.EXAM_PROGRESS, progressData);
}

/**
 * 학습 진행 상태 조회
 * @param {number} examId - 회차 ID
 * @returns {Object|null}
 */
function getExamProgress(examId) {
    const progressData = getStorage(STORAGE_KEYS.EXAM_PROGRESS) || {};
    return examId ? progressData[examId] : progressData;
}
