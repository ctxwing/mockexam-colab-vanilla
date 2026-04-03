# auth Specification

## Purpose
TBD - created by archiving change v2-01-migrate-to-vanilla-js. Update Purpose after archive.
## Requirements
### Requirement: OTP 기반 도서 인증
사용자는 도서에 포함된 8자리 난수(OTP)를 입력하여 인증해야 한다(SHALL). 시스템은 미리 정의된 OTP 목록과 비교하여 유효성을 검증한다. 인증 폼은 카드 타입의 중앙 정렬 레이아웃으로 구성되며, 각 자리별 개별 Input Box를 제공한다.

#### Scenario: OTP 입력 성공
- **WHEN** 사용자가 유효한 8자리 OTP를 입력한다
- **THEN** 인증이 성공하고 로비 화면으로 이동한다
- **AND** 인증 상태를 Local Storage에 저장한다

#### Scenario: OTP 입력 실패
- **WHEN** 사용자가 유효하지 않은 OTP를 입력한다
- **THEN** 오류 메시지를 표시하고 재입력을 요청한다

#### Scenario: OTP 입력 형식
- **WHEN** 사용자가 OTP를 입력한다
- **THEN** 각 자리별 개별 Input Box에 자동으로 포커스가 이동한다

#### Scenario: 인증 상태 유지 옵션
- **WHEN** 사용자가 "이 브라우저에서 인증 상태 유지" 체크박스를 선택한 후 인증한다
- **THEN** 브라우저 세션 종료 후에도 인증 상태가 유지된다

#### Scenario: 인증 상태 유지 옵션
- **WHEN** 사용자가 "이 브라우저에서 인증 상태 유지" 체크박스를 선택한 후 인증한다
- **THEN** 브라우저 세션 종료 후에도 인증 상태가 유지된다

### Requirement: Local Storage 인증 상태 유지
인증된 사용자의 상태는 Local Storage에 저장되어 페이지 새로고침 후에도 유지되어야 한다(SHALL).

#### Scenario: 인증 상태 유지
- **WHEN** 사용자가 인증 후 페이지를 새로고침한다
- **THEN** 인증 상태가 유지되어 로비 화면이 표시된다

#### Scenario: 인증 상태 해제 (로그아웃)
- **WHEN** 사용자가 로그아웃을 요청한다
- **THEN** Local Storage의 인증 정보가 삭제되고 인증 페이지로 이동한다

#### Scenario: 인증 상태 유지 옵션
- **WHEN** 사용자가 "이 브라우저에서 인증 상태 유지" 체크박스를 선택한다
- **THEN** 브라우저 세션 종료 후에도 인증 상태가 유지된다

