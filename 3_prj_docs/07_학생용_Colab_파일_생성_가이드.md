# 학생용 Colab 실습 파일(.ipynb) 생성 및 변환 가이드

이 문서는 `public/solutions`에 위치한 정답 해설 파일(`.md`)을 바탕으로 학생용 실습 환경인 Google Colab 파일(`.ipynb`)을 생성하는 방법과 원칙을 기록합니다.

## 1. 개요
- **목적**: 정답이 포함된 해설 문서에서 질문과 데이터 로딩 코드만 추출하여 학생이 직접 코딩할 수 있는 실습 템플릿 제작.
- **대상**: AICE 및 빅데이터 분석기사 모의고사 4종.
- **위치**: `project_source/webfront/public/colab/` 내의 `.ipynb` 파일들.

## 2. 변환 핵심 원칙 (학생용 최적화)
학생들이 학습에만 집중할 수 있도록 다음 규칙을 적용하여 파일을 구성합니다.

1.  **해설 및 정답 제거**: 코드 블록 내의 실제 로직은 삭제하고 `# 여기에 코드를 작성하세요` 주석으로 대체합니다.
2.  **데이터 로드 코드 유지**: `import pandas as pd` 및 `pd.read_csv()`와 같이 실습 시작을 위한 데이터 로드 코드는 반드시 포함합니다.
3.  **외부 URL 데이터 연결**: Google Colab 환경에서는 로컬 파일을 읽을 수 없으므로, 모든 데이터 경로를 GitHub Raw URL 등 외부 접근이 가능한 URL로 변환합니다.
4.  **Markdown 가독성 유지**: 문제의 제목, 조건, 데이터셋 설명은 Markdown 셀로 전환하여 직관적으로 보이게 합니다.

## 3. 세부 변환 가이드 (자동화 스크립트 기반)

현재 프로젝트 루트의 `convert_to_colab.py` 스크립트를 통해 자동 변환이 가능합니다. 수동으로 생성하거나 수정할 때도 다음 로직을 따릅니다.

### 3.1 데이터셋 URL 매핑 규칙
AICE와 같이 로컬 파일명으로 제공된 데이터는 아래의 공개 URL로 치환하여 Colab에서 즉시 실행 가능하게 만듭니다.

- **AICE 1회**: `A0007IT.json` 
  -> `https://raw.githubusercontent.com/venture21/AICE-associate/main/AICE%20Associate%20A0007IT.json`
- **AICE 2회**: `Invistico_Airline.csv`
  -> `https://raw.githubusercontent.com/SilasPenda/Airline-Customer-Satisfaction/main/Invistico_Airline.csv`
- **빅데이터 분석기사**: `YoungjinBD` 레포지토리의 Raw URL 활용

### 3.2 파일 구조 (.ipynb JSON 형식)
파일은 주피터 노트북 표준 형식을 따르며, `cells` 내부에 `cell_type`이 `markdown`과 `code`로 번갈아 가며 배치되도록 구성합니다.

## 4. 운영 및 배포 프로세스
1.  **MD 파일 수정**: `public/solutions/*.md` 파일의 문제 내용이나 데이터 경로가 바뀌면 가장 먼저 수정합니다.
2.  **변환 스크립트 실행**:
    ```bash
    python3 convert_to_colab.py
    ```
    *스크립트 실행 시 `public/solutions`의 MD가 `public/colab`의 IPYNB로 자동 변환됩니다.*
3.  **드라이브/GitHub 업로드**: 생성된 `.ipynb` 파일을 외부에서 접근 가능한 곳(구글 드라이브 공유 링크 등)에 업로드합니다.
4.  **관리 시트 업데이트**: 업로드된 URL을 관리용 구글 시트의 `colabUrl` 항목에 업데이트하여 웹사이트에 반영합니다.

## 5. 주의 사항
- **라이브러리**: Colab 기본 탑재 라이브러리(Pandas, Scikit-learn, TensorFlow 등) 외의 특수 라이브러리가 필요한 경우, 코드 셀 상단에 `!pip install` 명령어를 포함해야 합니다.
- **이미지**: MD 파일 내에 로컬 이미지가 포함된 경우, 웹에서 접근 가능한 URL로 변경해야 Colab에서 정상적으로 노출됩니다.
