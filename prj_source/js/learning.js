/* Learning Module - 학습 화면 로직 */

/**
 * 학습 화면 초기화
 */
async function initLearning() {
    // 인증 확인
    if (!requireAuth()) return;

    // URL 파라미터에서 회차 ID 추출
    const examId = parseInt(getUrlParam('exam'));

    if (!examId) {
        showError('회차 정보가 없습니다.');
        setTimeout(() => {
            window.location.href = 'lobby.html';
        }, 2000);
        return;
    }

    // 로딩 상태 표시
    setLoading(true);

    try {
        // 시험 데이터 로드
        const data = await loadJson('../data/exams.json');
        const exam = data.exams?.find(e => e.id === examId);

        if (!exam) {
            showError('해당 회차의 데이터를 찾을 수 없습니다.');
            setTimeout(() => {
                window.location.href = 'lobby.html';
            }, 2000);
            return;
        }

        // 화면 렌더링
        renderLearningScreen(exam);

        // 로딩 숨김
        setLoading(false);
    } catch (error) {
        showError('학습 데이터를 불러오는 중 오류가 발생했습니다.');
        console.error('데이터 로드 실패:', error);
    }

    // 액션 버튼 이벤트
    const solutionToggleBtn = document.getElementById('solution-toggle-btn');
    if (solutionToggleBtn) {
        solutionToggleBtn.addEventListener('click', toggleSolution);
    }

    // 뒤로가기 버튼
    const backBtn = document.querySelector('.btn-back');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'lobby.html';
        });
    }
}

/**
 * 학습 화면 렌더링
 * @param {Object} exam - 시험 데이터
 */
function renderLearningScreen(exam) {
    // 제목 설정
    const examTitle = document.getElementById('exam-title');
    if (examTitle) {
        examTitle.textContent = exam.title;
    }

    // Colab 링크 설정
    const colabBtn = document.getElementById('colab-btn');
    if (colabBtn) {
        colabBtn.href = exam.colabUrl;
    }

    // 강의 링크 설정
    const lectureBtn = document.getElementById('lecture-btn');
    if (lectureBtn) {
        lectureBtn.href = exam.lectureUrl;
    }

    // 문제 목록 렌더링 (샘플)
    const problemsList = document.getElementById('problems-list');
    if (problemsList) {
        problemsList.innerHTML = `
            <div class="problem-item">
                <h3>문제 1</h3>
                <p>${exam.description}에 대한 문제입니다.</p>
                <pre><code># 예제 코드
import numpy as np
import pandas as pd

# 데이터 생성
data = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})
print(data)
</code></pre>
            </div>
        `;
    }

    // 해설 내용 로드
    loadSolution(exam.solutionUrl);
}

/**
 * 해설 파일 로드
 * @param {string} solutionUrl - 해설 파일 URL
 */
async function loadSolution(solutionUrl) {
    try {
        const response = await fetch(solutionUrl);
        if (!response.ok) {
            throw new Error('해설 파일을 찾을 수 없습니다.');
        }
        const content = await response.text();

        const solutionContent = document.getElementById('solution-content');
        if (solutionContent) {
            solutionContent.innerHTML = markdownToHtml(content);
        }
    } catch (error) {
        console.error('해설 로드 실패:', error);
        const solutionContent = document.getElementById('solution-content');
        if (solutionContent) {
            solutionContent.innerHTML = '<p>해설을 불러오는 중 오류가 발생했습니다.</p>';
        }
    }
}

/**
 * 해설 토글
 */
function toggleSolution() {
    const solutionSection = document.getElementById('solution-section');
    const toggleBtn = document.getElementById('solution-toggle-btn');

    if (solutionSection && toggleBtn) {
        const isVisible = solutionSection.style.display !== 'none';
        solutionSection.style.display = isVisible ? 'none' : 'block';
        toggleBtn.textContent = isVisible ? '정답 및 해설 보기' : '정답 및 해설 숨기기';
    }
}

// DOM 로드 완료 시 학습 화면 초기화
document.addEventListener('DOMContentLoaded', initLearning);
