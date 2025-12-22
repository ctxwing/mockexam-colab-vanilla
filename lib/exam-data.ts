/**
 * 파일명: lib/exam-data.ts
 * 작성일자: 2025-12-22
 * 용도: 모의고사 및 실습 데이터 정보를 관리합니다.
 * 주의 사항: 모든 데이터는 정적으로 관리됩니다.
 */

export interface Exam {
    id: string;
    title: string;
    description: string;
    colabUrl: string;
    formUrl: string;
    dataUrl: string;
    solutionUrl: string;
}

export const EXAMS: Exam[] = [
    {
        id: "aice-01",
        title: "AICE 실기 모의고사 1회",
        description: "Pandas 기초 데이터 전처리 및 탐색적 데이터 분석(EDA)",
        colabUrl: "https://colab.research.google.com/drive/example-aice-01",
        formUrl: "https://docs.google.com/forms/example-aice-01",
        dataUrl: "https://raw.githubusercontent.com/ctxwing/qr-mockexam-colab-nextjs/main/data/aice-01.csv",
        solutionUrl: "/dashboard/solution/aice-01"
    },
    {
        id: "bigdata-01",
        title: "빅데이터 분석기사 실기 모의고사 1회",
        description: "통계 검정 및 머신러닝 분류 알고리즘 구현",
        colabUrl: "https://colab.research.google.com/drive/example-bigdata-01",
        formUrl: "https://docs.google.com/forms/example-bigdata-01",
        dataUrl: "https://raw.githubusercontent.com/ctxwing/qr-mockexam-colab-nextjs/main/data/bigdata-01.csv",
        solutionUrl: "/dashboard/solution/bigdata-01"
    }
];
