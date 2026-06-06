#!/usr/bin/env bash
set -euo pipefail

# ── 1. Install Python deps ──
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# ── 2. Systemd service ──
SERVICE_NAME="oraculoai-chatbot"
SERVICE_FILE="/etc/systemd/system/${SERVICE_NAME}.service"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
USER_NAME="${SUDO_USER:-$(whoami)}"

sudo tee "$SERVICE_FILE" > /dev/null <<SERVICEEOF
[Unit]
Description=OraculoAI Chatbot API (FastAPI + Ollama)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=$USER_NAME
WorkingDirectory=$SCRIPT_DIR
Environment=PATH=$SCRIPT_DIR/venv/bin:/usr/local/bin:/usr/bin
ExecStart=$SCRIPT_DIR/venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
SERVICEEOF

sudo systemctl daemon-reload
sudo systemctl enable --now "$SERVICE_NAME"

echo "✓ Chatbot API rodando em http://127.0.0.1:8000"
