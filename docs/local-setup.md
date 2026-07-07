# Local Setup

CoverIt is developed as several repositories placed next to each other in one
parent folder. The full local setup runs the app stack, crawler worker, DocGen
worker, and regression worker at the same time.

## Prerequisites

Install these tools before running the system locally:

| Tool | Purpose |
| --- | --- |
| Git | Clone and manage repositories. |
| Docker Desktop | Run the main app stack and databases. |
| Node.js and npm | Run the frontend, API, regression generator, and shared packages. |
| Python 3.12+ | Run the crawler and DocGen workers. |
| uv | Manage Python dependencies. |
| Git Bash or WSL on Windows | Run shell scripts such as `docker.sh` and `run-regression.sh`. |

## Repository layout

Clone the repositories into one parent folder:

```text
CoverIt/
  .github/
  coverit-api/
  coverit-contracts/
  coverit-crawler/
  coverit-docgen/
  coverit-frontend/
  coverit-regression/
  coverit-regression-framework/
```

The services expect this sibling layout during local development.

## Environment files

Each service has its own environment configuration. Use the example files in each
repository when available, then fill in local values for database URLs, Redis,
Neo4j, service tokens, OAuth providers, email settings, and repository access.

Use local environment files for real secrets. Keep documentation and examples
limited to dummy values.

## Start the system

Open four terminals from the parent folder.

### Terminal 1: app stack

```sh
cd coverit-frontend
./docker.sh up --local --app-only
```

This starts the main application stack and supporting services such as the API,
frontend, Postgres, Redis, and Neo4j.

### Terminal 2: crawler worker

```sh
cd coverit-crawler
uv sync
source .venv/Scripts/activate
python scripts/run_local_worker.py
```

The crawler worker handles automatic crawl jobs, Playwright browser control, and
manual recording sessions.

### Terminal 3: DocGen worker

```sh
cd coverit-docgen
uv sync
source .venv/Scripts/activate
python scripts/run_local_worker.py
```

The DocGen worker labels graph data and generates documentation and video
artifacts.

### Terminal 4: regression worker

```sh
cd coverit-regression
npm install
npm run worker
```

The regression worker generates regression code from reviewed flows.

## Open the application

After the services are running, open:

```text
http://localhost:5173
```

Create an account, create a project, add a target application, add a version, and
start with either an automatic crawl or manual recording.

## Common local workflow

1. Start the app stack.
2. Start the crawler, DocGen, and regression workers.
3. Open the frontend.
4. Create a project and application version.
5. Configure the regression codebase.
6. Run a crawl or manual recording.
7. Review generated flows and assertions.
8. Generate regression code.
9. Run the generated regression suite when needed.