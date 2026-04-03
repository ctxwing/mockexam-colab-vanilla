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

            // 숫자만 허용
            if (!/^\d*$/.test(value)) {
                e.target.value = '';
                return;
            }

            if (value.length === 1) {
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
            const pasteData = e.clipboardData.getData('text').replace(/\D/g, '');

            if (pasteData.length === 8) {
                // 8자리 숫자를 각 입력란에 분배
                pasteData.split('').forEach((char, i) => {
                    if (otpInputs[i]) otpInputs[i].value = char;
                });
                // 첫 번째 입력란에 포커스 (일관성 유지)
                otpInputs[0].focus();
            } else if (pasteData.length > 0) {
                // 8자리가 아닌 경우 입력란에 순차적으로 입력
                const startIndex = index;
                for (let i = 0; i < pasteData.length && startIndex + i < otpInputs.length; i++) {
                    otpInputs[startIndex + i].value = pasteData[i];
                }
                // 마지막 입력된 다음 칸으로 포커스
                const nextIndex = Math.min(startIndex + pasteData.length, otpInputs.length - 1);
                otpInputs[nextIndex].focus();
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
 * OTP 검증
 * @param {string} otp - 8자리 OTP 코드
 * @returns {Promise<boolean>}
 */
async function verifyOtp(otp) {
    try {
        const otpList = await loadJson('../data/otp-list.json');
        // 대소문자 무시하고 비교
        const normalizedOtp = otp.toLowerCase();
        return otpList.codes?.some(code => code.toLowerCase() === normalizedOtp) || false;
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
