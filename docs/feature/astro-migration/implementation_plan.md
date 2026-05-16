# Implementation Plan — Migrazione Astro B&B "A Due Passi Da" (Fase 1)
_Generated: 2026-05-16_
_Source: docs/feature/astro-migration/requirements.md_

## Coverage Matrix

| Req | Description | Step |
|-----|-------------|------|
| FR-01 | Init Astro project | 1 |
| FR-02 | netlify.toml | 1 |
| FR-03 | @astrojs/sitemap | 1 |
| FR-34 | Site URL config | 1 |
| FR-36 | robots.txt | 1 |
| FR-38 | Copy CSS files | 1 |
| FR-20 | it.json translations | 2 |
| FR-21 | en.json translations | 2 |
| FR-22 | i18n utils.ts | 2 |
| FR-23 | services.yaml | 2 |
| FR-28 | Move images | 2 |
| FR-04 | BaseLayout.astro | 3 |
| FR-05 | SEOHead.astro | 3 |
| FR-06 | Header.astro | 3 |
| FR-07 | Footer.astro | 3 |
| FR-35 | JSON-LD Schema | 3 |
| FR-08 | Hero.astro | 4 |
| FR-09 | Struttura.astro | 4 |
| FR-10 | Gallery.astro | 4 |
| FR-11 | Services.astro | 4 |
| FR-12 | Location.astro | 4 |
| FR-29 | Image optimization | 4 |
| FR-13 | Attractions.astro | 5 |
| FR-14 | Reviews.astro | 5 |
| FR-15 | FAQ.astro | 5 |
| FR-16 | Contacts.astro | 5 |
| FR-17 | QuoteForm.astro | 6 |
| FR-18 | form.js adapt | 6 |
| FR-19 | Success message | 6 |
| FR-30 | JS adaptation | 6 |
| FR-31 | Remove placeholder JS | 6 |
| FR-32 | CookieBanner.astro | 6 |
| FR-33 | cookie-banner.css | 6 |
| FR-24 | Homepage IT | 7 |
| FR-25 | Homepage EN | 7 |
| FR-26 | Privacy IT | 7 |
| FR-27 | Privacy EN | 7 |
| FR-37 | Redirect 301 | 7 |
| NFR-01–09 | Performance, a11y, images | 8 (cross-cutting) |

---

## Step 1 — Project Initialization & Configuration

### Overview
Bootstrap the Astro project, configure build tooling, Netlify deploy, and establish the CSS foundation.
**Implements: FR-01, FR-02, FR-03, FR-34, FR-36, FR-38**

### Files Involved

| Action | Path | Reason |
|--------|------|--------|
| Create | `astro.config.mjs` | Astro config with site URL, sitemap |
| Create | `package.json` | Dependencies: astro, @astrojs/sitemap |
| Create | `tsconfig.json` | TypeScript config for Astro |
| Create | `netlify.toml` | Build command, publish dir, NODE_VERSION |
| Create | `public/robots.txt` | Sitemap URL pointing to aduepassidabnb.it |
| Create | `public/favicon.ico` | Copy from project root |
| Move | `css/style.css` → `src/styles/style.css` | CSS preserved unchanged |
| Move | `css/responsive.css` → `src/styles/responsive.css` | CSS preserved unchanged |

### Dependencies
None — this is the first step.

---

### 1. Implementation Plan

#### 1.1 Code Changes
- Run `npm create astro@latest` in project root with `--template minimal --no-install` flags. Then manually configure.
- `astro.config.mjs`: set `site` to `process.env.SITE_URL || 'https://aduepassidabnb.it'`, add `@astrojs/sitemap` integration, configure image service (Sharp default).
- `netlify.toml`: `[build]` section with `command = "npm run build"`, `publish = "dist"`. `[build.environment]` with `NODE_VERSION = "20"`. Redirects section placeholder (completed in Step 7).
- Copy `css/style.css` → `src/styles/style.css` and `css/responsive.css` → `src/styles/responsive.css` without modification.
- Copy `favicon.ico` to `public/favicon.ico`.
- Create `public/robots.txt` with `Sitemap: https://aduepassidabnb.it/sitemap-index.xml`.

#### 1.2 Configuration and Database
- `package.json` dependencies: `astro@^5`, `@astrojs/sitemap@^6`.
- No database changes.

#### 1.3 Testing
- `npm run build` completes without errors → validates FR-01.
- `npm run dev` starts dev server → basic smoke test.
- Verify `dist/` output exists after build.

#### 1.4 Documentation Updates
N/A

---

### 2. Definition of Done (DoD)

**Technical:**
- [ ] `npm install` succeeds
- [ ] `npm run dev` starts server on localhost
- [ ] `npm run build` completes, `dist/` contains output
- [ ] `src/styles/style.css` is identical to original `css/style.css`

**Functional:**
- [ ] Project structure matches Astro conventions
- [ ] `netlify.toml` has correct build command and publish dir

> ⚠️ Do not begin Step 2 until all DoD criteria above are checked.

---

## Step 2 — i18n System, Data Files & Images

### Overview
Create the translation system, services data, and move images for optimization.
**Implements: FR-20, FR-21, FR-22, FR-23, FR-28**

### Files Involved

| Action | Path | Reason |
|--------|------|--------|
| Create | `src/i18n/it.json` | All Italian strings |
| Create | `src/i18n/en.json` | All English strings (10 FAQ aligned) |
| Create | `src/i18n/utils.ts` | `t()` and `getAlternateUrl()` helpers |
| Create | `src/data/services.yaml` | 22 services data |
| Move | `images/**` → `src/assets/images/**` | All images for Astro optimization |

### Dependencies
Step 1 (project initialized).

---

### 1. Implementation Plan

#### 1.1 Code Changes
- `src/i18n/utils.ts`: export `t(lang: 'it'|'en', key: string): string` — dot-notation key access (e.g., `t('it', 'hero.title')`). Export `getAlternateUrl(lang, path)` — returns alternate language URL.
- `src/i18n/it.json`: Extract ALL Italian text from `index.html` (635 lines). Structure by section: meta, nav, hero, struttura, gallery, services, location, attractions, reviews, form, contacts, faq (10 Q&A), footer, cookie.
- `src/i18n/en.json`: Extract ALL English text from `index-en.html` (646 lines). Add 4 missing FAQ: parking, transport, quote process, invoice. Align to same JSON keys as IT.
- `src/data/services.yaml`: Convert the 22-item SERVICES array from `main.js` (lines 42-74) to YAML. Each entry: key, icon, category, included.
- Move all images maintaining subfolder structure. Note: `appartamento/` images are 12-17 MB each — Astro Image will compress at build time.

#### 1.2 Configuration and Database
N/A

#### 1.3 Testing
- Verify `it.json` and `en.json` parse without errors.
- Verify `t('it', 'hero.title')` returns correct string.
- Verify `services.yaml` loads correctly with Astro's YAML import.
- Verify all image files exist in `src/assets/images/`.

#### 1.4 Documentation Updates
N/A

---

### 2. Definition of Done (DoD)

**Technical:**
- [ ] Both JSON files parse without errors
- [ ] `utils.ts` compiles without TypeScript errors
- [ ] `services.yaml` has exactly 22 entries
- [ ] All 19 image files exist in `src/assets/images/`

**Functional:**
- [ ] Every visible text from both HTML files has a corresponding i18n key
- [ ] EN has 10 FAQ (4 added), matching IT count

> ⚠️ Do not begin Step 3 until all DoD criteria above are checked.

---

## Step 3 — Layout & Shell Components

### Overview
Create the base layout, SEO head, header, and footer — the "shell" that wraps all pages.
**Implements: FR-04, FR-05, FR-06, FR-07, FR-35**

### Files Involved

| Action | Path | Reason |
|--------|------|--------|
| Create | `src/layouts/BaseLayout.astro` | Global layout: head, CSS, fonts, slots |
| Create | `src/components/SEOHead.astro` | Meta, canonical, hreflang, OG, JSON-LD |
| Create | `src/components/Header.astro` | Sticky header, nav, lang switcher, hamburger |
| Create | `src/components/Footer.astro` | Unified footer with social links |

### Dependencies
Step 1 (CSS files), Step 2 (i18n utils).

---

### 1. Implementation Plan

#### 1.1 Code Changes
- **BaseLayout.astro**: Props `{lang, title, description, canonical, ogImage}`. `<head>`: charset, viewport, preconnect Google Fonts, Google Fonts CSS link, Font Awesome CDN link, import `style.css` + `responsive.css`, `<SEOHead>` with props. `<body>`: `<Header lang={lang}/>`, `<slot/>`, `<Footer lang={lang}/>`, `<CookieBanner lang={lang}/>` (placeholder until Step 6), `<script src="/scripts/main.js">`.
- **SEOHead.astro**: Props for all meta. Generate: `<title>`, `<meta name="description">`, `<link rel="canonical">`, 3 hreflang links (it, en, x-default→it), 5 OG tags, 4 Twitter Card tags, JSON-LD `BedAndBreakfast` schema with correct URLs (fix `USERNAME` placeholder). Use `Astro.site` for base URL.
- **Header.astro**: Maintain IDs: `id="site-header"`, `id="main-nav"`, `id="hamburger-btn"`. Use i18n `t(lang, 'nav.*')` for link text. Language switcher: `<a href="/">IT</a> | <a href="/en/">EN</a>` with `class="active"` based on `lang`. Classes: `.logo`, `.nav-links`, `.hamburger`, `.lang-toggle`.
- **Footer.astro**: Unified 3-column layout (from EN design). Add social links for both languages. Brand + address, nav links, contacts. Use `t(lang, 'footer.*')`. Contact data from i18n.

#### 1.2 Configuration and Database
N/A

#### 1.3 Testing
- Create temporary `src/pages/index.astro` with `<BaseLayout lang="it">Test</BaseLayout>`.
- `npm run dev` → verify: header renders, footer renders, CSS loads, fonts load, meta tags present in `<head>`.
- Inspect HTML source: verify canonical, hreflang, OG, JSON-LD are correct.
- Verify hamburger menu works on mobile viewport.
- Validates AC-08 (SEO), AC-12 (responsive), AC-13 (anchor nav).

#### 1.4 Documentation Updates
N/A

---

### 2. Definition of Done (DoD)

**Technical:**
- [ ] BaseLayout renders without errors for both `lang="it"` and `lang="en"`
- [ ] All CSS loads correctly (visual check)
- [ ] HTML source contains valid canonical, 3 hreflang, OG tags, JSON-LD

**Functional:**
- [ ] Header shows correct nav links per language
- [ ] Language switcher links to correct alternate URL
- [ ] Footer shows social links, contacts, nav in both languages
- [ ] Hamburger menu works on mobile (< 768px)

> ⚠️ Do not begin Step 4 until all DoD criteria above are checked.

---

## Step 4 — Content Sections Part 1 (Hero → Location)

### Overview
Create the first 5 content section components with image optimization.
**Implements: FR-08, FR-09, FR-10, FR-11, FR-12, FR-29**

### Files Involved

| Action | Path | Reason |
|--------|------|--------|
| Create | `src/components/Hero.astro` | Hero with optimized background |
| Create | `src/components/Struttura.astro` | Structure + carousel |
| Create | `src/components/Gallery.astro` | Image gallery grid |
| Create | `src/components/Services.astro` | Static services from YAML |
| Create | `src/components/Location.astro` | Map + directions |

### Dependencies
Step 2 (i18n, images, services.yaml), Step 3 (layout).

---

### 1. Implementation Plan

#### 1.1 Code Changes
- **Hero.astro**: Import hero-bg.jpg via `astro:assets`. Use `<Image>` for optimization. CSS overlay + content positioned via existing `.hero-overlay`, `.hero-content` classes. 4 badges (from EN design: guests, bedrooms, wifi, breakfast). CTA button. Handle OP-01: since CSS line 417 references `../images/hero/hero-bg.jpg`, copy hero-bg.jpg to `public/images/hero/` as CSS fallback (decision confirmed).
- **Struttura.astro**: Grid with info panel + carousel. Carousel uses `.struttura-carousel`, `.carousel-track`, `.carousel-slide`, `.carousel-prev`, `.carousel-next`, `.carousel-dot` classes. Images via `<Image>` with lazy loading. Carousel JS stays in main.js (`initStrutturaCarousel()`).
- **Gallery.astro**: 6-slot grid using `.gallery-grid`, `.gallery-item`. `<Image>` for each with lazy loading. Handle 12-byte placeholder: conditionally render `<div>` fallback instead of `<Image>`.
- **Services.astro**: Import `services.yaml`. Map over services, render static HTML with `.services-grid`, `.service-item`, `.service-icon`, `.service-label`, `.badge-included`/`.badge-paid`. Use `t(lang, 'services.labels.{key}')` for names, `t(lang, 'services.badges.included/paid')` for badge text. Keep `id="services-grid"`.
- **Location.astro**: Address card, directions (train/airport), Google Maps iframe. All text from i18n.

#### 1.2 Configuration and Database
N/A

#### 1.3 Testing
- Add components to temp index page, verify each renders correctly.
- Verify images output as WebP with srcset (inspect HTML).
- Verify Services renders 22 items statically (no JS).
- Verify carousel dots/buttons present (JS functionality from main.js).
- Validates AC-04 (images), partial AC-02/AC-03.

#### 1.4 Documentation Updates
N/A

---

### 2. Definition of Done (DoD)

**Technical:**
- [ ] All 5 components render without errors
- [ ] Images use `<Image>` component and output WebP
- [ ] Services rendered statically (22 items), no JS dependency
- [ ] CSS classes match existing stylesheet exactly

**Functional:**
- [ ] Hero displays background image, badges, CTA
- [ ] Struttura carousel shows 3 images with navigation
- [ ] Gallery shows 6 image slots
- [ ] Services shows all 22 with correct included/paid badges
- [ ] Location shows address, directions, map iframe

> ⚠️ Do not begin Step 5 until all DoD criteria above are checked.

---

## Step 5 — Content Sections Part 2 (Attractions → FAQ)

### Overview
Create remaining content section components.
**Implements: FR-13, FR-14, FR-15, FR-16**

### Files Involved

| Action | Path | Reason |
|--------|------|--------|
| Create | `src/components/Attractions.astro` | Attraction cards with images |
| Create | `src/components/Reviews.astro` | Review cards grid |
| Create | `src/components/FAQ.astro` | Accessible accordion |
| Create | `src/components/Contacts.astro` | Contact cards + Booking link |

### Dependencies
Step 2 (i18n, images), Step 3 (layout).

---

### 1. Implementation Plan

#### 1.1 Code Changes
- **Attractions.astro**: Grid of 5 cards using `.attractions-grid`, `.attraction-card`. Each: `<Image>` (lazy), distance badge, name, description. Data from i18n `attractions.items[]`.
- **Reviews.astro**: Grid using `.reviews-grid`, `.review-card`. Each: stars (FA icons), date, blockquote text, author name + origin. Data from i18n `reviews.items[]`.
- **FAQ.astro**: Unified accordion for both languages. Use `.accordion`, `.accordion-item`, `.accordion-trigger` (with `aria-expanded`, `aria-controls`), `.accordion-panel` (with `hidden`, `id`). 10 FAQ from i18n `faq.items[]`. JS handling via `initAccordion()` in main.js.
- **Contacts.astro**: 3-card grid using `.contatti-grid`, `.contact-card`. Email, Phone, WhatsApp cards. Booking.com link box. Data from i18n.

#### 1.2 Configuration and Database
N/A

#### 1.3 Testing
- Verify all 4 components render correctly for both languages.
- Verify FAQ accordion has correct ARIA attributes.
- Verify attraction images load as WebP.
- Verify Contacts links (mailto, tel, wa.me) are correct.

#### 1.4 Documentation Updates
N/A

---

### 2. Definition of Done (DoD)

**Technical:**
- [ ] All 4 components render without errors in both languages
- [ ] FAQ uses accessible accordion pattern with `aria-controls`
- [ ] All CSS classes match existing stylesheet

**Functional:**
- [ ] 5 attraction cards with images and distances
- [ ] 3 review cards with stars and quotes
- [ ] 10 FAQ items per language
- [ ] Contact cards with working links

> ⚠️ Do not begin Step 6 until all DoD criteria above are checked.

---

## Step 6 — Form, Cookie Banner & JavaScript

### Overview
Create the form component, cookie banner with categories, and adapt JavaScript files.
**Implements: FR-17, FR-18, FR-19, FR-30, FR-31, FR-32, FR-33**

### Files Involved

| Action | Path | Reason |
|--------|------|--------|
| Create | `src/components/QuoteForm.astro` | Unified form with Netlify Forms |
| Create | `src/components/CookieBanner.astro` | Cookie banner with categories |
| Create | `src/styles/cookie-banner.css` | Additional styles for categories |
| Move+Adapt | `js/main.js` → `src/scripts/main.js` | Remove renderServices, clean imports |
| Move+Adapt | `js/form.js` → `src/scripts/form.js` | Netlify Forms instead of Formspree |
| Move+Adapt | `js/cookie-banner.js` → `src/scripts/cookie-banner.js` | Category support |
| Remove | `js/gallery.js`, `js/map.js`, `js/lang.js` | Empty placeholders |

### Dependencies
Step 2 (i18n), Step 3 (layout).

---

### 1. Implementation Plan

#### 1.1 Code Changes
- **QuoteForm.astro**: Unified form with `<form name="quote-form" netlify>`. Fields: nome_cognome, email, telefono, richiesta_tipo (select), data_arrivo, data_partenza, num_ospiti (1-5), note (textarea), gdpr_consent. Hidden: `_subject`, `_language`. All labels/placeholders from i18n. Maintain IDs: `quote-form`, `form-submit-btn`, `form-success`, `note`, `wa-link`, `note-counter`, `err-*`. Include `<script>` tag loading adapted form.js.
- **form.js adaptation**: Remove Formspree fetch. Use native form submit (Netlify handles it) OR AJAX POST to same page. Keep all validators. Update WhatsApp text per language. Remove `btn-text`/`btn-spinner` references if not in HTML (simplify submit button).
- **main.js adaptation**: Remove `renderServices()` function and `SERVICES` array. Remove `loadFormModule()` and `loadCookieBanner()` async imports (each component loads its own script). Keep: `initStickyHeader()`, `initMobileMenu()`, `initAccordion()`, `initStrutturaCarousel()`.
- **CookieBanner.astro**: HTML with categories: necessary (always on, disabled toggle), functional (toggle), analytics (toggle, off by default). Accept All / Accept Selected buttons. Uses existing `.cookie-banner` CSS classes + new `cookie-banner.css` for category UI.
- **cookie-banner.js adaptation**: Extend to save per-category consent in localStorage as JSON. Read/apply consent on page load.
- **cookie-banner.css**: Styles for category toggles, grid layout within banner. Does NOT modify `style.css`.
- Delete `gallery.js`, `map.js`, `lang.js` (empty placeholders).

#### 1.2 Configuration and Database
N/A

#### 1.3 Testing
- Deploy to Netlify preview → submit test form → verify in Netlify Forms dashboard. Validates AC-05.
- Test validation: submit with empty fields → errors shown. Validates AC-06.
- Test cookie banner: first visit shows banner, accept saves to localStorage, refresh hides banner. Validates AC-10.
- Test main.js: sticky header, hamburger, accordion, carousel all work.

#### 1.4 Documentation Updates
N/A

---

### 2. Definition of Done (DoD)

**Technical:**
- [ ] Form submits to Netlify Forms successfully on preview deploy
- [ ] Validation shows errors for all invalid states
- [ ] Cookie banner saves per-category consent to localStorage
- [ ] main.js works: sticky header, hamburger, accordion, carousel
- [ ] No JS console errors

**Functional:**
- [ ] AC-05 validated (form submission)
- [ ] AC-06 validated (form validation)
- [ ] AC-10 validated (cookie banner)
- [ ] Success message with WhatsApp link appears after submission

> ⚠️ Do not begin Step 7 until all DoD criteria above are checked.

---

## Step 7 — Page Assembly, Privacy & Redirects

### Overview
Assemble all components into pages, create privacy policy pages, configure redirects.
**Implements: FR-24, FR-25, FR-26, FR-27, FR-37**

### Files Involved

| Action | Path | Reason |
|--------|------|--------|
| Create | `src/pages/index.astro` | Homepage IT |
| Create | `src/pages/en/index.astro` | Homepage EN |
| Create | `src/pages/privacy-policy.astro` | Privacy IT |
| Create | `src/pages/en/privacy-policy.astro` | Privacy EN |
| Modify | `netlify.toml` | Add redirect 301 rules |

### Dependencies
Steps 3-6 (all components ready).

---

### 1. Implementation Plan

#### 1.1 Code Changes
- **index.astro (IT)**: `<BaseLayout lang="it" title="..." ...>` wrapping all section components in order: Hero, Struttura, Gallery, Services, Location, Attractions, Reviews, QuoteForm, Contacts, FAQ. Each with `lang="it"`.
- **en/index.astro (EN)**: Identical structure with `lang="en"` and EN-specific SEO props.
- **privacy-policy.astro (IT)**: BaseLayout with privacy content hardcoded. Updated text: "Netlify Forms" instead of "Formspree". Simplified header with back link. Uses `.privacy-page` CSS class.
- **en/privacy-policy.astro (EN)**: English equivalent.
- **netlify.toml redirects**: Add `[[redirects]]` blocks for 4 rules: `/index.html` → `/`, `/index-en.html` → `/en/`, `/privacy-policy.html` → `/privacy-policy/`, `/privacy-policy-en.html` → `/en/privacy-policy/`. Status 301, force true.

#### 1.2 Configuration and Database
N/A

#### 1.3 Testing
- `npm run build` → verify 4 HTML pages in `dist/`.
- Visit `/` → all 10 sections visible in Italian. Validates AC-02.
- Visit `/en/` → all sections in English. Validates AC-03.
- Visit `/privacy-policy/` → Italian privacy, mentions Netlify Forms. Validates AC-11.
- Visit `/en/privacy-policy/` → English privacy. Validates AC-11.
- Anchor navigation works (smooth scroll). Validates AC-13.
- Deploy to Netlify preview → test redirects. Validates AC-07.

#### 1.4 Documentation Updates
N/A

---

### 2. Definition of Done (DoD)

**Technical:**
- [ ] `npm run build` generates 4 pages without errors
- [ ] All redirects return HTTP 301 on Netlify preview
- [ ] Sitemap auto-generated with all 4 URLs

**Functional:**
- [ ] AC-02 validated (IT homepage)
- [ ] AC-03 validated (EN homepage)
- [ ] AC-07 validated (redirects)
- [ ] AC-11 validated (privacy pages)
- [ ] AC-13 validated (anchor navigation)

> ⚠️ Do not begin Step 8 until all DoD criteria above are checked.

---

## Step 8 — Quality Assurance & Performance Optimization

### Overview
Final verification of all NFRs, cross-browser testing, Lighthouse audits, visual regression.
**Implements: NFR-01 through NFR-09. Validates all remaining ACs.**

### Files Involved

| Action | Path | Reason |
|--------|------|--------|
| Modify | `astro.config.mjs` | Image cache, performance tuning if needed |
| Modify | Any component | Bug fixes from QA |

### Dependencies
Step 7 (all pages assembled and deployed to preview).

---

### 1. Implementation Plan

#### 1.1 Code Changes
- Run Lighthouse on Netlify preview URL for `/` and `/en/` (mobile + desktop).
- If Performance < 90: optimize LCP (hero image preload), reduce CLS (verify all images have width/height).
- If Accessibility < 95: fix ARIA issues, contrast, focus management.
- Verify all images in `dist/` are WebP and < 200 KB. If apartment images still too large after Astro optimization, add explicit `widths` and `quality` props.
- Run W3C HTML validator on output.
- Cross-browser check: Chrome, Firefox, Safari. Mobile: Chrome Android, Safari iOS.
- Visual regression: compare screenshots at 1440px, 768px, 375px against current site.
- Tab navigation test: nav, accordion, form, cookie banner.
- Build time measurement: if > 60s, enable image caching.

#### 1.2 Configuration and Database
- If build time > 60s: add `image: { cacheDir: './node_modules/.astro-image' }` to astro config.

#### 1.3 Testing
- Lighthouse Performance ≥ 90 → NFR-02
- Lighthouse Accessibility ≥ 95 → NFR-03
- W3C validation passes → NFR-04
- LCP < 2.5s → NFR-05
- CLS < 0.1 → NFR-06
- Site works without JS (content visible) → NFR-07
- All images WebP < 200KB → NFR-09
- Build < 60s → NFR-01
- Sitemap correct → AC-09
- Responsive design verified → AC-12

#### 1.4 Documentation Updates
- Update `PROGRESS.md` with migration status.

---

### 2. Definition of Done (DoD)

**Technical:**
- [ ] Lighthouse Performance ≥ 90 (mobile + desktop)
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Lighthouse SEO ≥ 95
- [ ] W3C HTML validation passes
- [ ] Build time < 60 seconds
- [ ] All images < 200 KB in WebP

**Functional:**
- [ ] AC-09 validated (sitemap)
- [ ] AC-12 validated (responsive)
- [ ] Visual parity with current site confirmed
- [ ] Cross-browser testing passed (Chrome, Firefox, Safari)
- [ ] All 13 acceptance criteria from requirements.md validated

> ⚠️ After Step 8, the branch is ready for review and merge to main.

---

## Open Points and Risks

| # | Description | Type | Suggested Resolution |
|---|-------------|------|---------------------|
| 1 | Hero CSS `background-image` path (style.css:417) breaks after image move to `src/assets/` | Decision | **Confermata**: Copiare `hero-bg.jpg` in `public/images/hero/` come fallback CSS e usare `<Image>` nel componente per la versione ottimizzata. |
| 2 | Apartment images 12-17 MB each — build time could exceed 60s | Risk | Pre-resize images to max 2000px width before migration. If not possible, rely on Astro Image + enable cache |
| 3 | 12-byte placeholder files may crash `<Image>` component | Risk | Conditional rendering: check file size, use `<div>` fallback for placeholders |
| 4 | Cookie banner categories need new CSS without modifying style.css | Decision | Create `cookie-banner.css` with scoped styles for category toggles |
| 5 | Netlify Forms free tier: 100 submissions/month | Risk | Monitor usage. Upgrade plan if needed. Current volume unknown |
| 6 | SSL certificate for aduepassidabnb.it must be active on Netlify | Blocker | Verify before merge to main. Canonical URLs depend on it |
| 7 | EN version has different HTML structure for several sections | Risk | Unify during implementation, using IT as reference. Document deviations in each component |
