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

test('homepage exposes the current section hierarchy and truthful entry points', () => {
  const html = homepage();
  for (const id of ['top', 'works', 'ai-practice', 'explorations', 'career-section', 'about', 'contact']) assert.match(html, new RegExp(`id=["']${id}["']`));
  assert.ok(html.indexOf('id="works"') < html.indexOf('id="career-section"'));
  assert.ok(html.indexOf('id="ai-practice"') < html.indexOf('id="explorations"'));
  assert.ok(html.indexOf('id="explorations"') < html.indexOf('id="career-section"'));
  assert.match(html, /RangoCode/);
  assert.match(html, /AI 网关/);
  assert.match(html, /轻量 Demo/);
  assert.match(html, /https:\/\/rango-bot441\.github\.io\/works\/explorations\//);
  assert.doesNotMatch(html, /href=["']\/?works\/xhs-(?:content-workbench|youxu-workbench|matrix-growth)\//);
  assert.match(html, /小学数理思维 · 素人矩阵线索|小学家长/);
  assert.match(html, /成人英语 · 主播矩阵获客/);
});

test('personal hero precedes business projects and uses the current portrait', () => {
  const html = homepage();
  const worksStart = html.indexOf('id="works"');
  const firstScreen = html.slice(0, worksStart);
  assert.ok(worksStart > 0);
  assert.match(firstScreen, /assets\/profile\.jpg/);
  assert.ok(html.indexOf('id="works"') < html.indexOf('id="ai-practice"'));
  assert.ok(html.indexOf('id="ai-practice"') < html.indexOf('id="explorations"'));
});

test('homepage copy stays job-focused and accurately labels lightweight demos', () => {
  const html = homepage();
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  assert.match(main, /内容增长/);
  assert.match(main, /创作者/);
  assert.match(main, /轻量 Demo/);
  assert.doesNotMatch(main, /一键发布|自动发布|已提升业务收益/);
});

test('homepage summaries are visible and section IDs are unique', () => {
  const html = homepage();
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  assert.doesNotMatch(main, /<details\b/);
  assert.match(html, /代表业务项目/);
  assert.match(main, /北京语言大学 · 新闻学/);
  const ids = [...html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Homepage element IDs must be unique');
  const archive = read('works/explorations/index.html');
  assert.match(archive, /inspiration-station/);
  assert.match(archive, /content-safety-copilot/);
  assert.doesNotMatch(archive, /featured-title|featured-card/);
});

test('cross-project results preserve attribution and project modals use stable identities', () => {
  const html = homepage();
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  assert.match(main, /北大学姐 · 小红书粉丝/);
  assert.match(main, /成人英语 · 兼职主播/);
  assert.match(main, /小学家长/);
  assert.equal((main.match(/40–50/g) || []).length, 1);
  assert.doesNotMatch(main, /3W\+|3 万.*累计|HTML\/CSS\/JS/);
  assert.match(html, /openProjectModal\(Number\(card\.dataset\.idx\)\)/);
  assert.ok(main.indexOf('id="works"') < main.indexOf('id="ai-practice"'));
  const projects = main.slice(main.indexOf('class="business-project-grid"'), main.indexOf('id="ai-practice"'));
  assert.match(projects, /小学家长/);
  assert.match(projects, /小学数理思维/);
  assert.equal((projects.match(/class="project-responsibility"/g) || []).length, 4);
  assert.equal((projects.match(/class="project-results"/g) || []).length, 4);
});

test('locked homepage hierarchy and project focus stay stable', () => {
  const html = homepage().replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
  const markers = ['id="top"', 'id="works"', 'id="ai-practice"', 'id="explorations"', 'id="career-section"', 'id="about"', 'id="contact"'];
  let previous = -1;
  for (const marker of markers) {
    assert.equal(main.split(marker).length - 1, 1, `${marker} must exist exactly once`);
    const position = main.indexOf(marker);
    assert.ok(position > previous, `${marker} must follow the previous section`);
    previous = position;
  }
  const grid = main.slice(main.indexOf('class="business-project-grid"'), main.indexOf('id="ai-practice"'));
  assert.equal((grid.match(/<article\b/g) || []).length, 4);
});

test('AI practice separates business problem, implemented tools and personal role', () => {
  const html = homepage();
  const ai = html.slice(html.indexOf('id="ai-practice"'), html.indexOf('id="explorations"'));
  assert.match(ai, /class="selected-case-problem"/);
  assert.match(ai, /选题、写稿和审核原本分散在不同工具里/);
  assert.match(ai, /class="selected-case-capabilities"/);
  assert.match(ai, /需求、流程和检查规则由我设计并验收/);
  assert.match(ai, /AI 辅助开发/);
  assert.doesNotMatch(ai, /在线使用|立即生成|一键发布|已提升业务收益/);
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
  assert.match(html, /不同家长人设承接不同需求/);
  assert.match(html, /从内容触达到销售承接/);
  assert.match(html, /家长问题选题.*人设笔记建立信任.*私信答疑/);
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
  assert.match(html, /内容运营、审核人和外部供稿者/);
  assert.match(html, /外稿提交后使用它/);
  assert.match(html, /核心价值：/);
});

test('business case makes project ownership legible before disclosure', () => {
  const html = read(businessPath);
  assert.match(html, /项目主导与协作分工/);
  assert.doesNotMatch(html, /团队成果|未独立核验/);
});

test('case pages expose a specific business chain and product use context', () => {
  const business = read(businessPath);
  const ai = read(casePath);
  assert.match(business, /家长问题选题.*人设笔记建立信任.*私信答疑.*企微／群聊.*体验课／资料.*正价课/);
  assert.match(business, /用不同家长人设承接不同需求/);
  assert.match(business, /干货内容占 80% 以上/);
  assert.match(ai, /内容运营、审核人和外部供稿者在外稿提交后使用它/);
  assert.match(ai, /资料、原句、修改记录和交付状态/);
  assert.match(ai, /核心价值：让审核人知道这句话依据什么/);
  assert.match(ai, /已实现：资料与外稿管理、人工编辑、版本导出/);
  assert.match(ai, /模型效果与业务收益待验证/);
});

test('public practice draft explicitly discloses its unreviewed provenance', () => {
  const text = read('works/xhs-content-workbench/public-draft.md');
  assert.match(text, /未完成模型审核/);
  assert.match(text, /不是历史业务稿/);
  assert.match(text, /https:\/\/grow\.google\/ai-essentials\//);
  assert.doesNotMatch(text, /source_[a-f0-9-]+|draft_[a-f0-9-]+|task_[a-f0-9-]+|api[_-]?key\s*[:=]/i);
});

test('local links and anchors resolve for homepage and retained public pages', () => {
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

test('homepage assets and project cards retain responsive styles', () => {
  const css = read('assets/portfolio-upgrade.css');
  assert.match(css, /\.personal-portrait/);
  assert.match(css, /\.business-project-grid/);
  assert.match(css, /\.selected-case-screen/);
  for (const file of ['assets/fusion.css', 'assets/ai-gateway-diagram.svg', 'assets/mariocode-hero.png', 'assets/xhs-workbench-public.jpg', 'assets/youxu-workbench.png']) {
    assert.ok(publicFiles.includes(file), `${file} must be in the build allowlist`);
  }
});
