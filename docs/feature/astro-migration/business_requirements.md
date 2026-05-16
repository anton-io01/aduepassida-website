# Business Requirements — Migrazione Sito B&B "A Due Passi Da" ad Astro

## Overview

Il progetto consiste nella migrazione completa del sito web del B&B "A Due Passi Da" (Corato, Puglia) dall'attuale stack vanilla (HTML5 + CSS3 + JavaScript puro) verso un'architettura moderna basata su **Astro v5.x** come static site generator, con integrazione di **Decap CMS** per la gestione visuale dei contenuti, **Netlify Forms** per il form di preventivo, e ottimizzazione automatica delle immagini.

La migrazione sarà eseguita in **2 fasi incrementali**:
- **Fase 1**: Sito Astro completo con i18n, componenti, Netlify Forms, ottimizzazione immagini, configurazione deploy.
- **Fase 2**: Integrazione Decap CMS per la gestione dei contenuti.

Il sito continuerà a essere ospitato su **Netlify** con deploy automatico da GitHub, dominio `aduepassidabnb.it`.

---

## Actors and Flow

### Attori

| Attore | Ruolo | Interazione |
|--------|-------|-------------|
| **Visitatore** (IT/EN) | Utente finale del sito | Naviga il sito, compila il form preventivo |
| **Gestore B&B** | Proprietario della struttura | Modifica contenuti via Decap CMS (Fase 2) |
| **Sviluppatore** | Manutentore tecnico | Gestisce la migrazione, merge del branch, configurazione |
| **Netlify** | Piattaforma di hosting | Build, deploy, gestione form, preview branch |

### Flusso della migrazione

```
1. Sviluppatore crea branch `feature/astro-migration`
2. Sviluppatore implementa Fase 1 (Astro + i18n + Forms + Images + SEO)
3. Netlify genera deploy preview sul branch
4. Sviluppatore e Gestore verificano il sito sul preview URL
5. Sviluppatore implementa Fase 2 (Decap CMS)
6. Verifica finale su deploy preview
7. Merge su `main` → deploy automatico in produzione
8. Redirect 301 attivi per gli URL legacy
```

### Flusso utente post-migrazione

```
Visitatore → aduepassidabnb.it → Homepage IT (single-page con anchor links)
           → aduepassidabnb.it/en/ → Homepage EN (single-page con anchor links)
           → aduepassidabnb.it/privacy-policy/ → Privacy Policy IT
           → aduepassidabnb.it/en/privacy-policy/ → Privacy Policy EN
           → Compila form preventivo → Netlify Forms → Notifica email al gestore
```

---

## Business Rules

### BR-01: Struttura pagine
- Il sito mantiene la struttura **single-page** per la homepage, con tutte le 10 sezioni (Hero, Struttura, Galleria, Servizi, Posizione, Attrazioni, Recensioni, Preventivo, Contatti, FAQ) nella stessa pagina per ogni lingua.
- La **Privacy Policy** è una pagina separata (come già adesso).
- L'architettura è predisposta per l'aggiunta futura di nuove pagine (es. blog, offerte speciali).

### BR-02: Internazionalizzazione (i18n)
- **Italiano** è la lingua default, servita alla root `/` senza prefisso.
- **Inglese** è servito con prefisso `/en/`.
- Il routing i18n è gestito nativamente da Astro (cartelle `src/pages/` per IT e `src/pages/en/` per EN).
- I testi sono gestiti tramite file di traduzione strutturati (JSON o YAML).
- Il language switcher alterna tra `/` ↔ `/en/`, `/privacy-policy/` ↔ `/en/privacy-policy/`.

### BR-03: Gestione divergenze IT/EN
- Le sezioni principali (Hero, Struttura, Galleria, Servizi, Posizione, Attrazioni, Recensioni) hanno **struttura HTML unificata** tra le due lingue, con differenze solo nei testi gestiti via i18n.
- Le sezioni **FAQ**, **Form Preventivo** e **Footer** possono mantenere **differenze strutturali controllate** tra le lingue, dove la versione italiana fa da riferimento primario.
  - FAQ: unificare su componente accordion accessibile (approccio IT con `aria-controls`).
  - Form: singolo componente con campi identici in entrambe le lingue (vedi BR-06).
  - Footer: allineare la struttura, includendo i social links (presenti solo in EN attualmente) in entrambe le lingue.

### BR-04: CSS
- Il CSS vanilla esistente (`style.css` ~1264 righe + `responsive.css` ~100 righe) viene **mantenuto invariato**, senza riscrittura.
- I file CSS vengono importati nel layout Astro globale.
- Le CSS custom properties (design tokens) esistenti restano la fonte di verità per il design system.

### BR-05: JavaScript
- I file JavaScript esistenti (`main.js`, `form.js`, `cookie-banner.js`) vengono **importati direttamente** nei componenti Astro come script client-side.
- I file placeholder vuoti (`gallery.js`, `map.js`, `lang.js`) vengono **eliminati**.
- Il rendering dei servizi viene spostato dal JS dinamico al rendering statico Astro (vedi BR-07).
- La validazione del form viene adattata per funzionare con Netlify Forms.

### BR-06: Form Preventivo con Netlify Forms
- I form IT e EN vengono **unificati** in un singolo componente Astro con gli stessi campi per entrambe le lingue, tradotti via i18n.
- Campi del form unificato (basati sulla versione IT, più completa):
  - Nome e Cognome (required)
  - Email (required)
  - Telefono (optional)
  - Tipo di richiesta: select con opzioni (disponibilità, preventivo, informazioni generali) (required)
  - Data arrivo (required)
  - Data partenza (required)
  - Numero ospiti: number input 1-5 (required)
  - Richieste speciali: textarea con contatore 0/500 (optional)
  - Consenso GDPR: checkbox (required)
- L'attributo `netlify` viene aggiunto al tag `<form>`, il submit va a Netlify Forms con notifica email configurata.
- La validazione client-side esistente viene mantenuta e adattata.
- Il messaggio di successo include il link WhatsApp.
- L'azione del form (precedentemente Formspree `https://formspree.io/f/mbdpwbbo`) viene rimossa e sostituita dall'integrazione nativa Netlify.

### BR-07: Servizi
- La lista dei servizi viene estratta dall'array JavaScript hardcoded e spostata in un **file dati Astro** (`src/data/services.yaml`).
- Ogni servizio ha: `icon` (classe Font Awesome), `key` (identificativo), `category`, `included` (boolean).
- Le label dei servizi (nome, badge "Incluso"/"A pagamento") sono nei file di traduzione i18n.
- Il rendering è **statico** al build time (non più dinamico JS).

### BR-08: Immagini
- Tutte le immagini (~19 file JPG/PNG) vengono spostate in `src/assets/images/` mantenendo la struttura delle sottocartelle (`hero/`, `struttura/`, `appartamento/`, `luoghi/`, `camere/`).
- Il componente `<Image>` di Astro (`astro:assets`) viene utilizzato per l'ottimizzazione automatica:
  - Conversione in **WebP**.
  - Generazione di **`srcset` responsive** con breakpoint appropriati.
  - Specifica di `width` e `height` per prevenire layout shift.
- Le immagini placeholder restano nel progetto ma vengono comunque ottimizzate.

### BR-09: SEO
- **Canonical URLs**: generati dinamicamente dalla variabile `site` nella config Astro, con fallback hardcoded a `https://aduepassidabnb.it`.
  - IT: `https://aduepassidabnb.it/`
  - EN: `https://aduepassidabnb.it/en/`
  - Privacy IT: `https://aduepassidabnb.it/privacy-policy/`
  - Privacy EN: `https://aduepassidabnb.it/en/privacy-policy/`
- **Hreflang**: tag alternati IT/EN + `x-default` → IT.
- **Open Graph e Twitter Card**: title, description, image, locale per ogni lingua.
- **JSON-LD Schema.org**: structured data `BedAndBreakfast` con URL e immagini corretti (fix placeholder `USERNAME`).
- **Sitemap**: generata automaticamente tramite `@astrojs/sitemap` con hreflang.
- **robots.txt**: generato staticamente o come file in `public/`, con Sitemap URL corretto.
- **Meta tags**: title e description specifici per lingua.

### BR-10: Redirect 301
Configurati nel `netlify.toml` per preservare il ranking SEO:

| URL Legacy | Nuovo URL | Status |
|------------|-----------|--------|
| `/index-en.html` | `/en/` | 301 |
| `/privacy-policy.html` | `/privacy-policy/` | 301 |
| `/privacy-policy-en.html` | `/en/privacy-policy/` | 301 |
| `/index.html` | `/` | 301 |

### BR-11: Privacy Policy e Cookie Banner
- La **Privacy Policy** diventa un file **Markdown gestito da Decap CMS** (Fase 2), con template Astro dedicato per il rendering.
  - In Fase 1: pagina Astro statica con contenuto hardcoded, predisposta per la migrazione a CMS.
- Il **Cookie Banner** diventa un componente Astro con supporto per **categorie di cookie** (necessari, funzionali, analytics), futureproof per integrazione Google Analytics.
  - Persistenza del consenso tramite `localStorage`.
  - Rispetta il GDPR: no cookie di profilazione senza consenso esplicito.
  - La privacy policy del form viene aggiornata per menzionare Netlify Forms al posto di Formspree.

### BR-12: Decap CMS (Fase 2)
- Decap CMS viene integrato con accesso su `/admin/`.
- Autenticazione tramite Netlify Identity.
- **Contenuti gestibili dal CMS** (scope medio):
  - Recensioni (autore, testo, valutazione, data, provenienza)
  - Attrazioni/Dintorni (nome, descrizione, distanza, immagine)
  - Servizi (nome, icona, categoria, stato incluso/pagamento) — se necessario override del file `services.yaml`
  - FAQ (domanda e risposta per lingua)
  - Testi delle sezioni principali (Struttura, Hero tagline/subtitle)
  - Informazioni di contatto (email, telefono, indirizzo)
  - Immagini galleria
- **Contenuti NON gestibili dal CMS**: Header, Footer (struttura e navigazione), layout, CSS, JavaScript.

### BR-13: Font Awesome
- Font Awesome 6.5.0 viene mantenuto via **CDN** (`cdnjs.cloudflare.com`), caricato nel layout globale Astro.
- Nessun cambiamento rispetto all'implementazione attuale.

### BR-14: Google Fonts
- Le font Lato e Playfair Display continuano a essere caricate via Google Fonts CDN con `preconnect`.

---

## Edge Cases and Constraints

### Vincoli tecnici
1. **Astro v5.x** — Usare l'ultima versione stabile con integrazioni ufficiali (`@astrojs/sitemap`, `astro:assets`). Nessun framework UI (no React/Vue/Svelte).
2. **CSS invariato** — Non è possibile modificare `style.css` e `responsive.css`. Se servono stili aggiuntivi per nuovi componenti (es. cookie banner avanzato), vanno in file CSS separati.
3. **Build time** — Con tutte le immagini in `src/assets/`, il build time potrebbe aumentare. Monitorare e valutare se necessario `image.cacheDir` nella config Astro.
4. **Netlify Forms ha un limite** di 100 submission/mese nel piano gratuito. Verificare il volume attuale.

### Edge cases
1. **Immagini mancanti** — Diverse immagini sono placeholder (`placeholder.jpg`). I componenti devono gestire gracefully le immagini mancanti con alt text descrittivo.
2. **Hero background** — Attualmente la hero IT usa `background-image` nel CSS, la EN usa un `<div>` con `style` inline. Unificare l'approccio in Astro (preferire `<Image>` per l'ottimizzazione, con CSS per il positioning).
3. **Form validation** — La validazione JS esistente referenzia ID specifici (`err-nome`, `err-email`, ecc.). Assicurarsi che gli ID restino consistenti dopo l'unificazione del form.
4. **Accordion FAQ** — La versione IT usa `aria-controls` e `hidden`, la EN no. Unificare su approccio accessibile (IT).
5. **Services rendering** — Passando da rendering JS dinamico a statico Astro, il `<div id="services-grid"></div>` vuoto non esiste più. Il CSS che targetta `#services-grid` deve comunque funzionare.
6. **JSON-LD placeholder** — Il campo `image` nel JSON-LD contiene `USERNAME` come placeholder. Va corretto con il dominio reale.
7. **Cookie banner timing** — Il cookie banner nel sito attuale è nell'HTML dopo il footer e viene mostrato/nascosto via JS. In Astro, il componente va posizionato nel layout globale.

### Vincoli organizzativi
1. **Branch strategy** — Lavorare su branch `feature/astro-migration` con Netlify deploy preview. Il sito attuale su `main` continua a funzionare fino al merge.
2. **Zero downtime** — Il merge su `main` deve garantire un deploy funzionante. Testare completamente su preview prima del merge.
3. **Backward compatibility URL** — I redirect 301 devono essere attivi dal momento del deploy.

---

## Acceptance Criteria

### AC-01: Build e Deploy
```gherkin
Scenario: Il progetto Astro si compila e si deploya con successo
  Given il branch `feature/astro-migration` è aggiornato
  When si esegue `npm run build`
  Then il build completa senza errori
  And l'output è nella cartella `dist/`
  And Netlify genera un deploy preview funzionante
```

### AC-02: Homepage IT
```gherkin
Scenario: La homepage italiana è accessibile alla root
  Given il sito è deployato
  When un utente visita `https://aduepassidabnb.it/`
  Then la pagina mostra tutte le 10 sezioni nell'ordine corretto
  And la lingua è italiano
  And il design visivo corrisponde al sito attuale
  And il language switcher mostra IT attivo e link a EN
```

### AC-03: Homepage EN
```gherkin
Scenario: La homepage inglese è accessibile con prefisso /en/
  Given il sito è deployato
  When un utente visita `https://aduepassidabnb.it/en/`
  Then la pagina mostra tutte le sezioni in inglese
  And il language switcher mostra EN attivo e link a IT
```

### AC-04: Navigazione anchor
```gherkin
Scenario: Gli anchor link funzionano correttamente
  Given l'utente è sulla homepage
  When clicca su un link di navigazione (es. "La Struttura")
  Then la pagina scrolla smoothly alla sezione corrispondente
  And l'URL mostra il fragment (es. `/#struttura` o `/en/#struttura`)
```

### AC-05: Form preventivo Netlify Forms
```gherkin
Scenario: Il form preventivo invia tramite Netlify Forms
  Given l'utente è sulla sezione preventivo
  When compila tutti i campi obbligatori con dati validi
  And accetta il consenso GDPR
  And clicca "Invia Richiesta"
  Then il form viene inviato a Netlify Forms
  And l'utente vede il messaggio di successo con link WhatsApp
  And il gestore riceve una notifica email
```

### AC-06: Validazione form
```gherkin
Scenario: La validazione client-side blocca l'invio con dati invalidi
  Given l'utente è sulla sezione preventivo
  When lascia campi obbligatori vuoti o compila dati invalidi
  And clicca "Invia Richiesta"
  Then i campi con errori mostrano messaggi di errore specifici
  And il form NON viene inviato
```

### AC-07: Ottimizzazione immagini
```gherkin
Scenario: Le immagini sono servite in formato WebP ottimizzato
  Given il sito è deployato
  When un browser moderno richiede un'immagine
  Then l'immagine è servita in formato WebP
  And ha un attributo srcset con dimensioni responsive
  And ha attributi width e height specificati
```

### AC-08: Redirect 301
```gherkin
Scenario: Gli URL legacy vengono redirectati correttamente
  Given il sito è deployato
  When un utente visita `/index-en.html`
  Then riceve un redirect 301 a `/en/`

  When un utente visita `/privacy-policy.html`
  Then riceve un redirect 301 a `/privacy-policy/`

  When un utente visita `/privacy-policy-en.html`
  Then riceve un redirect 301 a `/en/privacy-policy/`
```

### AC-09: SEO integrità
```gherkin
Scenario: I meta tag SEO sono corretti e completi
  Given il sito è deployato
  When si ispeziona la homepage IT
  Then il canonical punta a `https://aduepassidabnb.it/`
  And gli hreflang includono IT, EN, x-default
  And l'Open Graph ha title, description, image, locale corretti
  And il JSON-LD Schema.org è valido e non contiene placeholder

  When si ispeziona la homepage EN
  Then il canonical punta a `https://aduepassidabnb.it/en/`
  And gli hreflang corrispondono
```

### AC-10: Sitemap
```gherkin
Scenario: La sitemap è generata automaticamente e corretta
  Given il sito è deployato
  When si accede a `/sitemap-index.xml` o `/sitemap-0.xml`
  Then contiene tutti gli URL del sito (IT e EN)
  And include i tag hreflang per ogni URL
  And gli URL usano il dominio `aduepassidabnb.it`
```

### AC-11: Cookie Banner
```gherkin
Scenario: Il cookie banner appare e funziona correttamente
  Given è la prima visita dell'utente (no localStorage)
  When la pagina viene caricata
  Then il cookie banner è visibile
  And mostra le categorie di cookie (necessari, funzionali, analytics)

  When l'utente accetta i cookie
  Then il banner si chiude con animazione
  And il consenso è salvato in localStorage
  And alla visita successiva il banner NON appare
```

### AC-12: Privacy Policy
```gherkin
Scenario: La privacy policy è accessibile in entrambe le lingue
  Given il sito è deployato
  When un utente visita `/privacy-policy/`
  Then vede la privacy policy in italiano
  And il contenuto menziona Netlify Forms (non Formspree)

  When un utente visita `/en/privacy-policy/`
  Then vede la privacy policy in inglese
```

### AC-13: Responsive Design
```gherkin
Scenario: Il sito è responsive su tutti i dispositivi
  Given il sito è deployato
  When viene visualizzato su mobile (< 768px)
  Then il menu hamburger è visibile e funzionante
  And tutte le sezioni sono leggibili e utilizzabili
  And le immagini si adattano allo schermo
```

### AC-14: Decap CMS (Fase 2)
```gherkin
Scenario: Il gestore può modificare contenuti dal CMS
  Given il gestore accede a `/admin/`
  And si autentica tramite Netlify Identity
  When modifica una recensione e salva
  Then un commit viene creato nel repository
  And Netlify rebuilda il sito
  And la modifica è visibile sul sito in produzione
```

---

## Impact Map

### File e struttura del progetto

| Area | Da (attuale) | A (Astro) |
|------|-------------|-----------|
| Entry point | `index.html`, `index-en.html` | `src/pages/index.astro`, `src/pages/en/index.astro` |
| CSS | `css/style.css`, `css/responsive.css` | `src/styles/style.css`, `src/styles/responsive.css` (importati nel layout) |
| JavaScript | `js/main.js`, `js/form.js`, `js/cookie-banner.js` | `src/scripts/main.js`, `src/scripts/form.js`, `src/scripts/cookie-banner.js` |
| Immagini | `images/` (JPG/PNG) | `src/assets/images/` (ottimizzate in WebP al build) |
| Componenti | N/A | `src/components/Header.astro`, `Footer.astro`, `Hero.astro`, `Services.astro`, etc. |
| Layout | Duplicato in ogni HTML | `src/layouts/BaseLayout.astro` (condiviso) |
| i18n | File HTML duplicati | `src/i18n/it.json`, `src/i18n/en.json` |
| Dati | Array JS in `main.js` | `src/data/services.yaml` |
| Privacy | `privacy-policy.html`, `privacy-policy-en.html` | `src/pages/privacy-policy.astro`, `src/pages/en/privacy-policy.astro` |
| SEO | Meta tag hardcoded | Generati dal layout Astro con dati dalla config |
| Sitemap | `sitemap.xml` statico | Generata da `@astrojs/sitemap` |
| Robots | `robots.txt` statico | `public/robots.txt` |
| Deploy | Push diretto su GitHub | `netlify.toml` con build command `astro build` |
| CMS | N/A | `public/admin/index.html` + `config.yml` (Fase 2) |

### Struttura directory Astro proposta

```
B&B - A Due Passi Da/
├── astro.config.mjs
├── package.json
├── netlify.toml
├── tsconfig.json
├── public/
│   ├── robots.txt
│   ├── favicon.ico
│   └── admin/                    # Fase 2
│       ├── index.html
│       └── config.yml
├── src/
│   ├── assets/
│   │   └── images/
│   │       ├── hero/
│   │       ├── struttura/
│   │       ├── appartamento/
│   │       ├── luoghi/
│   │       └── camere/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Struttura.astro
│   │   ├── Gallery.astro
│   │   ├── Services.astro
│   │   ├── Location.astro
│   │   ├── Attractions.astro
│   │   ├── Reviews.astro
│   │   ├── QuoteForm.astro
│   │   ├── Contacts.astro
│   │   ├── FAQ.astro
│   │   ├── CookieBanner.astro
│   │   └── SEOHead.astro
│   ├── data/
│   │   └── services.yaml
│   ├── i18n/
│   │   ├── it.json
│   │   ├── en.json
│   │   └── utils.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro            # Homepage IT
│   │   ├── privacy-policy.astro   # Privacy IT
│   │   └── en/
│   │       ├── index.astro        # Homepage EN
│   │       └── privacy-policy.astro # Privacy EN
│   ├── scripts/
│   │   ├── main.js
│   │   ├── form.js
│   │   └── cookie-banner.js
│   └── styles/
│       ├── style.css
│       └── responsive.css
├── docs/                          # Documentazione (invariata)
│   └── feature/
│       └── astro-migration/
└── PROGRESS.md
```

### Servizi e integrazioni impattati

| Servizio | Stato attuale | Post-migrazione |
|----------|--------------|-----------------|
| **Netlify Hosting** | Deploy diretto di HTML | Build Astro (`astro build`) + deploy |
| **Netlify Forms** | Non usato (Formspree) | Form preventivo gestito da Netlify |
| **Netlify Identity** | Non usato | Autenticazione per Decap CMS (Fase 2) |
| **Formspree** | Form preventivo | **Dismesso** |
| **Google Fonts CDN** | Lato + Playfair Display | Invariato |
| **Font Awesome CDN** | v6.5.0 | Invariato |
| **GitHub** | Repository + deploy trigger | Repository + branch preview |

---

## Open Points

### OP-01: Decisione su FAQ IT vs EN
La versione IT ha 10 FAQ con accordion accessibile (`aria-controls`, `hidden`), la EN ha 6 FAQ con toggle semplice. In fase di unificazione, servono decisioni:
- Le FAQ EN mancanti vanno aggiunte? (parcheggio, come raggiungo, preventivo, fattura)
- Usare la struttura accordion della versione IT per entrambe le lingue?

### OP-02: Contenuto Footer
Il footer IT ha 2 colonne (brand + contatti + nav + copyright), il footer EN ha 3 colonne (brand + social, quick links, contact). Per l'unificazione:
- Includere i social links (Instagram, Facebook, WhatsApp) nel footer per entrambe le lingue?
- Quale layout usare (2 o 3 colonne)?

### OP-03: Hero section design
La hero IT usa `background-image` nel CSS con overlay e badge inline. La hero EN usa un `<div>` con `background-image` inline e badge diversi (4 badge vs 3). Per l'unificazione:
- Quale set di badge usare?
- Come gestire il `background-image` con `<Image>` di Astro per l'ottimizzazione?

### OP-04: Volume form e limiti Netlify
Verificare se il volume attuale di submission del form è compatibile con il piano gratuito Netlify (100/mese). Se supera il limite, valutare piano a pagamento.

### OP-05: Autenticazione Decap CMS
**Decisione**: Netlify Identity (integrato, gratis fino a 5 utenti invitati). Poiché l'utente è l'unico gestore del B&B, questa opzione è ottimale e non richiede account esterni.

### OP-06: Dominio e certificato SSL
Verificare che `aduepassidabnb.it` sia correttamente configurato su Netlify con certificato SSL attivo prima di aggiornare tutti i canonical URL.

---

## Next Steps

1. **Approvazione** — Revisione e approvazione di questo documento di business requirements.
2. **Fase 1 — Requirements dettagliati** — Creare il documento di requirements tecnici dettagliati per la Fase 1 (Astro + i18n + Forms + Images + SEO), con task breakdown.
3. **Implementation Plan** — Generare il piano di implementazione con step-by-step, file da creare/modificare, e dipendenze.
4. **Sviluppo Fase 1** — Esecuzione sul branch `feature/astro-migration`.
5. **Verifica Fase 1** — Testing completo su Netlify deploy preview.
6. **Fase 2 — Requirements Decap CMS** — Dopo la verifica della Fase 1, creare i requirements per l'integrazione Decap CMS.
7. **Sviluppo e Verifica Fase 2** — Implementazione e testing del CMS.
8. **Go-live** — Merge su `main`, attivazione redirect 301, verifica finale.

---

_Documento generato il 2026-05-16 a partire dal [sparring_log.md](./sparring_log.md)._
