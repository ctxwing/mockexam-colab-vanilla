#!/bin/bash

# AICE 모의고사 시스템 - Vanilla JS 정적 웹사이트 시작 스크립트 (with hot reload)

PORT=53500
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
SOURCE_DIR="$PROJECT_DIR/prj_source"
PID_FILE="$PROJECT_DIR/.server.pid"

# 종료 핸들러
cleanup() {
    echo ""
    echo "서버 종료 중..."
    if [ -f "$PID_FILE" ]; then
        SERVER_PID=$(cat "$PID_FILE")
        if kill -0 $SERVER_PID 2>/dev/null; then
            kill $SERVER_PID 2>/dev/null || true
            echo "✓ 서버가 종료되었습니다 (PID: $SERVER_PID)"
        fi
        rm -f "$PID_FILE"
    fi
    exit 0
}

# Ctrl+C 시그널 처리
trap cleanup SIGINT SIGTERM

echo "=========================================="
echo "모의고사 시스템 - Vanilla JS 정적 웹사이트"
echo "=========================================="
echo ""

# 1. 기존 프로세스 정리
echo "1. 기존 서버 프로세스 확인..."

# PID 파일로 확인
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if kill -0 $OLD_PID 2>/dev/null; then
        echo "   → 기존 서버 발견 (PID: $OLD_PID), 종료 중..."
        kill $OLD_PID 2>/dev/null || true
        sleep 2
    fi
    rm -f "$PID_FILE"
fi

# 포트로 직접 확인 (모든 프로세스)
PID_ON_PORT=$(lsof -ti:$PORT 2>/dev/null)
if [ -n "$PID_ON_PORT" ]; then
    echo "   → 포트 $PORT 점유 중인 프로세스 발견 (PID: $PID_ON_PORT), 강제 종료..."
    for pid in $PID_ON_PORT; do
        kill -9 $pid 2>/dev/null || true
    done
    sleep 2
fi

echo "   ✓ 포트 $PORT 사용 가능"

# 2. 서버 시작
echo ""
echo "2. LiveReload 서버 시작..."
echo "   → 포트: $PORT"
echo "   → URL: http://localhost:$PORT"
echo "   → 소스 디렉토리: $SOURCE_DIR"
echo "   → hot reload: 활성화 (*.html, *.css, *.js 변경 시 자동 새로고침)"
echo ""
echo "종료하려면 Ctrl+C를 누르세요."
echo ""

# Python live reload 서버 실행 (포그라운드)
python3 -c "
from livereload import Server
import os
server = Server()
server.watch('$SOURCE_DIR', delay=1)
server.serve(port=$PORT, root='$SOURCE_DIR', debug=True)
" &
SERVER_PID=$!
echo $SERVER_PID > "$PID_FILE"
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
    rm -f "$PID_FILE"
    exit 1
fi

# 포그라운드로 대기 (Ctrl+C로 종료 가능)
wait $SERVER_PID
