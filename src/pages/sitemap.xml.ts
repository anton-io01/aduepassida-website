import type { APIRoute } from 'astro';
import { homePaths, privacyPaths } from '../i18n/utils';

export const GET: APIRoute = ({ site }) => {
  const entries = [homePaths, privacyPaths].flatMap(paths => {
    const it = new URL(paths.it, site).href;
    const en = new URL(paths.en, site).href;
    const alternates = `<xhtml:link rel="alternate" hreflang="it" href="${it}"/><xhtml:link rel="alternate" hreflang="en" href="${en}"/>`;
    return [it, en].map(url => `  <url><loc>${url}</loc>${alternates}</url>`);
  });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
