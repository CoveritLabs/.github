# CoverIt Architecture

CoverIt is built as a group of services that communicate through the API, queues,
shared contracts, and graph storage. The frontend is the main user surface, while
the workers do the long-running automation work in the background.

![architecture](../assets/images/architecture.png)

## Main flow

1. The QA engineer creates a project, application, and application version in the
   frontend.
2. The API stores project data in Postgres and sends background jobs through
   Redis.
3. The crawler worker opens the target application in Playwright, explores
   clickable elements and input fields, and records the discovered states and
   transitions.
4. Neo4j stores the state graph, including pages, transitions, locators, and graph
   relationships.
5. DocGen labels states and transitions and generates human-readable artifacts
   such as guides, BDD-style scenarios, and videos.
6. The regression generator converts reviewed flows into a Playwright regression
   codebase.
7. Regression runs send status, scenario results, artifacts, and integration
   reports back to the API.
8. The frontend shows crawl progress, generated flows, run results, project
   activity, and dashboard analytics.

## Data stores

| Store | Used for |
| --- | --- |
| Postgres | Users, projects, applications, versions, crawl sessions, test flows, regression runs, artifacts, integrations, and dashboard records. |
| Neo4j | Crawled application graph: states, transitions, graph IDs, semantic labels, and relationships. |
| Redis | Background job queues, worker coordination, manual recording tickets, and asynchronous processing. |

## Why the graph matters

Every crawled state is stored as a node connected to the states it can reach, the
action that caused each transition, and the application version it belongs to.
That connectivity is what lets later modules generate flows that cover real user
behavior, rather than simply confirming that individual elements exist on a page.

## Worker responsibilities

| Worker | Responsibility |
| --- | --- |
| Crawler | Drives the browser, discovers states, records transitions, handles automatic crawl sessions, and supports manual recording. |
| DocGen | Labels graph data, describes pages and actions, waits for label completion, and creates documentation/video artifacts. |
| Regression generator | Reads reviewed flows and emits executable TypeScript/Playwright regression files. |
| Regression framework | Runs generated tests, evaluates assertions, stores artifacts, and reports results back to CoverIt. |

## Related docs

- [Modules](modules.md)
- [Workflow](workflow.md)
- [Local setup](local-setup.md)