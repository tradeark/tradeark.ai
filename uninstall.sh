#!/usr/bin/env bash

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DEFAULT_SYSTEM_INSTALL_DIR="/usr/local/bin"
DEFAULT_USER_INSTALL_DIR="$HOME/.local/bin"
INSTALL_DIR="${TRADEARK_INSTALL_DIR:-}"
DATA_DIR="${TRADEARK_DATA_DIR:-$HOME/.tradeark}"
BINARY_NAME="tradeark"
AUTO_CONFIRM=0
NON_INTERACTIVE=0
REMOVE_DATA=0

usage() {
    cat <<'EOF'
Usage: uninstall.sh [options]

Removes the local TradeArk service, installed binary, and registered local-agent skills.
Local data is kept by default.

Options:
  -y, --yes               Skip confirmation prompts.
  --non-interactive       Same as --yes.
  --install-dir <path>    Install directory that contains the tradeark binary.
  --data-dir <path>       TradeArk data directory. Defaults to ~/.tradeark.
  --remove-data           Also remove the TradeArk data directory.
  --keep-data             Keep local data. This is the default.
  -h, --help              Show this help.
EOF
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        -y|--yes)
            AUTO_CONFIRM=1
            shift
            ;;
        --non-interactive)
            AUTO_CONFIRM=1
            NON_INTERACTIVE=1
            shift
            ;;
        --install-dir)
            INSTALL_DIR="${2:-}"
            if [[ -z "$INSTALL_DIR" ]]; then
                echo "Missing value for --install-dir" >&2
                exit 1
            fi
            shift 2
            ;;
        --data-dir)
            DATA_DIR="${2:-}"
            if [[ -z "$DATA_DIR" ]]; then
                echo "Missing value for --data-dir" >&2
                exit 1
            fi
            shift 2
            ;;
        --remove-data)
            REMOVE_DATA=1
            shift
            ;;
        --keep-data)
            REMOVE_DATA=0
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            echo "Unknown option: $1" >&2
            usage >&2
            exit 1
            ;;
    esac
done

if [[ -z "$INSTALL_DIR" ]]; then
    if [[ "$(id -u)" -eq 0 ]]; then
        INSTALL_DIR="$DEFAULT_SYSTEM_INSTALL_DIR"
    else
        INSTALL_DIR="$DEFAULT_USER_INSTALL_DIR"
    fi
fi

SUDO=""
if [[ "$(id -u)" -ne 0 && "$INSTALL_DIR" == "$DEFAULT_SYSTEM_INSTALL_DIR" ]]; then
    if command -v sudo >/dev/null 2>&1; then
        SUDO="sudo"
    else
        echo "sudo is required to remove $INSTALL_DIR/$BINARY_NAME" >&2
        exit 1
    fi
fi

confirm() {
    local prompt="$1"
    if [[ "$AUTO_CONFIRM" -eq 1 || "$NON_INTERACTIVE" -eq 1 ]]; then
        return 0
    fi
    read -r -p "$prompt [y/N] " reply
    [[ "$reply" == "y" || "$reply" == "Y" || "$reply" == "yes" || "$reply" == "YES" ]]
}

find_binary() {
    local install_binary="$INSTALL_DIR/$BINARY_NAME"
    if [[ -x "$install_binary" ]]; then
        printf '%s\n' "$install_binary"
        return 0
    fi
    if command -v "$BINARY_NAME" >/dev/null 2>&1; then
        command -v "$BINARY_NAME"
        return 0
    fi
    return 1
}

remove_file_if_exists() {
    local path="$1"
    if [[ -e "$path" || -L "$path" ]]; then
        if [[ -n "$SUDO" && "$path" == "$DEFAULT_SYSTEM_INSTALL_DIR/"* ]]; then
            $SUDO rm -f -- "$path"
        else
            rm -f -- "$path"
        fi
        echo "Removed $path"
    fi
}

safe_remove_dir() {
    local path="$1"
    [[ -n "$path" ]] || return 0
    case "$path" in
        "$HOME/.tradeark"|"$HOME/.codex/skills/tradeark-local"|"$HOME/.openclaw/plugin-skills/tradeark-local"|"$HOME/.config/opencode/skills/tradeark-local"|"$HOME/.claude/skills/tradeark-local"|"$HOME/.agents/skills/tradeark-local")
            if [[ -d "$path" ]]; then
                rm -rf -- "$path"
                echo "Removed $path"
            fi
            ;;
        *)
            echo "Refusing to recursively remove unexpected path: $path" >&2
            ;;
    esac
}

uninstall_service() {
    local binary="${1:-}"
    if [[ -n "$binary" && -x "$binary" ]]; then
        "$binary" service uninstall >/dev/null 2>&1 || true
    fi

    if command -v systemctl >/dev/null 2>&1; then
        systemctl --user disable --now tradeark.service >/dev/null 2>&1 || true
        rm -f -- "${XDG_CONFIG_HOME:-$HOME/.config}/systemd/user/tradeark.service" 2>/dev/null || true
        systemctl --user daemon-reload >/dev/null 2>&1 || true

        if [[ "$(id -u)" -eq 0 ]]; then
            systemctl disable --now tradeark.service >/dev/null 2>&1 || true
            rm -f -- /etc/systemd/system/tradeark.service 2>/dev/null || true
            systemctl daemon-reload >/dev/null 2>&1 || true
        fi
    fi

    if command -v launchctl >/dev/null 2>&1; then
        launchctl bootout "gui/$(id -u)" "$HOME/Library/LaunchAgents/io.tradeark.local.plist" >/dev/null 2>&1 || true
        rm -f -- "$HOME/Library/LaunchAgents/io.tradeark.local.plist" 2>/dev/null || true
    fi
}

echo -e "${BLUE}TradeArk uninstaller${NC}"
echo "Install directory: $INSTALL_DIR"
echo "Data directory:    $DATA_DIR"
if [[ "$REMOVE_DATA" -eq 1 ]]; then
    echo -e "${YELLOW}Local data will be removed.${NC}"
else
    echo "Local data will be kept."
fi

if ! confirm "Continue uninstalling TradeArk?"; then
    echo "Cancelled."
    exit 0
fi

BINARY_PATH=""
if BINARY_PATH="$(find_binary 2>/dev/null)"; then
    uninstall_service "$BINARY_PATH"
else
    uninstall_service ""
fi

remove_file_if_exists "$INSTALL_DIR/$BINARY_NAME"

for skill_dir in \
    "$HOME/.codex/skills/tradeark-local" \
    "$HOME/.openclaw/plugin-skills/tradeark-local" \
    "$HOME/.config/opencode/skills/tradeark-local" \
    "$HOME/.claude/skills/tradeark-local" \
    "$HOME/.agents/skills/tradeark-local"; do
    safe_remove_dir "$skill_dir"
done

if [[ "$REMOVE_DATA" -eq 1 ]]; then
    if [[ "$DATA_DIR" == "$HOME/.tradeark" ]]; then
        safe_remove_dir "$DATA_DIR"
    else
        echo "Custom data directory was not removed automatically: $DATA_DIR"
        echo "Remove it manually after verifying the path."
    fi
fi

echo -e "${GREEN}TradeArk uninstall complete.${NC}"
if [[ "$REMOVE_DATA" -ne 1 ]]; then
    echo "Kept local data at: $DATA_DIR"
fi
