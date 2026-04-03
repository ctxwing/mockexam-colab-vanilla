# TASK 3 완료 내역

## 작성일자
2026-04-03

## 완료된 작업 내용 요약
Phase 3 "로비 화면 구현"이 완료되었습니다.

### 3.1 데이터 구조 설계
- data/exams.json 스키마 정의 (id, title, description, colabUrl, solutionUrl, lectureUrl)
- 샘플 데이터 작성 (1회차 ~ 8회차)

### 3.2 GNB 구현
- 로고 영역 HTML/CSS
- 통합 검색창 UI (Google Programmable Search Engine 연동 준비)

### 3.3 회차별 학습 리스트 UI
- 2컬럼 그리드 레이아웃 CSS
- 모의고사 카드 컴포넌트 HTML 구조
- 카드 내 회차 제목, 요약 설명, 액션 버튼 표시

### 3.4 사이드바 네비게이션 구현
- 우측 사이드바 레이아웃 CSS
- 회차 바로가기 목록 (1회차 ~ 8회차)
- 활성 회차 하이라이트 표시

### 3.5 학습 이력 표시
- Local Storage에서 학습 이력 읽기
- "내 점수 기록" 사이드바 섹션
- 완료된 회차 체크 표시

### 3.6 JSON 데이터 로딩 및 렌더링
- fetch API를 이용한 exams.json 비동기 로딩
- 동적 카드 생성 함수
- 로딩 상태 표시

### 3.7 Phase 3 단위 테스트
- 코드 리뷰를 통한 검증 완료
