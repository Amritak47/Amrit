# Amrit

Personal Claude Code environment — a curated AI development stack installable on any machine with a single command.

## Quick Start

Clone the repo and run the script for your OS:

**Mac**
```bash
git clone https://github.com/amritak47/amrit.git
cd amrit
chmod +x setup-mac.sh && ./setup-mac.sh
```

**Windows** (PowerShell as Administrator)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
git clone https://github.com/amritak47/amrit.git
cd amrit
.\setup-windows.ps1
```

**Linux**
```bash
git clone https://github.com/amritak47/amrit.git
cd amrit
chmod +x setup-linux.sh && ./setup-linux.sh
```

---

## What Gets Installed

### Skills & Agents
| Tool | Description |
|------|-------------|
| [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Design intelligence — 67 UI styles, 161 colour palettes, 57 font pairings |
| [Superpowers](https://github.com/obra/superpowers) | Agentic methodology — TDD, debugging, code review workflows |
| [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) | Full harness — 140 skills, 38 agents, 72 commands |
| [claude-mem](https://github.com/thedotmack/claude-mem) | Persistent memory across sessions |
| [browser-use](https://github.com/browser-use/browser-use) | Browser automation skill + CLI |

### MCP Servers
| Server | Description |
|--------|-------------|
| [n8n-mcp](https://github.com/czlonkowski/n8n-mcp) | 1,396 n8n nodes, 2,709 workflow templates |
| sequential-thinking | Structured reasoning for complex problems |
| duckduckgo-search | Web search — free, no API key required |
| context7 | Live library documentation |
| postgres | Direct database access (add your connection string) |

---

## uipro CLI

Install the UI/UX Pro Max skill for any AI editor:

```bash
npx uipro init --ai claude --global    # → ~/.claude/skills/
npx uipro init --ai cursor --global    # → ~/.cursor/skills/
npx uipro init --ai windsurf --global  # → ~/.windsurf/skills/
```

Supports 19 editors: `claude`, `cursor`, `windsurf`, `copilot`, `kiro`, `roocode`, `codex`, `qoder`, `gemini`, `trae`, `opencode`, `continue`, `codebuddy`, `droid`, `kilocode`, `warp`, `augment`, `all`.

---

## After Setup

1. Start a new Claude Code session — all skills and MCP servers activate automatically
2. Run `uvx browser-use install` to add Chromium for browser automation
3. Edit `~/.claude/.mcp.json` to add your Postgres connection string when needed

---

## Requirements

- [Claude Code CLI](https://claude.ai/code)
- Node.js 18+ · Python 3.11+ · git

All other dependencies (Homebrew, uv, winget packages) are installed automatically by the setup scripts.
