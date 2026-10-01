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
- [x] Public deployment and legacy-deployment exclusion confirmed for c276f71.

## Acceptance evidence (2026-09-30)

- Website static tests: 10/10 at final acceptance, including legacy branch exclusions and featured-case readability. Inline JavaScript and case/build scripts passed syntax checks; `git diff --check` passed.
- Original workbench test suite was re-run with local test-server permission: 211/211. The first sandboxed run was blocked from binding local ports; no model calls were made by this verification.
- Public build contains 22 allowlisted files; it excludes database, credentials, development notes and browser artifacts. Existing public legacy URLs are retained.
- Browser checks: desktop 1440 and mobile 390 have no horizontal overflow; 4 historical detail dialogs match their cards and restore focus on Escape; menu opens/closes/selects and restores scrolling; theme toggle and 7-tool archive work.
- Homepage remains readable with JavaScript disabled or all images blocked. Case renders all 3 workflow panels without JavaScript; normal tabs and arrow keys select one panel at a time.
- Built-artifact journey: homepage → case → homepage → historical Xiaohongshu link → case → review tab → draft download. Console errors: 0; failed requests: 0. Download is byte-identical to the public unreviewed draft.
- Public cases are static explanations. No new-case model review, platform publishing, live backend deployment or business outcome claim is implied.
- GitHub ran both the existing branch-based Jekyll deployment and the custom Pages workflow. Both succeeded for 698069f. `_config.yml` excludes development directories from the legacy path as well; no repository settings or credentials were changed.
- Live acceptance confirmed the homepage-to-case path, review tab, 390px layout and byte-identical Markdown download with no page errors. GitHub main is confirmed at 9462d36; that push produced no new visible workflow run, so the final regression-test commit also retriggers publication of the verified exclusion configuration.
- Final release c276f71: custom Pages run 36737071071 and legacy branch run 36737070894 both completed successfully. Public case returned HTTP 200; development script and plan URLs both returned HTTP 404. This final acceptance note remains local and is not part of the published site.

## Review-driven refinement accepted in this conversation

**Goal:** Give a recruiter a fast, evidence-bounded path from historical Xiaohongshu operations work to a later independent AI workflow practice.

**Scope and sequence:**

1. Add `works/xhs-matrix-growth/index.html` and `case.css`: historical business question, accountable decisions and actions, self-reported outcomes, missing measurement definitions, and role boundary. Do not invent original backend records, thresholds, or an AI contribution to historical results.
2. Update `index.html` and `assets/portfolio-upgrade.css`: identify the relevant role and two case entrances immediately, put the business case before the AI practice, reduce unreadable screenshot prominence, and correct archived-prototype and AI attribution wording. Keep existing career data and modal identities.
3. Update `works/xhs-content-workbench/index.html` and its existing case assets: make current evidence and limits visible with a readable interface detail. Investigate whether a genuine public-safe model execution exists; without one, retain the unreviewed boundary and avoid a fictional success replay.
4. Update `scripts/build-site.mjs` and `tests/site.test.mjs` for the new public case. Re-run site tests and JavaScript syntax checks; build the whitelist output, inspect all public files and complete browser journeys at desktop and 390px.
5. Confirm the remote branch has not moved, commit only scoped files, publish through the already-authorized Pages process, then verify the live case links and both deployment runs. No private database, traces, credentials, or workplace material enter the public artifact.

**Integrated acceptance (2026-09-30):** The business case, reordered homepage, and revised AI case are complete. Static website tests pass 11/11; the unchanged local workbench passes 211/211 tests when its test server may bind localhost. Inline and case JavaScript syntax checks plus `git diff --check` pass. The 24-file explicit public build has no local database, source trace, credential, development note, or browser artifact. In the built-site browser journey, homepage → business case → AI case → homepage works; at 390px there is no horizontal overflow, the AI screenshot loads at its full 1440px natural width, and the mobile menu exposes both case links. Browser errors and warnings: 0. Google’s official AI Essentials page confirms the public practice draft’s narrow “no experience required” source point. The practice draft remains unreviewed by the workbench model, which is currently unconfigured; software tests do not establish business impact.

**Release gate:** Final integrated acceptance passed. Publish only the scoped site files after confirming remote main has not moved, then check both Pages workflows and public URLs.

---

# Personal-First Portfolio Reframe Implementation Plan (2026-10-01)

**Goal:** Restore a memorable personal-site first impression while preserving the source-bounded business and independent AI case content.

**Architecture:** Keep the existing static site, public allowlist, and case URLs. Rework the homepage hierarchy and its CSS; give both case pages the same dark masthead and warm, readable body language without changing their evidence, downloads, or workflow logic. No backend, model, framework, or new business claim.

**Tech Stack:** HTML, existing CSS and vanilla JavaScript, Node static tests, browser checks at desktop and 390px.

## Task 1 — Homepage (isolated owner)

Files: `index.html`, `assets/portfolio-upgrade.css`.

1. Replace the right-side decision report in the hero with the existing `assets/profile.jpg`, a single short historical-project proof line, and a source-bound label. Put name, role, personal headline, short relevant experience line, one primary project CTA, and a secondary text link on the left. Keep the photo alt text and meaningful focus order.
2. Merge the current `#works` and `#ai-practice` visual presentation into one `#works` selected-projects section with two distinguishable concise cards: historical Xiaohongshu business first, later independent AI practice second. Preserve `#ai-practice` as an anchor for old links. Each card has problem, contribution, status/evidence, and one case link; avoid repeating its detailed case-page workflow.
3. Bring `#about` before `#explorations`; keep `#career-section`, old project details/modals, contact links, and legacy anchors. Reduce navigation to selected work, experience, about, contact. Put other explorations behind the existing disclosure.
4. Use a high-contrast charcoal hero with restrained warm orange, light content area, stronger Chinese sans hierarchy, and only CSS transitions. Respect reduced motion, keyboard access, and mobile content order; no blue-purple gradient.

## Task 2 — Xiaohongshu business case (isolated owner)

Files: `works/xhs-matrix-growth/index.html`, `works/xhs-matrix-growth/case.css`.

1. Give the top masthead/hero the same charcoal-orange personal-site identity and direct route back to selected work; let the detailed business sections remain warm and readable.
2. Retain every historical-project evidence boundary: self-reported account scale, leads, GMV and fans; no fabricated backend, ROI, attribution, AI effect, or team-exclusive credit.
3. Verify 1440px and 390px visual order, link visibility, contrast, and no horizontal overflow.

## Task 3 — Independent AI case (isolated owner)

Files: `works/xhs-content-workbench/index.html`, `works/xhs-content-workbench/case.css`.

1. Match the personal-site masthead/hero and navigation; keep the public draft, official link, screenshot, read-only workflow, and evidence disclosure legible.
2. Keep the status explicit: local prototype, model unconfigured, public draft unreviewed, no measured efficiency/growth or platform integration. Do not imply a successful model run.
3. Verify desktop/mobile visuals, workflow tab, public draft link, and screenshot load. Do not change backend or `case.js` unless a verified UI bug requires it.

## Task 4 — Integration, verification, release (main owner; depends on Tasks 1–3)

1. Update `tests/site.test.mjs` with failing assertions for a personal first screen, a single selected-work hierarchy, case separation, preserved anchors, and honest status; then rerun after implementation.
2. Inspect all scoped diffs and compare local preview at desktop and 390px. Check first-screen identity/CTA, two case journeys, old modal, menu, keyboard, dark/light and image failure fallback, console/network errors, and public-download status.
3. Run `node --test tests/site.test.mjs`, JavaScript syntax checks, `git diff --check`, and a fresh allowlisted build. Audit the build for private files/secrets; verify live-site publication only after local acceptance and remote-main check. Publish without force push under the already-granted authorization, then confirm both Pages runs and public URLs.

**Acceptance:** A recruiter can identify person, target work, and primary project without scrolling; the two cases are adjacent and visibly different; mobile does not bury the first case behind a large decorative block; old URLs/interactions survive; no factual or AI-result boundary is weakened.

**Local acceptance (2026-10-01):** Homepage now opens with Zhang Biao's name, role, existing portrait and one primary route to two adjacent cases. The historical business case comes first; the later independent AI practice is explicitly separate. Both cases use a matching charcoal-and-warm-orange masthead with readable light bodies. The final 24-file allowlisted build was served locally: homepage → business case → AI case works; at 390px both case pages have no horizontal overflow, the business case retains its back-to-work link, the AI screenshot loads, its workflow tab changes content, and the public unreviewed draft link remains present. Browser console errors: 0. Website tests pass 12/12; inline and case JavaScript syntax, `git diff --check`, and a private-path/secret scan pass. Remote main still equals local base `02df827`; publication follows this gate.
