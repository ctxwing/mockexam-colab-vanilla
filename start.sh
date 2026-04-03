#!/bin/bash

# AICE 모의고사 시스템 - Vanilla JS 정적 웹사이트 시작 스크립트

PORT=53500
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
SOURCE_DIR="$PROJECT_DIR/prj_source"

echo "=========================================="
echo "모의고사 시스템 - Vanilla JS 정적 웹사이트"
echo "=========================================="
echo ""

# 1. 프로세스 정리
echo "1. 프로세스 확인 (포트 $PORT)..."
PID=$(lsof -ti:$PORT 2>/dev/null)
if [ -n "$PID" ]; then
    echo "   ⚠ 포트 $PORT가 사용 중입니다: PID $PID"
    echo "   → 프로세스 종료 중..."
    kill -9 $PID 2>/dev/null || true
    sleep 2
    echo "   ✓ 프로세스 종료 완료"
else
    echo "   ✓ 포트 $PORT 사용 가능"
fi

# 2. 서버 시작
echo ""
echo "2. Python HTTP 서버 시작..."
echo "   → 포트: $PORT"
echo "   → URL: http://localhost:$PORT"
echo "   → 소스 디렉토리: $SOURCE_DIR"
echo ""

# Python HTTP 서버 실행 (백그라운드)
cd "$SOURCE_DIR" && nohup python3 -m http.server $PORT > /dev/null 2>&1 &
SERVER_PID=$!
echo "   → 서버 PID: $SERVER_PID"

# 서버 기동 대기
sleep 2

# 서버 기동 확인
if kill -0 $SERVER_PID 2>/dev/null; then
    echo ""
    echo "✓ 서버가 성공적으로 기동되었습니다."
    echo "  접속 URL: http://localhost:$PORT"
else
    echo ""
    echo "✗ 서버 기동에 실패했습니다."
    echo "  포트 $PORT가 여전히 사용 중일 수 있습니다."
    echo "  5초 후 재시도합니다..."
    sleep 5
    cd "$SOURCE_DIR" && nohup python3 -m http.server $PORT > /dev/null 2>&1 &
    echo "  새 서버 PID: $!"
fi
