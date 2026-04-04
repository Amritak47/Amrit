#!/usr/bin/env node
'use strict';

const { runInit } = require('../src/commands/init');

const USAGE = `
Usage: uipro <command> [options]

Commands:
  init    Install AI editor skills

Options:
  --ai <name>   AI editor target: claude, cursor  (required for init)
  --global      Install to the user home directory instead of current project
  --help, -h    Show this help message

Examples:
  uipro init --ai claude --global   # Install to ~/.claude/skills/
  uipro init --ai cursor --global   # Install to ~/.cursor/skills/
  uipro init --ai claude            # Install to ./.claude/skills/
`.trim();

function parseArgs(argv) {
  const args = argv.slice(2);
  const result = { command: null, ai: null, global: false };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      result.help = true;
    } else if (arg === '--global') {
      result.global = true;
    } else if (arg === '--ai') {
      result.ai = args[++i];
    } else if (arg.startsWith('--ai=')) {
      result.ai = arg.slice('--ai='.length);
    } else if (!arg.startsWith('-') && !result.command) {
      result.command = arg;
    }
  }

  return result;
}

function main() {
  const args = parseArgs(process.argv);

  if (args.help || !args.command) {
    console.log(USAGE);
    process.exit(args.help ? 0 : 1);
  }

  if (args.command === 'init') {
    try {
      runInit({ ai: args.ai, global: args.global });
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
    return;
  }

  console.error(`Unknown command: "${args.command}"\n`);
  console.error(USAGE);
  process.exit(1);
}

main();
