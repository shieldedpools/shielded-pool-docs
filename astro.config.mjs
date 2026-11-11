import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.shieldedpools.io',
  trailingSlash: 'always',
  integrations: [starlight({
    title: 'Shielded Pools',
    description: 'Official Shielded Pools documentation. Wrap NIGHT into sNIGHT, a 1:1 shielded token on Midnight, and hold and send it privately.',
    favicon: '/brand/favicon.png',
    logo: { src: './public/brand/favicon.png', alt: '', replacesTitle: false },
    // The custom src/pages/404.astro owns the 404 route.
    disable404Route: true,
    customCss: ['./src/styles/custom.css', './src/styles/diagrams.css'],
    components: { Header: './src/components/Header.astro', Footer: './src/components/Footer.astro' },
    social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/shieldedpools/docs' }],
    head: [
      { tag: 'meta', attrs: { property: 'og:site_name', content: 'Shielded Pools Docs' } },
      { tag: 'meta', attrs: { property: 'og:image', content: 'https://docs.shieldedpools.io/brand/social-preview.png' } },
      { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
      { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
      { tag: 'meta', attrs: { property: 'og:image:type', content: 'image/png' } },
      { tag: 'meta', attrs: { property: 'og:image:alt', content: 'Shielded Pools: NIGHT to sNIGHT, powered by Midnight.' } },
      { tag: 'meta', attrs: { name: 'twitter:image:alt', content: 'Shielded Pools: NIGHT to sNIGHT, powered by Midnight.' } },
      { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
      { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://docs.shieldedpools.io/brand/social-preview.png' } },
      { tag: 'meta', attrs: { name: 'theme-color', content: '#5b21b6' } },
    ],
    sidebar: [
      { label: 'Start here', items: [
        { label: 'Introduction', slug: '' }, { slug: 'why' }, { slug: 'how-it-works' },
      ] },
      { label: 'Guides', items: [
        { slug: 'wrap-night' }, { slug: 'unwrap-snight' },
      ] },
      { label: 'Safety', items: [
        { slug: 'privacy' }, { slug: 'risks' }, { slug: 'troubleshooting' }, { slug: 'faq' },
      ] },
      { label: 'Reference', items: [{ slug: 'networks' }] },
      { label: 'Developers', items: [
        { slug: 'developers/sdk' }, { slug: 'developers/contract' },
      ] },
      { label: 'About', items: [{ slug: 'sources' }, { slug: 'licensing' }] },
    ],
  })],
});
