// Regression tests use disposable copies of the production build; no network.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const checker = fileURLToPath(new URL('./check-links.mjs', import.meta.url));
const build = fileURLToPath(new URL('../dist/', import.meta.url));
const cases = [
  ['duplicate 404 canonical', '404.html', s => s.replace('</head>', '<link rel="canonical" href="https://docs.shieldedpools.io/404.html"></head>'), /expected one canonical/],
  ['404 without noindex', '404.html', s => s.replace('content="noindex"', 'content="index"'), /404 must have noindex/],
  ['404 in sitemap', 'sitemap-0.xml', s => s.replace('</urlset>', '<url><loc>https://docs.shieldedpools.io/404.html</loc></url></urlset>'), /404 must be excluded/],
  ['wrong social page URL', 'index.html', s => s.replace(/(property="og:url" content=")[^"]+/, '$1https://wrong.example/'), /og:url differs/],
  ['duplicate social metadata', 'index.html', s => s.replace('</head>', '<meta name="twitter:card" content="summary"></head>'), /one twitter:card tag/],
  ['wrong canonical', 'index.html', s => s.replace(/(rel="canonical" href=")[^"]+/, '$1https://docs.shieldedpools.io/docs/'), /expected one canonical/],
  ['wrong image dimensions', 'index.html', s => s.replace('property="og:image:width" content="1200"', 'property="og:image:width" content="600"'), /og:image:width must be 1200/],
  ['missing social image', 'brand/social-preview.png', null, /og:image: ENOENT/],
];
for (const [name, file, mutate, expected] of cases) {
  test(`rejects ${name}`, async () => {
    const dir = await mkdtemp(path.join(tmpdir(), 'docs-check-'));
    try {
      await cp(build, path.join(dir, 'dist'), { recursive: true });
      const target = path.join(dir, 'dist', file);
      if (mutate) {
        const original = await readFile(target, 'utf8');
        const changed = mutate(original);
        assert.notEqual(changed, original, 'fixture mutation must change output');
        await writeFile(target, changed);
      } else await rm(target);
      const result = spawnSync(process.execPath, [checker], { cwd: dir, encoding: 'utf8' });
      assert.equal(result.status, 1, result.stdout + result.stderr);
      assert.match(result.stderr, expected);
    } finally { await rm(dir, { recursive: true, force: true }); }
  });
}
