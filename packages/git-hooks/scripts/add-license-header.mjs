#!/usr/bin/env node

// Prepends a proprietary license header to staged source files that are
// missing it. Configurable via `coverit-hooks.config.json` in the repo root.
//
// Usage: npx coverit-add-license-header
//
// Config example (all fields optional):
//
//   {
//     "licenseHeader": {
//       "copyrightHolder": "CoverIt Labs",
//       "extensions": [".ts", ".tsx", ".js", ".jsx", ".mts", ".mjs", ".css"]
//     }
//   }

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { extname, resolve } from 'path';

// Defaults
const DEFAULTS = {
  copyrightHolder: 'CoverIt Labs',
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.mts', '.mjs', '.css', '.scss', '.sass', '.py', '.sh', '.rb', '.yml', '.yaml']
};

// Load config
function loadConfig() {
  const configPath = resolve(process.cwd(), 'coverit-hooks.config.json');
  if (!existsSync(configPath)) return {};
  try {
    return JSON.parse(readFileSync(configPath, 'utf8'));
  } catch {
    console.warn('[license] Failed to parse coverit-hooks.config.json — using defaults.');
    return {};
  }
}

const config = loadConfig();
const holder = config.licenseHeader?.copyrightHolder ?? DEFAULTS.copyrightHolder;
const year = new Date().getFullYear();
const extensions = new Set(config.licenseHeader?.extensions ?? DEFAULTS.extensions);


// Header templates
function jsHeader() {
  return [
    `// Copyright (c) ${year} ${holder}. All Rights Reserved.`,
    '// Proprietary and confidential. Unauthorized use is strictly prohibited.',
    '// See LICENSE file in the project root for full license information.',
  ].join('\n');
}

function cssHeader() {
  return [
    `/* Copyright (c) ${year} ${holder}. All Rights Reserved.`,
    ' * Proprietary and confidential. Unauthorized use is strictly prohibited.',
    ' * See LICENSE file in the project root for full license information.',
    ' */',
  ].join('\n');
}

function hashHeader() {
  return [
    `# Copyright (c) ${year} ${holder}. All Rights Reserved.`,
    '# Proprietary and confidential. Unauthorized use is strictly prohibited.',
    '# See LICENSE file in the project root for full license information.',
  ].join('\n');
}

function headerFor(ext) {
  if (ext === '.css' || ext === '.scss' || ext === '.sass') return cssHeader();
  if (ext === '.py' || ext === '.sh' || ext === '.rb' || ext === '.yml' || ext === '.yaml') return hashHeader();
  return jsHeader();
}

function markerFor(ext) {
  if (ext === '.css' || ext === '.scss' || ext === '.sass') return '/* Copyright (c)';
  if (ext === '.py' || ext === '.sh' || ext === '.rb' || ext === '.yml' || ext === '.yaml') return '# Copyright (c)';
  return '// Copyright (c)';
}

// Logic
let stagedFiles;
try {
  stagedFiles = execSync('git diff --cached --name-only --diff-filter=ACM', {
    encoding: 'utf8',
  })
    .split('\n')
    .map((f) => f.trim())
    .filter((f) => f.length > 0 && extensions.has(extname(f)));
} catch {
  process.exit(0);
}

if (stagedFiles.length === 0) {
  process.exit(0);
}

let modified = 0;

for (const file of stagedFiles) {
  let content;
  try {
    content = readFileSync(file, 'utf8');
  } catch {
    continue;
  }

  const ext = extname(file);
  const marker = markerFor(ext);

  if (content.trimStart().startsWith(marker)) continue;

  const header = headerFor(ext);

  // Preserve shebangs on the very first line.
  if (content.startsWith('#!')) {
    const newline = content.indexOf('\n');
    const shebang = content.slice(0, newline + 1);
    const rest = content.slice(newline + 1);
    writeFileSync(file, `${shebang}\n${header}\n\n${rest}`, 'utf8');
  } else {
    writeFileSync(file, `${header}\n\n${content}`, 'utf8');
  }

  execSync(`git add "${file}"`);
  console.log(`[license] Header added → ${file}`);
  modified++;
}

if (modified > 0) {
  console.log(`[license] ${modified} file(s) updated with license header.`);
} else {
  console.log('[license] All staged files already have the license header.');
}

process.exit(0);
