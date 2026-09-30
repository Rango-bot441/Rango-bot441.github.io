# Personal Portfolio Integration Implementation Plan

> **For Claude:** Execute the approved scope in this session; parallel owners must not edit the same files. Do not publish until verification is complete.

**Goal:** Make the current personal website reliably readable and lead with an evidence-backed Xiaohongshu workflow case, preserving historical projects and their evidence boundaries.

**Architecture:** Incremental changes on remote main e44037ca5a9a98fe4b3d9acac5d9b7ea309e2d97. Keep static HTML/CSS/JS on GitHub Pages. Add a static case page and a clearly labeled non-model walkthrough; do not deploy the local application's server, database, credentials or private execution traces.

**Tech Stack:** Existing static HTML/CSS/JS; Node built-in test runner; Playwright browser verification; existing GitHub Pages deployment.

## Approved scope and decisions

- User approved the previous review and explicitly approved publishing after acceptance.
- Existing orange identity, restrained warm page, no default blue/purple gradient; no framework migration.
- Homepage order: concise introduction → featured case → career and business projects → supporting exploration → about/contact. Preserve old projects and existing anchor links.
- Replace the generic growth console's flagship position with the new workflow; mark unavailable older endpoints clearly and retain their history.
- New case separates past employment results from independent AI-assisted tool practice. No fabricated improvements, platform integration or model review of the new public-material draft.

## Task 1: Homepage (frontend owner)

Files: `index.html`, optional `assets/portfolio-upgrade.css` and `assets/portfolio-upgrade.js`.

1. Read existing content and interaction handlers with base64 omitted from output.
2. Remove blocking dependence on window load; reveal real HTML before image/font loading completes and when JavaScript is disabled.
3. Reorder actual DOM sections, simplify hero and metrics, feature `/works/xhs-content-workbench/` with a real screenshot and explicit local-demo status.
4. Preserve business details; add the case link to the Xiaohongshu project and separate historical results from later AI practice.
5. Keep secondary tools in an accessible collapsed archive; avoid promises of online model availability. Maintain keyboard, dialog, mobile menu and theme behavior.

## Task 2: Case (case-page owner)

Files: `works/xhs-content-workbench/index.html`, `case.css`, `case.js`.

1. Explain problem → workflow choice → authentic public-material example → actual capabilities → evidence/limits.
2. Add a keyboard-usable read-only walkthrough; label it as an explanation, not a replay of a successful AI run.
3. Show the current real screenshot and downloadable public draft with an unreviewed label. Never copy the original work database or all source records.
4. Keep technical detail in native disclosure sections; include source attribution, current model limitation and a visible back-to-site link.

## Task 3: Evidence, tests and deployment (main owner)

Files: `assets/xhs-workbench-public.png`, `works/xhs-content-workbench/public-draft.md`, `tests/site.test.mjs`, `scripts/build-site.mjs`, `.github/workflows/pages.yml`.

1. Add failing static tests for case links, removed loader, preserved historical anchors, honest status, private-data exclusions and local asset references.
2. Copy only the already-inspected public case screenshot; export only the public draft through the current safe export endpoint and inspect before publishing.
3. Build with an explicit public file allowlist; exclude tests, plans, browser artifacts and all local workbench files. Keep the four already-public legacy HTML pages addressable so existing links are not silently removed; never add new local backup files.
4. Run Node tests, syntax checks and public-build link checks.
5. Serve preview locally; check desktop and 390px mobile, JavaScript disabled, slow/broken images, menu, case navigation, walkthrough, disclosures and download.
6. Inspect git diff and public output, confirm remote main unchanged, commit scoped files and publish without force push.
7. Confirm the actual Pages deployment and public HTML/assets, then report shipped versus unverified external functionality.

## Progress

- [x] Approved design and publish authorization; clean latest-source baseline identified.
- [x] Homepage and case implemented.
- [x] Evidence, tests and browser acceptance complete.
- [x] Public deployment confirmed for commit 698069f; final legacy-deployment exclusion is being verified.

## Acceptance evidence (2026-09-30)

- Website static tests: 8/8 at initial deployment; an additional regression check now protects the legacy branch deployment. Inline JavaScript and case/build scripts passed syntax checks; `git diff --check` passed.
- Original workbench test suite was re-run with local test-server permission: 211/211. The first sandboxed run was blocked from binding local ports; no model calls were made by this verification.
- Public build contains 22 allowlisted files; it excludes database, credentials, development notes and browser artifacts. Existing public legacy URLs are retained.
- Browser checks: desktop 1440 and mobile 390 have no horizontal overflow; 4 historical detail dialogs match their cards and restore focus on Escape; menu opens/closes/selects and restores scrolling; theme toggle and 7-tool archive work.
- Homepage remains readable with JavaScript disabled or all images blocked. Case renders all 3 workflow panels without JavaScript; normal tabs and arrow keys select one panel at a time.
- Built-artifact journey: homepage → case → homepage → historical Xiaohongshu link → case → review tab → draft download. Console errors: 0; failed requests: 0. Download is byte-identical to the public unreviewed draft.
- Public cases are static explanations. No new-case model review, platform publishing, live backend deployment or business outcome claim is implied.
- GitHub ran both the existing branch-based Jekyll deployment and the custom Pages workflow. Both succeeded for 698069f. `_config.yml` excludes development directories from the legacy path as well; no repository settings or credentials were changed.
- Live acceptance confirmed the homepage-to-case path, review tab, 390px layout and byte-identical Markdown download with no page errors. GitHub main is confirmed at 9462d36; that push produced no new visible workflow run, so the final regression-test commit also retriggers publication of the verified exclusion configuration.
