#!/bin/bash
# GitHub Pages 배포 스크립트
# 사용법: ./deploy-ghpages.sh

set -e

echo "🚀 GitHub Pages 배포 시작..."

# gh-pages 브랜치 생성/업데이트
git checkout gh-pages 2>/dev/null || git checkout --orphan gh-pages
git checkout main

# prj_source 내용만 gh-pages에 복사
git checkout gh-pages
git rm -rf .
git checkout main -- prj_source

# prj_source 내용을 루트로 이동
mv prj_source/* .
mv prj_source/.* . 2>/dev/null || true
rmdir prj_source

# OTP 원본 코드 제거 (.gitignore에 의해 배포 제외되어야 함)
echo "📁 배포 파일 확인..."
ls -la

git add -A
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force

# main 브랜치로 복귀
git checkout main

echo "✅ 배포 완료!"
echo "🌐 https://ctxwing.github.io/mockexam-colab-vanilla/"
