#!/usr/bin/env node

// Validates that the current branch follows the CoveritLabs naming convention.
//
// Usage: npx coverit-validate-branch
//
// Valid formats: <type>/<slug>
//   Types:  feat, fix, hotfix, chore, docs, release
//   Slug:   lowercase letters, digits, hyphens, dots, underscores
//
// Long-lived branches (main, develop) are always allowed.

import { execSync } from 'child_process';

let branch;
try {
  branch = execSync('git rev-parse --abbrev-ref HEAD', {
    encoding: 'utf8',
  }).trim();
} catch {
  process.exit(0);
}

if (branch === 'main' || branch === 'develop') {
  process.exit(0);
}

const regex = /^(feat|fix|hotfix|chore|docs|release)\/[a-z0-9._-]+$/;

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

if (regex.test(branch)) {
  process.exit(0);
} else {
  console.error(red(`Invalid branch name: ${bold(branch)}`));
  console.error(yellow('  Expected format: <type>/<slug>'));
  console.error(dim('  Allowed types:   feat, fix, hotfix, chore, docs, release'));
  console.error(dim('  Slug rules:      lowercase letters, digits, hyphens, dots, underscores'));
  process.exit(1);
}
