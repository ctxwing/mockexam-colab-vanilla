# GitHub Pages 배포 방법

## 개요

이 프로젝트는 순수 정적 웹사이트(vanilla HTML/CSS/JS)로 GitHub Pages를 통한 배포가 가능합니다.

---

## 방법 1: gh-pages 브랜치 사용 (권장)

### 절차

1. **배포 스크립트 실행**
   ```bash
   ./deploy-ghpages.sh
   ```

2. **GitHub Pages 설정**
   - GitHub 저장소 접속: https://github.com/ctxwing/mockexam-colab-vanilla
   - Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` / `root` 선택
   - Save

3. **배포 확인**
   - URL: https://ctxwing.github.io/mockexam-colab-vanilla/

---

## 방법 2: 수동 배포

### 절차

1. **gh-pages 브랜치 생성**
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   git checkout main -- prj_source
   mv prj_source/* .
   mv prj_source/.* . 2>/dev/null || true
   rmdir prj_source
   git add -A
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   git checkout main
   ```

2. **GitHub Pages 설정** (방법 1과 동일)

---

## 배포 전 체크리스트

### 필수 확인 사항

- [ ] `otp-list.json`에 해시만 포함되어 있는지 확인
- [ ] `otp-codes.json`이 `.gitignore`에 포함되어 있는지 확인
- [ ] 개발용 파일들(`e2e/`, `test-results/`, `tools/` 등)이 배포되지 않는지 확인
- [ ] 로컬에서 정상 동작하는지 확인

### .gitignore 확인

```gitignore
# OTP 원본 코드 (보안)
data/otp-codes.json
```

---

## GitHub Pages 설정 세부 정보

### 저장소 설정

| 항목 | 값 |
|------|-----|
| 저장소 | ctxwing/mockexam-colab-vanilla |
| 배포 브랜치 | gh-pages |
| 배포 디렉토리 | / (root) |
| URL | https://ctxwing.github.io/mockexam-colab-vanilla/ |

### 도메인 설정 (선택)

커스텀 도메인 사용 시:
1. `CNAME` 파일 생성 (내용: `yourdomain.com`)
2. `prj_source/`에 배치
3. DNS 설정: CNAME 레코드 추가

---

## 트러블슈팅

### 404 에러 발생 시

1. **배포 브랜치 확인**
   ```bash
   git branch -a
   ```

2. **GitHub Actions 배포 상태 확인**
   - 저장소 → Actions 탭

3. **캐시 클리어**
   - 브라우저 하드 리로드 (Ctrl+Shift+R)

### OTP 인증 실패 시

1. `otp-list.json`이 배포되었는지 확인
2. 해시 파일 형식 확인:
   ```json
   {
     "hashes": ["sha256hash1", "sha256hash2", ...]
   }
   ```

### 로컬 개발 서버

배포 전 로컬 테스트:
```bash
./start.sh
# http://localhost:53500 접속
```

---

## 자동화 (선택 사항)

### GitHub Actions 사용

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './prj_source'
      - uses: actions/deploy-pages@v4
```

---

*마지막 수정: 2026-04-03*
