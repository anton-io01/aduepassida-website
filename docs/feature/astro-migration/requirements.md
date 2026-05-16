# Requirements — Migrazione Sito B&B "A Due Passi Da" ad Astro (Fase 1)
_Generated: 2026-05-16_
_Source: business_requirements.md + codebase analysis_

## 1. Feature Overview

Migrazione del sito B&B "A Due Passi Da" da HTML/CSS/JS vanilla ad Astro v5.x SSG. Questa è la **Fase 1** che copre: setup Astro, componenti, i18n, Netlify Forms, ottimizzazione immagini, SEO, e configurazione deploy. La Fase 2 (Decap CMS) sarà documentata separatamente.

Ref: business_requirements.md — Overview, BR-01 → BR-14.

## 2. Actors and Main Flow

| Attore | Interazione tecnica |
|--------|-------------------|
| **Visitatore IT** | GET `/` → Astro serve `src/pages/index.astro` → HTML statico con tutte le sezioni |
| **Visitatore EN** | GET `/en/` → Astro serve `src/pages/en/index.astro` → HTML statico EN |
| **Visitatore form** | POST form → Netlify Forms intercetta (attributo `netlify`) → email al gestore |
| **Sviluppatore** | `npm run dev` / `npm run build` → Astro compila → Netlify deploya |

```
Build flow: src/ → astro build → dist/ → Netlify deploy
i18n flow:  src/i18n/{it,en}.json → utils.ts → componenti Astro → HTML statico per lingua
Image flow: src/assets/images/*.jpg → <Image> component → WebP + srcset → dist/_astro/
Form flow:  <form netlify> → Netlify bot detect at deploy → submissions dashboard + email
```

## 3. Functional Requirements

### Progetto e Build

- **FR-01**: Inizializzare progetto Astro v5.x con `npm create astro@latest`, output statico, no framework UI. — ref: BR-01, BR-04
- **FR-02**: Creare `netlify.toml` con build command `astro build`, publish dir `dist/`, redirect 301. — ref: BR-10
- **FR-03**: Integrare `@astrojs/sitemap` nella config Astro con `site: 'https://aduepassidabnb.it'`. — ref: BR-09

### Layout e Componenti

- **FR-04**: Creare `BaseLayout.astro` che importa `style.css`, `responsive.css`, Google Fonts, Font Awesome CDN, e include `<SEOHead>`, `<Header>`, `<slot/>`, `<Footer>`, `<CookieBanner>`. — ref: BR-04, BR-13, BR-14
- **FR-05**: Creare `SEOHead.astro` che accetta props `{title, description, canonical, locale, alternateLocale, alternateUrl, ogImage}` e genera: `<title>`, meta description, canonical, hreflang (IT + EN + x-default), Open Graph, Twitter Card, JSON-LD BedAndBreakfast. — ref: BR-09
- **FR-06**: Creare `Header.astro` con navigazione anchor links, language switcher (`/` ↔ `/en/`), hamburger menu mobile. Prop `lang` per determinare link attivo e testi. — ref: BR-03
- **FR-07**: Creare `Footer.astro` unificato con: brand, contatti (email, tel, WhatsApp), social links (Instagram, Facebook, WhatsApp), nav links, copyright. Testi via i18n. — ref: BR-03
- **FR-08**: Creare `Hero.astro` con background image ottimizzata, overlay, titolo, tagline, badges, CTA. Struttura HTML unificata IT/EN, testi via i18n. — ref: BR-03, BR-08
- **FR-09**: Creare `Struttura.astro` con grid info + carousel immagini. Carousel con prev/next/dots, auto-play. — ref: BR-03
- **FR-10**: Creare `Gallery.astro` con griglia di immagini ottimizzate (6 slot). — ref: BR-08
- **FR-11**: Creare `Services.astro` che legge `services.yaml` e traduce label via i18n. Rendering statico (non più JS dinamico). Mantenere `id="services-grid"` e classi CSS esistenti. — ref: BR-07
- **FR-12**: Creare `Location.astro` con info indirizzo, direzioni, iframe Google Maps. — ref: BR-03
- **FR-13**: Creare `Attractions.astro` con griglia di card attrazioni. Immagini ottimizzate. — ref: BR-03, BR-08
- **FR-14**: Creare `Reviews.astro` con griglia di review card (stelle, testo, autore, data). — ref: BR-03
- **FR-15**: Creare `FAQ.astro` con accordion accessibile (`aria-controls`, `aria-expanded`, `hidden`). Unificare IT/EN sulla struttura accordion della versione IT. 10 FAQ per entrambe le lingue. — ref: BR-03
- **FR-16**: Creare `Contacts.astro` con grid 3 card (email, telefono, WhatsApp) + box Booking.com. — ref: BR-03

### Form Preventivo

- **FR-17**: Creare `QuoteForm.astro` con form unificato IT/EN: nome_cognome, email, telefono, richiesta_tipo (select), data_arrivo, data_partenza, num_ospiti (1-5), note (textarea 500 char), gdpr_consent (checkbox). Attributi: `netlify`, `name="quote-form"`. Hidden fields: `_subject`, `_language`. — ref: BR-06
- **FR-18**: Adattare `form.js` per Netlify Forms: rimuovere fetch a Formspree, usare submit nativo con redirect o AJAX a Netlify endpoint. Mantenere validazione client-side con stessi ID errore (`err-nome`, `err-email`, ecc.). — ref: BR-05, BR-06
- **FR-19**: Mostrare messaggio successo post-submit con link WhatsApp. — ref: BR-06

### i18n

- **FR-20**: Creare `src/i18n/it.json` con tutte le stringhe italiane: nav, hero, struttura, gallery, services labels, location, attractions, reviews, form labels/errors/placeholders, contacts, FAQ (10 Q&A), footer, cookie banner, privacy. — ref: BR-02
- **FR-21**: Creare `src/i18n/en.json` con le stesse chiavi in inglese. FAQ EN allineate a 10 (aggiungere le 4 mancanti). — ref: BR-02, BR-03
- **FR-22**: Creare `src/i18n/utils.ts` con funzione `t(lang, key)` per accedere alle traduzioni e funzione `getAlternateUrl(lang, path)` per il language switcher. — ref: BR-02

### Dati

- **FR-23**: Creare `src/data/services.yaml` con i 22 servizi: key, icon (classe FA), category, included (boolean). Le label tradotte restano nei file i18n. — ref: BR-07

### Pagine

- **FR-24**: Creare `src/pages/index.astro` (homepage IT) che usa `BaseLayout` e include tutti i componenti sezione nell'ordine: Hero, Struttura, Gallery, Services, Location, Attractions, Reviews, QuoteForm, Contacts, FAQ. Passa `lang="it"`. — ref: BR-01
- **FR-25**: Creare `src/pages/en/index.astro` (homepage EN) identico a FR-24 ma con `lang="en"`. — ref: BR-01, BR-02
- **FR-26**: Creare `src/pages/privacy-policy.astro` (privacy IT) con contenuto hardcoded, menzione Netlify Forms (non Formspree), link ritorno a homepage. — ref: BR-11
- **FR-27**: Creare `src/pages/en/privacy-policy.astro` (privacy EN) con contenuto equivalente in inglese. — ref: BR-11

### Immagini

- **FR-28**: Spostare tutte le immagini da `images/` a `src/assets/images/` mantenendo le sottocartelle. — ref: BR-08
- **FR-29**: Usare componente `<Image>` di `astro:assets` in tutti i componenti. Specificare `width`, `height`, `alt`, `loading` ("eager" per hero/above-fold, "lazy" per il resto), formato output WebP. — ref: BR-08

### JavaScript

- **FR-30**: Copiare `main.js`, `form.js`, `cookie-banner.js` in `src/scripts/`. Adattare: rimuovere `renderServices()` da main.js (ora statico), rimuovere import di form.js e cookie-banner.js da main.js (ogni script caricato dal proprio componente). — ref: BR-05
- **FR-31**: Non copiare i file placeholder vuoti (`gallery.js`, `map.js`, `lang.js`). — ref: BR-05

### Cookie Banner

- **FR-32**: Creare `CookieBanner.astro` con supporto categorie: necessari (sempre attivi), funzionali (toggle), analytics (toggle, disabilitato di default). Persistenza in localStorage. Animazione slideUp/slideDown. — ref: BR-11
- **FR-33**: Se servono stili aggiuntivi per il cookie banner avanzato (categorie), creare `src/styles/cookie-banner.css` separato (non modificare `style.css`). — ref: BR-04, BR-11

### SEO e Redirect

- **FR-34**: Configurare `site` in `astro.config.mjs` con valore da env `SITE_URL` o fallback `https://aduepassidabnb.it`. — ref: BR-09
- **FR-35**: Generare JSON-LD `BedAndBreakfast` con URL e immagini corretti (fix placeholder `USERNAME`). Dati localizzati per lingua. — ref: BR-09
- **FR-36**: `public/robots.txt` con `Sitemap: https://aduepassidabnb.it/sitemap-index.xml`. — ref: BR-09
- **FR-37**: Redirect 301 in `netlify.toml`: `/index.html` → `/`, `/index-en.html` → `/en/`, `/privacy-policy.html` → `/privacy-policy/`, `/privacy-policy-en.html` → `/en/privacy-policy/`. — ref: BR-10

### CSS

- **FR-38**: Copiare `style.css` e `responsive.css` invariati in `src/styles/`. Importarli in `BaseLayout.astro`. — ref: BR-04

## 4. Non-Functional Requirements

- **NFR-01**: Build time < 60 secondi per `astro build` (monitorare impatto ottimizzazione immagini ~105 MB totali).
- **NFR-02**: Lighthouse Performance score ≥ 90 su mobile e desktop.
- **NFR-03**: Lighthouse Accessibility score ≥ 95.
- **NFR-04**: Nessun errore di validazione HTML W3C.
- **NFR-05**: Largest Contentful Paint (LCP) < 2.5 secondi.
- **NFR-06**: Cumulative Layout Shift (CLS) < 0.1 (width/height su tutte le immagini).
- **NFR-07**: Il sito deve funzionare senza JavaScript per i contenuti principali (progressive enhancement — solo carousel, accordion, form validation e cookie banner richiedono JS).
- **NFR-08**: Zero downtime durante il deploy (Netlify atomic deploys).
- **NFR-09**: Tutte le immagini servite in WebP con dimensione < 200 KB per immagine (attualmente fino a 17 MB).

## 5. Data Requirements

### File di traduzione — `src/i18n/it.json` / `en.json`

```
Struttura JSON con chiavi top-level per sezione:
{
  "meta": { title, description },
  "nav": { struttura, galleria, servizi, posizione, attrazioni, recensioni, preventivo },
  "hero": { preTitle, title, tagline, cta, badges[] },
  "struttura": { title, subtitle, description, highlights[], accessibilityNotice },
  "gallery": { title, subtitle },
  "services": { title, subtitle, note, labels: { [serviceKey]: label }, badges: { included, paid } },
  "location": { title, subtitle, address, directions: { train, airport } },
  "attractions": { title, subtitle, items[]: { name, description, distance } },
  "reviews": { title, subtitle, items[]: { text, author, from, date, rating } },
  "form": { title, subtitle, fields labels/placeholders/errors, submitBtn, successMsg, waMsg },
  "contacts": { title, subtitle, email, phone, whatsapp, booking },
  "faq": { title, items[]: { question, answer } },
  "footer": { brand, address, nav links, social, copyright },
  "cookie": { title, description, categories: { necessary, functional, analytics }, acceptAll, acceptSelected, privacyLink }
}
```

### File dati servizi — `src/data/services.yaml`

```yaml
services:
  - key: wifi
    icon: fa-wifi
    category: connectivity
    included: true
  - key: aircon
    icon: fa-snowflake
    category: comfort
    included: true
  # ... (22 servizi totali, stessa struttura dell'array JS attuale)
```

### Struttura immagini — `src/assets/images/`

| Sottocartella | File | Dimensione attuale | Note |
|--------------|------|-------------------|------|
| `hero/` | hero-bg.jpg | 875 KB | Eager loading, hero background |
| `struttura/` | esterno-1.jpg, esterno-2.jpg, ingresso.png | 14M, 203K, 5.9M | Carousel, lazy |
| `appartamento/` | 1-6.jpg, placeholder.jpg | 12-17M ciascuno, 12B placeholder | Gallery, lazy. CRITICO: immagini enormi |
| `luoghi/` | bari, trani, castel-del-monte, alberobello, polignano.jpg, placeholder.jpg | 60K-526K, 12B placeholder | Attractions, lazy |
| `camere/` | esterno.jpg, placeholder.jpg | 87K, 77K | Non usato attualmente in HTML |

## 6. Technical Impact Map

| Action | Path | Reason |
|--------|------|--------|
| **Create** | `astro.config.mjs` | Config Astro: site URL, sitemap integration, image settings |
| **Create** | `package.json` | Dipendenze: astro, @astrojs/sitemap |
| **Create** | `tsconfig.json` | TypeScript config per Astro |
| **Create** | `netlify.toml` | Build command, publish dir, redirect 301, env vars |
| **Create** | `public/robots.txt` | Robots con sitemap URL corretto |
| **Create** | `public/favicon.ico` | Favicon (copiare da root attuale) |
| **Create** | `src/layouts/BaseLayout.astro` | Layout globale con head, CSS, fonts, header, footer, cookie |
| **Create** | `src/components/SEOHead.astro` | Meta tags, canonical, hreflang, OG, Twitter, JSON-LD |
| **Create** | `src/components/Header.astro` | Header sticky con nav e language switcher |
| **Create** | `src/components/Footer.astro` | Footer unificato IT/EN |
| **Create** | `src/components/Hero.astro` | Hero section con immagine ottimizzata |
| **Create** | `src/components/Struttura.astro` | Sezione struttura con carousel |
| **Create** | `src/components/Gallery.astro` | Galleria immagini |
| **Create** | `src/components/Services.astro` | Servizi da YAML + i18n |
| **Create** | `src/components/Location.astro` | Mappa e indicazioni |
| **Create** | `src/components/Attractions.astro` | Card attrazioni |
| **Create** | `src/components/Reviews.astro` | Recensioni |
| **Create** | `src/components/QuoteForm.astro` | Form preventivo Netlify |
| **Create** | `src/components/Contacts.astro` | Sezione contatti |
| **Create** | `src/components/FAQ.astro` | Accordion FAQ accessibile |
| **Create** | `src/components/CookieBanner.astro` | Cookie banner con categorie |
| **Create** | `src/pages/index.astro` | Homepage IT |
| **Create** | `src/pages/en/index.astro` | Homepage EN |
| **Create** | `src/pages/privacy-policy.astro` | Privacy Policy IT |
| **Create** | `src/pages/en/privacy-policy.astro` | Privacy Policy EN |
| **Create** | `src/i18n/it.json` | Traduzioni italiane |
| **Create** | `src/i18n/en.json` | Traduzioni inglesi |
| **Create** | `src/i18n/utils.ts` | Helper i18n: t(), getAlternateUrl() |
| **Create** | `src/data/services.yaml` | Dati servizi (22 items) |
| **Create** | `src/styles/cookie-banner.css` | Stili aggiuntivi cookie banner categorie |
| **Move** | `css/style.css` → `src/styles/style.css` | CSS invariato, importato nel layout |
| **Move** | `css/responsive.css` → `src/styles/responsive.css` | CSS invariato, importato nel layout |
| **Move** | `js/main.js` → `src/scripts/main.js` | Adattare: rimuovere renderServices, form/cookie imports |
| **Move** | `js/form.js` → `src/scripts/form.js` | Adattare: Netlify Forms al posto di Formspree |
| **Move** | `js/cookie-banner.js` → `src/scripts/cookie-banner.js` | Adattare per categorie cookie |
| **Move** | `images/**` → `src/assets/images/**` | Tutte le immagini per ottimizzazione Astro |
| **Remove** | `js/gallery.js` | Placeholder vuoto |
| **Remove** | `js/map.js` | Placeholder vuoto |
| **Remove** | `js/lang.js` | Placeholder vuoto |
| **Keep** | `docs/**` | Documentazione invariata |

## 7. Configuration and Environment

| Config | File | Valore |
|--------|------|--------|
| `SITE_URL` | `astro.config.mjs` / env | `https://aduepassidabnb.it` (fallback) |
| `site` | `astro.config.mjs` | `process.env.SITE_URL \|\| 'https://aduepassidabnb.it'` |
| `integrations` | `astro.config.mjs` | `[@astrojs/sitemap()]` |
| `image` | `astro.config.mjs` | Default Astro image service (Sharp) |
| `build.command` | `netlify.toml` | `npm run build` |
| `build.publish` | `netlify.toml` | `dist` |
| `NODE_VERSION` | `netlify.toml` [build.environment] | `20` |

## 8. Edge Cases and Constraints

| Edge Case | Handling Strategy |
|-----------|------------------|
| Immagini da 12-17 MB in `src/assets/` | Astro Image le comprime a WebP. Primo build lento (~105 MB totali). Considerare pre-resize manuale o `image.cacheDir` in config. |
| Placeholder images (12 bytes) | `<Image>` potrebbe fallire su file di 12 byte. Usare condizionale: se file è placeholder, renderizzare `<div>` con testo fallback invece di `<Image>`. |
| Hero `background-image` nel CSS (riga 417 style.css) | Il CSS referenzia `url('../images/hero/hero-bg.jpg')`. Dopo la migrazione il path cambia. Opzione: override nel componente Hero con `<Image>` + CSS positioning, oppure copiare hero-bg.jpg anche in `public/images/hero/` per il CSS fallback. |
| `#services-grid` era vuoto, ora ha contenuto statico | Il CSS `.services-grid` (riga 868) usa `display: grid` — funziona identicamente con contenuto statico. Nessun problema. |
| Form validation IDs | Il form unificato deve mantenere gli ID: `quote-form`, `form-submit-btn`, `form-success`, `note`, `wa-link`, `note-counter`, `err-nome`, `err-email`, `err-telefono`, `err-tipo`, `err-arrivo`, `err-partenza`, `err-ospiti`, `err-gdpr`, `cookie-banner`, `cookie-accept`. |
| `initAccordion()` in main.js cerca `.accordion-trigger` | Il componente FAQ deve usare le stesse classi: `.accordion`, `.accordion-item`, `.accordion-trigger`, `.accordion-panel` con `aria-controls` e `id`. |
| `initStrutturaCarousel()` cerca `.struttura-carousel` | Il componente Struttura deve usare le stesse classi: `.struttura-carousel`, `.carousel-track`, `.carousel-slide`, `.carousel-prev`, `.carousel-next`, `.carousel-dot`. |
| `initMobileMenu()` cerca `#hamburger-btn` e `#main-nav` | Header deve mantenere: `id="hamburger-btn"`, `id="main-nav"`, classe `.nav-links`, classe `.hamburger`. |
| `initStickyHeader()` cerca `#site-header` | Header deve usare `id="site-header"`. |
| Privacy policy menziona Formspree | Aggiornare testo per menzionare "Netlify Forms" al posto di "Formspree". |
| EN ha 6 FAQ, IT ne ha 10 | Aggiungere 4 FAQ mancanti nella versione EN: parcheggio, come raggiungo, preventivo, fattura. |
| Footer EN ha social links, IT no | Aggiungere social links (Instagram, Facebook, WhatsApp) nel footer per entrambe le lingue. Usare layout a 3 colonne (design EN). |
| Hero EN ha 4 badge, IT ne ha 3 | Unificare a 4 badge: ospiti, camere, Wi-Fi, colazione (set EN, più informativo). |

## 9. Acceptance Criteria

```gherkin
Scenario: AC-01 Build succeeds
  Given the Astro project is set up with all dependencies
  When `npm run build` is executed
  Then the build completes without errors
  And output is in `dist/` directory
  And all pages are generated as static HTML
```

```gherkin
Scenario: AC-02 Italian homepage renders correctly
  Given the site is built
  When a user visits `/`
  Then all 10 sections render in Italian in correct order
  And the HTML lang attribute is "it"
  And the language switcher shows IT active with link to `/en/`
  And all CSS classes match the current design
```

```gherkin
Scenario: AC-03 English homepage renders correctly
  Given the site is built
  When a user visits `/en/`
  Then all 10 sections render in English
  And the HTML lang attribute is "en"
  And the language switcher shows EN active with link to `/`
```

```gherkin
Scenario: AC-04 Images are optimized
  Given the site is built
  When inspecting image tags in the HTML output
  Then images use WebP format
  And have srcset with responsive widths
  And have width and height attributes
  And individual image size < 200 KB
```

```gherkin
Scenario: AC-05 Form submits via Netlify Forms
  Given the user is on the quote section
  When they fill all required fields with valid data and submit
  Then the form is submitted to Netlify Forms (no Formspree)
  And the success message appears with WhatsApp link
```

```gherkin
Scenario: AC-06 Form validation blocks invalid submissions
  Given the user is on the quote section
  When they submit with empty required fields or invalid data
  Then error messages appear next to invalid fields
  And the form is NOT submitted
```

```gherkin
Scenario: AC-07 Redirects work correctly
  Given the site is deployed on Netlify
  When a user visits `/index-en.html`
  Then they receive a 301 redirect to `/en/`
  When a user visits `/privacy-policy.html`
  Then they receive a 301 redirect to `/privacy-policy/`
```

```gherkin
Scenario: AC-08 SEO meta tags are correct
  Given the site is built
  When inspecting the IT homepage head
  Then canonical is `https://aduepassidabnb.it/`
  And hreflang tags include it, en, x-default
  And Open Graph tags have correct title, description, image, locale
  And JSON-LD is valid with no placeholder values
```

```gherkin
Scenario: AC-09 Sitemap is generated
  Given the site is built
  When accessing `/sitemap-index.xml`
  Then it lists all pages (IT and EN)
  And URLs use the domain `aduepassidabnb.it`
```

```gherkin
Scenario: AC-10 Cookie banner with categories
  Given it's the user's first visit
  When the page loads
  Then the cookie banner appears with category toggles
  When the user accepts
  Then consent is saved to localStorage
  And the banner does not appear on next visit
```

```gherkin
Scenario: AC-11 Privacy policy accessible in both languages
  Given the site is built
  When visiting `/privacy-policy/`
  Then the Italian privacy policy is displayed mentioning Netlify Forms
  When visiting `/en/privacy-policy/`
  Then the English privacy policy is displayed
```

```gherkin
Scenario: AC-12 Responsive design preserved
  Given the site is deployed
  When viewed on mobile (< 768px)
  Then the hamburger menu is visible and functional
  And all sections stack vertically and are readable
```

```gherkin
Scenario: AC-13 Anchor navigation works
  Given the user is on the homepage
  When they click a nav link (e.g., "La Struttura")
  Then the page scrolls smoothly to that section
```

## 10. Testing Requirements

- **Build test**: `npm run build` completes without errors on CI.
- **Visual regression**: Compare screenshots of current site vs Astro site for each section (IT and EN). Use browser tool to verify parity at 1440px, 768px, 375px viewports.
- **SEO validation**: Parse HTML output and verify: canonical, hreflang (3 tags), OG (5 tags), JSON-LD schema validity (use Google Structured Data Testing Tool).
- **Form test**: Deploy to Netlify preview, submit test form, verify it appears in Netlify Forms dashboard.
- **Redirect test**: On Netlify preview, verify all 4 redirect rules return HTTP 301.
- **Image test**: Verify `dist/` output contains WebP images, no images > 200 KB.
- **Lighthouse**: Run Lighthouse CI on Netlify preview URL for both `/` and `/en/`. Targets: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95, Best Practices ≥ 95.
- **Cross-browser**: Verify on Chrome, Firefox, Safari (latest). Mobile: Chrome Android, Safari iOS.
- **Accessibility**: Tab navigation through all interactive elements (nav, accordion, form, cookie banner). Screen reader test on form and FAQ.

## 11. Open Points

| # | Description | Owner | Status |
|---|-------------|-------|--------|
| OP-01 | Hero `background-image` in CSS (line 417) references `../images/hero/hero-bg.jpg`. After move to `src/assets/`, the CSS path breaks. | Dev | **Closed** - Mantenere copia in `public/images/hero/` come fallback |
| OP-02 | Immagini appartamento da 12-17 MB ciascuna. Pre-resize before migration or rely on Astro Image? Build time impact could be significant. | Dev | Open |
| OP-03 | EN version currently has different HTML structure for hero, form, FAQ, footer. Exact unification decisions for each section needed during implementation. | Dev | Open |
| OP-04 | Cookie banner advanced (categories) requires new CSS. Extent of new styles to create without modifying `style.css`. | Dev | Open |
| OP-05 | Netlify Forms submission volume vs free tier limit (100/month). | Owner | Open |
| OP-06 | Verify `aduepassidabnb.it` SSL certificate active on Netlify before updating canonical URLs. | Owner | Open |
