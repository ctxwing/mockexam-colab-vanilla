# 문항데이터 구조 및 비교 분석

## 개요

본 문서는 V1 프로젝트(`project_source_V1`)와 V2 프로젝트(`prj_source`)의 문항 데이터 구조를 비교 분석하고, V2 프로젝트에서 사용하는 데이터 항목을 정리합니다.

---

## 1. V1 프로젝트 데이터 구조 (Next.js 기반)

### 1.1 데이터 파일 위치
- **코드**: `project_source_V1/webfront/lib/exam-data.ts`
- **해설**: `project_source_V1/webfront/public/solutions/*.md`

### 1.2 Exam 인터페이스 구조

```typescript
export interface Exam {
    id: string;              // 고유 ID (예: "aice-01", "bigdata-01")
    title: string;           // 시험 제목
    description: string;     // 시험 설명
    category?: string;       // 카테고리 (선택)
    colabUrl: string;        // Google Colab 실습 URL
    formUrl: string;         // Google Forms 답안 제출 URL
    formPrefillId?: string;  // 구글 폼 인증코드 필드 ID (선택)
    dataUrl: string;         // 데이터 출처 URL
    solutionUrl: string;     // 정답 및 해설 URL
    order?: number;          // 표시 순서 (선택)
    isActive?: boolean;      // 활성화 여부 (선택)
}
```

### 1.3 V1 시험 데이터 목록

| ID | 제목 | 설명 | 데이터 출처 |
|---|---|---|---|
| bigdata-01 | 빅데이터 분석기사 실기 모의고사 1회 | 제7회 기출 복원 (2023.12.02) | GitHub RAW |
| bigdata-02 | 빅데이터 분석기사 실기 모의고사 2회 | 제10회 기출 기반 (2025.06.21) | GitHub RAW |
| aice-01 | AICE 실기 모의고사 1회 | 내비게이션 주행 데이터 기반 목적지 도착 시간 예측 | Velog 블로그 |
| aice-02 | AICE 실기 모의고사 2회 | 항공사 고객 만족도 예측 - 분류 모델 및 딥러닝 구현 | 네이버 블로그 |

---

## 2. V2 프로젝트 데이터 구조 (Vanilla JS 기반)

### 2.1 데이터 파일 위치
- **데이터**: `prj_source/data/exams.json`
- **해설**: `prj_source/solutions/*.md`

### 2.2 Exam 구조 (JSON)

```json
{
    "exams": [
        {
            "id": number,          // 고유 ID (숫자)
            "title": string,       // 시험 제목
            "description": string, // 시험 설명
            "colabUrl": string,    // Google Colab 실습 URL
            "solutionUrl": string, // 정답 및 해설 URL
            "lectureUrl": string   // 강의/참고자료 URL (V2新增)
        }
    ]
}
```

### 2.3 V2 시험 데이터 (현재 Mock)

| ID | 제목 | 설명 |
|---|---|---|
| 1 | 1회차 모의고사 | Python 기초 문법 및 자료형 |
| 2 | 2회차 모의고사 | NumPy 라이브러리 활용 |
| 3 | 3회차 모의고사 | Pandas 데이터 처리 |
| 4 | 4회차 모의고사 | 데이터 시각화 (Matplotlib, Seaborn) |
| 5 | 5회차 모의고사 | 통계 분석 기초 |
| 6 | 6회차 모의고사 | 머신러닝 기초 (Scikit-learn) |
| 7 | 7회차 모의고사 | 딥러닝 기초 (TensorFlow/Keras) |
| 8 | 8회차 모의고사 | 실전 데이터 분석 프로젝트 |

---

## 3. V1/V2 데이터 구조 비교

### 3.1 차이점 분석

| 항목 | V1 (Next.js) | V2 (Vanilla JS) |
|-----|-------------|-----------------|
| **ID 형식** | string (`"aice-01"`) | number (`1`) |
| **카테고리** | 지원 (`category` 필드) | 미지원 |
| **Google Forms** | 지원 (`formUrl`) | 미지원 |
| **데이터 출처** | 지원 (`dataUrl`) | 미지원 |
| **강의 링크** | 미지원 | 지원 (`lectureUrl`) |
| **순서 지정** | 지원 (`order`) | 배열 순서 |
| **활성화 여부** | 지원 (`isActive`) | 미지원 |
| **동적 데이터** | GAS API 연동 | 정적 JSON만 |

### 3.2 V2에서 제외된 V1 기능

1. **Google Forms 연동**: V1은 답안 제출을 Google Forms로 처리했으나, V2는 제외
2. **데이터 출처 URL**: V1의 `dataUrl` 필드는 V2에 없음
3. **카테고리 분류**: AICE/빅데이터 분류 기능 제외
4. **동적 데이터**: Google Apps Script API 연동 기능 제외
5. **인증코드 자동입력**: `formPrefillId` 기능 제외

---

## 4. V2 프로젝트 핵심 데이터 항목

### 4.1 필수 항목

| 항목 | 타입 | 설명 | 예시 |
|-----|------|------|------|
| `id` | number | 시험 고유 ID | `1` |
| `title` | string | 시험 제목 | `"1회차 모의고사"` |
| `description` | string | 시험 설명 | `"Python 기초 문법 및 자료형"` |
| `colabUrl` | string | Google Colab 실습 링크 | `"https://colab.research.google.com/..."` |
| `solutionUrl` | string | 정답 및 해설 페이지 경로 | `"../solutions/aice-01.md"` |

### 4.2 선택 항목

| 항목 | 타입 | 설명 | 예시 |
|-----|------|------|------|
| `lectureUrl` | string | 강의/참고자료 링크 | `"https://example.com/lecture/1"` |

---

## 5. V2 적용을 위한 데이터 변환 가이드

### 5.1 V1 → V2 데이터 변환 시나리오

V1의 실제 데이터를 V2로 이관할 경우 다음 변환이 필요합니다.

```javascript
// V1 → V2 변환 예시
const v1Exam = {
    id: "aice-01",
    title: "AICE 실기 모의고사 1회",
    description: "내비게이션 주행 데이터 기반 목적지 도착 시간 예측",
    colabUrl: "https://colab.research.google.com/drive/example-aice-01",
    solutionUrl: "/dashboard/solution/aice-01",
    dataUrl: "https://velog.io/@junseyeon/..."
};

// V2 형식으로 변환
const v2Exam = {
    id: 1,  // string → number
    title: v1Exam.title,
    description: v1Exam.description,
    colabUrl: v1Exam.colabUrl,
    solutionUrl: "../solutions/aice-01.md",  // 상대 경로로 변환
    lectureUrl: v1Exam.dataUrl  // dataUrl → lectureUrl로 매핑 가능
};
```

### 5.2 권장 데이터 구조 (실제 적용 시)

```json
{
    "exams": [
        {
            "id": 1,
            "title": "AICE 실기 모의고사 1회",
            "description": "내비게이션 주행 데이터 기반 목적지 도착 시간 예측",
            "colabUrl": "https://colab.research.google.com/drive/...",
            "solutionUrl": "../solutions/aice-01.md",
            "lectureUrl": "https://velog.io/@junseyeon/AICE-associate-..."
        },
        {
            "id": 2,
            "title": "AICE 실기 모의고사 2회",
            "description": "항공사 고객 만족도 예측 - 분류 모델 및 딥러닝 구현",
            "colabUrl": "https://colab.research.google.com/drive/...",
            "solutionUrl": "../solutions/aice-02.md",
            "lectureUrl": "https://blog.naver.com/yiyangse/223488690089"
        }
    ]
}
```

---

## 6. V2 로비 화면에서 사용하는 데이터

### 6.1 로비 카드 렌더링 (`lobby.js`)

```javascript
// exams.json에서 로드하여 사용하는 필드
{
    "id": 1,
    "title": "1회차 모의고사",           // 카드 제목
    "description": "Python 기초 문법...", // 카드 설명
    "colabUrl": "...",                    // "Google Colab 실습" 버튼
    "solutionUrl": "...",                  // "정답 및 해설" 버튼
}
```

### 6.2 로비 화면 UI 구성

| UI 요소 | 사용 데이터 필드 |
|---------|-----------------|
| 시험 카드 제목 | `title` |
| 시험 카드 설명 | `description` |
| 완료 배지 (선택) | 학습 이력에서 `completed` 확인 |
| "Google Colab 실습" 버튼 | `colabUrl` |
| "학습 시작" 버튼 | `id` → `learning.html?exam={id}` |
| "정답 및 해설" 버튼 | `solutionUrl` |

---

## 7. 정답 및 해설 데이터 구조

### 7.1 해설 파일 위치

- **V1**: `project_source_V1/webfront/public/solutions/{id}.md`
- **V2**: `prj_source/solutions/{id}.md`

### 7.2 해설 파일 포함 내용 (V1 기준)

V1의 해설 파일(`aice-01.md`, `aice-02.md`)은 다음 내용을 포함합니다:

1. **문제 개요**: 태스크 설명 및 데이터 설명
2. **참고 링크**: 풀이 블로그/문서 링크
3. **Part 1**: 데이터 탐색 및 전처리
4. **Part 2**: 머신러닝 모형 구축
5. **Part 3**: 딥러닝 모형 구축
6. **코드 예시**: Python 코드 블록

### 7.3 V2 해설 파일 권장 형식

```markdown
# {회차} 정답 및 해설

본 해설은 {문제 주제} 태스크를 다룹니다.

<div style="...">
  <div>참고 링크</div>
  <div>{참고 URL}</div>
</div>

---

## 📋 [Part 1] 데이터 탐색 및 전처리

### 1. 데이터 로드
```python
# 코드
```

### 2. 전처리
```python
# 코드
```

---

## 🤖 [Part 2] 머신러닝 모형 구축

### 3. 모델 학습
```python
# 코드
```

---

## 🧠 [Part 3] 딥러닝 모형 구축

### 4. 신경망 모델
```python
# 코드
```
```

---

## 8. 빅데이터 분석기사 문항 데이터

### 8.1 기출문제 출처

| 회차 | 시험일 | 데이터 출처 |
|-----|--------|-----------|
| 7회 | 2023.12.02 | `https://lab.statisticsplaybook.com/bae-exam-7/` |
| 8회 | 2024.06.22 | `https://lab.statisticsplaybook.com/bae-exam-8/` |
| 9회 | 2024.11.30 | `https://lab.statisticsplaybook.com/bae-exam-9/` |
| 10회 | 2025.06.21 | `https://lab.statisticsplaybook.com/bae-exam-10/` |

### 8.2 문제 유형 구성

| 유형 | 배점 | 문제 구성 |
|-----|------|---------|
| 작업형 제1유형 | 30점 | 데이터 전처리 (3문제) |
| 작업형 제2유형 | 40점 | 머신러닝 모델링 (1문제) |
| 작업형 제3유형 | 30점 | 통계 검정 (2문제) |

### 8.3 데이터셋 경로

```
https://raw.githubusercontent.com/YoungjinBD/data/main/exam/
```

---

## 9. 결론 및 V2 적용 권장사항

### 9.1 V2 데이터 구조 간소화의 장점

1. **정적 호스팅 친화적**: GitHub Pages 등에서 배포 용이
2. **관리 용이성**: 단일 JSON 파일로 모든 시험 데이터 관리
3. **빠른 로딩**: API 호출 없이 즉시 데이터 렌더링

### 9.2 V2 추가 시 고려사항

1. **Colab URL 실제 값 필요**: 현재 `example-*` 형태라 실제 Colab 링크로 교체 필요
2. **해설 파일 작성**: V1 해설 파일을 V2 형식에 맞춰 변환 필요
3. **데이터 출처 보존**: `lectureUrl` 필드 활용하여 참고자료 링크 제공

### 9.3 다음 단계

1. V1의 실제 Colab URL 확보
2. 해설 파일 V2 경로로 복사 및 수정
3. `exams.json`에 실제 데이터 업데이트
4. (선택) 카테고리 필드 추가 시 UI 수정 필요

---

*작성일: 2026-04-03*
*버전: 1.0*
