# Project Context

## Purpose
본 프로젝트는 **AICE 및 빅데이터 분석기사 실기** 학습자를 위한 **Google Colab 기반 교육용 가상 모의고사 웹 시스템**을 구축하는 것입니다. 도서 독자가 QR 코드를 통해 접속하여 간단한 인증(코드 입력) 후, 즉시 실습 환경(Google Colab)에 접근할 수 있도록 돕는 '브릿지(Bridge) 웹사이트' 역할을 수행합니다.

## Tech Stack
- **Frontend**: Next.js (App Router 권장), React, TypeScript
- **Styling**: Vanilla CSS (유지보수 및 가벼운 성능 목적)
- **Hosting/Infrastructure**: Vercel (Serverless/Static Hosting)
- **Data Delivery**: GitHub Raw 또는 외부 URL 기반 CSV 데이터 제공
- **External Tools**: Google Colab (실습 환경), Google Forms (답안 제출용)

## Project Conventions

### Code Style
- **TypeScript**: 엄격한 타입 체크 적용
- **Component**: 함수형 컴포넌트 사용
- **Naming**: 
  - 컴포넌트: PascalCase
  - 파일/폴더: kebab-case 또는 PascalCase (Next.js 규칙 준수)
- **Internationalization**: 기본 언어는 한글(ko)로 설정

### Architecture Patterns
- **Static & Serverless**: DB를 전혀 사용하지 않는 순수 정적 사이트 또는 Vercel Edge/Serverless Functions 기반의 가벼운 로직 구현
- **Constant-based Authentication**: 소스 코드(또는 `.env`) 내 정의된 고정 인증 코드 리스트와 단순 비교하는 Stateless 인증 방식 적용
- **Responsive Design**: 모바일 접속 시 PC 접속 유도 안내 페이지 포함

### Testing Strategy
- 수동 기능 테스트 중심 (인증 코드 유효성 검증, 링크 연결 확인)
- 다양한 브라우저 및 기기에서의 반응형 레이아웃 확인

### Git Workflow
- `main` 브랜치 직접 커밋 또는 간단한 Feature 브랜치 전략 사용
- 커밋 메시지는 한글로 명확하게 작성 (예: "feat: 인증 완료 후 Colab 이동 기능 추가")

## Domain Context
- **AICE/빅데이터 분석기사**: Python과 Pandas를 활용한 데이터 분석 자격증 과정
- **Google Colab**: 클라우드 기반 Jupyter Notebook 환경으로, 학습자가 URL 클릭 시 즉시 실습 가능해야 함
- **CSV Data Hub**: URL을 통해 `pd.read_csv()`로 데이터를 즉시 불러올 수 있는 구조

## Important Constraints
- **회원가입/로그인 없음**: 사용자의 편의를 위해 최소 수준의 인증(코드 입력)만 수행
- **DB 미사용**: 유지보수 비용 최소화를 위해 데이터베이스 구축 배제
- **저비용 유지보수**: Vercel 무료 플랜 등에서 동작 가능한 가벼운 시스템 지향
- **자동 채점 제외**: 자가채점 방식으로 구현 (정답/해설 제공)

## External Dependencies
- **Google Colab**: 메인 실습 환경
- **GitHub/S3**: 실습 데이터 파일(CSV) 호스팅
- **Google Forms**: 학습자 답안 수합용 (필요 시)
