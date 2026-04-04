'use strict';

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// All platforms supported by uipro-cli (ui-ux-pro-max-skill)
const SUPPORTED_AI = [
  'claude', 'cursor', 'windsurf', 'antigravity', 'copilot', 'kiro',
  'roocode', 'codex', 'qoder', 'gemini', 'trae', 'opencode', 'continue',
  'codebuddy', 'droid', 'kilocode', 'warp', 'augment', 'all',
];

// Root dirs written by uipro-cli per platform (for --global path reporting)
const PLATFORM_ROOTS = {
  claude: ['.claude'],
  cursor: ['.cursor', '.shared'],
  windsurf: ['.windsurf', '.shared'],
  antigravity: ['.agents', '.shared'],
  copilot: ['.github', '.shared'],
  kiro: ['.kiro', '.shared'],
  roocode: ['.roo', '.shared'],
  codex: ['.codex'],
  qoder: ['.qoder', '.shared'],
  gemini: ['.gemini', '.shared'],
  trae: ['.trae', '.shared'],
  opencode: ['.opencode', '.shared'],
  continue: ['.continue'],
  codebuddy: ['.codebuddy'],
  droid: ['.factory'],
  kilocode: ['.kilocode', '.shared'],
  warp: ['.warp', '.shared'],
  augment: ['.augment', '.shared'],
  all: [],
};

function resolveDestDir(ai, isGlobal) {
  const roots = PLATFORM_ROOTS[ai] || [];
  const base = isGlobal ? os.homedir() : process.cwd();
  return roots.map(r => path.join(base, r));
}

function runInit({ ai, global: isGlobal, force, offline }) {
  if (!ai) {
    throw new Error(
      `Missing required flag: --ai <name>\nSupported values: ${SUPPORTED_AI.join(', ')}`
    );
  }

  const normalizedAi = ai.toLowerCase();
  if (!SUPPORTED_AI.includes(normalizedAi)) {
    throw new Error(
      `Unsupported AI target: "${ai}"\nSupported values: ${SUPPORTED_AI.join(', ')}`
    );
  }

  // Build uipro-cli args
  const args = ['npx', '--yes', 'uipro-cli@latest', 'init', '--ai', normalizedAi];
  if (force) args.push('--force');
  if (offline) args.push('--offline');

  // For --global: run from home dir so uipro-cli writes to ~/.claude etc.
  const cwd = isGlobal ? os.homedir() : process.cwd();

  try {
    execSync(args.join(' '), { cwd, stdio: 'inherit' });
  } catch (err) {
    throw new Error(`uipro-cli failed: ${err.message}`);
  }
}

module.exports = { runInit, resolveDestDir, SUPPORTED_AI };
