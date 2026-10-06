# Personal First Portfolio Implementation Plan

**Goal:** Present Zhang Biao as a content-growth and creator-operations candidate, with AI practice as a distinct capability supported by real work.

**Architecture:** Incrementally update the static homepage and existing archive. Preserve routes, modal identities and the prior preview. No backend change or public deployment.

**Tech Stack:** Existing HTML, CSS, JavaScript, Node tests and Playwright CLI.

## Approved Design

Hero: name, literal career direction, Gaotu experience and modest portrait. Remove abstract capability chain and isolated tool screenshot. Three results max, each attributed to a project; remove 944 orders from homepage. Main order: identity/results, business projects, AI practice, other work, career, About/education, contact. Adult-English acquisition, Beida senior IP and primary-course Xiaohongshu acquisition are primary business projects; high-school admissions is supplementary. All use business, responsibility and result. AI practice uses problem, implemented function and personal role. Keep technical limitations in its case page, not repeated homepage captions. Other independent prototypes precede the seven simple tool experiments in the archive; do not claim their endpoints are working.

## Tasks

1. Update `tests/site.test.mjs` for the new order, portrait, explicit business context, result provenance, visible archive and stable modal identities. Run tests before implementation.
2. Update `index.html` homepage blocks and navigation. Preserve modal data and event binding by data-idx. Clarify title/context in `works/xhs-matrix-growth/index.html`.
3. In parallel: update `assets/portfolio-upgrade.css`; reorder `works/explorations/index.html` and adjust `archive.css`; audit copy against existing fact sources. Agents own separate files.
4. Run tests, parse inline script, diff check and allowlisted build into a new `_site-personal-*` folder. Do not include database, credentials or traces.
5. Start a separate preview; inspect 320/390/1440/1920 screenshots, images, theme, menu, modal mapping and keyboard focus. Check all public files respond 200 and match sources. Commit scoped files; deliver local URL without publishing.

## Acceptance

First visit makes identity and business clear without clicking. Metrics stay attached to their project, AI is not credited for historical results, and simple demos do not displace stronger work. No horizontal overflow, oversized names, hidden primary content or conflicting theme styles. Existing preview and public site remain unchanged.

## Hierarchy Refinement

Keep the approved page and project order. Shorten adult-English and IP titles without removing their business context. Give only the primary-course Xiaohongshu card an accent top border. Split the AI summary into the concrete collaboration problem, implemented tool functions and Agent rule design, followed by the candidate's role. Correct mobile business headings to 21px and the About tool row to 18px vertical padding. Remove the inherited duplicate project-link arrow. Add regression checks for the full page order, stable modal identities, per-card metric ownership and AI promise boundaries. Validate the allowlisted build in a separate preview at 320, 390, 1440 and 1920 widths; do not deploy publicly.
