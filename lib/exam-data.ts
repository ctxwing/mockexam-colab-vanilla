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
    category?: string;
    colabUrl: string;
    formUrl: string;
    formPrefillId?: string; // 구글 폼 인증코드 필드 ID (입력 자동화를 위한 선택 사항)
    dataUrl: string;
    solutionUrl: string;
    order?: number;
    isActive?: boolean;
}

export const EXAMS: Exam[] = [
    {
        id: "bigdata-01",
        title: "빅데이터 분석기사 실기 모의고사 1회",
        description: "제7회 기출 복원 (2023.12.02) - 전처리, 모델링, 통계검정",
        colabUrl: "https://colab.research.google.com/drive/example-bigdata-01",
        formUrl: "https://docs.google.com/forms/example-bigdata-01",
        dataUrl: "https://raw.githubusercontent.com/YoungjinBD/data/main/exam/",
        solutionUrl: "/dashboard/solution/bigdata-01"
    },
    {
        id: "bigdata-02",
        title: "빅데이터 분석기사 실기 모의고사 2회",
        description: "제10회 기출 기반 (2025.06.21) - 변형 문제 및 실습",
        colabUrl: "https://colab.research.google.com/drive/example-bigdata-02",
        formUrl: "https://docs.google.com/forms/example-bigdata-02",
        dataUrl: "https://raw.githubusercontent.com/YoungjinBD/data/main/exam/",
        solutionUrl: "/dashboard/solution/bigdata-02"
    },
    {
        id: "aice-01",
        title: "AICE 실기 모의고사 1회",
        description: "내비게이션 주행 데이터 기반 목적지 도착 시간 예측",
        colabUrl: "https://colab.research.google.com/drive/example-aice-01",
        formUrl: "https://docs.google.com/forms/example-aice-01",
        dataUrl: "https://velog.io/@junseyeon/AICE-associate-%EC%83%98%ED%94%8C%EB%AC%B8%ED%95%AD-%ED%92%80%EC%9D%B4",
        solutionUrl: "/dashboard/solution/aice-01"
    },
    {
        id: "aice-02",
        title: "AICE 실기 모의고사 2회",
        description: "항공사 고객 만족도 예측 - 분류 모델 및 딥러닝 구현",
        colabUrl: "https://colab.research.google.com/drive/example-aice-02",
        formUrl: "https://docs.google.com/forms/example-aice-02",
        dataUrl: "https://blog.naver.com/yiyangse/223488690089",
        solutionUrl: "/dashboard/solution/aice-02"
    }
];

/**
 * Google Apps Script API를 통해 최신 모의고사 목록을 가져옵니다.
 */
export async function getExams(): Promise<Exam[]> {
    const gasUrl = process.env.NEXT_PUBLIC_GAS_API_URL;

    if (!gasUrl) {
        console.warn("NEXT_PUBLIC_GAS_API_URL이 설정되지 않았습니다. 정적 데이터를 사용합니다.");
        return EXAMS;
    }

    try {
        const response = await fetch(`${gasUrl}?action=getExams`, {
            next: { revalidate: 3600 } // 1시간마다 캐시 갱신
        });

        if (!response.ok) throw new Error("API 호출 실패");

        const data = await response.json();
        return Array.isArray(data) ? data : EXAMS;
    } catch (error) {
        console.error("데이터 로드 중 오류:", error);
        return EXAMS;
    }
}
