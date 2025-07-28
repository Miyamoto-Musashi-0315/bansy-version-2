#!/usr/bin/env bash
# Generic entrypoint for Bansy language images.
# Installs production dependencies (if manifest files are present)
# then runs project tests or a supplied main file.
set -euo pipefail
cd /workspace

MAIN_FILE="${1:-}"

install_deps() {
  if [[ -f package.json ]]; then
    echo "[entrypoint] Installing npm packages…"
    npm ci --omit=dev || { echo "[entrypoint] npm install failed"; exit 2; }
  fi

  if [[ -f requirements.txt ]]; then
    echo "[entrypoint] Installing python requirements…"
    pip install --no-cache-dir -r requirements.txt || true
  fi
}

run_tests_or_main() {
  if [[ -n "$MAIN_FILE" && -f "$MAIN_FILE" ]]; then
    echo "[entrypoint] Running main file $MAIN_FILE"
    case "$MAIN_FILE" in
      *.js) node "$MAIN_FILE" ;;
      *.ts) npx ts-node "$MAIN_FILE" ;;
      *.py) python "$MAIN_FILE" ;;
      *) echo "[entrypoint] Unknown file type: $MAIN_FILE"; exit 3 ;;
    esac
    return
  fi

  # Auto-detect common test commands
  if [[ -f jest.config.js || "$(jq -r '.scripts.test' package.json 2>/dev/null)" != "null" ]]; then
    npm test --silent
  elif [[ -d tests || -d test ]]; then
    if command -v pytest &>/dev/null; then
      pytest -q
    fi
  else
    echo "[entrypoint] No test target found and no MAIN_FILE supplied" >&2
    exit 4
  fi
}

install_deps
run_tests_or_main 