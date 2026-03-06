#!/usr/bin/env node

// Validates a commit message using commitlint.
//
// Usage: npx coverit-validate-commit-msg <commit-msg-file>
//
// Commitlint and its config are bundled as dependencies.

import { execSync } from 'child_process';

const red = (s) => `\x1b[31m${s}\x1b[0m`;

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
  process.exit(1);
}
