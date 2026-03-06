#!/usr/bin/env node

// Validates a commit message using commitlint.
//
// Usage: npx coverit-validate-commit-msg <commit-msg-file>
//
// Commitlint and its config are bundled as dependencies.

import { execSync } from 'child_process';

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;

const commitMsgFile = process.argv[2];

if (!commitMsgFile) {
  console.error(red('Usage: coverit-validate-commit-msg <commit-msg-file>'));
  process.exit(1);
}

try {
  execSync(`npx --no -- commitlint --edit "${commitMsgFile}"`, {
    stdio: 'inherit',
  });
} catch {
  console.error('');
  console.error(yellow('  Commit messages must follow the Conventional Commits format:'));
  console.error('');
  console.error(`    ${bold('<type>')}${dim('(')}${bold('<scope>')}${dim(')')}: ${bold('<description>')}`);
  console.error('');
  console.error(dim('  Types:    feat, fix, docs, style, refactor, test, chore, ci, perf, build'));
  console.error(dim('  Scope:    optional, e.g. auth, api, ui'));
  console.error('');
  console.error(dim('  Examples:'));
  console.error(green('    feat(auth): add Google OAuth login'));
  console.error(green('    fix: resolve crash on empty input'));
  console.error(green('    chore(deps): bump commitlint to v20'));
  console.error('');
  console.error(`  ${cyan('Tip:')} Use ${bold('npx cz')} for an interactive guided commit.`);
  console.error('');
  process.exit(1);
}
