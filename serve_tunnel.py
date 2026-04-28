"""
Crisis Response PWA -- Local Server + Cloudflare Quick Tunnel
Run: python -u serve_tunnel.py
"""

import sys
import os
import threading
import subprocess
import http.server
import socketserver
import socket
import re
import urllib.request

PORT = 8080
SERVE_DIR = os.path.dirname(os.path.abspath(__file__))
CLOUDFLARED_DIR = os.path.join(SERVE_DIR, '.cloudflared')
CLOUDFLARED_EXE = os.path.join(CLOUDFLARED_DIR, 'cloudflared.exe')

def pr(msg):
    """Print and flush immediately (avoids Windows buffering)."""
    print(msg, flush=True)

# --------------------------------------------------------------------------
# PWA HTTP handler — correct MIME types + SW headers
# --------------------------------------------------------------------------
class PWAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=SERVE_DIR, **kwargs)

    def guess_type(self, path):
        mime, enc = super().guess_type(path)
        if str(path).endswith('.js'):
            return 'application/javascript', enc
        if str(path).endswith('.json'):
            return 'application/json', enc
        return mime, enc

    def end_headers(self):
        self.send_header('Service-Worker-Allowed', '/')
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

    def log_message(self, fmt, *args):
        pass

# --------------------------------------------------------------------------
# Start HTTP server in daemon thread
# --------------------------------------------------------------------------
def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('', PORT), PWAHandler) as httpd:
        httpd.serve_forever()

threading.Thread(target=start_server, daemon=True).start()
pr(f'[Server] Serving on http://localhost:{PORT}')

# LAN IP for same-network devices
try:
    lan_ip = socket.gethostbyname(socket.gethostname())
except Exception:
    lan_ip = '127.0.0.1'

# --------------------------------------------------------------------------
# Download cloudflared.exe once
# --------------------------------------------------------------------------
if not os.path.exists(CLOUDFLARED_EXE):
    os.makedirs(CLOUDFLARED_DIR, exist_ok=True)
    CF_URL = ('https://github.com/cloudflare/cloudflared/releases/'
              'latest/download/cloudflared-windows-amd64.exe')
    pr('[Setup] Downloading cloudflared (~35 MB, one-time only)...')
    try:
        urllib.request.urlretrieve(CF_URL, CLOUDFLARED_EXE)
        pr('[Setup] cloudflared downloaded.')
    except Exception as e:
        pr(f'[Setup] ERROR: {e}')
        pr(f'\n  Local : http://localhost:{PORT}/crisis_dashboard.html')
        pr(f'  LAN   : http://{lan_ip}:{PORT}/crisis_dashboard.html')
        input('\nPress Enter to stop...')
        sys.exit(0)
else:
    pr('[Setup] cloudflared already present.')

# --------------------------------------------------------------------------
# Launch tunnel and parse URL
# --------------------------------------------------------------------------
pr('[Tunnel] Starting Cloudflare Quick Tunnel...')

proc = subprocess.Popen(
    [CLOUDFLARED_EXE, 'tunnel', '--url', f'http://localhost:{PORT}'],
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    bufsize=1,        # line-buffered
    text=True,
    encoding='utf-8',
    errors='replace'
)

public_url = None
pr('[Tunnel] Waiting for URL...')
for line in proc.stdout:
    line = line.strip()
    if line:
        pr(f'  [cf] {line}')
    m = re.search(r'https://[a-zA-Z0-9\-]+\.trycloudflare\.com', line)
    if m:
        public_url = m.group(0)
        break

sep = '-' * 64
if public_url:
    dashboard_url = f'{public_url}/crisis_dashboard.html'
    pr(f'\n{sep}')
    pr('  CRISIS RESPONSE PWA -- LIVE')
    pr(sep)
    pr(f'\n  [Mobile URL]  {dashboard_url}')
    pr(f'  [Local  URL]  http://localhost:{PORT}/crisis_dashboard.html')
    pr(f'  [LAN    URL]  http://{lan_ip}:{PORT}/crisis_dashboard.html')
    pr('\n  To install on mobile:')
    pr('  1. Open Mobile URL in Chrome (Android) or Safari (iOS)')
    pr('  2. Tap menu -> "Add to Home Screen" / "Install App"')
    pr('  3. Works offline after first load!')
    pr(f'\n{sep}')
    pr('  Press Ctrl+C to stop.\n')
else:
    pr('[Tunnel] No public URL found. Local access only:')
    pr(f'  Local : http://localhost:{PORT}/crisis_dashboard.html')
    pr(f'  LAN   : http://{lan_ip}:{PORT}/crisis_dashboard.html')

try:
    proc.wait()
except KeyboardInterrupt:
    proc.terminate()
    pr('[Server] Stopped.')
