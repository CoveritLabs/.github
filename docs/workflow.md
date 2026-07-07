# CoverIt Workflow

CoverIt is organized around the normal flow of a QA engineer working with a web
application. The user starts by registering the application, then lets the system
discover behavior, generate flows, and turn selected flows into regression code or
documentation.

## 1. Create a project

A project groups the testing work for one team or product area. It contains target
applications, versions, crawl sessions, manual recordings, generated flows,
regression reports, integrations, and dashboard activity.

## 2. Add an application and version

The user registers a target application with a name and base URL. Versions are
used to separate releases, branches, or testing environments. A version is required
before creating crawl sessions or recordings.

CoverIt is intended for development or staging environments. The target
application should have stable test data and safe workflows.

## 3. Configure the regression codebase

Before generating regression code, the user connects CoverIt to a regression
codebase. The configuration stores repository information and the branch details
needed when generated tests are prepared for review.

## 4. Run an automatic crawl

In an automatic crawl, the crawler opens the target application in Playwright and
explores reachable states. It records:

- pages and state snapshots
- clickable elements
- input fields and resolved values
- transitions between states
- locators and action metadata
- crawl limits and session status

When the crawl finishes, the graph is available for flow generation and
documentation.

## 5. Record a manual session

Manual recording is used when a specific journey matters or when the crawler
should not discover the flow alone. The user connects to a browser session from
the CoverIt UI, starts recording, performs the actions, and finishes the session.

The recorded actions are stored in the same general flow format as automatic
crawl results. This allows manual flows to move through review, assertions, code
generation, and reporting like generated flows.

## 6. Generate and review test flows

CoverIt generates flows from discovered graph transitions. The user can inspect
the steps, edit generated actions, and add assertions before the flow becomes part
of a regression suite.

This review step is important. The system can produce useful coverage, but the QA
engineer remains in control of what should be treated as a real test.

## 7. Generate regression code

After review, CoverIt generates TypeScript and Playwright regression code from the
selected flow. The generated code is prepared in a regression codebase so it can
be reviewed like normal project code.

The expected output is not just a single script. It includes the feature
description, mappings, runtime data, and framework code needed to execute the
scenario repeatably.

## 8. Run regression tests

Generated regression tests run through the Playwright-based regression framework.
During execution, CoverIt records scenario status, events, logs, artifacts, and
reports. Failed scenarios can be tied back to project dashboards and integrations.

## 9. Generate guides and videos

DocGen uses the graph and flow data to generate human-readable artifacts. These
can include plain-English user guides, BDD-style scenario text, and walkthrough
videos.

The important point is that these artifacts come from the same source data as the
tests. A flow captured for QA can also become documentation for a user or a
developer.

## 10. Monitor the dashboard

The dashboard gives a project-level view of the work. It shows crawl progress,
flow counts, regression run results, warnings, recent activity, and discovered
coverage information.

The dashboard is meant to help the team answer simple questions:

- What did CoverIt discover?
- Which flows are ready?
- Which regression runs passed or failed?
- What changed recently?
- Which areas still need review?
