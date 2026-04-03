## ADDED Requirements
### Requirement: 문제 및 해설 표시
학습 화면에서 문제와 정답, 해설을 표시해야 한다(SHALL). 사용자는 정답 확인 버튼을 통해 해설을 토글할 수 있다.

#### Scenario: 문제 표시
- **WHEN** 사용자가 회차를 선택한다
- **THEN** 문제 목록이 표시된다

#### Scenario: 해설 확인
- **WHEN** 사용자가 정답 확인을 요청한다
- **THEN** 정답과 해설이 표시된다

### Requirement: Google Colab 연동
학습 화면에서 Google Colab 실습 링크를 제공해야 한다(SHALL). 버튼 클릭 시 새 탭으로 Colab 페이지가 열린다.

#### Scenario: Colab 링크 연결
- **WHEN** 사용자가 Colab 버튼을 클릭한다
- **THEN** Google Colab 페이지가 새 탭으로 열린다

### Requirement: 외부 강의 링크 연결
학습 화면에서 외부 유료 강의 플랫폼 링크를 제공해야 한다(SHALL).

#### Scenario: 해설 강의 수강
- **WHEN** 사용자가 "해설 강의 수강" 버튼을 클릭한다
- **THEN** 외부 강의 플랫폼 페이지가 새 탭으로 열린다

### Requirement: 데이터 JSON 기반 로딩
회차별 문제, 정답, 해설, Colab 링크, 강의 URL 등은 JSON 파일에서 동적으로 로딩되어야 한다(SHALL).

#### Scenario: 학습 데이터 로딩
- **WHEN** 학습 화면이 로드된다
- **THEN** 해당 회차의 데이터가 JSON 파일에서 비동기로 로딩된다
