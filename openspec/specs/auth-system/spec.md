# auth-system Specification

## Purpose
TBD - created by archiving change add-initial-system-and-auth. Update Purpose after archive.
## Requirements
### Requirement: 도서 인증 코드 검증
시스템은 사용자가 입력한 **16자리(XXXX-XXXX-XXXX-XXXX)**의 난수 코드가 유효한지 검증하고 인증 상태를 부여해야 한다 (SHALL). 인증 성공 시 브라우저 쿠키를 통해 세션을 유지하며, 미인증 사용자의 대시보드 접근을 제한한다.

#### Scenario: 유효한 코드 입력 시 인증 성공 및 쿠키 저장
- **WHEN** 사용자가 도서에 기재된 유효한 인증 코드를 입력함
- **THEN** 인증 성공 메시지를 노출하고, `auth_token` 쿠키를 설정한 뒤 모의고사 대시보드로 자동 이동함

#### Scenario: 미인증 사용자 접근 차단
- **WHEN** 사용자가 `/dashboard` 경로로 직접 접속하려 함 (쿠키 없음)
- **THEN** 시스템은 해당 사용자를 `/auth` 페이지로 리다이렉트함

#### Scenario: 잘못된 코드 입력 시 오류 노출
- **WHEN** 사용자가 유효하지 않은 코드를 입력함
- **THEN** "올바르지 않은 인증 코드입니다"라는 에러 메시지를 노출하고 재입력을 요구함

#### Scenario: 대소문자 무시 검증
- **WHEN** 사용자가 소문자로 구성된 유효 코드를 대문자로 입력함
- **THEN** 시스템은 이를 유효한 코드로 인식하여 인증을 승인함

#### Scenario: 입력 시 자동 하이픈(-) 삽입
- **WHEN** 사용자가 숫자나 문자를 연속해서 입력함
- **THEN** 시스템은 4자리마다 자동으로 '-' 부호를 삽입하여 시각적 편의성을 제공함

### Requirement: 로그아웃 기능
시스템은 인증된 사용자가 세션을 종료하고 초기 상태로 돌아갈 수 있는 로그아웃 기능을 제공해야 한다(SHALL).

#### Scenario: 로그아웃 시 세션 해제
- **WHEN** 사용자가 대시보드에서 '로그아웃' 버튼을 클릭함
- **THEN** 서버 측 쿠키가 삭제되고 사용자는 메인 페이지('/')로 리다이렉트됨

