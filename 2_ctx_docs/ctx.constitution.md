# constitution 공통사항
- 모든 설계 문서와 주석은 반드시 한글(korean)로 작성한다.
- 작성일자는 현재 일자로 하고, 작성자는 ctxwing@gmail.com 으로 기록하라.
- 큰 task ( 1, 1.1 등의 task) 가 완료로 종료되면 로컬에 커밋하고, 항상 github에 푸시한다. 이때 커밋 내용은 반드시 한글로 기록하고 한줄로 표시한다.

# Tasks.md 의 관리 
- 개발의 phase 종료 후에는 반드시  완료사항을 3_docs/TASK_<X>_완료내역.md 파일을 작성하고 내부에 작성일자를 기록한다. 
- git commit ㅎ한다. 

# 개발 언여별 준수사항
## React사용시
- Next.js 를 사용하는 경우, 버전은 15.5+, telemetry 를 사용하지 않도록 차단해.
- vite를 사용한다. (webpack과 turbopack을 사용하지 않는다.)
- vercel에 배포하는 경우, vecel 직접 배포하지 말고 github Action을 통해 배포한다. 

## python 사용 시
- python의 버전은 3.11을 사용하라 
- python 명령어 수행 시에는, 반드시 uv(패키지관리자)로 만들어진 가상환경을 사용하라. 없다면 생성할지 여부를 사용자에게 반드시 질문하라 
- pyproject.toml을 사용하여 관리한다
- 모듈, 플러그인 추가시에는 반드시 uv add <설치모듈>  형식으로 한다. 
- 프로젝트 또는 경우에 따라 프로젝트의 /backend/.venv 와 같이 가상환경을 사용한다. 
- 코드 실행시 반드시  아래와 같이 한다.
```
#이렇게 하지말고 
source .venv/bin/activate && python main.py
# 반드시 이렇게 해 
uv run python main.py
```

# Github repo 관리 
- github repo 생성시 반드시 사용자에게 묻고 진행한다. 
- 생성 및 관리시 gh를 사용하되, .gitignore를 반드시 만들고 확인한다. repo의 생성은 반드시 public 이 아닌 private 이다.
- 작성자, 기여자는 ctxwing@gmail.com 이다. 
- Co-Authored-By 또는 추가적인 contributor 는 없다  
- 브랜치는 오로지 main하나만 관리한다. 다른 브랜치는 추가하지 말라. 
- 로컬의 git 작업시 지난번 작업이후 추가된 사항을 기능 추가하는 경우 [feat]를 붙이고, 에러 수정은 [fix] 를 붙여서 커밋해. 
- git commit 진행시 메시지가 길 경우, 반드시 개행 표시를 하여 모두 한줄에 모두 표시해 
- 로컬과 github의 브랜치는 main으로만 사용한다. 하위 브랜치를 신규로 만들거나 사용하지 않는다.


# 프롬프트에서 여러 줄로 나뉜 복합 셸 명령 실행시 


## 현재의 문제점 

1. 사용 환경
- 통합 개발 환경(IDE): VSC (Visual Studio Code)

2. 실행하려는 명령
- 핵심 내용: 프로젝트 디렉토리 이동, 가상 환경 활성화, PYTHONPATH 설정, 그리고 여러 줄에 걸친 Python 코드를 인라인 문자열로 받아 실행하는 작업.
- 아래의 예시와 같이 여러 줄로 나뉜 복합 셸 명령어를 수행 시, 하나의 라인이 하나의 명령어오 인식되어, 프롬프트에서 일일이  run을 수흥하여야 다음 작업을 진행할 수 있음으로, 매번 승인 필요하여 매우 불편함. 
- 아래 예시 참조
```Bash

cd backend && source .venv/bin/activate && \
PYTHONPATH=/Users/michael/works/lancer/videogen-by-template/backend/src python3 -c "
from services.qc_checker import QCChecker
from models.photo import Photo
from uuid import uuid4
from datetime import datetime
:
"
```

## 문제의 원인
- 복합 셸 명령의 마지막 부분인 python3 -c "..." 안에 포함된 Python 코드가 여러 줄로 작성되어 있어, 터미널(셸)이 명령이 끝났다고 인식하지 못하고 명령을 실행할 때마다 사용자에게 추가 입력 여부를 묻습니다.


## 사용자 지시 사항
- 명령 실행 시 사용자에게 묻지 않고, 복잡한 인라인 Python 코드가 한 줄 명령으로 인식되어 바로 실행되게 하고 싶음. (즉, 여러 줄 입력을 하나의 완전한 명령으로 처리하고 싶음.)

## 해결방법
-문제는 터미널에서 여러 줄의 Python 코드를 인라인 문자열로 실행할 때 발생하는 줄 바꿈 인식 오류이며, 이를 해결하기 위해 Python 코드를 별도 파일로 분리하거나 (권장), 코드를 강제로 세미콜론(;)으로 연결된 한 줄 문자열로 변환해야 합니다

- 예시- 복합 셸 명령: 아래 코드예시와 cd backend && source .venv/bin/activate && PYTHONPATH=... python3 -c 


### 다음은 두 가지 해결책을 Kilocode에게 지시하는 방법입니다.

1. 방법 1 (권장): Python 코드를 새 파일로 분리하여 실행 
- 이 방법은 가장 깔끔하며, Kilocode가 코드를 분석하고 새로운 파일을 생성하도록 지시하는 방식입니다.
- 예시) 
"선택된 Python 코드를 /backend/run_qc.py라는 새 파일로 분리하고, from services.qc_checker import QCChecker 등의 import 구문과 모든 로직을 포함시켜줘. 원본 셸 명령은 이 파일을 실행하도록 업데이트하고."
- 새 파일 생성: /backend/run_qc.py 경로에 필요한 Python 코드를 작성하여 생성합니다.


2. 기존의 긴 셸 명령을 코드를 강제로 세미콜론(;)으로 연결된 한 줄 문자열로 변환
- 해당 셸 명령을 python3 -c "..." 안의 Python 코드를 모두 세미콜론(;)을 사용하여 하나의 연속된 줄로 변환하고, 셸 명령의 이스케이프 문제가 없도록 따옴표와 이스케이프 문자(\)를 조정해줘. 터미널에서 엔터 한 번으로 실행되게 만들어야 해."

 예시)
```Bash
cd backend && source .venv/bin/activate && PYTHONPATH=/Users/michael/works/lancer/videogen-by-template/backend/src python3 run_qc.py
```

## 결론
-  복잡한 셸/Python 인라인 명령의 따옴표 및 이스케이프 처리는 오류 발생 가능성이 높으므로, **방법 1 (파일 분리)**을 사용하는 것이 훨씬 안전하고 유지보수에도 좋습니다.



