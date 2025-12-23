#!/bin/bash

# AICE 및 빅데이터 분석기사 모의고사 시스템 시작 스크립트

PORT=57080
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=========================================="
echo "모의고사 시스템 - Next.js 서버 시작"
echo "=========================================="
echo ""

# 1. 프로세스 정리
echo "1. 프로세스 확인 (포트 $PORT)..."
PID=$(lsof -ti:$PORT 2>/dev/null)
if [ -n "$PID" ]; then
    echo "   ⚠ 포트 $PORT가 사용 중입니다: PID $PID"
    echo "   → 프로세스 종료 중..."
    kill -9 $PID 2>/dev/null || true
    sleep 1
    echo "   ✓ 프로세스 종료 완료"
fi

# 2. 서버 시작
echo ""
echo "2. Next.js 개발 서버 시작..."
echo "   → 포트: $PORT"
echo "   → URL: http://localhost:$PORT"
echo ""

# Next.js 개발 서버 실행 (webfront 디렉토리에서 실행)
cd "$PROJECT_DIR/project_source/webfront" && npm run dev -- -p $PORT

