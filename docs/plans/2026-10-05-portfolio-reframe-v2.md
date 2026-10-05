# Portfolio Reframe V2 Implementation Plan

> **For Claude:** Implement this plan task-by-task on the isolated `portfolio-reframe-v2` branch. Keep `stable-before-reframe-20261005` untouched as the rollback point.

**Goal:** Reframe the personal website, case pages, and local workbench into one interview-ready narrative without mixing historical business results with the independent AI prototype.

**Architecture:** The public site remains a static HTML/CSS/vanilla-JS portfolio. The home page is the narrative entry, the historical Xiaohongshu case owns business evidence, the AI case owns workflow explanation, and the local Node/SQLite workbench owns interactive demonstration. Existing public URLs, evidence boundaries, and backend contracts remain intact.

**Tech Stack:** Static HTML/CSS/vanilla JavaScript, existing Node test/build scripts, local Node HTTP + SQLite workbench.

---

### Task 1: Isolate and preserve the stable release

**Files:** Git tag and branch only.

1. Confirm clean `main` at the deployed commit.
2. Create `stable-before-reframe-20261005` at that commit.
3. Work only on `portfolio-reframe-v2` until acceptance.

### Task 2: Reframe the homepage

**Files:** `index.html`, `assets/portfolio-upgrade.css`.

1. Keep a personal first screen with name, role, portrait, concise positioning, and one primary works CTA.
2. Keep only two primary works in the selected-work hierarchy: the historical Xiaohongshu business project first and the later independent AI practice second.
3. Compress career into three capability stages, add concise education information from existing source content only, and merge the work-principles copy into the about section.
4. Move early explorations behind a clearly secondary disclosure and preserve old anchors, dialogs, contact links, and truthful status copy.

### Task 3: Reframe the case pages

**Files:** `works/xhs-matrix-growth/index.html`, `works/xhs-matrix-growth/case.css`, `works/xhs-content-workbench/index.html`, `works/xhs-content-workbench/case.css`.

1. Make the business case own historical context, decisions, operating mechanism, results, and evidence limits.
2. Reduce repeated historical background in the AI case to a short origin statement; make its main content the Agent workflow, human/AI boundary, public practice evidence, limitations, and local demo handoff.
3. Preserve all self-reported labels, source references, unreviewed/model-unconfigured status, public draft, screenshot, and no-business-impact caveat.
4. Verify desktop and 390px mobile layouts, navigation, contrast, and no horizontal overflow.

### Task 4: Simplify the workbench first-use experience

**Files:** `xhs-content-agent/public/app.js`, `xhs-content-agent/public/styles.css` and only directly relevant frontend tests.

1. Make the default landing action “开始审核一份外稿” and expose the prepared public practice task.
2. Present the four-step path: task requirements → sources and draft → AI review → human decision and export.
3. Keep advanced records (sources, versions, quality, runs, logs) available behind secondary navigation or disclosures.
4. Do not fabricate model output; show the configured/unconfigured state and preserve existing API/data behavior.

### Task 5: Integrate, verify, and prepare release

1. Run site tests, workbench tests, syntax checks, `git diff --check`, and the allowlisted public build.
2. Browser-check homepage, business case, AI case, workbench first-use path, keyboard behavior, 1440px and 390px layouts, console errors, and failed asset requests.
3. Confirm the build contains no local database, traces, credentials, development notes, or workbench private data.
4. Keep the V2 branch unpublished until user accepts the local preview. Publish only after explicit acceptance, with the stable tag available for rollback.

**Acceptance:** A recruiter understands the candidate and two main works in 30 seconds; the business case and AI case do not repeat responsibilities; the AI case leads clearly to a local workbench demonstration; the workbench opens on a simple four-step path; historical results and unverified AI effects remain explicitly separated.

**Implementation evidence (2026-10-05):** V2 is isolated on `portfolio-reframe-v2`; the deployed baseline is tagged `stable-before-reframe-20261005`. The site test suite passes 12/12, the workbench suite passes 212/212, inline/case JavaScript syntax checks pass, the public allowlist builds 24 files, the private-path/secret scan is clean, and `git diff --check` passes. Local browser checks cover the homepage, both case links, the AI demonstration anchor, the workbench public practice entry, desktop and 390px mobile widths, and zero page console errors. Public publication is intentionally not performed before user acceptance.
