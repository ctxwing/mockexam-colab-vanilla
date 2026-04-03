# lobby Specification

## Purpose
TBD - created by archiving change v2-01-migrate-to-vanilla-js. Update Purpose after archive.
## Requirements
### Requirement: 회차별 학습 리스트 노출
인증된 사용자는 회차별(1~N회) 학습 리스트를 볼 수 있어야 한다(SHALL). 각 회차 카드는 제목, 요약 설명, 액션 버튼을 포함한다.

#### Scenario: 학습 리스트 표시
- **WHEN** 사용자가 로비 화면에 진입한다
- **THEN** 회차별 학습 리스트가 2컬럼 그리드로 표시된다

#### Scenario: 학습 진행 상태 표시
- **WHEN** 사용자가 이전에 학습을 진행했다
- **THEN** 해당 회차의 진행 상태가 Local Storage에서 불러와 표시된다

### Requirement: 회차 네비게이션 사이드바
사용자는 사이드바의 퀵 네비게이션을 통해 특정 회차로 빠르게 이동할 수 있어야 한다(SHALL). 사이드바에는 학습 이력(내 점수 기록)도 표시된다.

#### Scenario: 사이드바 네비게이션 표시
- **WHEN** 로비 화면이 로드된다
- **THEN** 우측 사이드바에 1회차부터 N회차까지의 퀵 네비게이션이 표시된다

#### Scenario: 회차 선택
- **WHEN** 사용자가 사이드바에서 특정 회차를 클릭한다
- **THEN** 해당 회차의 학습 화면으로 이동한다

#### Scenario: 학습 이력 표시
- **WHEN** 사용자가 이전에 학습을 완료했다
- **THEN** 사이드바에 해당 회차의 점수 기록이 Local Storage에서 불러와 표시된다

#### Scenario: 학습 이력 표시
- **WHEN** 사용자가 이전에 학습을 완료했다
- **THEN** 사이드바에 해당 회차의 점수 기록이 Local Storage에서 불러와 표시된다

### Requirement: 통합 검색 기능
사용자는 Google Programmable Search Engine을 통해 허용된 라이브러리(NumPy, pandas 등)의 공식 문서를 검색할 수 있어야 한다(SHALL).

#### Scenario: 라이브러리 문서 검색
- **WHEN** 사용자가 검색창에 키워드를 입력한다
- **THEN** Google Programmable Search Engine 결과가 표시된다

