# 모의고사 메타데이터 (exams.json)

## 개요
project_source_V1의 `lib/exam-data.ts`를 참조하여 생성한 Vanilla JS용 exams.json입니다.
회차별 모의고사 정보, Colab 링크, 해설 파일 경로 등을 포함합니다.

## exams.json 구조

```json
[
  {
    "id": "aice-01",
    "title": "AICE 실기 모의고사 1회",
    "description": "내비게이션 주행 데이터 기반 목적지 도착 시간 예측",
    "colabUrl": "https://colab.research.google.com/drive/example-aice-01",
    "solutionUrl": "solutions/aice-01.md",
    "lectureUrl": "https://velog.io/@junseyeon/AICE-associate-%EC%83%98%ED%94%8C%EB%AC%B8%ED%95%AD-%ED%92%80%EC%9D%B4"
  },
  {
    "id": "aice-02",
    "title": "AICE 실기 모의고사 2회",
    "description": "항공사 고객 만족도 예측 - 분류 모델 및 딥러닝 구현",
    "colabUrl": "https://colab.research.google.com/drive/example-aice-02",
    "solutionUrl": "solutions/aice-02.md",
    "lectureUrl": "https://blog.naver.com/yiyangse/223488690089"
  },
  {
    "id": "bigdata-01",
    "title": "빅데이터 분석기사 실기 모의고사 1회",
    "description": "제7회 기출 복원 (2023.12.02) - 전처리, 모델링, 통계검정",
    "colabUrl": "https://colab.research.google.com/drive/example-bigdata-01",
    "solutionUrl": "solutions/bigdata-01.md",
    "lectureUrl": "https://example.com/lecture/bigdata-01"
  },
  {
    "id": "bigdata-02",
    "title": "빅데이터 분석기사 실기 모의고사 2회",
    "description": "제10회 기출 기반 (2025.06.21) - 변형 문제 및 실습",
    "colabUrl": "https://colab.research.google.com/drive/example-bigdata-02",
    "solutionUrl": "solutions/bigdata-02.md",
    "lectureUrl": "https://example.com/lecture/bigdata-02"
  }
]
```

## 필드 설명

| 필드명 | 타입 | 설명 | 예시 |
|--------|------|------|------|
| `id` | string | 회차 고유 식별자 | `"aice-01"` |
| `title` | string | 모의고사 제목 | `"AICE 실기 모의고사 1회"` |
| `description` | string | 모의고사 요약 설명 | `"내비게이션 주행 데이터 기반..."` |
| `colabUrl` | string | Google Colab 노트북 URL | `"https://colab.research.google.com/..."` |
| `solutionUrl` | string | 해설 파일 상대 경로 | `"solutions/aice-01.md"` |
| `lectureUrl` | string | 외부 강의 또는 참고 자료 URL | `"https://example.com/lecture"` |

## 사용 방법

1. 위 JSON을 `prj_source/data/exams.json` 파일로 저장합니다.
2. 새 회차 추가 시 배열에 새 객체를 추가합니다.
3. `colabUrl`은 실제 Google Colab 링크로 수정해야 합니다.
4. `lectureUrl`은 실제 강의 플랫폼 링크로 수정해야 합니다.

## Colab 노트북 파일

project_source_V1에서 확인된 Colab 노트북 파일:
- `public/colab/aice-01.ipynb`
- `public/colab/aice-02.ipynb`
- `public/colab/bigdata-01.ipynb`
- `public/colab/bigdata-02.ipynb`

이 파일들을 `prj_source/public/colab/` 디렉토리에 복사하세요.

## 해설 파일

project_source_V1에서 확인된 해설 파일:
- `public/solutions/aice-01.md`
- `public/solutions/aice-02.md`
- `public/solutions/bigdata-01.md`
- `public/solutions/bigdata-02.md`

이 파일들을 `prj_source/data/solutions/` 디렉토리에 복사하세요.

---

*생성일자: 2026-04-03*
