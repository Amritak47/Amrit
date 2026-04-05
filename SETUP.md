# Setup — Claude Code Environment

One command to install the full AI dev stack on any machine.

## Pick your OS

### Mac (Personal Laptop)
```bash
git clone https://github.com/amritak47/amrit.git
cd amrit
chmod +x setup-mac.sh && ./setup-mac.sh
```
Auto-installs Homebrew, Node.js, Python, uv if missing.

---

### Windows (Work Laptop)
Open **PowerShell as Administrator**, then:
```powershell
# Allow scripts to run (one-time)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Clone and run
git clone https://github.com/amritak47/amrit.git
cd amrit
.\setup-windows.ps1
```
Auto-installs Node.js, Python, git, uv via winget if missing.

---

### Linux (Server / WSL)
```bash
git clone https://github.com/amritak47/amrit.git
cd amrit
chmod +x setup-linux.sh && ./setup-linux.sh
```

---

## What gets installed

| Tool | Purpose |
|------|---------|
| UI/UX Pro Max | Design intelligence — 67 styles, 161 palettes, 57 font pairings |
| Superpowers | Agentic methodology — TDD, debugging, code review workflows |
| Everything Claude Code | Full harness — 140 skills, 38 agents, 72 commands |
| claude-mem | Persistent memory across sessions |
| browser-use | Browser automation skill + CLI |
| n8n-mcp | n8n workflow MCP — 1,396 nodes, 2,709 templates |
| sequential-thinking | Structured reasoning MCP |
| duckduckgo-search | Web search MCP (free, no API key) |
| context7 | Live library documentation MCP |
| postgres | Database MCP (add your connection string when ready) |

## After install

1. Start a new Claude Code session — everything activates automatically
2. Run `uvx browser-use install` to add Chromium for browser automation
3. Edit `~/.claude/.mcp.json` to add your postgres connection string when you have a DB

## Requirements

- [Claude Code CLI](https://claude.ai/code)
- Node.js 18+ (auto-installed on Mac/Windows)
- Python 3.11+ (auto-installed on Mac/Windows)
- git (auto-installed on Mac/Windows)
