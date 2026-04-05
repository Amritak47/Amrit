#!/usr/bin/env bash
# =============================================================================
# Amrit — Claude Code Environment Setup (macOS)
# =============================================================================
# Run once on any Mac to get the full AI-augmented development stack.
#
# What this installs:
#   1. uipro-cli            — UI/UX Pro Max skill (67 styles, 161 palettes)
#   2. superpowers          — Agentic dev methodology (TDD, debugging, code review)
#   3. everything-claude-code — Full agent harness (140 skills, 38 agents)
#   4. claude-mem           — Persistent cross-session memory
#   5. browser-use          — Browser automation skill + CLI
#   6. n8n-mcp              — n8n workflow MCP server (1,396 nodes)
#   7. sequential-thinking  — Structured reasoning MCP
#   8. context7             — Live library documentation MCP
#   9. duckduckgo-search    — Web search MCP (free, no API key)
#  10. postgres             — Database MCP (fill in your connection string)
#
# Usage:
#   chmod +x setup-mac.sh && ./setup-mac.sh
#
# Requirements (auto-installed if missing):
#   - Homebrew, Node.js 18+, Python 3.11+, git, uv
#   - Claude Code CLI: https://claude.ai/code
# =============================================================================

set -euo pipefail

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

info()    { echo -e "${CYAN}[•]${RESET} $*"; }
success() { echo -e "${GREEN}[✓]${RESET} $*"; }
warn()    { echo -e "${YELLOW}[!]${RESET} $*"; }
error()   { echo -e "${RED}[✗]${RESET} $*" >&2; exit 1; }
header()  { echo -e "\n${BOLD}${CYAN}━━━ $* ━━━${RESET}"; }

# ── Homebrew ──────────────────────────────────────────────────────────────────
header "Checking Homebrew"
if ! command -v brew >/dev/null 2>&1; then
  info "Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  # Add brew to PATH for Apple Silicon
  if [ -f /opt/homebrew/bin/brew ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  fi
fi
success "Homebrew $(brew --version | head -1)"

# ── Node.js ───────────────────────────────────────────────────────────────────
header "Checking Node.js"
if ! command -v node >/dev/null 2>&1; then
  info "Installing Node.js via Homebrew..."
  brew install node
elif [ "$(node --version | sed 's/v//' | cut -d. -f1)" -lt 18 ]; then
  info "Upgrading Node.js to 18+..."
  brew upgrade node || brew install node
fi
success "Node.js $(node --version)"

# ── Python 3.11+ ──────────────────────────────────────────────────────────────
header "Checking Python"
PYTHON_BIN=""
for bin in python3.12 python3.11 python3; do
  if command -v "$bin" >/dev/null 2>&1; then
    VER=$("$bin" --version | awk '{print $2}' | cut -d. -f1,2 | tr -d '.')
    if [ "$VER" -ge 311 ]; then
      PYTHON_BIN="$bin"
      break
    fi
  fi
done

if [ -z "$PYTHON_BIN" ]; then
  info "Installing Python 3.11 via Homebrew..."
  brew install python@3.11
  PYTHON_BIN="python3.11"
fi
success "Python $($PYTHON_BIN --version)"

# ── git ───────────────────────────────────────────────────────────────────────
if ! command -v git >/dev/null 2>&1; then
  info "Installing git..."
  brew install git
fi
success "git $(git --version | awk '{print $3}')"

# ── uv ────────────────────────────────────────────────────────────────────────
header "Checking uv"
if ! command -v uv >/dev/null 2>&1; then
  info "Installing uv..."
  curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
  # Also try the brew path
  export PATH="$HOME/.cargo/bin:$PATH"
fi
success "uv $(uv --version)"

CLAUDE_DIR="$HOME/.claude"
mkdir -p "$CLAUDE_DIR/skills"

# ── 1. UI/UX Pro Max ──────────────────────────────────────────────────────────
header "1/6  UI/UX Pro Max"
cd "$HOME"
npx --yes uipro-cli@latest init --ai claude --offline
success "UI/UX Pro Max → ~/.claude/skills/ui-ux-pro-max/"

# ── 2. Superpowers ────────────────────────────────────────────────────────────
header "2/6  Superpowers"
TMP_SP=$(mktemp -d)
git clone --depth=1 https://github.com/obra/superpowers.git "$TMP_SP"
cp -r "$TMP_SP/skills/"* "$CLAUDE_DIR/skills/"
rm -rf "$TMP_SP"
success "Superpowers (14 skills) → ~/.claude/skills/"

# ── 3. Everything Claude Code ─────────────────────────────────────────────────
header "3/6  Everything Claude Code"
TMP_ECC=$(mktemp -d)
git clone --depth=1 https://github.com/affaan-m/everything-claude-code.git "$TMP_ECC"
cd "$TMP_ECC"
npm install --no-audit --no-fund --loglevel=error
node scripts/install-apply.js --profile full --target claude
cd "$HOME"
rm -rf "$TMP_ECC"
success "Everything Claude Code (140 skills, 38 agents, 72 commands)"

# ── 4. claude-mem ─────────────────────────────────────────────────────────────
header "4/6  claude-mem"
npx --yes claude-mem install
success "claude-mem installed"

# ── 5. browser-use ────────────────────────────────────────────────────────────
header "5/6  browser-use"
mkdir -p "$CLAUDE_DIR/skills/browser-use"
curl -fsSL -o "$CLAUDE_DIR/skills/browser-use/SKILL.md" \
  https://raw.githubusercontent.com/browser-use/browser-use/main/skills/browser-use/SKILL.md
success "browser-use skill → ~/.claude/skills/browser-use/"
export PATH="$HOME/.local/bin:$PATH"
uv tool install browser-use 2>&1 | tail -3 || warn "browser-use CLI install had warnings (non-fatal)"
success "browser-use CLI installed"

# ── 6. MCP Servers ────────────────────────────────────────────────────────────
header "6/6  MCP Servers"
npx --yes n8n-mcp telemetry disable >/dev/null 2>&1 || true

MCP_FILE="$CLAUDE_DIR/.mcp.json"
if [ -f "$MCP_FILE" ]; then
  node -e "
    const fs = require('fs');
    const cfg = JSON.parse(fs.readFileSync('$MCP_FILE', 'utf8'));
    cfg.mcpServers = cfg.mcpServers || {};
    const servers = {
      'n8n-mcp': { command: 'npx', args: ['n8n-mcp'], env: { MCP_MODE: 'stdio', LOG_LEVEL: 'error', DISABLE_CONSOLE_OUTPUT: 'true' } },
      'sequential-thinking': { command: 'npx', args: ['-y', '@modelcontextprotocol/server-sequential-thinking'] },
      'duckduckgo-search': { command: 'npx', args: ['-y', 'duck-duck-mcp'] },
      'context7': { command: 'npx', args: ['-y', '@upstash/context7-mcp'] },
      'postgres': { command: 'npx', args: ['-y', '@modelcontextprotocol/server-postgres', 'postgresql://user:password@localhost:5432/mydb'] }
    };
    for (const [k, v] of Object.entries(servers)) {
      if (!cfg.mcpServers[k]) cfg.mcpServers[k] = v;
    }
    fs.writeFileSync('$MCP_FILE', JSON.stringify(cfg, null, 2));
  "
else
  cat > "$MCP_FILE" <<'MCPEOF'
{
  "mcpServers": {
    "n8n-mcp": {
      "command": "npx",
      "args": ["n8n-mcp"],
      "env": { "MCP_MODE": "stdio", "LOG_LEVEL": "error", "DISABLE_CONSOLE_OUTPUT": "true" }
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "duckduckgo-search": {
      "command": "npx",
      "args": ["-y", "duck-duck-mcp"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:password@localhost:5432/mydb"]
    }
  }
}
MCPEOF
fi
success "MCP servers configured → ~/.claude/.mcp.json"

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}${GREEN}════════════════════════════════════════${RESET}"
echo -e "${BOLD}${GREEN}  Mac setup complete!${RESET}"
echo -e "${BOLD}${GREEN}════════════════════════════════════════${RESET}"
echo ""
echo -e "${BOLD}Installed stack:${RESET}"
echo "  ✓ UI/UX Pro Max        — design intelligence"
echo "  ✓ Superpowers          — agentic methodology"
echo "  ✓ Everything CC        — 140 skills, 38 agents, 72 commands"
echo "  ✓ claude-mem           — persistent memory"
echo "  ✓ browser-use          — browser automation"
echo "  ✓ n8n-mcp              — n8n workflow MCP"
echo "  ✓ sequential-thinking  — structured reasoning MCP"
echo "  ✓ duckduckgo-search    — web search MCP"
echo "  ✓ context7             — live docs MCP"
echo "  ⚠ postgres             — edit ~/.claude/.mcp.json with your DB connection string"
echo ""
echo -e "${BOLD}Next steps:${RESET}"
echo "  1. Install Claude Code CLI if not already: https://claude.ai/code"
echo "  2. Start a new Claude Code session"
echo "  3. Run \`uvx browser-use install\` to add Chromium"
echo ""
echo -e "${CYAN}Repo: https://github.com/amritak47/amrit${RESET}"
echo ""
