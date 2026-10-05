# Portfolio Hierarchy Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Optimize the personal website for large-company interviews by making business ownership, outcomes, AI workflow and evidence boundaries understandable without overclaiming frontend engineering expertise.

**Architecture:** Keep the existing static HTML/CSS/vanilla-JS site and separate case pages. Apply incremental copy, visibility and responsive-layout changes only to the homepage and the two public case pages. Preserve the current preview and build a new allowlisted preview after verification.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, existing Node test/build scripts, Playwright CLI for browser checks.

---

### Task 1: Capture the approved attribution and capability language

**Files:**
- Modify: `index.html`
- Modify: `works/xhs-matrix-growth/index.html`
- Modify: `works/xhs-content-workbench/index.html`
- Test: `tests/site.test.mjs`

**Steps:**

1. Replace public “团队成果 / 未独立核验” labels with “项目主导 / 我负责” wording.
2. Replace the AI page’s frontend-stack positioning with business workflow, Agent rules, AI-assisted prototyping and acceptance wording.
3. Keep exact business numbers and existing case dates unchanged.
4. Add or update static assertions for the new wording and absence of the old labels.
5. Run the focused site tests and inspect failures before continuing.

### Task 2: Improve homepage first-screen hierarchy and discovery

**Files:**
- Modify: `index.html`
- Modify: `assets/portfolio-upgrade.css`

**Steps:**

1. Add a concise first-screen result strip near the hero / representative-work transition.
2. Reduce the hero name and portrait emphasis without changing the warm orange / charcoal / cream palette.
3. Add “更多作品” to desktop and mobile navigation.
4. Keep the two selected works as the primary cards and expose the four business-project summaries with problem, action, result and ownership cues.
5. Make About show a one-line capability summary while leaving deep tool lists secondary.
6. Give expanded sections clear open / close affordances and preserve accessible keyboard behavior.

### Task 3: Make the AI case workflow and verification boundary discoverable

**Files:**
- Modify: `works/xhs-content-workbench/index.html`
- Modify: `works/xhs-content-workbench/case.css`
- Modify: `works/xhs-content-workbench/case.js`

**Steps:**

1. Add the complete input → retrieval → review → human decision → export summary before the detailed tabs.
2. Expose a short summary for each workflow stage; retain detailed stage content behind the existing interaction.
3. Remove misleading external-link arrows from same-page tabs and ensure “查看工程实现” opens the target disclosure before scrolling.
4. Replace frontend-stack claims with accurate AI-assisted product and workflow responsibilities.
5. Expose the Agent contract as field structure only, explicitly avoiding fabricated model output.
6. Keep model-effect and business-impact limits concise and non-repetitive.

### Task 4: Align business case and archive interactions

**Files:**
- Modify: `works/xhs-matrix-growth/index.html`
- Modify: `works/xhs-matrix-growth/case.css`
- Modify: `index.html`
- Modify: `assets/portfolio-upgrade.css`

**Steps:**

1. Bring project ownership language next to the business-case metrics.
2. Keep long explanations folded, but ensure the visible summary communicates what opens and whether the section is expanded.
3. Surface two supplemental works and a small number of representative tools while keeping the full early-tool list secondary.
4. Remove repeated archive-level disclaimers where one shared status note is clearer.

### Task 5: Verify, build and inspect

**Files:**
- Modify only files required by failing tests, if any.

**Steps:**

1. Run `node --test tests/site.test.mjs`.
2. Run inline JavaScript and case JavaScript syntax checks.
3. Run `git diff --check`.
4. Build a new allowlisted public site directory without touching the existing `4377` preview.
5. Use Playwright at 320px, 390px and 1440px to inspect first-screen hierarchy, navigation, disclosures, tabs, modal actions and console errors.
6. Check primary routes and assets return HTTP 200 and confirm no database, credentials, traces or environment files enter the build.
7. Commit the scoped implementation only after the checks pass.
