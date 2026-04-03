#!/usr/bin/env python3
"""
AICE 모의고사 정적 웹사이트용 HTTP 서버
SO_REUSEADDR 옵션을 사용하여 포트 재사용을 허용합니다.
"""

import http.server
import socketserver
import sys
import os

PORT = 53500


class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True


if __name__ == "__main__":
    # prj_source 디렉토리로 이동
    script_dir = os.path.dirname(os.path.abspath(__file__))
    source_dir = os.path.join(script_dir, "prj_source")

    if os.path.exists(source_dir):
        os.chdir(source_dir)
    else:
        print(f"오류: prj_source 디렉토리를 찾을 수 없습니다: {source_dir}")
        sys.exit(1)

    handler = http.server.SimpleHTTPRequestHandler

    try:
        with ReusableTCPServer(("", PORT), handler) as httpd:
            print(f"==========================================")
            print(f"AICE 모의고사 - Vanilla JS 정적 웹사이트")
            print(f"==========================================")
            print(f"서버가 포트 {PORT}에서 시작되었습니다.")
            print(f"접속 URL: http://localhost:{PORT}")
            print(f"종료하려면 Ctrl+C를 누르세요.")
            print()
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n서버가 종료되었습니다.")
        sys.exit(0)
    except OSError as e:
        print(f"서버 시작 실패: {e}")
        sys.exit(1)
