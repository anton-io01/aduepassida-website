# Technical Requirements Document
## Sito Web Vetrina – B&B "A Due Passi Da"

**Versione:** 1.0  
**Data:** Marzo 2026  
**Riferimento:** `business_requirements.md` v1.1  
**Stato:** Bozza tecnica

---

## 1. Panoramica del Sistema

### 1.1 Natura del Sistema
Il sistema è un **sito web statico** a singola pagina (Single Page Layout, non SPA) con navigazione interna tramite anchor link. Non richiede backend, database, né server applicativo. Tutta la logica è lato client (HTML + CSS + JavaScript vanilla). Il sito è ospitato su **GitHub Pages** (CDN globale gratuita).

### 1.2 Principio Architetturale
```
[Browser Utente]
      │
      ▼
[GitHub Pages CDN]  ←──  file statici: HTML, CSS, JS, immagini
      │
      ▼ (solo al submit del form)
[Formspree API]  ──────────────────────→  [Email Gestore]
      │
      ▼ (solo se utente clicca link)
[wa.me link]  ─────────────────────────→  [WhatsApp Gestore]
```

Nessun dato è processato lato server proprietario. L'unica dipendenza di rete runtime è Formspree per l'invio del form.

---

## 2. Stack Tecnologico

### 2.1 Frontend

| Layer | Tecnologia | Versione | Note |
|---|---|---|---|
| Markup | HTML5 | — | Semantico, ARIA labels |
| Stile | CSS3 | — | Custom properties (CSS vars), Flexbox, Grid |
| Logica | JavaScript | ES6+ (vanilla) | Nessun framework |
| Font | Google Fonts | CDN | Playfair Display (titoli) + Lato (corpo) |
| Icone | Font Awesome | 6.x (CDN) | Icone servizi, contatti, social |
| Mappa | Leaflet.js | 1.9.x (CDN) | + tile OpenStreetMap (no API key) |

> **Scelta Leaflet.js vs Google Maps Embed:** Leaflet.js con OpenStreetMap è preferito perché non richiede API key, non genera costi, non impone cookie di terze parti Google (semplifica il banner GDPR) ed è completamente open source.

### 2.2 Hosting e Deploy

| Componente | Servizio | Dettagli |
|---|---|---|
| Hosting | GitHub Pages | Branch `main`, cartella root `/` |
| URL pubblico | `https://<username>.github.io/<repo-name>/` | Es. `aduepassida-website` |
| CDN | GitHub/Fastly (integrata) | Nessuna configurazione richiesta |
| HTTPS | Automatico (Let's Encrypt via GitHub) | Obbligatorio per Formspree |
| Deploy | Push su branch `main` | Aggiornamento automatico in ~1 min |

### 2.3 Servizi Esterni

| Servizio | Scopo | Piano | Limite gratuito |
|---|---|---|---|
| **Formspree** | Invio email dal form | Free | 50 submit/mese |
| **Google Fonts** | Tipografia | CDN pubblico | Illimitato |
| **Font Awesome** | Icone vettoriali | CDN pubblico | Illimitato |
| **Leaflet.js** | Libreria mappa | CDN unpkg/jsDelivr | Illimitato |
| **OpenStreetMap** | Tile mappa | Tile server pubblico | Fair use |
| **Unsplash/Wikimedia** | Foto luoghi (licenza libera) | Download statico | Illimitato |

---

## 3. Struttura del Progetto (File System)

```
aduepassida-website/
│
├── index.html                  # Homepage versione Italiana
├── index-en.html               # Homepage versione Inglese
├── privacy-policy.html         # Privacy Policy (IT)
├── privacy-policy-en.html      # Privacy Policy (EN)
├── sitemap.xml                 # Sitemap per SEO
├── robots.txt                  # Istruzioni crawler
├── favicon.ico                 # Favicon del sito
│
├── css/
│   ├── style.css               # Stili principali (layout, componenti, colori)
│   └── responsive.css          # Media queries breakpoint mobile/tablet/desktop
│
├── js/
│   ├── main.js                 # Entry point: init di tutti i moduli
│   ├── lang.js                 # Gestione toggle IT/EN
│   ├── gallery.js              # Logica lightbox/carousel galleria
│   ├── form.js                 # Validazione form + submit Formspree
│   ├── map.js                  # Inizializzazione mappa Leaflet
│   └── cookie-banner.js        # Gestione banner consenso cookie
│
├── images/
│   ├── hero/
│   │   └── hero-placeholder.jpg        # Immagine hero (da sostituire)
│   ├── struttura/
│   │   ├── struttura-1.jpg             # Placeholder esterno struttura
│   │   └── struttura-2.jpg
│   ├── camere/
│   │   ├── camera-1.jpg                # Placeholder camera 1
│   │   ├── camera-2.jpg
│   │   ├── camera-3.jpg
│   │   └── camera-4.jpg
│   └── luoghi/
│       ├── castel-del-monte.jpg        # Da Wikimedia (licenza libera)
│       ├── trani-cattedrale.jpg
│       ├── bari-san-nicola.jpg
│       ├── altamura.jpg
│       ├── matera-sassi.jpg
│       ├── alberobello-trulli.jpg
│       └── corato-centro.jpg
│
└── assets/
    ├── logo.svg                        # Logo testuale SVG del B&B
    └── og-image.jpg                    # Immagine Open Graph (1200x630px)
```

---

## 4. Architettura HTML

### 4.1 Struttura Semantica della Pagina (`index.html`)

```html
<html lang="it">
<head>
  <!-- Meta SEO, OG, JSON-LD, font, CSS -->
</head>
<body>
  <header id="site-header">           <!-- Sticky nav + logo + toggle lingua -->
    <nav>...</nav>
  </header>

  <main>
    <section id="hero">               <!-- Hero fullscreen + CTA -->
    <section id="struttura">          <!-- Descrizione B&B + caratteristiche -->
    <section id="camere">             <!-- Card 4 camere -->
    <section id="galleria">           <!-- Carousel/lightbox foto -->
    <section id="servizi">            <!-- Griglia icone servizi per categoria -->
    <section id="posizione">          <!-- Mappa Leaflet + istruzioni raggiungibilità -->
    <section id="attrazioni">         <!-- Card luoghi d'interesse + filtri categoria -->
    <section id="recensioni">         <!-- Slider recensioni ospiti -->
    <section id="preventivo">         <!-- Form richiesta preventivo -->
    <section id="contatti">           <!-- Email, tel, WhatsApp, orari -->
    <section id="faq">                <!-- Accordion FAQ -->
  </main>

  <footer id="site-footer">           <!-- Info gestore, nav rapida, copyright -->
  </footer>

  <div id="cookie-banner">            <!-- Banner GDPR cookie -->
  <div id="form-success-message">     <!-- Messaggio post-submit (hidden di default) -->
</body>
```

### 4.2 Navigazione

- L'header è `position: sticky; top: 0` con `z-index` elevato
- Il menu hamburger è visibile su mobile (toggle via JS, no librerie)
- I link di navigazione sono anchor `href="#section-id"` con scroll fluido via CSS `scroll-behavior: smooth`
- Il toggle lingua (`IT | EN`) è un link che punta a `index.html` o `index-en.html`
- Al click su un link del menu, il menu mobile si chiude automaticamente

---

## 5. Sistema di Stile (CSS)

### 5.1 Variabili CSS (Design Tokens)

```css
:root {
  /* Palette – toni caldi pugliesi */
  --color-primary:      #C8724A;   /* Terracotta */
  --color-secondary:    #4A7C6B;   /* Verde oliva */
  --color-accent:       #E8C98A;   /* Sabbia dorata */
  --color-bg:           #FAF7F2;   /* Bianco caldo */
  --color-surface:      #FFFFFF;
  --color-text:         #2C2C2C;
  --color-text-light:   #6B6B6B;
  --color-border:       #E0D9D0;

  /* Tipografia */
  --font-heading:       'Playfair Display', serif;
  --font-body:          'Lato', sans-serif;
  --font-size-base:     16px;
  --line-height-base:   1.6;

  /* Spaziatura */
  --spacing-xs:   4px;
  --spacing-sm:   8px;
  --spacing-md:   16px;
  --spacing-lg:   32px;
  --spacing-xl:   64px;
  --spacing-xxl:  96px;

  /* Breakpoints (usati nei media query) */
  --bp-mobile:    480px;
  --bp-tablet:    768px;
  --bp-desktop:   1024px;
  --bp-wide:      1280px;

  /* Bordi e ombre */
  --border-radius:      8px;
  --border-radius-lg:   16px;
  --shadow-sm:          0 2px 8px rgba(0,0,0,0.08);
  --shadow-md:          0 4px 20px rgba(0,0,0,0.12);

  /* Transizioni */
  --transition-fast:    0.15s ease;
  --transition-base:    0.3s ease;
}
```

### 5.2 Breakpoint e Layout Responsive

| Breakpoint | Range | Layout |
|---|---|---|
| Mobile | < 768px | Colonna singola, menu hamburger, card stacked |
| Tablet | 768px – 1023px | 2 colonne, menu orizzontale compatto |
| Desktop | ≥ 1024px | Layout multi-colonna, menu completo |
| Wide | ≥ 1280px | Container max-width: 1200px centrato |

### 5.3 Componenti CSS Principali

- `.hero` — fullscreen con `background-image`, overlay scuro semitrasparente, testo centrato
- `.card` — componente riutilizzabile per camere, attrazioni, recensioni
- `.services-grid` — CSS Grid auto-fill per le icone servizi
- `.gallery-grid` — CSS Grid con lightbox overlay
- `.form-group` — stile campo form con label, input, messaggio errore inline
- `.btn` / `.btn-primary` / `.btn-outline` — sistema bottoni
- `.accordion` — per la sezione FAQ (expand/collapse)
- `.sticky-header` — header con box-shadow progressivo allo scroll
- `.lang-toggle` — switcher IT/EN nell'header

---

## 6. Logica JavaScript

### 6.1 `main.js` – Entry Point

Inizializza tutti i moduli al `DOMContentLoaded`:

```javascript
import { initGallery }      from './gallery.js';
import { initMap }          from './map.js';
import { initForm }         from './form.js';
import { initLang }         from './lang.js';
import { initCookieBanner } from './cookie-banner.js';

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initMap();
  initForm();
  initLang();
  initCookieBanner();
  initMobileMenu();
  initStickyHeader();
  initSmoothScrollOffset(); // offset per compensare header sticky
});
```

> Nota: se i moduli ES6 creano problemi di compatibilità su GitHub Pages, si usa un unico file `main.js` concatenato, senza `import/export`.

### 6.2 `form.js` – Validazione e Invio Form

**Campi e regole di validazione:**

| Campo | Tipo HTML | Validazione JS |
|---|---|---|
| `nome_cognome` | `text` | Non vuoto, min 2 caratteri |
| `email` | `email` | Regex RFC-compliant |
| `telefono` | `tel` | Opzionale; se presente: solo cifre/+/spazi, min 9 cifre |
| `num_ospiti` | `number` | Intero, min 1, max 10 |
| `data_arrivo` | `date` | Non vuota, >= data odierna |
| `data_partenza` | `date` | Non vuota, > `data_arrivo` |
| `tipo_camera` | `select` | Selezione obbligatoria (valore non default) |
| `note` | `textarea` | Opzionale, max 500 caratteri |
| `gdpr_consent` | `checkbox` | Obbligatoriamente spuntato |

**Flusso submit:**

```
1. Intercetta evento submit (preventDefault)
2. Esegui validazione su tutti i campi
3. Se errori → mostra messaggi inline, blocca
4. Se tutto OK → disabilita bottone, mostra spinner
5. fetch() POST a endpoint Formspree (application/json)
6. Se risposta OK (200/201) → nascondi form, mostra #form-success-message
7. Se errore → mostra messaggio errore generico, riabilita bottone
```

**Chiamata Formspree:**

```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/XXXXXXXX'; // sostituire con endpoint reale

async function submitForm(formData) {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(formData)
  });
  if (!response.ok) throw new Error('Errore invio');
  return response.json();
}
```

**Costruzione messaggio WhatsApp (link statico):**

```javascript
// Mostrato dopo il form (non al submit automatico)
const waNumber = '39XXXXXXXXXX'; // numero gestore con prefisso IT
const waText = encodeURIComponent('Ciao! Vorrei richiedere un preventivo per il B&B A Due Passi Da.');
const waLink = `https://wa.me/${waNumber}?text=${waText}`;
```

### 6.3 `map.js` – Mappa Leaflet

```javascript
import L from 'leaflet'; // via CDN, L è globale

const BB_COORDS = [41.1536, 16.4068]; // coordinate Corato BA - da verificare
const BB_ZOOM   = 15;

function initMap() {
  const map = L.map('map-container').setView(BB_COORDS, BB_ZOOM);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);

  const marker = L.marker(BB_COORDS).addTo(map);
  marker.bindPopup('<strong>A Due Passi Da</strong><br>Via Duomo, 81 – Corato (BA)').openPopup();
}
```

> ⚠️ Le coordinate `[41.1536, 16.4068]` sono approssimative. Dovranno essere aggiornate con i valori precisi estratti dal link Google Maps del gestore prima della pubblicazione.

### 6.4 `gallery.js` – Galleria con Lightbox

- Nessuna libreria esterna: lightbox implementato in JS/CSS puro
- Click su thumbnail → apertura overlay fullscreen con immagine grande
- Navigazione prev/next con frecce keyboard (←/→) e click
- Chiusura con tasto ESC o click su overlay
- Struttura dati delle immagini come array di oggetti `{ src, alt, caption }`

### 6.5 `lang.js` – Gestione Lingua

- Implementazione semplice: due file HTML distinti (`index.html` IT, `index-en.html` EN)
- Il toggle nell'header è un `<a>` che punta al file corrispondente
- Lo stato della lingua attiva viene evidenziato con classe CSS `.active` sul toggle
- Nessun localStorage o cookie necessario: la lingua è determinata dall'URL corrente

### 6.6 `cookie-banner.js` – Banner GDPR

- Banner mostrato alla prima visita (stato salvato in `localStorage: 'cookieConsent'`)
- Due opzioni: "Accetta" / "Rifiuta" (o solo "Ok, ho capito" per sito puramente statico)
- Se rifiutato: la mappa Leaflet/OSM non viene caricata (tile OSM non imposta cookie, ma per sicurezza)
- Il banner non blocca l'uso del sito (non è un cookie wall)
- La logica è conforme al GDPR per siti statici senza analytics propri

---

## 7. Sezioni – Specifiche Tecniche Dettagliate

### 7.1 Hero

```html
<section id="hero" style="background-image: url('images/hero/hero-placeholder.jpg')">
  <div class="hero-overlay">
    <h1>A Due Passi Da</h1>
    <p class="hero-tagline">Il tuo angolo di Puglia a Corato</p>
    <a href="#preventivo" class="btn btn-primary">Richiedi Preventivo</a>
  </div>
</section>
```

- Altezza: `100vh` su desktop, `70vh` su mobile
- `background-size: cover; background-position: center`
- Overlay: `rgba(0,0,0,0.4)` per leggibilità del testo
- Il bottone CTA esegue scroll smooth verso `#preventivo`

### 7.2 Sezione Servizi

- Struttura dati definita in JS come array di oggetti (facile da aggiornare):

```javascript
const SERVICES = [
  { icon: 'fa-wifi',        label: 'Wi-Fi 135 Mbps',       included: true  },
  { icon: 'fa-snowflake',   label: 'Aria condizionata',     included: true  },
  { icon: 'fa-mug-hot',     label: 'Colazione inclusa',     included: true  },
  { icon: 'fa-car',         label: 'Parcheggio (€20/gg)',   included: false },
  { icon: 'fa-plane',       label: 'Navetta aeroporto',     included: false },
  // ... altri servizi
];
```

- `included: true` → badge verde "Incluso"
- `included: false` → badge grigio "A pagamento"
- Layout: CSS Grid `auto-fill, minmax(140px, 1fr)`

### 7.3 Form Preventivo

Attributi HTML del form:

```html
<form
  id="quote-form"
  action="https://formspree.io/f/XXXXXXXX"
  method="POST"
  novalidate
>
```

L'attributo `novalidate` disabilita la validazione nativa del browser per usare quella custom JS. L'`action` di Formspree è usato come fallback se JS è disabilitato (submit tradizionale).

Campi del form con `name` esatti (usati da Formspree come etichette email):

| `name` attributo | Tipo | Label visibile |
|---|---|---|
| `nome_cognome` | text | Nome e Cognome |
| `email` | email | Indirizzo Email |
| `telefono` | tel | Telefono (opzionale) |
| `num_ospiti` | number | Numero di ospiti |
| `data_arrivo` | date | Data di arrivo |
| `data_partenza` | date | Data di partenza |
| `tipo_camera` | select | Tipologia di sistemazione |
| `note` | textarea | Richieste speciali |
| `gdpr_consent` | checkbox | Acconsento al trattamento dei dati |
| `_subject` | hidden | "Nuova richiesta preventivo – A Due Passi Da" |
| `_language` | hidden | "it" oppure "en" |

> Il campo `_subject` è un campo speciale Formspree: imposta l'oggetto dell'email ricevuta dal gestore.

### 7.4 Sezione Attrazioni

- 7 card con: immagine (100x200px thumbnail), titolo, distanza, categoria, breve descrizione
- Sistema di filtro per categoria implementato in JS puro (nessuna libreria):
  - Bottoni filtro: Tutti | Cultura & Storia | Natura | Enogastronomia | Mare & Spiagge
  - Al click: `card.style.display = 'none/block'` in base all'attributo `data-category`

### 7.5 Sezione Recensioni

- Slider/carousel implementato in CSS puro (tecnica "scroll snap") o minimale JS
- Struttura dati statica in HTML (aggiornabile manualmente dal gestore):

```html
<div class="review-card">
  <div class="review-stars">★★★★★</div>
  <p class="review-text">"..."</p>
  <span class="review-author">Nome Ospite</span>
  <span class="review-date">Mese Anno</span>
  <span class="review-source">Booking.com</span>
</div>
```

### 7.6 FAQ Accordion

- Implementazione JS pura: click su domanda → toggle classe `.open` sulla risposta
- Un solo item aperto alla volta (chiude gli altri)
- Animazione altezza con CSS `max-height` transition

---

## 8. SEO e Metadati

### 8.1 Meta Tag (head di ogni pagina)

```html
<!-- SEO Base -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>A Due Passi Da – B&B a Corato (BA) | Puglia</title>
<meta name="description" content="B&B A Due Passi Da a Corato, Puglia. Appartamento privato 50m², colazione inclusa, Wi-Fi 135 Mbps, terrazza. Richiedi il tuo preventivo diretto.">
<meta name="keywords" content="b&b corato, bed and breakfast corato bari, affittacamere puglia, alloggio corato, vacanze puglia">
<link rel="canonical" href="https://<username>.github.io/<repo>/">

<!-- Open Graph (Facebook, WhatsApp preview) -->
<meta property="og:type"        content="website">
<meta property="og:title"       content="A Due Passi Da – B&B Corato, Puglia">
<meta property="og:description" content="Appartamento privato nel cuore di Corato. Colazione, Wi-Fi, terrazza. Prenota direttamente.">
<meta property="og:image"       content=".../assets/og-image.jpg">
<meta property="og:url"         content="https://<username>.github.io/<repo>/">
<meta property="og:locale"      content="it_IT">

<!-- Twitter Card -->
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:title"       content="A Due Passi Da – B&B Corato">
<meta name="twitter:description" content="B&B nel centro di Corato, Puglia. Preventivo diretto senza commissioni.">
<meta name="twitter:image"       content=".../assets/og-image.jpg">
```

### 8.2 JSON-LD Structured Data (schema.org)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "A Due Passi Da",
  "description": "B&B e appartamento privato nel centro storico di Corato (BA), Puglia.",
  "url": "https://<username>.github.io/<repo>/",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via Duomo, 81",
    "addressLocality": "Corato",
    "addressRegion": "BA",
    "postalCode": "70033",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.1536,
    "longitude": 16.4068
  },
  "telephone": "+39XXXXXXXXXX",
  "email": "XXXXXX@gmail.com",
  "numberOfRooms": 4,
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Wi-Fi gratuito", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Colazione inclusa", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Aria condizionata", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Parcheggio", "value": true }
  ],
  "checkinTime": "15:00",
  "checkoutTime": "11:00",
  "priceRange": "€€",
  "image": ".../assets/og-image.jpg",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "9.5",
    "reviewCount": "69",
    "bestRating": "10"
  }
}
</script>
```

### 8.3 `sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://<username>.github.io/<repo>/</loc><priority>1.0</priority></url>
  <url><loc>https://<username>.github.io/<repo>/index-en.html</loc><priority>0.8</priority></url>
  <url><loc>https://<username>.github.io/<repo>/privacy-policy.html</loc><priority>0.3</priority></url>
</urlset>
```

### 8.4 `robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://<username>.github.io/<repo>/sitemap.xml
```

---

## 9. Performance

### 9.1 Ottimizzazione Immagini

| Tipo | Formato | Dimensione massima | Note |
|---|---|---|---|
| Hero | JPEG / WebP | 1920x1080px, < 300 KB | Progressive JPEG |
| Thumbnail galleria | JPEG / WebP | 600x400px, < 80 KB | Lazy load |
| Card attrazioni | JPEG / WebP | 400x300px, < 60 KB | |
| OG Image | JPEG | 1200x630px, < 200 KB | |
| Logo | SVG | — | Vettoriale |

- Attributo `loading="lazy"` su tutte le immagini al di sotto del fold
- Attributo `width` e `height` su tutte le immagini (previene layout shift, CLS)
- Attributo `alt` descrittivo su ogni immagine (accessibilità + SEO)

### 9.2 Caricamento Risorse

- CSS e font nel `<head>` (render-blocking minimizzato con `font-display: swap`)
- JS in fondo al `<body>` o con attributo `defer`
- CDN esterni (Font Awesome, Leaflet, Google Fonts) caricati solo se necessari
- Leaflet non viene inizializzato finché la sezione mappa non è visibile (IntersectionObserver)

---

## 10. Accessibilità (WCAG 2.1 AA – Baseline)

- Tutti i link e bottoni hanno testo visibile o `aria-label`
- Immagini decorative: `alt=""`; immagini informative: alt descrittivo
- Contrasto testo/sfondo: rapporto ≥ 4.5:1 (verificabile con strumenti browser)
- Form: ogni `<input>` associato al suo `<label>` tramite `for`/`id`
- Messaggi di errore form: collegati all'input con `aria-describedby`
- Accordion FAQ: gestione `aria-expanded` e `aria-controls`
- Navigazione da tastiera: tutti gli elementi interattivi raggiungibili con Tab
- Annuncio `aria-live="polite"` per il messaggio di conferma del form

---

## 11. Privacy e GDPR

### 11.1 Cookie Utilizzati

| Cookie | Tipo | Origine | Scopo | Scadenza |
|---|---|---|---|---|
| `cookieConsent` | Funzionale | 1st party (localStorage) | Salva preferenza banner | Persistente |

> Il sito non utilizza Google Analytics, Facebook Pixel, o altri tracker. OpenStreetMap non imposta cookie di profilazione. Formspree riceve i dati del form ma non li condivide per pubblicità.

### 11.2 Privacy Policy – Contenuto Minimo

- Titolare del trattamento: gestore B&B (nome, email, indirizzo)
- Dati raccolti: solo quelli inviati tramite form di contatto
- Finalità: rispondere alle richieste di preventivo
- Base giuridica: esecuzione di misure pre-contrattuali (art. 6 GDPR)
- Conservazione: email del gestore (responsabilità del gestore)
- Diritti dell'interessato: accesso, rettifica, cancellazione (contatto via email)
- Subprocessor: Formspree Inc. (USA) – Privacy Shield / SCCs

---

## 12. Internazionalizzazione (i18n)

### 12.1 Approccio

Dato che il sito è statico e privo di backend, si adotta la soluzione più semplice: **due file HTML paralleli**.

| File | Lingua | URL |
|---|---|---|
| `index.html` | Italiano (default) | `/` o `/index.html` |
| `index-en.html` | Inglese | `/index-en.html` |
| `privacy-policy.html` | Italiano | `/privacy-policy.html` |
| `privacy-policy-en.html` | Inglese | `/privacy-policy-en.html` |

### 12.2 Hreflang (SEO multilingua)

In ogni pagina IT:
```html
<link rel="alternate" hreflang="it" href=".../index.html">
<link rel="alternate" hreflang="en" href=".../index-en.html">
```

In ogni pagina EN:
```html
<link rel="alternate" hreflang="it" href=".../index.html">
<link rel="alternate" hreflang="en" href=".../index-en.html">
```

### 12.3 Contenuti da Tradurre

Tutti i testi del sito, inclusi:
- Label e placeholder del form (incluso oggetto email Formspree via campo `_subject`)
- Messaggi di errore validazione JS
- Messaggio conferma post-submit
- Testi FAQ, descrizioni servizi, attrazioni
- Meta tag SEO (title, description, OG)
- JSON-LD (description)

---

## 13. Configurazione Formspree

### 13.1 Setup Account

1. Registrarsi su [formspree.io](https://formspree.io) con l'email del gestore
2. Creare un nuovo form → ottenere endpoint univoco (es. `https://formspree.io/f/abcdefgh`)
3. Configurare email di destinazione nelle impostazioni del form
4. Abilitare notifica email ad ogni submit
5. Incollare l'endpoint nel codice HTML (`action`) e JS (`FORMSPREE_ENDPOINT`)

### 13.2 Email Ricevuta dal Gestore

L'email generata da Formspree conterrà:
- **Oggetto:** "Nuova richiesta preventivo – A Due Passi Da" (campo `_subject`)
- **Corpo:** tutti i campi del form con label e valore
- **Reply-to:** impostato automaticamente sull'email del richiedente (il gestore può rispondere direttamente)

---

## 14. Deployment – Procedura Tecnica

### 14.1 Setup iniziale GitHub Pages

```bash
# 1. Creare repository su GitHub (es: aduepassida-website)
# 2. Clonare localmente
git clone https://github.com/<username>/aduepassida-website.git
cd aduepassida-website

# 3. Aggiungere i file del sito
# 4. Commit e push
git add .
git commit -m "Initial commit – sito vetrina B&B A Due Passi Da"
git push origin main

# 5. Su GitHub.com → Settings → Pages → Source: Deploy from branch → main / root
# Il sito sarà live su: https://<username>.github.io/aduepassida-website/
```

### 14.2 Aggiornamenti Futuri

```bash
# Modificare file localmente, poi:
git add .
git commit -m "Aggiornamento: [descrizione modifica]"
git push origin main
# GitHub Pages si aggiorna automaticamente in ~1 minuto
```

---

## 15. Testing

### 15.1 Checklist Pre-Pubblicazione

**Funzionalità:**
- [ ] Form: validazione tutti i campi (casi validi e invalidi)
- [ ] Form: invio reale a Formspree → email ricevuta dal gestore
- [ ] Form: messaggio di conferma visibile post-submit
- [ ] Link WhatsApp: apertura corretta su mobile e desktop
- [ ] Mappa Leaflet: caricamento, marker, popup corretti
- [ ] Galleria: lightbox apre/chiude, navigazione prev/next
- [ ] FAQ: accordion espande/collassa correttamente
- [ ] Filtri attrazioni: funzionano per categoria
- [ ] Toggle lingua IT/EN: pagine caricate correttamente
- [ ] Cookie banner: appare alla prima visita, sparisce dopo consenso

**Responsive:**
- [ ] Mobile (< 480px): menu hamburger, layout colonna singola
- [ ] Tablet (768px): layout a 2 colonne
- [ ] Desktop (1024px+): layout completo
- [ ] Test su Chrome, Firefox, Safari, Edge (browser moderni)

**SEO & Performance:**
- [ ] Meta tag presenti su tutte le pagine
- [ ] JSON-LD validato con [schema.org validator](https://validator.schema.org)
- [ ] Sitemap.xml accessibile
- [ ] Tutte le immagini hanno attributo `alt`
- [ ] Nessun link rotto (404)
- [ ] Google PageSpeed Insights: score ≥ 90 (mobile)

**GDPR:**
- [ ] Banner cookie mostrato alla prima visita
- [ ] Privacy policy raggiungibile dal footer
- [ ] Nessun dato inviato prima del consenso GDPR nel form

---

## 16. Vincoli Tecnici

- Nessun linguaggio server-side (PHP, Node.js, Python, ecc.)
- Nessun database
- Nessuna dipendenza npm/build tool (il sito deve funzionare come file statici puri)
- Tutto il codice JS deve essere compatibile con ES6+ senza transpiling (Babel non disponibile senza build tool)
- Nessuna framework CSS (Bootstrap, Tailwind) – solo CSS custom per ridurre dipendenze e peso
- Immagini placeholder da Unsplash/Wikimedia devono avere licenza libera verificata (CC0 o Unsplash License)
- Il `FORMSPREE_ENDPOINT` reale non va mai committato nel repository se il repo è pubblico — usare un file `.env` oppure inserirlo direttamente in `form.js` (accettabile per siti statici senza dati sensibili, poiché l'endpoint è comunque visibile nel sorgente HTML)

---

## 17. Fuori Scope (v1.0)

Le seguenti funzionalità sono escluse dalla prima versione e documentate per sviluppi futuri:

| Funzionalità | Tecnologia suggerita | Note |
|---|---|---|
| Dominio custom | Registrar + DNS CNAME su GitHub Pages | ~10€/anno |
| Calendario disponibilità | Cal.com (embed gratuito) o Google Calendar API | Richiede JS aggiuntivo |
| Sistema prenotazione con pagamento | Stripe Checkout o PayPal | Richiede backend o terze parti |
| Analytics visitatori | Plausible (privacy-first, gratuito self-hosted) o Matomo | Evitare Google Analytics per GDPR |
| CMS headless | Netlify CMS (su Netlify), Decap CMS | Permetterebbe aggiornamento senza modificare HTML |
| Blog/news | Stessa architettura statica, pagine HTML aggiuntive | — |

---

*Documento tecnico derivato da `business_requirements.md` v1.1. Da usare come input per la creazione dell'Implementation Plan.*
