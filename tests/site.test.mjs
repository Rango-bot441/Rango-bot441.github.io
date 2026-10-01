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
  assert.match(html, /小红书素人种草与矩阵增长/);
  assert.match(html, /成人英语直播获客与主播矩阵/);
});

test('personal first screen has one primary route and both selected works share a clear hierarchy', () => {
  const html = homepage();
  const worksStart = html.indexOf('id="works"');
  const careerStart = html.indexOf('id="career-section"');
  const firstScreen = html.slice(0, worksStart);
  const selectedWorks = html.slice(worksStart, careerStart);
  assert.ok(worksStart > 0 && careerStart > worksStart);
  assert.match(firstScreen, /assets\/profile\.jpg/, 'Hero should show the actual person before the case reports');
  assert.doesNotMatch(firstScreen, /class="hero-decision"/, 'Hero should not duplicate the business report');
  assert.equal((firstScreen.match(/class="[^"]*btn-primary[^"]*"/g) || []).length, 1, 'Hero should present only one primary action');
  assert.match(selectedWorks, /href="\/works\/xhs-matrix-growth\/"/);
  assert.match(selectedWorks, /href="\/works\/xhs-content-workbench\/"/);
  assert.ok(selectedWorks.indexOf('/works/xhs-matrix-growth/') < selectedWorks.indexOf('/works/xhs-content-workbench/'));
  assert.ok(html.indexOf('id="about"') < html.indexOf('id="explorations"'), 'About the person should precede the archive');
});

test('business case is a source-bounded account of the historical project', () => {
  const html = read(businessPath);
  assert.match(html, /小红书/);
  assert.match(html, /历史.*自述|项目.*自述/);
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
});

test('public practice draft explicitly discloses its unreviewed provenance', () => {
  const text = read('works/xhs-content-workbench/public-draft.md');
  assert.match(text, /未完成模型审核/);
  assert.match(text, /不是历史业务稿/);
  assert.match(text, /https:\/\/grow\.google\/ai-essentials\//);
  assert.doesNotMatch(text, /source_[a-f0-9-]+|draft_[a-f0-9-]+|task_[a-f0-9-]+|api[_-]?key\s*[:=]/i);
});

test('local links and anchors resolve for homepage and both cases', () => {
  for (const file of ['index.html', businessPath, casePath]) {
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
  for (const file of [...walk(resolve(root, 'works/xhs-content-workbench')), ...walk(resolve(root, 'works/xhs-matrix-growth'))]) {
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

test('personal portrait and contrasting selected-work cards retain explicit styles', () => {
  const css = read('assets/portfolio-upgrade.css');
  assert.match(css, /\.hero-portrait-frame\s*\{[^}]*aspect-ratio:/);
  assert.match(css, /\.featured-pair\s*\{[^}]*grid-template-columns:/);
  assert.match(css, /\.selected-case-ai\s*\{[^}]*background:/);
});
