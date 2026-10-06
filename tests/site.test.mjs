import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { publicFiles, buildSite } from '../scripts/build-site.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const homepage = () => read('index.html');
const casePath = 'works/xhs-content-workbench/index.html';
const businessPath = 'works/xhs-matrix-growth/index.html';

test('homepage leads to the specific case and preserves historical navigation', () => {
  const html = homepage();
  assert.match(html, /href=["']\/?works\/xhs-content-workbench\//);
  assert.match(html, /href=["']\/?works\/xhs-matrix-growth\//);
  for (const id of ['top', 'works', 'career-section', 'about', 'insights', 'contact']) assert.match(html, new RegExp(`id=["']${id}["']`));
  assert.ok(html.indexOf('id="works"') < html.indexOf('id="career-section"'));
  assert.ok(html.indexOf('id="career-section"') < html.indexOf('id="about"'));
  assert.match(html, /高途小学课程 · 小红书内容获客/);
  assert.match(html, /成人英语直播获客与主播矩阵/);
});

test('personal hero precedes business projects, AI practice and other work', () => {
  const html = homepage();
  const worksStart = html.indexOf('id="works"');
  const careerStart = html.indexOf('id="career-section"');
  const firstScreen = html.slice(0, worksStart);
  const selectedWorks = html.slice(worksStart, careerStart);
  assert.ok(worksStart > 0 && careerStart > worksStart);
  assert.match(firstScreen, /class="personal-portrait"/);
  assert.match(firstScreen, /assets\/profile\.jpg/);
  assert.doesNotMatch(firstScreen, /capability-chain|hero-tool-preview|xhs-workbench-public/);
  assert.doesNotMatch(firstScreen, /class="hero-decision"/, 'Hero should not duplicate the business report');
  assert.equal((firstScreen.match(/class="[^"]*btn-primary[^"]*"/g) || []).length, 1, 'Hero should present only one primary action');
  assert.match(selectedWorks, /href="\/works\/xhs-matrix-growth\/"/);
  assert.match(selectedWorks, /href="\/works\/xhs-content-workbench\/"/);
  assert.ok(selectedWorks.indexOf('/works/xhs-matrix-growth/') < selectedWorks.indexOf('/works/xhs-content-workbench/'));
  assert.ok(html.indexOf('id="works"') < html.indexOf('id="ai-practice"'));
  assert.ok(html.indexOf('id="ai-practice"') < html.indexOf('id="explorations"'));
  assert.ok(html.indexOf('id="explorations"') < html.indexOf('id="career-section"'));
});

test('homepage copy stays job-focused and keeps early explorations secondary', () => {
  const html = homepage();
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const hero = main.slice(0, main.indexOf('id="works"'));
  const explorations = main.slice(main.indexOf('id="explorations"'), main.indexOf('id="career-section"'));
  assert.match(hero, /内容增长/);
  assert.match(hero, /创作者/);
  assert.doesNotMatch(explorations, /可访问性检查于|不代表模型服务或全部功能已经验证可用/);
  assert.match(explorations, /创作者社群助手|AI 短剧创作者运营/);
  assert.doesNotMatch(main, /944|模型效果待验证|尚未完成模型审核|模型审核待验|把内容做成增长/);
  assert.match(main, /独立实践 · 本地工作台/);
});

test('homepage summaries are visible and early work has one standalone entry', () => {
  const html = homepage();
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  assert.doesNotMatch(main, /<details\b/);
  assert.match(html, /代表业务项目/);
  assert.equal((main.match(/href="\/works\/explorations\/"/g) || []).length, 1);
  assert.doesNotMatch(main, /featured-tools-grid|prototype-grid|我的工作边界/);
  assert.match(main, /北京语言大学 · 新闻学/);
  const ids = [...html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Homepage element IDs must be unique');
  const archive = read('works/explorations/index.html');
  assert.doesNotMatch(archive, /<details\b|<script\b/);
  assert.match(archive, /inspiration-station/);
  assert.match(archive, /content-safety-copilot/);
  assert.ok(archive.indexOf('id="featured-title"') > 0);
  assert.ok(archive.indexOf('id="featured-title"') < archive.indexOf('id="tools-title"'));
});

test('cross-project results preserve attribution and project modals use stable identities', () => {
  const html = homepage();
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  assert.match(main, /北大学姐 · 小红书粉丝/);
  assert.match(main, /成人英语 · 兼职主播/);
  assert.match(main, /小学课程 · 小红书有效线索/);
  assert.equal((main.match(/40–50/g) || []).length, 1);
  assert.doesNotMatch(main, /3W\+|3 万.*累计|HTML\/CSS\/JS/);
  assert.match(html, /openProjectModal\(Number\(card\.dataset\.idx\)\)/);
  assert.match(html, /#biz-grid \.project-card\[data-idx\]/, 'Case links without modal identities must retain navigation');
  assert.ok(main.indexOf('class="hero-results"') < main.indexOf('id="works"'));
  const projects = main.slice(main.indexOf('id="biz-grid"'), main.indexOf('id="ai-practice"'));
  assert.match(projects, /小学家长/);
  assert.match(projects, /数理思维与阅读写作/);
  assert.equal((projects.match(/class="project-responsibility"/g) || []).length, 3);
  assert.equal((projects.match(/class="project-results"/g) || []).length, 3);
});

test('business case is a source-bounded account of the historical project', () => {
  const html = read(businessPath);
  assert.match(html, /小红书/);
  assert.match(html, /项目主导/);
  assert.doesNotMatch(html, /团队成果|未独立核验/);
  assert.match(html, /本人|我负责|我的职责/);
  assert.match(html, /3.?5.*40.?50|40.?50.*3.?5/);
  assert.match(html, /AI.*独立实践|独立实践.*AI|不是.*AI/);
  assert.doesNotMatch(html, /(?:真实|显著).*提升.*(?:ROI|获客效率)|自动.*发布/);
});

test('first paint has no full-screen page loader or blocking Google font request', () => {
  const html = homepage();
  assert.doesNotMatch(html, /<div[^>]+id=["']pageLoader["']/);
  assert.doesNotMatch(html, /<link[^>]+href=["']https:\/\/fonts\.googleapis\.com/);
  assert.doesNotMatch(html, /src=["']data:image\//);
  assert.ok(Buffer.byteLength(html) < 220_000);
});

test('case contains truthful status, public source and actual download', () => {
  assert.ok(existsSync(resolve(root, casePath)), 'Case page must exist');
  const html = read(casePath);
  assert.match(html, /未审核|未完成.*审核|尚未.*审核/);
  assert.match(html, /模型.*配置|配置.*模型/);
  assert.match(html, /静态案例/);
  assert.match(html, /不会提交稿件或调用 AI/);
  assert.match(html, /https:\/\/grow\.google\/ai-essentials\//);
  assert.match(html, /public-draft\.md/);
  assert.match(html, /xhs-workbench-public\.png/);
  assert.match(html, /id=["']walkthrough["']/);
  assert.match(html, /人工/);
  assert.match(html, /独立实践|独立.*实践|业务.*流程.*设计/);
  assert.doesNotMatch(html, /href=["'][^"']*(?:127\.0\.0\.1|localhost|file:\/\/)/);
  assert.match(html, /class="architecture-summary"/);
  assert.match(html, /search_sources/);
  assert.match(html, /当前结论：/);
});

test('business case makes project ownership legible before disclosure', () => {
  const html = read(businessPath);
  assert.match(html, /项目主导与协作分工/);
  assert.doesNotMatch(html, /团队成果|未独立核验/);
});

test('public practice draft explicitly discloses its unreviewed provenance', () => {
  const text = read('works/xhs-content-workbench/public-draft.md');
  assert.match(text, /未完成模型审核/);
  assert.match(text, /不是历史业务稿/);
  assert.match(text, /https:\/\/grow\.google\/ai-essentials\//);
  assert.doesNotMatch(text, /source_[a-f0-9-]+|draft_[a-f0-9-]+|task_[a-f0-9-]+|api[_-]?key\s*[:=]/i);
});

test('local links and anchors resolve for homepage and both cases', () => {
  for (const file of ['index.html', businessPath, casePath, 'works/explorations/index.html']) {
    const html = read(file).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    for (const [, raw] of html.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
      if (/^(?:https?:|mailto:|tel:|data:|javascript:)/.test(raw)) continue;
      const [pathname, hash] = raw.split('#');
      const clean = pathname.split('?')[0];
      let target = clean ? resolve(clean.startsWith('/') ? root : dirname(resolve(root, file)), `.${clean.startsWith('/') ? '' : '/'}${clean}`) : resolve(root, file);
      if (clean.endsWith('/')) target = resolve(target, 'index.html');
      assert.ok(target.startsWith(root + '/') || target === root, `${raw} escapes root`);
      assert.ok(existsSync(target), `${file}: missing ${raw}`);
      if (hash && target.endsWith('.html')) {
        const destination = readFileSync(target, 'utf8');
        assert.ok(destination.includes(`id="${hash}"`) || destination.includes(`id='${hash}'`), `${file}: missing anchor ${raw}`);
      }
    }
  }
});

test('public allowlist excludes development and private workspace data', () => {
  for (const file of publicFiles) {
    assert.doesNotMatch(file, /(?:^|\/)(?:\.local|\.git|tests|docs|output|node_modules|backups)(?:\/|$)|\.(?:sqlite|db|env|jsonl)$/);
  }
  assert.throws(() => buildSite(root), /dedicated/);
  assert.throws(() => buildSite(resolve(root, '..')), /dedicated/);
  assert.ok(publicFiles.includes('index-v2-backup.html'), 'Previously public legacy addresses remain available');
});

test('new public files contain no workspace database, private trace or credentials', () => {
  const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? walk(resolve(dir, item.name)) : [resolve(dir, item.name)]);
  for (const file of [...walk(resolve(root, 'works/xhs-content-workbench')), ...walk(resolve(root, 'works/xhs-matrix-growth')), ...walk(resolve(root, 'works/explorations'))]) {
    assert.doesNotMatch(file, /\.(?:sqlite|db|env)$/);
    if (!/\.(html|css|js|md)$/.test(file)) continue;
    const text = readFileSync(file, 'utf8');
    assert.doesNotMatch(text, /sk-[A-Za-z0-9_-]{20,}|Bearer\s+[A-Za-z0-9_-]{20,}|\/Users\/|contextSnapshot|auth\.json/);
  }
});

test('deployment uploads only a built public directory after tests', () => {
  const workflow = read('.github/workflows/pages.yml');
  assert.match(workflow, /node --test tests\/site\.test\.mjs/);
  assert.match(workflow, /node scripts\/build-site\.mjs/);
  assert.match(workflow, /path: _site/);
  assert.doesNotMatch(workflow, /path: \.(?:\s|$)/);
});

test('legacy branch deployment also excludes development directories', () => {
  const config = read('_config.yml');
  for (const directory of ['docs', 'scripts', 'tests', 'output', 'node_modules']) {
    assert.ok(config.includes(`  - ${directory}`), `Legacy deployment must exclude ${directory}`);
  }
});

test('portrait and project results retain responsive styles', () => {
  const css = read('assets/portfolio-upgrade.css');
  assert.match(css, /\.personal-portrait/);
  assert.match(css, /\.business-project-grid/);
  assert.match(css, /\.selected-case-ai::before\s*\{[^}]*background:/);
  assert.match(css, /\.selected-case-screen/);
  assert.doesNotMatch(css, /clamp\([^;]*vw/);
  const modalCloseRule = css.match(/\.portfolio-upgrade \.card-modal-close\s*\{([^}]+)\}/)?.[1];
  assert.match(modalCloseRule, /transition:/);
  assert.doesNotMatch(modalCloseRule, /transition:\s*all/, 'Visibility must not delay modal focus');
});
