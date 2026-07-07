# CoverIt Modules

This page gives a short overview of the main repositories that make up CoverIt.
Each module has a focused responsibility, but the platform is meant to be used as
one connected system.

## `coverit-frontend`

The frontend is the main application used by QA engineers. It is built with React,
TypeScript, Vite, React Query, Zustand, and SCSS modules.

It covers:

- authentication and project selection
- target applications and versions
- crawl sessions and schedules
- manual recording
- generated test flows and flow editing
- user guides
- regression runs and reports
- integrations and dashboard analytics

## `coverit-api`

The API is the central coordination layer. It is a Node.js and TypeScript service
using Express, Prisma, PostgreSQL, Redis, Neo4j, WebSockets, and shared
contracts.

It is responsible for:

- users, accounts, projects, and project members
- target applications and application versions
- crawl session configuration and lifecycle
- manual recording connections and WebSocket relays
- test flow storage and generation requests
- regression codebase configuration
- regression run ingestion, artifacts, and scenario reports
- integrations, notifications, and dashboard data

## `coverit-contracts`

The contracts repo contains shared Protocol Buffer definitions. It publishes
generated types for TypeScript and Python so the API, crawler, DocGen, and
regression modules can agree on the same data shapes.

The contracts currently cover areas such as:

- authentication
- common types
- crawler data
- projects and target applications
- dashboards
- integrations
- notifications
- regression data

## `coverit-crawler`

The crawler is a Python worker that uses Playwright to interact with target web
applications. It is responsible for automatic exploration and manual recording.

It includes:

- browser control and replay support
- semantic state detection
- input defaults and input resolution
- action limits and risk checks
- graph persistence
- manual session support
- worker entry points for queued crawl jobs

The crawler builds the raw application graph used by later modules.

## `coverit-docgen`

DocGen is a Python worker for semantic labeling and generated documentation. It
reads states and transitions from Neo4j, assigns human-readable labels, and
produces artifacts from the same graph data.

It handles:

- page names and page descriptions
- transition names and action descriptions
- graph-level labeling
- user guide generation
- BDD-style scenario text
- walkthrough video rendering from flow data

The service uses ARQ, Redis, Neo4j, Beautiful Soup, Playwright, Pillow, and ffmpeg
for its worker and video pipelines.

## `coverit-regression`

The regression generator is a TypeScript module that turns reviewed test flows into
an executable regression codebase.

It includes:

- BDD generation support
- flow validation
- template rendering
- file emission
- CLI commands
- background worker flow
- diagnostics and code generation checks

Its output is intended to be committed through a generated branch and reviewed in
a pull request.

## `coverit-regression-framework`

The generated regression framework is the runtime used by produced tests. It is
based on Playwright and TypeScript.

It provides:

- generated feature files and step mappings
- state and transition execution
- runtime assertions
- locators self-healing support
- filtered CI runs for added flows
- Playwright reports and CoverIt artifacts
- reporting hooks back into the CoverIt API

## `.github`

The `.github` repository contains the public GitHub profile docs and shared
organization tooling.

It includes:

- profile README
- public documentation
- shared Git hooks
- reusable GitHub Actions workflows

The public docs explain the project at a portfolio level, while the shared tooling
keeps repository workflow rules consistent.
