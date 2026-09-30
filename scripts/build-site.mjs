import { cpSync, existsSync, mkdirSync, lstatSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// Keep previously published standalone pages addressable without publishing new
// development files. New files require an explicit addition to this list.
export const publicFiles = [
  'index.html', 'favicon.svg',
  'index-preview.html', 'index-v2-backup.html', 'index-v2-with-proof.html', 'index-v2.html',
  'assets/profile.jpg', 'assets/blcu-logo.png', 'assets/gaotu-logo.svg',
  'assets/cover-ab-test-designer.png', 'assets/cover-content-safety-copilot.png',
  'assets/cover-prd-copilot.png', 'assets/cover-script-copywriter.png',
  'assets/creator-inspiration-station-cover.png', 'assets/creator-postmortem-ai-cover.png',
  'assets/creatorinsight-cover.png', 'assets/xhs-workbench-public.png',
  'assets/portfolio-upgrade.css',
  'works/xhs-content-workbench/index.html', 'works/xhs-content-workbench/case.css',
  'works/xhs-content-workbench/case.js', 'works/xhs-content-workbench/public-draft.md',
];

export function buildSite(destination = resolve(root, '_site')) {
  const output = resolve(destination);
  if (!output.startsWith(root + sep + '_site') || output === root) throw new Error('Build target must be a dedicated _site directory in this project.');
  if (existsSync(output)) throw new Error('Build target already exists. Use a new _site name; existing files are not deleted.');
  const files = [...publicFiles];
  for (const file of files) {
    if (!existsSync(resolve(root, file))) throw new Error(`Required public file missing: ${file}`);
    if (!lstatSync(resolve(root, file)).isFile()) throw new Error(`Public entry is not a regular file: ${file}`);
  }
  for (const file of ['index.html', 'works/xhs-content-workbench/index.html', 'works/xhs-content-workbench/public-draft.md', 'assets/xhs-workbench-public.png']) {
    if (!files.includes(file)) throw new Error(`Required public file missing: ${file}`);
  }
  mkdirSync(output, { recursive: true });
  for (const file of files) {
    const target = resolve(output, file);
    mkdirSync(dirname(target), { recursive: true });
    cpSync(resolve(root, file), target, { errorOnExist: true, force: false });
  }
  return { output, files };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = buildSite(process.argv[2] ? resolve(root, process.argv[2]) : undefined);
  console.log(JSON.stringify({ directory: result.output, publicFileCount: result.files.length }));
}
