/* Lobby Module - 로비 화면 로직 */

/**
 * 로비 화면 초기화
 */
async function initLobby() {
    // 인증 확인
    if (!requireAuth()) return;

    // 로딩 상태 표시
    setLoading(true);

    try {
        // 시험 데이터 로드
        const data = await loadJson('../data/exams.json');
        const exams = data.exams || [];

        // 학습 이력 로드
        const learningHistory = getAllLearningHistory();

        // 카드 렌더링
        renderExamCards(exams, learningHistory);

        // 사이드바 네비게이션 렌더링
        renderSidebarNav(exams, learningHistory);

        // 학습 이력 렌더링
        renderLearningHistory(learningHistory);

        // 로딩 숨김
        setLoading(false);
    } catch (error) {
        showError('학습 데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('데이터 로드 실패:', error);
    }

    // 로그아웃 버튼 이벤트
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('로그아웃하시겠습니까?')) {
                clearAuthToken();
                window.location.href = 'auth.html';
            }
        });
    }

    // 검색창 이벤트 (Google Programmable Search Engine 연동 준비)
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                // Google 검색으로 이동
                const query = searchInput.value.trim();
                if (query) {
                    window.open(`https://www.google.com/cse/publicurl?cx=YOUR_CX_ID&q=${encodeURIComponent(query)}`, '_blank');
                }
            }
        });
    }
}

/**
 * 시험 카드 렌더링
 * @param {Array} exams - 시험 데이터 배열
 * @param {Object} learningHistory - 학습 이력
 */
function renderExamCards(exams, learningHistory) {
    const examCardsContainer = document.getElementById('exam-cards');
    if (!examCardsContainer) return;

    examCardsContainer.innerHTML = exams.map(exam => {
        const history = learningHistory[exam.id];
        const isCompleted = history && history.completed;
        const score = history ? history.score : null;

        return `
            <article class="exam-card" data-exam-id="${exam.id}">
                <h3>${exam.title}</h3>
                <p>${exam.description}</p>
                ${isCompleted ? `<span class="completed-badge">✓ 완료 (${score}점)</span>` : ''}
                <div class="exam-card-actions">
                    <a href="${exam.colabUrl}" target="_blank" class="btn btn-primary">Google Colab 실습</a>
                    <a href="learning.html?exam=${exam.id}" class="btn btn-secondary">학습 시작</a>
                    <a href="solution.html?exam=${exam.id}" class="btn btn-ghost">정답 및 해설</a>
                </div>
            </article>
        `;
    }).join('');
}

/**
 * 사이드바 네비게이션 렌더링
 * @param {Array} exams - 시험 데이터 배열
 * @param {Object} learningHistory - 학습 이력
 */
function renderSidebarNav(exams, learningHistory) {
    const quickNav = document.getElementById('quick-nav');
    if (!quickNav) return;

    quickNav.innerHTML = exams.map(exam => {
        const history = learningHistory[exam.id];
        const isCompleted = history && history.completed;
        return `
            <li class="${isCompleted ? 'completed' : ''}">
                <a href="learning.html?exam=${exam.id}">
                    ${exam.title} ${isCompleted ? '✓' : ''}
                </a>
            </li>
        `;
    }).join('');
}

/**
 * 학습 이력 렌더링
 * @param {Object} learningHistory - 학습 이력
 */
function renderLearningHistory(learningHistory) {
    const scoreHistory = document.getElementById('score-history');
    if (!scoreHistory) return;

    const entries = Object.entries(learningHistory);

    if (entries.length === 0) {
        scoreHistory.innerHTML = '<li>아직 학습 기록이 없습니다.</li>';
        return;
    }

    scoreHistory.innerHTML = entries.map(([examId, history]) => {
        return `
            <li>
                <span>${history.title || `${examId}회차`}</span>
                <span class="score">${history.score ? `${history.score}점` : '진행중'}</span>
            </li>
        `;
    }).join('');
}

// DOM 로드 완료 시 로비 초기화
document.addEventListener('DOMContentLoaded', initLobby);
