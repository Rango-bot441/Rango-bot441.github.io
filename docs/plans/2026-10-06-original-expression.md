# Portfolio Original Expression Implementation Plan

**Goal:** Recover the original portfolio's capability narrative and visual rhythm while preserving verified copy and current case pages.

**Architecture:** Incrementally edit the static homepage. Move the full early-tool collection into one standalone page; preserve existing business modals and public routes. Use a new branch and allowlisted preview, with no public deployment before user review.

**Tech Stack:** Existing HTML, CSS, JavaScript, Node tests, Playwright CLI.

## Approved Design

Order: identity, cross-project results, selected business and AI work, career and other projects, education/about, contact. The hero uses a short capability chain and a real screenshot, not a decorative console. Portrait belongs in About. Dark and light full-width sections alternate, with orange accents and fixed readable typography. Core content is visible, and the archive has one secondary link. Preserve facts and model-status boundaries; do not infer ROI or deployed AI outcomes.

## Implementation

1. Preserve baseline `58b1576` on the existing branch; use `portfolio-original-expression-20261006`.
2. Update homepage HTML: hero, cross-project metrics, selected cases, non-collapsible career summaries, concise About, archive link. Keep modal data and bind it by existing data-idx after removing the duplicate XHS card.
3. In parallel, update `assets/portfolio-upgrade.css`, create `works/explorations/index.html` and `archive.css`, and audit metric sources. Main agent integrates the output.
4. Update `scripts/build-site.mjs` allowlist and `tests/site.test.mjs` assertions for order, visible content, links, archive uniqueness and secure build.
5. Run `node --test tests/site.test.mjs`, parse inline scripts, `git diff --check`; build a fresh `_site-expression-*` directory.
6. Inspect real screenshots at 320, 390, 1440 and wide desktop. Exercise menu, modals, theme, archive, case links and keyboard focus; verify console and resource responses.
7. Preserve all old previews, commit scoped changes and provide the new local preview. Do not push to public main in this turn.

## Acceptance

No repeated XHS KPI group across the homepage; no nested archive or essential collapsed information. Core role and real project evidence are visible before long detail. Business results, independent AI practice and unverified model effects remain distinguishable. No database, credentials, private trace or development files in the public build.
