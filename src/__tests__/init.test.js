'use strict';

const assert = require('assert');
const { test } = require('node:test');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { runInit, resolveDestDir, SUPPORTED_AI } = require('../commands/init');

test('SUPPORTED_AI includes claude and cursor', () => {
  assert.ok(SUPPORTED_AI.includes('claude'));
  assert.ok(SUPPORTED_AI.includes('cursor'));
});

test('resolveDestDir --global for claude returns ~/.claude/skills', () => {
  const dir = resolveDestDir('claude', true);
  assert.strictEqual(dir, path.join(os.homedir(), '.claude', 'skills'));
});

test('resolveDestDir --global for cursor returns ~/.cursor/skills', () => {
  const dir = resolveDestDir('cursor', true);
  assert.strictEqual(dir, path.join(os.homedir(), '.cursor', 'skills'));
});

test('resolveDestDir local for claude returns .claude/skills under cwd', () => {
  const dir = resolveDestDir('claude', false);
  assert.strictEqual(dir, path.resolve(process.cwd(), '.claude', 'skills'));
});

test('runInit throws on missing --ai flag', () => {
  assert.throws(
    () => runInit({ ai: null, global: false }),
    /Missing required flag: --ai/
  );
});

test('runInit throws on unsupported AI target', () => {
  assert.throws(
    () => runInit({ ai: 'unknown-editor', global: false }),
    /Unsupported AI target/
  );
});

test('runInit installs claude skills to temp directory', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uipro-test-'));
  const destDir = path.join(tmpDir, 'claude-skills');

  // Patch resolveDestDir indirectly by using local (non-global) mode
  // and controlling cwd via a wrapper — instead, test via direct copySkills
  // by invoking runInit with a mocked structure.
  // For simplicity, verify runInit succeeds without throwing when ai is valid.
  // We redirect the output by checking the destination directory contains files.

  const origDir = process.cwd();
  try {
    process.chdir(tmpDir);
    runInit({ ai: 'claude', global: false });
    const installed = path.join(tmpDir, '.claude', 'skills');
    const files = fs.readdirSync(installed);
    assert.ok(files.length > 0, 'At least one skill file should be installed');
    assert.ok(files.includes('uipro.md'), 'uipro.md should be installed');
  } finally {
    process.chdir(origDir);
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('runInit installs cursor skills to temp directory', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uipro-test-'));

  const origDir = process.cwd();
  try {
    process.chdir(tmpDir);
    runInit({ ai: 'cursor', global: false });
    const installed = path.join(tmpDir, '.cursor', 'skills');
    const files = fs.readdirSync(installed);
    assert.ok(files.length > 0, 'At least one skill file should be installed');
    assert.ok(files.includes('uipro.md'), 'uipro.md should be installed');
  } finally {
    process.chdir(origDir);
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('runInit accepts case-insensitive AI name', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uipro-test-'));
  const origDir = process.cwd();
  try {
    process.chdir(tmpDir);
    assert.doesNotThrow(() => runInit({ ai: 'Claude', global: false }));
  } finally {
    process.chdir(origDir);
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
