# Shielded Pools documentation

Official documentation site prepared for **https://docs.shieldedpools.io**, using Astro Starlight and Markdown/MDX. Intended public repository: **shieldedpools/docs**. This checkout has been prepared locally; nothing has been published or pushed and no account or DNS settings have been changed.

## Local development

Use Node.js 24 (`nvm use` with the included `.nvmrc`).

```sh
npm ci
npm run dev
```

Open the URL printed by Astro (normally http://localhost:4321).

```sh
npm run build
npm run check:links
npm run test:checks
npm run preview
```

The build produces `dist/`, including Starlight’s local Pagefind search index and sitemap. Search works in the production preview; the development server does not build its index. No hosted search account or API key is needed. The link checker validates generated internal links, assets, and fragment targets. It does not request external URLs.

## Editing content

Edit Markdown or MDX in `src/content/docs/`. Each page needs a unique `title` and a useful `description` in YAML frontmatter. `index.mdx` is the splash landing page; developer pages live in `developers/`. Add sidebar entries in `astro.config.mjs`; use root-relative internal links with trailing slashes. `src/styles/custom.css` contains light/dark branding; components add the Open app link and license footer.

Starlight supplies responsive navigation, local search, theme selection, canonical links, per-page Open Graph titles/descriptions/URLs, and sitemap generation. The config adds shared social metadata. The favicon/header logo mark and 1200 × 630 PNG social preview are approved assets copied unchanged from the app into `public/brand/`. There is no custom social artwork to regenerate. Replace approved assets deliberately and update image dimensions, MIME type, and alt descriptions in `astro.config.mjs` if they change. See `public/brand/NOTICE.md` for exclusions.

Primary evidence and exact reviewed contract, SDK, and app commits are documented on `/sources/`. Verify changes against upstream code before updating guidance. Do not add audit, deployment-address, privacy, or availability claims without primary evidence. The docs repository has no wallet dependencies or transaction functionality.

## Deployment

`.github/workflows/deploy.yml` builds on pushes to `main` or a manual workflow dispatch. It uses Node 24, `npm ci`, a production build, internal-link/metadata validation, and checker regression tests, then uploads `dist/` and deploys through GitHub Pages with a deployment-scoped token. The workflow needs no custom secrets. The Pages environment may require approval if configured that way in GitHub.

`site` is `https://docs.shieldedpools.io` with **no repository-name base path**. `public/CNAME` is copied to `dist/CNAME`; also set the domain in GitHub Pages settings. Never change the base to `/docs/`. If the default branch differs, update the workflow trigger.

## Manual setup remaining

1. Create or select the **public** GitHub repository `shieldedpools/docs`, then review, commit, and push these files to its `main` branch. Include `package-lock.json`. No Git remote, commit, or push is performed by this implementation.
2. In that repository, go to **Settings → Pages → Build and deployment → Source**, and choose **GitHub Actions**. Ensure Actions is allowed and the `github-pages` environment permits `main`.
3. To protect the domain, verify ownership for the `shieldedpools` GitHub organization in its **Settings → Pages**. GitHub supplies the exact DNS TXT host/value; add those at Namecheap and complete verification. Do not invent the TXT token. Keep the verification record.
4. In the repository’s **Settings → Pages → Custom domain**, enter **docs.shieldedpools.io** and save.
5. In Namecheap **Advanced DNS**, add a **CNAME Record** with **Host `docs`**, **Value `shieldedpools.github.io`**, and **TTL Automatic**. Remove conflicting records for `docs` if any, after reviewing them. Do not point this CNAME at a repository path or include a URL scheme.
6. Push to `main` or run the deployment workflow manually. Wait for the Pages deployment, DNS check, and certificate issuance to finish. After domain verification and certificate availability, enable **Enforce HTTPS** in GitHub Pages settings.
7. Visit https://docs.shieldedpools.io and check the custom domain, HTTPS, navigation, search, light/dark themes, mobile menu, and Open app link. Confirm `/sitemap-index.xml`, `/robots.txt`, and page canonical URLs use the custom domain.

No account, domain, DNS, or hosting changes have been made locally. There is no published deployment to verify until these steps are completed.

## Licenses

Original documentation: **CC BY 4.0**. Original site code: **MIT**. See [LICENSE.md](LICENSE.md) for exact scopes and the full texts under `LICENSES/`. Logos, trademarks, and third-party assets/code/content are excluded; third-party dependencies keep their own licenses and notices. The initial checkout contained no third-party notices to preserve. App/SDK implementation code has not been copied. Approved brand artwork has been copied unchanged into `public/brand/` and is excluded from both grants; see its `NOTICE.md`.

## Verification

Run `npm run build` followed by `npm run check:links`. These checks stay offline. The checker validates internal paths and fragments, exact canonical and social URL values, duplicate metadata, local social image files and PNG dimensions, and that `404.html` is noindex and absent from the sitemap. The custom 404 uses Starlight’s supported `disable404Route` option and `src/pages/404.astro` with `StarlightPage`; do not add a competing `src/content/docs/404.md`.

External checks are separate and explicit. See `/sources/` for the dated official Midnight network check, app/SDK revisions, and public-access results. The app repository returned 404 to an unauthenticated check; the local app source supported the review, but is not published here. The SDK repository and pinned revision returned 200.

Local browser checks cover desktop/mobile, light/dark themes, production search, and the mobile menu. These validate the docs site only, not live app or wallet transactions. GitHub Actions deployment, DNS, and HTTPS require the manual setup above.

Latest validation (11 November 2026, content restructure): production build passed; the offline checker passed for 15 HTML pages and 704 internal URLs; all eight checker regression cases passed. Earlier browser checks: Chromium verified six guides at 320, 390, 768, and 1440 pixels, theme persistence, search, the mobile menu, and the Open app destination with no JavaScript errors or horizontal overflow. Desktop and mobile screenshots were visually inspected in both themes, including the official logo mark. The external network and source-access checks are dated 10 November 2026 on `/sources/`. No dependencies were added and the lockfile was preserved.
