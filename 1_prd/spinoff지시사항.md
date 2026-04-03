# Spinoff 지시사항

## OpenSpec 기반 개발 Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    OpenSpec 개발 단계 개요                       │
└─────────────────────────────────────────────────────────────────┘

  단계 1: 현황 분석          단계 2: Change Proposal      단계 3: 스펙 델타
  ┌──────────────┐          ┌──────────────────┐         ┌─────────────────┐
  │ /opsx:list   │─────────▶│ /opsx:proposal   │────────▶│ /opsx:delta     │
  │              │          │                  │         │                 │
  │ • 스펙 목록  │          │ • proposal.md    │         │ • auth/spec.md  │
  │ • 변경사항   │          │ • tasks.md       │         │ • lobby/spec.md │
  │ • 컨벤션     │          │ • design.md(opt) │         │ • learning/     │
  └──────────────┘          └──────────────────┘         └─────────────────┘
         │                          │                            │
         │                          ▼                            │
         │                  ┌──────────────────┐                 │
         │                  │   /opsx:validate │                 │
         │                  │                  │                 │
         │                  │ • 엄격 검증      │                 │
         │                  │ • 오류 수정      │                 │
         │                  └──────────────────┘                 │
         │                          │                            │
         ▼                          ▼                            ▼
  ┌─────────────────────────────────────────────────────────────────┐
  │                    단계 4: 구현 (/opsx:impl)                     │
  │                                                                  │
  │  ┌─────────────────────────────────────────────────────────┐   │
  │  │  tasks.md 순차 수행                                     │   │
  │  │  - [ ] 1.1 기본 구조 생성                               │   │
  │  │  - [ ] 1.2 디렉토리 설계                                │   │
  │  │  - [ ] 2.1 인증 로직 구현                               │   │
  │  │  ...                                                     │   │
  │  └─────────────────────────────────────────────────────────┘   │
  └─────────────────────────────────────────────────────────────────┘
         │
         ▼
  ┌─────────────────────────────────────────────────────────────────┐
  │              단계 5: 아카이빙 (/opsx:archive)                    │
  │                                                                  │
  │  changes/ → changes/archive/YYYY-MM-DD-<change-id>/             │
  │  specs/ 업데이트 (기능 변경 시)                                  │
  └─────────────────────────────────────────────────────────────────┘
```

## Slash 명령어 참조

| 명령어 | 설명 | 사용 예시 |
|--------|------|-----------|
| `/opsx:list` | 활성 변경사항 및 스펙 목록 | `/opsx:list` |
| `/opsx:show` | 변경사항 또는 스펙 상세 보기 | `/opsx:show <id>` |
| `/opsx:proposal` | 새 Change Proposal 생성 | `/opsx:proposal migrate-to-vanilla` |
| `/opsx:delta` | 스펙 델타 작성 | `/opsx:delta auth ADD` |
| `/opsx:validate` | 변경사항 검증 | `/opsx:validate <id> --strict` |
| `/opsx:impl` | 구현 단계 시작 | `/opsx:impl <id>` |
| `/opsx:archive` | 변경사항 아카이브 | `/opsx:archive <id> --yes` |

## 프로젝트 개요

이 프로젝트는 기존 `qr-mockexam-colab-nextjs` 프로젝트를 기반으로 하되, 새로운 요구사항(`1_prd/1_고객요구사항.md`)에 따라 Vanilla JS 기반의 정적 웹사이트로 재구축하는 프로젝트입니다.

## OpenSpec 기반 개발 단계

### 단계 1: 현황 분석 및 초기화

**목표**: 기존 프로젝트 구조와 OpenSpec 상태를 파악합니다.

```bash
# OpenSpec 설치 확인
openspec list

# 기존 스펙 목록 확인
openspec list --specs

# 프로젝트 컨벤션 확인
cat openspec/project.md
```

### 단계 2: 기존 프로젝트 분석

**목표**: 기존 `qr-mockexam-colab-nextjs` 프로젝트의 구조와 기능을 분석합니다.

```bash
# 기존 프로젝트 클론 (필요시)
git clone https://github.com/ctxwing/qr-mockexam-colab-nextjs.git ../qr-mockexam-colab-nextjs

# 기존 프로젝트 구조 분석
ls -la ../qr-mockexam-colab-nextjs/

# 기존 컴포넌트 및 기능 파악
find ../qr-mockexam-colab-nextjs/src -type f -name "*.tsx" -o -name "*.ts" | head -20
```

### 단계 3: Change Proposal 생성

**목표**: 새로운 요구사항에 따른 변경 사항을 proposal로 작성합니다.

```bash
# Change ID 생성 (예: migrate-to-vanilla-js)
CHANGE_ID="migrate-to-vanilla-js"

# Change 디렉토리 생성
mkdir -p openspec/changes/$CHANGE_ID/specs/{auth,lobby,learning,mobile}

# proposal.md 작성
cat > openspec/changes/$CHANGE_ID/proposal.md << 'EOF'
# Change: Vanilla JS 기반 정적 웹사이트 마이그레이션

## Why
- 서버 운영 비용 최소화를 위한 정적 웹사이트 전환
- Next.js 기반 동적 웹사이트를 Vanilla JS 기반 정적 웹사이트로 마이그레이션
- Local Storage 기반 클라이언트 인증으로 서버 의존성 제거

## What Changes
- Next.js → Vanilla JS (HTML/CSS/JS)
- 서버 인증 → Local Storage 기반 클라이언트 인증
- 데이터 소스 → JSON 파일 기반 동적 로딩
- 배포: Vercel/Netlify → GitHub Pages

## Impact
- Affected specs: auth, lobby, learning, mobile
- Affected code: 전체 코드베이스 재작성
EOF

# tasks.md 작성
cat > openspec/changes/$CHANGE_ID/tasks.md << 'EOF'
## 1. 프로젝트 구조 설정
- [ ] 1.1 기본 HTML/CSS/JS 구조 생성
- [ ] 1.2 디렉토리 구조 설계 (assets, css, js, data)
- [ ] 1.3 개발 환경 설정

## 2. 인증 모듈 구현
- [ ] 2.1 Local Storage 인증 로직 구현
- [ ] 2.2 OTP 입력 및 검증 UI
- [ ] 2.3 인증 상태 관리

## 3. 로비 화면 구현
- [ ] 3.1 회차별 학습 리스트 UI
- [ ] 3.2 JSON 데이터 로딩 및 렌더링
- [ ] 3.3 학습 진행 상태 저장

## 4. 학습 화면 구현
- [ ] 4.1 문제 및 해설 표시 UI
- [ ] 4.2 Google Colab 연동
- [ ] 4.3 외부 강의 링크 연결

## 5. 모바일 안내 화면 구현
- [ ] 5.1 QR 접속 안내 페이지
- [ ] 5.2 링크 복사 및 카톡 공유 기능

## 6. 배포 설정
- [ ] 6.1 GitHub Pages 설정
- [ ] 6.2 커스텀 도메인 연결
- [ ] 6.3 배포 자동화

## 7. 테스트 및 검증
- [ ] 7.1 크로스 브라우저 테스트
- [ ] 7.2 반응형 레이아웃 검증
- [ ] 7.3 콘텐츠 보호 기능 확인
EOF
```

### 단계 4: 스펙 델타 작성

**목표**: 각 기능별 요구사항을 스펙 델타로 작성합니다.

```bash
# 인증 스펙
cat > openspec/changes/$CHANGE_ID/specs/auth/spec.md << 'EOF'
## ADDED Requirements
### Requirement: OTP 기반 도서 인증
사용자는 도서에 포함된 난수(OTP)를 입력하여 인증해야 한다.

#### Scenario: OTP 입력 성공
- **WHEN** 사용자가 유효한 OTP를 입력한다
- **THEN** 인증이 성공하고 로비 화면으로 이동한다

#### Scenario: OTP 입력 실패
- **WHEN** 사용자가 유효하지 않은 OTP를 입력한다
- **THEN** 오류 메시지를 표시하고 재입력을 요청한다

### Requirement: Local Storage 인증 상태 유지
인증된 사용자의 상태는 Local Storage에 저장되어 페이지 새로고침 후에도 유지된다.

#### Scenario: 인증 상태 유지
- **WHEN** 사용자가 인증 후 페이지를 새로고침한다
- **THEN** 인증 상태가 유지되어 로비 화면이 표시된다
EOF

# 로비 스펙
cat > openspec/changes/$CHANGE_ID/specs/lobby/spec.md << 'EOF'
## ADDED Requirements
### Requirement: 회차별 학습 리스트 노출
인증된 사용자는 회차별(1~N회) 학습 리스트를 볼 수 있다.

#### Scenario: 학습 리스트 표시
- **WHEN** 사용자가 로비 화면에 진입한다
- **THEN** 회차별 학습 리스트가 표시된다

#### Scenario: 학습 진행 상태 표시
- **WHEN** 사용자가 이전에 학습을 진행했다
- **THEN** 해당 회차의 진행 상태가 표시된다
EOF

# 학습 스펙
cat > openspec/changes/$CHANGE_ID/specs/learning/spec.md << 'EOF'
## ADDED Requirements
### Requirement: 문제 및 해설 표시
학습 화면에서 문제와 정답, 해설을 표시한다.

#### Scenario: 문제 표시
- **WHEN** 사용자가 회차를 선택한다
- **THEN** 문제 목록이 표시된다

#### Scenario: 해설 확인
- **WHEN** 사용자가 정답 확인을 요청한다
- **THEN** 정답과 해설이 표시된다

### Requirement: Google Colab 연동
학습 화면에서 Google Colab 실습 링크를 제공한다.

#### Scenario: Colab 링크 연결
- **WHEN** 사용자가 Colab 버튼을 클릭한다
- **THEN** Google Colab 페이지가 새 탭으로 열린다
EOF

# 모바일 스펙
cat > openspec/changes/$CHANGE_ID/specs/mobile/spec.md << 'EOF'
## ADDED Requirements
### Requirement: 모바일 안내 페이지
모바일에서 접속 시 PC 접속을 안내하는 페이지를 표시한다.

#### Scenario: 모바일 접속 안내
- **WHEN** 사용자가 모바일로 접속한다
- **THEN** "실습을 위해 PC로 접속하세요" 안내가 표시된다

#### Scenario: 링크 공유 기능
- **WHEN** 사용자가 링크 복사 또는 카톡 공유를 클릭한다
- **THEN** 해당 기능이 실행된다
EOF
```

### 단계 5: 검증

**목표**: 작성한 Change Proposal을 검증합니다.

```bash
# Change Proposal 검증
openspec validate $CHANGE_ID --strict

# 스펙 델타 확인
openspec show $CHANGE_ID --json --deltas-only
```

### 단계 6: 구현

**목표**: tasks.md에 따라 순차적으로 구현합니다.

1. `proposal.md` 읽기 - 무엇을 구축하는지 이해
2. `tasks.md` 읽기 - 구현 체크리스트 확인
3. 순차적으로 태스크 완료
4. 모든 완료 후 체크리스트 업데이트

### 단계 7: 아카이빙

**목표**: 배포 완료 후 Change를 아카이브합니다.

```bash
# 배포 후 아카이빙
openspec archive $CHANGE_ID --yes

# 아카이브 검증
openspec validate --strict
```

## 참고 자료

- [OpenSpec Instructions](../openspec/AGENTS.md)
- [고객 요구사항](./1_고객요구사항.md)
- [기존 요구사항](./back/1_고객요구사항.md)
