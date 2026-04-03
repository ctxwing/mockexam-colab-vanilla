/* Admin Module - 시험 데이터 CRUD 관리 */

// 전역 상태
let examsData = [];
let nextId = 1;

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', initAdmin);

/**
 * 관리자 페이지 초기화
 */
async function initAdmin() {
    // 로컬 스토리지에서 데이터 로드
    loadFromStorage();

    // 이벤트 리스너 등록
    setupEventListeners();

    // 렌더링
    renderExamList();
}

/**
 * 로컬 스토리지에서 데이터 로드
 */
function loadFromStorage() {
    const stored = localStorage.getItem('adminExamsData');
    if (stored) {
        try {
            const data = JSON.parse(stored);
            examsData = data.exams || [];
        } catch (error) {
            console.error('데이터 로드 실패:', error);
            examsData = [];
        }
    }

    // 다음 ID 계산
    if (examsData.length > 0) {
        const maxId = Math.max(...examsData.map(e => e.id));
        nextId = maxId + 1;
    }
}

/**
 * 로컬 스토리지에 데이터 저장
 */
function saveToStorage() {
    localStorage.setItem('adminExamsData', JSON.stringify({ exams: examsData }));
}

/**
 * 이벤트 리스너 설정
 */
function setupEventListeners() {
    // 추가 버튼
    document.getElementById('add-btn').addEventListener('click', openAddModal);

    // 다운로드 버튼
    document.getElementById('download-btn').addEventListener('click', downloadData);

    // 업로드 버튼
    document.getElementById('upload-btn').addEventListener('click', () => {
        document.getElementById('file-input').click();
    });
    document.getElementById('file-input').addEventListener('change', handleFileUpload);

    // 저장 버튼
    document.getElementById('save-btn').addEventListener('click', downloadData);

    // 모달 닫기
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-cancel').addEventListener('click', closeModal);

    // 폼 제출
    document.getElementById('exam-form').addEventListener('submit', handleFormSubmit);
}

/**
 * 시험 목록 렌더링
 */
function renderExamList() {
    const container = document.getElementById('exam-list-container');

    if (examsData.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>등록된 시험이 없습니다. [+ 시험 추가] 버튼을 클릭하여 추가하세요.</p>
            </div>
        `;
        return;
    }

    // ID 순서대로 정렬
    const sortedExams = [...examsData].sort((a, b) => a.id - b.id);

    container.innerHTML = sortedExams.map(exam => `
        <div class="exam-item ${exam.isActive === false ? 'inactive' : ''}">
            <div class="exam-id">${exam.id}</div>
            <div class="exam-info">
                <div class="exam-title">${escapeHtml(exam.title)}</div>
                <div class="exam-description">${escapeHtml(exam.description)}</div>
                <div class="exam-meta">
                    ${exam.isActive !== false ? '<span class="badge badge-active">활성</span>' : '<span class="badge badge-inactive">비활성</span>'}
                    <span>📊 ${exam.solutionUrl}</span>
                    ${exam.lectureUrl ? `<span>📚 <a href="${exam.lectureUrl}" target="_blank">강의</a></span>` : ''}
                </div>
            </div>
            <div class="exam-actions">
                <button class="btn btn-secondary" onclick="window.open('${escapeHtml(exam.colabUrl)}', '_blank')">Colab</button>
                <button class="btn btn-ghost" onclick="editExam(${exam.id})">편집</button>
                <button class="btn btn-ghost" onclick="deleteExam(${exam.id})">삭제</button>
            </div>
        </div>
    `).join('');
}

/**
 * HTML 이스케이프
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 추가 모달 열기
 */
function openAddModal() {
    document.getElementById('modal-title').textContent = '시험 추가';
    document.getElementById('exam-form').reset();
    document.getElementById('exam-id').value = '';
    document.getElementById('exam-active').checked = true;
    document.getElementById('edit-modal').style.display = 'flex';
}

/**
 * 편집 모달 열기
 */
function editExam(id) {
    const exam = examsData.find(e => e.id === id);
    if (!exam) return;

    document.getElementById('modal-title').textContent = '시험 편집';
    document.getElementById('exam-id').value = exam.id;
    document.getElementById('exam-title').value = exam.title;
    document.getElementById('exam-description').value = exam.description;
    document.getElementById('exam-colab').value = exam.colabUrl;
    document.getElementById('exam-solution').value = exam.solutionUrl;
    document.getElementById('exam-lecture').value = exam.lectureUrl || '';
    document.getElementById('exam-active').checked = exam.isActive !== false;

    document.getElementById('edit-modal').style.display = 'flex';
}

/**
 * 모달 닫기
 */
function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

/**
 * 폼 제출 처리
 */
function handleFormSubmit(e) {
    e.preventDefault();

    const idValue = document.getElementById('exam-id').value;
    const isEdit = idValue !== '';

    const examData = {
        id: isEdit ? parseInt(idValue) : nextId++,
        title: document.getElementById('exam-title').value.trim(),
        description: document.getElementById('exam-description').value.trim(),
        colabUrl: document.getElementById('exam-colab').value.trim(),
        solutionUrl: document.getElementById('exam-solution').value.trim(),
        lectureUrl: document.getElementById('exam-lecture').value.trim() || '',
        isActive: document.getElementById('exam-active').checked
    };

    if (isEdit) {
        // 기존 항목 업데이트
        const index = examsData.findIndex(e => e.id === examData.id);
        if (index !== -1) {
            examsData[index] = examData;
        }
    } else {
        // 새 항목 추가
        examsData.push(examData);
    }

    // 저장 및 렌더링
    saveToStorage();
    renderExamList();
    closeModal();

    // 안내
    showToast(isEdit ? '수정되었습니다.' : '추가되었습니다.');
}

/**
 * 시험 삭제
 */
function deleteExam(id) {
    const exam = examsData.find(e => e.id === id);
    if (!exam) return;

    if (!confirm(`'${exam.title}' 시험을 삭제하시겠습니까?`)) {
        return;
    }

    examsData = examsData.filter(e => e.id !== id);
    saveToStorage();
    renderExamList();

    // 다음 ID 재계산 (삭제된 ID 재사용하지 않음)
    if (examsData.length > 0) {
        const maxId = Math.max(...examsData.map(e => e.id));
        nextId = maxId + 1;
    } else {
        nextId = 1;
    }

    showToast('삭제되었습니다.');
}

/**
 * 데이터 다운로드 (JSON 파일)
 */
function downloadData() {
    if (examsData.length === 0) {
        alert('저장할 데이터가 없습니다.');
        return;
    }

    // exams-source.json 형식으로 생성
    const outputData = {
        _comment: "관리자 전용 시험 데이터 소스 파일. 수정 후 'node scripts/build-exams.js' 실행하여 exams.json을 생성하세요.",
        exams: examsData
    };

    const blob = new Blob([JSON.stringify(outputData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exams-source.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('다운로드되었습니다. prj_source/data/ 폴더에 저장 후 build-exams.js를 실행하세요.');
}

/**
 * 파일 업로드 처리
 */
function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);

            if (!data.exams || !Array.isArray(data.exams)) {
                throw new Error('유효하지 않은 파일 형식입니다.');
            }

            examsData = data.exams;

            // 다음 ID 재계산
            if (examsData.length > 0) {
                const maxId = Math.max(...examsData.map(e => e.id));
                nextId = maxId + 1;
            } else {
                nextId = 1;
            }

            saveToStorage();
            renderExamList();
            showToast('파일이 로드되었습니다.');
        } catch (error) {
            alert('파일 로드 실패: ' + error.message);
        }
    };
    reader.readAsText(file);

    // 파일 입력 초기화
    e.target.value = '';
}

/**
 * 토스트 메시지 표시
 */
function showToast(message) {
    // 기존 토스트 제거
    const existing = document.querySelector('.toast-message');
    if (existing) {
        existing.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(10px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
