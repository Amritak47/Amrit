'use strict';

const assert = require('assert');
const { test } = require('node:test');
const path = require('path');
const os = require('os');
const { resolveDestDir, SUPPORTED_AI } = require('../commands/init');

test('SUPPORTED_AI includes claude and cursor', () => {
  assert.ok(SUPPORTED_AI.includes('claude'));
  assert.ok(SUPPORTED_AI.includes('cursor'));
});

test('SUPPORTED_AI includes all 19 platforms plus "all"', () => {
  const expected = [
    'claude', 'cursor', 'windsurf', 'antigravity', 'copilot', 'kiro',
    'roocode', 'codex', 'qoder', 'gemini', 'trae', 'opencode', 'continue',
    'codebuddy', 'droid', 'kilocode', 'warp', 'augment', 'all',
  ];
  for (const ai of expected) {
    assert.ok(SUPPORTED_AI.includes(ai), `Expected "${ai}" in SUPPORTED_AI`);
  }
});

test('resolveDestDir --global for claude returns ~/.claude', () => {
  const dirs = resolveDestDir('claude', true);
  assert.deepStrictEqual(dirs, [path.join(os.homedir(), '.claude')]);
});

test('resolveDestDir --global for cursor returns ~/.cursor and ~/.shared', () => {
  const dirs = resolveDestDir('cursor', true);
  assert.deepStrictEqual(dirs, [
    path.join(os.homedir(), '.cursor'),
    path.join(os.homedir(), '.shared'),
  ]);
});

test('resolveDestDir local for claude returns .claude under cwd', () => {
  const dirs = resolveDestDir('claude', false);
  assert.deepStrictEqual(dirs, [path.join(process.cwd(), '.claude')]);
});

test('resolveDestDir local for copilot returns .github and .shared under cwd', () => {
  const dirs = resolveDestDir('copilot', false);
  assert.deepStrictEqual(dirs, [
    path.join(process.cwd(), '.github'),
    path.join(process.cwd(), '.shared'),
  ]);
});

test('runInit throws on missing --ai flag', () => {
  const { runInit } = require('../commands/init');
  assert.throws(
    () => runInit({ ai: null, global: false }),
    /Missing required flag: --ai/
  );
});

test('runInit throws on unsupported AI target', () => {
  const { runInit } = require('../commands/init');
  assert.throws(
    () => runInit({ ai: 'unknown-editor', global: false }),
    /Unsupported AI target/
  );
});
