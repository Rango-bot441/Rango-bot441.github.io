# Portfolio Reframe V2 Implementation Plan

> **For Claude:** Implement this plan task-by-task on the isolated `portfolio-reframe-v2` branch. Keep `stable-before-reframe-20261005` untouched as the rollback point.

**Goal:** Reframe the personal website, case pages, and local workbench into one interview-ready narrative without mixing historical business results with the independent AI prototype.

**Architecture:** The public site remains a static HTML/CSS/vanilla-JS portfolio. The home page is the narrative entry, the historical Xiaohongshu case owns business evidence, the AI case owns workflow explanation, and the local Node/SQLite workbench owns interactive demonstration. Existing public URLs, evidence boundaries, and backend contracts remain intact.

**Tech Stack:** Static HTML/CSS/vanilla JavaScript, existing Node test/build scripts, local Node HTTP + SQLite workbench.

---

### Task 1: Isolate and preserve the stable release

### Industry context and consistency revision (approved 2026-10-06)

- Keep the two reading levels: concise personal positioning and outcomes on the homepage; detailed business and technical decisions in the cases. Preserve the existing palette, architecture, routes and project order.
- Name Gaotu as a technology education company and the experience as online education content/live operations in the group marketing department. Identify the historical primary-school acquisition project without implying the independent AI prototype was used by Gaotu.
- Unify the adult-English MVP as 2–3 accounts expanding to 10; label its 9,000 leads as that project's result. Preserve the college-admission division's product, peak-season presenter and brand contributions. Standardize project names, dates and metric units across cards and dialogs.
- Correct contact-card clipping by checking child bounding boxes at 320/390px, not only document scroll width. Simplify repeated career headings and reduce empty archive spacing.
- Explain the existing Agent tools and client/server data flow, while keeping the public manuscript an unreviewed technical sample. Do not call models, fabricate runs, edit the workbench database or publish without acceptance.
- Run the existing site tests, JavaScript parsing, diff checks, public build and desktop/mobile interaction checks; preserve the prior preview and save a scoped commit.

### Business clarity and layout revision (approved 2026-10-05)

1. Business case: make the project name the primary heading; explain the audience, acquisition goal, personal responsibilities and sales handoff. Consolidate repeated expansion/operations copy into concrete actions. Keep historical figures unchanged and one short outcome disclosure; do not invent deduplication, refund or cost definitions.
2. Homepage: keep the established warm palette and navigation. Move education/location beside the personal introduction; reduce portrait dominance and make the mobile profile a compact horizontal group. Keep tools/method disclosures close to their related text, without filling blank space with new claims.
3. AI case: correct the demonstration CTA, show the existing public practice draft before one three-stage workflow, and explain version/review/delivery design decisions. Concentrate validation limits instead of repeating them. Do not manufacture model output or modify the local workbench.
4. Integrate the three disjoint HTML/CSS edits, check links and scripts, run existing site tests and build the 24-file public allowlist in a new output directory. Inspect desktop and mobile screenshots and exercise disclosures and workflow tabs.
5. Keep the existing 4351 preview and online release available. Deliver a new local preview after verification; public publication remains contingent on acceptance.

**Revision verification:** Site tests pass 13/13, homepage inline JavaScript and case.js parse successfully, and `git diff --check` passes. Actual browser checks cover all three pages at 320, 390 and 1440px with no horizontal overflow or page-script errors. Inspected hero, works, career, about and case screenshots; fixed the about paragraph break and duplicate disclosure rules. The business data disclosure and AI review/delivery tabs open correctly; the practice draft returns HTTP 200 with its unreviewed provenance. The fresh 24-file public build is served at `http://127.0.0.1:4357/`, and its page/assets checks report no failing local HTTP responses. No workbench backend changes, live model requests, business-effect validation or online deployment occurred in this revision.

### Reading-first revision scope (2026-10-05)

1. Preserve `da3fde4` with `reading-baseline-20261005`; preserve the separate workbench UI before editing. Keep the online release unchanged.
2. Homepage (`index.html`, `assets/portfolio-upgrade.css`): readable Chinese sans typography; concise first-person copy; visible business outcomes with project/time/attribution labels; remove arbitrary blank space and fixed card heights. Keep education and all existing links.
3. Business case (`works/xhs-matrix-growth/index.html`, `case.css`): first-person narrative; show project results immediately after the hero, then background/actions/operations/reflection. Consolidate provenance in one expandable section. Missing public evidence does not imply historical records were never retained. Keep all figures and project scope unchanged.
4. AI case (`works/xhs-content-workbench/index.html`, `case.css`): lead with the operational problem and input/review/human/output path; sans type, moderate headings, readable details, compact useful whitespace. Preserve unreviewed public draft, model requirements and local-only limitations. Never invent model results.
5. Workbench (`public/styles.css`, small UI copy edits in `public/app.js` only if needed): consistent sans headings/body, readable controls/status/step labels, flexible layouts and clear current action. No model calls, backend changes or database edits.
6. Verify public links/tests/build privacy, syntax and actual desktop/mobile views. Inspect screenshots for reading density and emphasis, beyond checking overflow. Commit only scoped site changes and retain a separate UI snapshot for the workbench.

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

**Second-pass refinement (2026-10-05):** Refined homepage name/positioning hierarchy, readable career/education text, business-first selected works, case hero focus, five-step Agent overview, grouped workflow details, and expandable screenshot evidence. The workbench has one primary review action, a public practice entry, four steps, neutral secondary cards, and distinct configured/connected labels. Fresh site tests pass 12/12 and workbench tests pass 212/212; app/case syntax checks pass. Public preview is built separately to `_site-review-v2-20261005-refined` (24 allowlisted files). No live model call or business-effect evaluation was performed. The workbench is a separate non-Git project: its existing first-pass UI backup can restore that UI, while the site branch/tag protects the website only. Keep this V2 unpublished until local acceptance.

**Implementation evidence (2026-10-05):** V2 is isolated on `portfolio-reframe-v2`; the deployed baseline is tagged `stable-before-reframe-20261005`. The site test suite passes 12/12, the workbench suite passes 212/212, inline/case JavaScript syntax checks pass, the public allowlist builds 24 files, the private-path/secret scan is clean, and `git diff --check` passes. Local browser checks cover the homepage, both case links, the AI demonstration anchor, the workbench public practice entry, desktop and 390px mobile widths, and zero page console errors. Public publication is intentionally not performed before user acceptance.

**Reading-first completion evidence (2026-10-05):** The current revision uses sans-serif Chinese text, readable desktop/mobile body sizes, earlier business metrics, first-person narrative and a single expandable provenance explanation. The AI hero no longer inherits the oversized title. A final mobile pass shortened the homepage introduction to remove a two-character last line and aligned the workbench workflow cards by removing inherited list margins and centered alignment. Site tests pass 12/12; workbench tests pass 212/212, with frontend render checks 8/8 after the final CSS adjustment. Actual 1440px and 390px screenshots were inspected for the homepage, cases and workbench. The portrait decodes successfully at its original 1042px width; its earlier blank screenshot was captured before load completion. Case navigation, business provenance disclosure, AI workflow tabs and public draft availability were checked. The accepted public build contains 24 allowlisted files and is previewed at `http://127.0.0.1:4349/`. `reading-baseline-20261005` retains the prior site revision; separate workbench UI snapshots exclude the database. No live model request, platform integration, business-impact verification or public deployment was performed.

**Homepage focus pass (2026-10-05):** Reduced the hero name and photo emphasis, updated the positioning statement to name content growth and creator supply, clarified the two selected-case roles, shortened repeated case and career copy, and consolidated the about content. Replaced the explorations maintenance disclaimer with a concise early-work archive introduction. Kept historical outcome caveats and prototype status labels. Added a site regression test for homepage positioning and archive copy.

**Homepage focus verification (2026-10-05):** The final homepage keeps three career stages, a smaller identity treatment, a 380px desktop / 108px mobile portrait, three prominent business outcomes, and a collapsed work-method disclosure. Browser checks at 320, 390, 1024 and 1440px report equal viewport and document widths; portrait and statement bounds do not overlap at the mobile widths. The representative-work and about screenshots were visually inspected, the work-method disclosure opened successfully, and the browser console had zero errors. Site tests pass 13/13 and the final allowlisted build contains 24 files at `http://127.0.0.1:4351/`. Early prototypes now use stable status wording instead of stale access checks or unverified efficiency claims. No public deployment or live model validation was performed.

**Final acceptance pass (2026-10-06):** Fixed the homepage status-label assertion after wrapping `模型审核待验` in a non-breaking span; site tests pass 13/13, `git diff --check`, inline homepage JavaScript parsing and `case.js` syntax checks pass. Built a fresh 24-file allowlisted preview at `http://127.0.0.1:4375/` without touching earlier previews. Browser checks at 320px confirm homepage, business case and AI case document widths equal the viewport; the homepage status phrase stays intact, the business data disclosure opens, AI workflow tabs switch by click and ArrowRight, engineering details expand, the public draft returns HTTP 200, console errors are zero, and the main routes/assets return HTTP 200. The public build contains no database, trace, credential or environment files. No online deployment, live model request or business-effect validation occurred.
