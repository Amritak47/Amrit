#!/usr/bin/env bash
# =============================================================================
# Amrit — Claude Code Environment Setup
# =============================================================================
# Installs the full AI-augmented development stack on any machine running
# Claude Code CLI. Run once per machine/user account.
#
# What this installs:
#   1. uipro-cli            — UI/UX Pro Max skill (67 styles, 161 palettes)
#   2. superpowers          — Agentic dev methodology (TDD, debugging, code review)
#   3. everything-claude-code — Full agent harness (140 skills, 38 agents)
#   4. claude-mem           — Persistent cross-session memory
#   5. browser-use          — Browser automation skill + CLI
#   6. n8n-mcp              — n8n workflow MCP server (1,396 nodes, 2,709 templates)
#   7. sequential-thinking  — Structured reasoning MCP (no API key needed)
#   8. context7             — Live library documentation MCP (no API key needed)
#   9. duckduckgo-search    — Web search MCP (no API key needed, completely free)
#  10. postgres             — Database MCP (requires your connection string)
#
# Usage:
#   chmod +x setup.sh && ./setup.sh
#
# Requirements:
#   - Claude Code CLI  (https://claude.ai/code)
#   - Node.js 18+      (https://nodejs.org)
#   - Python 3.11+     (https://python.org)
#   - git
# =============================================================================

set -euo pipefail

# ── Colours ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

info()    { echo -e "${CYAN}[•]${RESET} $*"; }
success() { echo -e "${GREEN}[✓]${RESET} $*"; }
warn()    { echo -e "${YELLOW}[!]${RESET} $*"; }
error()   { echo -e "${RED}[✗]${RESET} $*" >&2; exit 1; }
header()  { echo -e "\n${BOLD}${CYAN}━━━ $* ━━━${RESET}"; }

# ── Prereq checks ─────────────────────────────────────────────────────────────
header "Checking prerequisites"

command -v node    >/dev/null 2>&1 || error "Node.js not found. Install from https://nodejs.org"
command -v npm     >/dev/null 2>&1 || error "npm not found. Install Node.js from https://nodejs.org"
command -v npx     >/dev/null 2>&1 || error "npx not found. Install Node.js from https://nodejs.org"
command -v git     >/dev/null 2>&1 || error "git not found. Install git first."
command -v python3 >/dev/null 2>&1 || error "Python 3 not found. Install from https://python.org"

NODE_VERSION=$(node --version | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  error "Node.js 18+ required. Current: $(node --version)"
fi

PYTHON_VERSION=$(python3 --version | awk '{print $2}' | cut -d. -f1,2 | tr -d '.')
if [ "$PYTHON_VERSION" -lt 311 ]; then
  warn "Python 3.11+ recommended for browser-use. Current: $(python3 --version)"
fi

success "Prerequisites OK (Node $(node --version), Python $(python3 --version))"

# ── uv (Python package manager) ───────────────────────────────────────────────
if ! command -v uv >/dev/null 2>&1; then
  header "Installing uv (Python package manager)"
  curl -LsSf https://astral.sh/uv/install.sh | sh
  export PATH="$HOME/.local/bin:$PATH"
  success "uv installed"
else
  success "uv already installed ($(uv --version))"
fi

# ── Claude skills directory ───────────────────────────────────────────────────
CLAUDE_DIR="$HOME/.claude"
mkdir -p "$CLAUDE_DIR/skills"

# ── 1. UI/UX Pro Max ──────────────────────────────────────────────────────────
header "1/6  UI/UX Pro Max (uipro-cli)"
cd "$HOME"
npx --yes uipro-cli@latest init --ai claude --offline
success "UI/UX Pro Max installed → ~/.claude/skills/ui-ux-pro-max/"

# ── 2. Superpowers ────────────────────────────────────────────────────────────
header "2/6  Superpowers (obra/superpowers)"
TMP_SP=$(mktemp -d)
git clone --depth=1 https://github.com/obra/superpowers.git "$TMP_SP"
cp -r "$TMP_SP/skills/"* "$CLAUDE_DIR/skills/"
rm -rf "$TMP_SP"
success "Superpowers installed (14 skills) → ~/.claude/skills/"

# ── 3. Everything Claude Code ─────────────────────────────────────────────────
header "3/6  Everything Claude Code (affaan-m/everything-claude-code)"
TMP_ECC=$(mktemp -d)
git clone --depth=1 https://github.com/affaan-m/everything-claude-code.git "$TMP_ECC"
cd "$TMP_ECC"
npm install --no-audit --no-fund --loglevel=error
node scripts/install-apply.js --profile full --target claude
cd "$HOME"
rm -rf "$TMP_ECC"
success "Everything Claude Code installed (140 skills, 38 agents, 72 commands)"

# ── 4. claude-mem ─────────────────────────────────────────────────────────────
header "4/6  claude-mem (persistent memory)"
npx --yes claude-mem install
success "claude-mem installed"

# ── 5. browser-use ────────────────────────────────────────────────────────────
header "5/6  browser-use (browser automation)"
mkdir -p "$CLAUDE_DIR/skills/browser-use"
curl -fsSL -o "$CLAUDE_DIR/skills/browser-use/SKILL.md" \
  https://raw.githubusercontent.com/browser-use/browser-use/main/skills/browser-use/SKILL.md
success "browser-use skill installed → ~/.claude/skills/browser-use/"
export PATH="$HOME/.local/bin:$PATH"
if command -v uv >/dev/null 2>&1; then
  uv tool install browser-use 2>&1 | tail -3 || warn "browser-use CLI install had warnings (continuing)"
  success "browser-use CLI installed (run: uvx browser-use install — to add Chromium)"
else
  warn "uv not found — run: uv tool install browser-use after installing uv"
fi

# ── 6. MCP Servers ────────────────────────────────────────────────────────────
header "6/6  MCP Servers (n8n, search, reasoning, docs, database)"

npx --yes n8n-mcp telemetry disable >/dev/null 2>&1 || true

MCP_FILE="$CLAUDE_DIR/.mcp.json"

# Write full MCP config (merge if file already exists)
if [ -f "$MCP_FILE" ]; then
  node -e "
    const fs = require('fs');
    const cfg = JSON.parse(fs.readFileSync('$MCP_FILE', 'utf8'));
    cfg.mcpServers = cfg.mcpServers || {};
    const servers = {
      'n8n-mcp': {
        command: 'npx', args: ['n8n-mcp'],
        env: { MCP_MODE: 'stdio', LOG_LEVEL: 'error', DISABLE_CONSOLE_OUTPUT: 'true' }
      },
      'sequential-thinking': {
        command: 'npx', args: ['-y', '@modelcontextprotocol/server-sequential-thinking']
      },
      'duckduckgo-search': {
        command: 'npx', args: ['-y', 'duck-duck-mcp']
      },
      'context7': {
        command: 'npx', args: ['-y', '@upstash/context7-mcp']
      },
      'postgres': {
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-postgres', 'postgresql://user:password@localhost:5432/mydb']
      }
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
      "env": {
        "MCP_MODE": "stdio",
        "LOG_LEVEL": "error",
        "DISABLE_CONSOLE_OUTPUT": "true"
      }
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
info "  ✓ n8n-mcp             — 1,396 n8n nodes, 2,709 templates"
info "  ✓ sequential-thinking — structured reasoning"
info "  ✓ duckduckgo-search   — web search, no API key needed"
info "  ✓ context7            — live library documentation"
info "  ⚠ postgres            — edit ~/.claude/.mcp.json with your DB connection string"

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}${GREEN}════════════════════════════════════════${RESET}"
echo -e "${BOLD}${GREEN}  Setup complete!${RESET}"
echo -e "${BOLD}${GREEN}════════════════════════════════════════${RESET}"
echo ""
echo -e "${BOLD}Installed stack:${RESET}"
echo "  ✓ UI/UX Pro Max        — design intelligence (67 styles, 161 palettes)"
echo "  ✓ Superpowers          — agentic methodology (TDD, debug, code review)"
echo "  ✓ Everything CC        — full harness (140 skills, 38 agents, 72 commands)"
echo "  ✓ claude-mem           — persistent cross-session memory"
echo "  ✓ browser-use          — browser automation skill + CLI"
echo "  ✓ n8n-mcp              — n8n workflow MCP server (1,396 nodes)"
echo "  ✓ sequential-thinking  — structured reasoning MCP"
echo "  ✓ duckduckgo-search    — web search MCP (free, no API key)"
echo "  ✓ context7             — live library documentation MCP"
echo "  ⚠ postgres             — add your DB connection string when ready"
echo ""
echo -e "${BOLD}One optional step:${RESET}"
echo "  Edit ~/.claude/.mcp.json → replace the postgres connection string with yours"
echo "  (skip this if you don't have a database project yet)"
echo ""
echo -e "${BOLD}Next steps:${RESET}"
echo "  1. Start a new Claude Code session — everything activates automatically"
echo "  2. Run \`uvx browser-use install\` to add Chromium for browser automation"
echo ""
echo -e "${CYAN}Repo: https://github.com/amritak47/amrit${RESET}"
echo ""
