// Offline validation of generated HTML, internal links, SEO, images, and sitemap.
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const origin = 'https://docs.shieldedpools.io';
const socialImage = `${origin}/brand/social-preview.png`;
const errors = [];
const report = (route, message) => errors.push(`${route}: ${message}`);
const decode = value => value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (_, entity) => {
  if (entity.startsWith('#')) return String.fromCodePoint(parseInt(entity.slice(entity[1].toLowerCase() === 'x' ? 2 : 1), entity[1].toLowerCase() === 'x' ? 16 : 10));
  return { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' }[entity.toLowerCase()];
});
const text = html => decode(html.replace(/<[^>]*>/g, '')).trim();
function attrs(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(m => [m[1].toLowerCase(), decode(m[2] ?? m[3])]));
}
async function walk(dir) {
  return (await Promise.all((await readdir(dir, { withFileTypes: true })).map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}
const files = await walk(root);
const pages = new Map(await Promise.all(files.filter(f => f.endsWith('.html')).map(async f => [f, await readFile(f, 'utf8')])));
if (!pages.size) throw new Error('No HTML output found. Run npm run build first.');
let checked = 0;
async function localFile(url) {
  const target = path.resolve(root, '.' + decodeURIComponent(url.pathname));
  if (target !== root && !target.startsWith(root + path.sep)) throw new Error('path outside build');
  return (await stat(target)).isDirectory() ? path.join(target, 'index.html') : target;
}
const canonicalUrls = new Set();
for (const [file, html] of pages) {
  const route = '/' + path.relative(root, file).split(path.sep).join('/').replace(/index\.html$/, '');
  const expected = origin + route;
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map(m => attrs(m[0]));
  const links = [...head.matchAll(/<link\b[^>]*>/gi)].map(m => attrs(m[0]));
  function meta(name, required = true) {
    const matches = metas.filter(m => (m.name ?? m.property)?.toLowerCase() === name);
    if (matches.length > 1 || (required && matches.length !== 1)) report(route, `expected ${required ? 'exactly' : 'at most'} one ${name} tag; found ${matches.length}`);
    return matches[0]?.content;
  }
  const canonical = links.filter(l => l.rel === 'canonical');
  if (canonical.length !== 1 || canonical[0]?.href !== expected) report(route, `expected one canonical URL equal to ${expected}`);
  canonicalUrls.add(expected);
  if (meta('og:url') !== expected) report(route, 'og:url differs from canonical');
  const twitterUrl = meta('twitter:url', false);
  if (twitterUrl !== undefined && twitterUrl !== expected) report(route, 'twitter:url differs from canonical');
  const title = text(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? '');
  const titles = [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
  if (!title || titles.length !== 1 || !text(titles[0]?.[1] ?? '').startsWith(title)) report(route, 'missing or inconsistent page title');
  if (meta('og:title') !== title) report(route, 'og:title differs from page heading');
  const description = meta('description');
  if (!description?.trim() || meta('og:description') !== description) report(route, 'missing or inconsistent page descriptions');
  for (const [name, value] of [['twitter:title', title], ['twitter:description', description]]) {
    const actual = meta(name, false);
    if (actual !== undefined && actual !== value) report(route, `${name} differs from page content`);
  }
  if (meta('twitter:card') !== 'summary_large_image') report(route, 'twitter:card must be summary_large_image');
  for (const name of ['og:image', 'twitter:image']) {
    const value = meta(name);
    if (value !== socialImage) report(route, `${name} must be the absolute approved social image URL`);
    try {
      const url = new URL(value);
      if (url.origin !== origin) throw new Error('expected same-origin image');
      const data = await readFile(await localFile(url));
      if (data.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') throw new Error('not a PNG image');
      if (data.readUInt32BE(16) !== 1200 || data.readUInt32BE(20) !== 630) throw new Error('image dimensions are not 1200 × 630');
    } catch (error) { report(route, `${name}: ${error.message}`); }
  }
  for (const [name, expectedValue] of [['og:image:width', '1200'], ['og:image:height', '630'], ['og:image:type', 'image/png']]) {
    if (meta(name) !== expectedValue) report(route, `${name} must be ${expectedValue}`);
  }
  for (const name of ['og:image:alt', 'twitter:image:alt']) if (!meta(name)?.trim()) report(route, `${name} must describe the image`);
  const robots = meta('robots', false);
  if (route === '/404.html' && !robots?.split(/[\s,]+/).includes('noindex')) report(route, '404 must have noindex');
  if (route !== '/404.html' && robots?.includes('noindex')) report(route, 'documentation must be indexable');

  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const value = decode(match[1]);
    try {
      const url = new URL(value, expected);
      if (url.origin !== origin) continue; // Never fetch external URLs.
      const target = await localFile(url);
      await stat(target);
      if (url.hash && pages.has(target)) {
        const ids = [...pages.get(target).matchAll(/\bid=["']([^"']+)["']/g)].map(m => decode(m[1]));
        if (!ids.includes(decodeURIComponent(url.hash.slice(1)))) throw new Error('missing fragment target');
      }
      checked++;
    } catch (error) { report(route, `${value} (${error.message})`); }
  }
}
if (!pages.has(path.join(root, '404.html'))) report('404', 'missing generated 404.html');
const sitemapFiles = files.filter(f => /sitemap[^/]*\.xml$/.test(f));
if (!sitemapFiles.length) report('sitemap', 'no sitemap generated');
const sitemapUrls = new Set();
for (const file of sitemapFiles) {
  const xml = await readFile(file, 'utf8');
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const value = decode(match[1]);
    try {
      const url = new URL(value);
      if (url.origin !== origin || url.search || url.hash) throw new Error('unexpected sitemap URL');
      if (/\/404(?:\/|\.html)?$/.test(url.pathname)) throw new Error('404 must be excluded from sitemap');
      await stat(await localFile(url));
      if (!url.pathname.endsWith('.xml')) {
        if (!canonicalUrls.has(value)) throw new Error('sitemap URL has no matching canonical');
        sitemapUrls.add(value);
      }
    } catch (error) { report('sitemap', `${value} (${error.message})`); }
  }
}
for (const url of canonicalUrls) if (!url.endsWith('/404.html') && !sitemapUrls.has(url)) report('sitemap', `missing ${url}`);
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Checked ${pages.size} HTML pages and ${checked} internal URLs; exact canonical/social metadata, PNGs, sitemap, and 404 safeguards passed (offline).`);
