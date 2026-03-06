#!/bin/sh

# Validates a commit message using commitlint.
#
# Usage: npx coverit-validate-commit-msg <commit-msg-file>
#
# Requires commitlint to be installed in the consuming repo.

npx --no -- commitlint --edit "$1"
