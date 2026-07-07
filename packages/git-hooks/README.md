# @coveritlabs/git-hooks

Shared Git hook scripts for all CoveritLabs repositories. Installed directly from Git — no registry or publishing step needed.

---

## Table of Contents

- [Installing in a Repo](#installing-in-a-repo)
- [Husky Setup](#husky-setup)
- [Available Scripts](#available-scripts)
  - [coverit-validate-branch](#coverit-validate-branch)
  - [coverit-validate-commit-msg](#coverit-validate-commit-msg)
  - [coverit-add-license-header](#coverit-add-license-header)
- [Configuration](#configuration)
- [Adding a New Repo](#adding-a-new-repo)

---

## Installing in a Repo

This package is installed directly from the GitHub repository — no registry setup required.

```bash
npm install -D github:CoveritLabs/.github
```

This adds the package to `devDependencies` in your `package.json`:

```json
{
  "devDependencies": {
    "@coveritlabs/git-hooks": "github:CoveritLabs/.github"
  }
}
```

To update to the latest version:

```bash
npm update @coveritlabs/git-hooks
```

> **Note**: Since the repo is private, contributors need read access to the `CoveritLabs/.github` repository. In CI, use a GitHub PAT with `repo` scope or a deploy key.

---

## Husky Setup

After installing the package, set up [Husky](https://typicode.github.io/husky/) hooks to call the shared scripts.

If Husky isn't set up yet:

```bash
npx husky init
```

### `.husky/pre-commit`

```sh
#!/bin/sh

# Shared: license header injection
npx coverit-add-license-header

# Shared: branch name validation
npx coverit-validate-branch
```

### `.husky/commit-msg`

```sh
#!/bin/sh
npx coverit-validate-commit-msg "$1"
```

---

## Available Scripts

### `coverit-validate-branch`

Validates that the current branch follows the CoveritLabs naming convention.

**Hook**: `pre-commit`

```bash
npx coverit-validate-branch
```

**Rules**:

| Aspect            | Details                                                    |
| ----------------- | ---------------------------------------------------------- |
| **Format**        | `<type>/<slug>`                                            |
| **Allowed types** | `feat`, `fix`, `hotfix`, `chore`, `docs`, `release`        |
| **Slug**          | Lowercase letters, digits, hyphens, dots, underscores      |
| **Exempt**        | `main` and `develop` are always allowed                    |

**Examples**:

```
✅ feat/user-auth
✅ fix/login-bug
✅ chore/update-deps
✅ release/1.2.0
❌ feature/MyBranch       (wrong type, uppercase)
❌ my-branch              (missing type prefix)
```

---

### `coverit-validate-commit-msg`

Validates commit messages using [commitlint](https://commitlint.js.org/).

**Hook**: `commit-msg`

```bash
npx coverit-validate-commit-msg "$1"
```

> **Note**: `@commitlint/cli` and `@commitlint/config-conventional` are bundled as dependencies — they're installed automatically with this package.

The consuming repo only needs a **commitlint config file**:

```js
// commitlint.config.js
export default { extends: ['@commitlint/config-conventional'] };
```

---

### `coverit-add-license-header`

Prepends a proprietary license header to staged source files that are missing one. Automatically detects the correct comment style based on file extension.

**Hook**: `pre-commit`

```bash
npx coverit-add-license-header
```

**What it does**:

1. Reads all staged files (`git diff --cached`)
2. Filters by supported file extensions
3. Skips files that already have the header
4. Prepends the appropriate header (preserves shebangs)
5. Re-stages the modified files

**Generated headers by file type**:

| Style       | Extensions                                   | Example                                          |
| ----------- | -------------------------------------------- | ------------------------------------------------ |
| `// ...`    | `.ts`, `.tsx`, `.js`, `.jsx`, `.mts`, `.mjs`  | `// Copyright (c) 2026 CoverIt Labs. All Rights Reserved.` |
| `/* ... */` | `.css`, `.scss`, `.sass`                      | `/* Copyright (c) 2026 CoverIt Labs. All Rights Reserved.` |
| `# ...`     | `.py`, `.sh`, `.rb`, `.yml`, `.yaml`          | `# Copyright (c) 2026 CoverIt Labs. All Rights Reserved.`  |

---

## Configuration

Create a `coverit-hooks.config.json` in your repo root to customize the license header behavior. All fields are optional — sensible defaults are built in.

```json
{
  "licenseHeader": {
    "copyrightHolder": "CoverIt Labs",
    "extensions": [".ts", ".tsx", ".js", ".jsx", ".mts", ".mjs", ".css"]
  }
}
```

| Field              | Default                                                       | Description                        |
| ------------------ | ------------------------------------------------------------- | ---------------------------------- |
| `copyrightHolder`  | `"CoverIt Labs"`                                              | Name in the copyright line         |
| `extensions`       | `[".ts", ".tsx", ".js", ".jsx", ".mts", ".mjs", ".css", ...]` | File extensions to add headers to  |

---

## Adding a New Repo

Quick checklist for onboarding any CoveritLabs repo:

1. **Install the package**:
   ```bash
   npm install -D github:CoveritLabs/.github
   ```
2. **Set up Husky** (if not already):
   ```bash
   npx husky init
   ```
3. **Create hook files** as shown in [Husky Setup](#husky-setup).
4. **Add the branch-validation caller workflow** at `.github/workflows/branch-validation.yml`:
   ```yaml
   name: Branch validation

   on:
     pull_request:
       types: [opened]
       branches: [main, develop]

   jobs:
     validate-branch:
       uses: CoveritLabs/.github/.github/workflows/branch-validation.yml@main
   ```
5. **Create `commitlint.config.js`** in the repo root (commitlint is bundled with the package):
   ```js
   export default { extends: ['@commitlint/config-conventional'] };
   ```
