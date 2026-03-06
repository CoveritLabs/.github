#!/bin/sh

# Validates that the current branch follows the CoveritLabs naming convention.
#
# Usage: npx coverit-validate-branch
#
# Valid formats: <type>/<slug>
#   Types:  feat, fix, hotfix, chore, docs, release
#   Slug:   lowercase letters, digits, hyphens, dots, underscores
#
# Long-lived branches (main, develop) are always allowed.

if ! git rev-parse --verify HEAD > /dev/null 2>&1; then
  exit 0
fi

branch=$(git rev-parse --abbrev-ref HEAD)

if [ "$branch" = "main" ] || [ "$branch" = "develop" ]; then
  exit 0
fi

regex="^(feat|fix|hotfix|chore|docs|release)/[a-z0-9._-]+$"

if echo "$branch" | grep -Eq "$regex"; then
  exit 0
else
  echo "Invalid branch name: $branch"
  echo "Expected format: <type>/<slug>"
  echo "Allowed types:   feat, fix, hotfix, chore, docs, release"
  echo "Slug rules:      lowercase letters, digits, hyphens, dots, underscores"
  exit 1
fi
