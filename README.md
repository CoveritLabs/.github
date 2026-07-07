# CoverIt Public Docs

This repository contains the public-facing GitHub profile and shared organization
tooling for CoverIt.

CoverIt is a graduation project from the Computer Engineering Department,
Cairo University. The project is a QA automation platform for web applications. It
crawls an application, builds a semantic state graph, generates test flows,
produces regression test code, records manual journeys, and creates useful
documentation from the same crawl data.

## What is here

| Path | Purpose |
| --- | --- |
| [profile/README.md](profile/README.md) | Public GitHub profile README for CoverIt. |
| [docs/architecture.md](docs/architecture.md) | System architecture and data flow. |
| [docs/modules.md](docs/modules.md) | Short guide to the main CoverIt repositories and services. |
| [docs/workflow.md](docs/workflow.md) | Product workflow from project setup to regression runs. |
| [docs/local-setup.md](docs/local-setup.md) | Local development setup for the full system. |
| [docs/media.md](docs/media.md) | Available public demo media. |
| [assets/clips/demo.mp4](assets/clips/demo.mp4) | Current CoverIt demo video. |
| [packages/git-hooks/](packages/git-hooks/) | Shared Git hooks used by CoverIt repositories. |
| [.github/workflows/](.github/workflows/) | Reusable GitHub Actions workflows. |

## Public profile

GitHub reads `profile/README.md` as the organization profile page. The profile is
kept clear and easy to skim, with longer explanations linked from `docs/`.

## Shared tooling

The repo also publishes the shared `@coveritlabs/git-hooks` package used by the
project repositories. The package provides branch validation, commit message
validation, and license header helpers.