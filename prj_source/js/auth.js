/* Auth Module - OTP 인증 로직 */

/**
 * OTP 입력 필드 자동 포커스 및 검증
 */
function initOtpInput() {
    const otpInputs = document.querySelectorAll('.otp-input');
    const errorMessage = document.getElementById('error-message');
    const otpForm = document.getElementById('otp-form');

    if (!otpInputs.length || !otpForm) return;

    // 각 입력 필드에 이벤트 리스너 등록
    otpInputs.forEach((input, index) => {
        // 입력 이벤트
        input.addEventListener('input', (e) => {
            const value = e.target.value;

            // 영문+숫자만 허용하고 자동으로 대문자 변환
            const filtered = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
            if (filtered !== value) {
                e.target.value = filtered;
                return;
            }

            if (filtered.length === 1) {
                // 다음 입력 필드로 포커스 이동
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });

        // 키다운 이벤트 (백스페이스 처리)
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                // 현재 입력란이 비어있으면 이전 입력란으로 포커스
                otpInputs[index - 1].focus();
            }
        });

        // 포커스 이벤트 (전체 선택)
        input.addEventListener('focus', (e) => {
            e.target.select();
        });

        // 붙여넣기 이벤트 처리
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            // 하이픈 제거하고 영문+숫자만 추출 후 대문자 변환
            const pasteData = e.clipboardData.getData('text')
                .replace(/[^a-zA-Z0-9]/g, '')
                .toUpperCase();

            if (pasteData.length > 0) {
                // 항상 첫 번째 입력란부터 순차적으로 분배
                pasteData.split('').forEach((char, i) => {
                    if (i < otpInputs.length) {
                        otpInputs[i].value = char;
                    }
                });
                // 마지막으로 입력된 칸에 포커스 (또는 모두 채워졌으면 마지막 칸)
                const lastIndex = Math.min(pasteData.length, otpInputs.length) - 1;
                otpInputs[Math.max(0, lastIndex)].focus();
            }
        });
    });

    // 폼 제출 이벤트
    otpForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // OTP 값 수집
        const otpValues = Array.from(otpInputs).map(input => input.value).join('');

        if (otpValues.length !== 8) {
            showError('8자리 숫자를 모두 입력해주세요.');
            return;
        }

        // OTP 검증
        const isValid = await verifyOtp(otpValues);

        if (isValid) {
            // 인증 상태 저장
            const rememberAuth = document.getElementById('remember-auth')?.checked || false;
            saveAuthToken(otpValues, rememberAuth);

            // 로비로 이동
            window.location.href = 'lobby.html';
        } else {
            showError('유효하지 않은 인증 코드입니다. 다시 입력해주세요.');
            // 입력 필드 초기화
            otpInputs.forEach(input => input.value = '');
            otpInputs[0].focus();
        }
    });
}

/**
 * 문자열 SHA-256 해시 생성 (브라우저 네이티브 Web Crypto API)
 * @param {string} text - 해싱할 텍스트
 * @returns {Promise<string>}
 */
async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text.toUpperCase());
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * OTP 검증 (SHA-256 해시 비교)
 * @param {string} otp - 8자리 OTP 코드
 * @returns {Promise<boolean>}
 */
async function verifyOtp(otp) {
    try {
        const otpList = await loadJson('../data/otp-list.json');
        // 입력된 OTP의 해시 생성
        const otpHash = await sha256(otp);
        // 저장된 해시 목록과 비교
        return otpList.hashes?.includes(otpHash) || false;
    } catch (error) {
        console.error('OTP 검증 실패:', error);
        return false;
    }
}

/**
 * 오류 메시지 표시
 * @param {string} message - 오류 메시지
 */
function showError(message) {
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';

        // 3초 후 자동 숨김
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
}

// DOM 로드 완료 시 OTP 입력 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 이미 인증된 사용자는 로비로 리다이렉트
    if (redirectIfAuthenticated()) return;

    initOtpInput();
});
