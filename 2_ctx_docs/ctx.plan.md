
# 공통시힝
- 본 프로젝트의 개발에 가장 적합한 기술 스택을 분석하고 제시하라
- 별도의 지시된 기술 스택이 있다면 그것을 우선으로 한다
- 코드 내의 주석은 반드시 상단에 파일명과 작성일자, 코드 파일명, 용도, 주의 사항을 반드시 상세히 기록한다.

## DB를 사용하는 경우
- DB는 MVP 개발중에는 pglite사용한다.  향후 DB변경을 고려하여 ORM(객체 관계형 매핑) 적용한다. 
- 최종 상용화시에는 PostgresQL을 사용하되, 개발중 구성된 ORM(객체 관계형 매핑)을 사용한다. 
- Drizzle ORM 정의하여 사용하라 
- 필드 매핑 테이블  (snake_case)
- 필요시, DB 초기화 SQL 스크립트와 가상 데이터를 생성하는 스크립트를 반드시 제공하라

## UI/UX
- 사용자의 편의성을 최우선으로 고려한다
- 개발에 적합한 기술 스택을 분석하고, 설치과정이 복잡하지 않고, 결과화면이 미려한 방식으로 개발하여야한다. 
- 화면의 UI컴포넌트는 모던하며 깔끔하며, 결과화면이 미려한 방식으로 개발하여야한다


# 프론트
## NextJS를 사용하는 경우
- nodejs는 반드시 22+을 사용한다.
- Next.js: 16.X 이상을 적용한다
- 별도로 지시하지 않으면 Tailwind와 shadcn/ui를 적용한다.
- 파일업로드용 React 라이브러리는 Uppy,react-dronezone 순으로 사용한다. 
- 목룍, 테이블형 정보의 제공이 필요한 경우,TanStack Table + shadcn/ui 조합 , Material React Table (MRT)순으로 정한다

# 관리자 사이트 구축시 
- 반드시 이 소스를 사용한다. 
- https://github.com/TailAdmin/tailadmin-free-tailwind-dashboard-template

## Flutter를 사용하는 경우
-Flutter SDK 3.35.7 + 을 사용
- 모든 Dart Null Safety 에러 필수 해결

# 백엔드
## strapi 를 사용하는 경우
- 개발단계에서는 sqlite3를 사용한다. 
- strapi 사용시 버전은 5+ , TS를 적용한다. 

## python을 사용하는 경우
- python을 사용하는 경우  python=3.11 을 사용한다. 
- python 명령어 수행 시에는, 반드시 uv(패키지관리자)로 만들어진 가상환경을 사용하라. 없다면 생성할지 여부를 사용자에게 반드시 질문하라 
- API관련 사항은  FastAPI를 사용하고 swagger, redoc을 구현한다. 내용은 한글로 작성하고, 예시 파라라미터를 상세히 설명한다.


