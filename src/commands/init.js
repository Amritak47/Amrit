'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const AI_TARGETS = {
  claude: {
    globalDir: path.join(os.homedir(), '.claude', 'skills'),
    localDir: path.join('.claude', 'skills'),
    skillsSource: path.join(__dirname, '..', 'skills', 'claude'),
  },
  cursor: {
    globalDir: path.join(os.homedir(), '.cursor', 'skills'),
    localDir: path.join('.cursor', 'skills'),
    skillsSource: path.join(__dirname, '..', 'skills', 'cursor'),
  },
};

const SUPPORTED_AI = Object.keys(AI_TARGETS);

function resolveDestDir(ai, isGlobal) {
  const target = AI_TARGETS[ai];
  return isGlobal ? target.globalDir : path.resolve(process.cwd(), target.localDir);
}

function copySkills(sourceDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });

  const files = fs.readdirSync(sourceDir);
  const copied = [];

  for (const file of files) {
    const src = path.join(sourceDir, file);
    const dest = path.join(destDir, file);
    const stat = fs.statSync(src);

    if (stat.isFile()) {
      fs.copyFileSync(src, dest);
      copied.push(dest);
    }
  }

  return copied;
}

function runInit({ ai, global: isGlobal }) {
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

  const target = AI_TARGETS[normalizedAi];
  const destDir = resolveDestDir(normalizedAi, isGlobal);

  const copied = copySkills(target.skillsSource, destDir);

  console.log(`uipro skills installed for ${normalizedAi}`);
  console.log(`  Destination: ${destDir}`);
  for (const file of copied) {
    console.log(`  + ${path.basename(file)}`);
  }
}

module.exports = { runInit, resolveDestDir, SUPPORTED_AI };
