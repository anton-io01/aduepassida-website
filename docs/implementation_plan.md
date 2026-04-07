# Implementation Plan
## Sito Web Vetrina – B&B "A Due Passi Da"

**Versione:** 1.0  
**Data:** Marzo 2026  
**Riferimenti:** `business_requirements.md` v1.1 · `requirements.md` v1.0  
**Stato:** Pronto per esecuzione

---

## Istruzioni d'uso

Ogni step è **atomico**: va completato e verificato nella sua interezza prima di procedere al successivo.  
La sezione **Definition of Done (DoD)** di ogni step contiene:
- una checklist di verifiche spuntabili `[ ]`
- i criteri di accettazione che devono essere **tutti** soddisfatti

> ⚠️ **Regola fondamentale:** Non iniziare lo step N+1 se anche un solo item della DoD dello step N è non spuntato.

---

## Mappa degli Step

| # | Step | Categoria | Dipendenze |
|---|---|---|---|
| 01 | Setup Repository e GitHub Pages | Infrastruttura | — |
| 02 | Struttura File e Cartelle | Infrastruttura | 01 |
| 03 | Configurazione Formspree | Servizio esterno | 01 |
| 04 | Design System CSS (variabili, reset, tipografia) | Frontend – CSS | 02 |
| 05 | Layout Base HTML (scheletro pagina, header, footer) | Frontend – HTML | 02, 04 |
| 06 | Header Sticky e Menu Mobile | Frontend – JS/CSS | 05 |
| 07 | Sezione Hero | Frontend – HTML/CSS | 05, 06 |
| 08 | Sezione Struttura e Camere | Frontend – HTML/CSS | 05 |
| 09 | Raccolta e Ottimizzazione Immagini | Asset | 02 |
| 10 | Galleria Fotografica con Lightbox | Frontend – JS | 08, 09 |
| 11 | Sezione Servizi | Frontend – HTML/CSS/JS | 05 |
| 12 | Sezione Posizione e Mappa Leaflet | Frontend – JS | 05 |
| 13 | Sezione Attrazioni con Filtri Categoria | Frontend – HTML/CSS/JS | 09 |
| 14 | Sezione Recensioni (Carousel statico) | Frontend – HTML/CSS | 05 |
| 15 | Form Richiesta Preventivo (HTML + validazione JS) | Frontend – JS | 05, 03 |
| 16 | Integrazione Formspree nel Form | Frontend – JS | 15, 03 |
| 17 | Sezione Contatti e Link WhatsApp | Frontend – HTML | 05 |
| 18 | Sezione FAQ (Accordion) | Frontend – JS | 05 |
| 19 | Cookie Banner e Privacy Policy | Frontend – JS/HTML | 05 |
| 20 | SEO: Meta Tag, JSON-LD, Sitemap, robots.txt | SEO | 05 |
| 21 | CSS Responsive (mobile, tablet, desktop) | Frontend – CSS | 04–18 |
| 22 | Versione Inglese del Sito (index-en.html) | i18n | 07–19 |
| 23 | Toggle Lingua IT/EN | Frontend – JS | 22 |
| 24 | Ottimizzazione Performance | Performance | 07–22 |
| 25 | Testing Completo Pre-Pubblicazione | QA | tutti |
| 26 | Deploy Finale e Pubblicazione | Deployment | 25 |
| 27 | Inserimento URL su Google Maps | Post-deploy | 26 |

---

---

## STEP 01 – Setup Repository e GitHub Pages

### Descrizione
Creare il repository GitHub pubblico che ospiterà il codice del sito e abilitare GitHub Pages per la pubblicazione automatica. Questo step è il prerequisito di tutto il progetto.

### Attività

1. Accedere a [github.com](https://github.com) con l'account esistente del gestore
2. Creare un nuovo repository:
   - Nome: `aduepassida-website` (o simile, tutto minuscolo con trattini)
   - Visibilità: **Public** (obbligatorio per GitHub Pages gratuito)
   - Inizializzare con un `README.md`
   - Nessun `.gitignore` o licenza per ora
3. Clonare il repository in locale:
   ```bash
   git clone https://github.com/<username>/aduepassida-website.git
   cd aduepassida-website
   ```
4. Abilitare GitHub Pages:
   - Andare su `Settings` → `Pages`
   - **Source:** "Deploy from a branch"
   - **Branch:** `main` · **Folder:** `/ (root)`
   - Cliccare "Save"
5. Verificare che l'URL pubblico sia attivo: `https://<username>.github.io/aduepassida-website/`
6. Creare un file `index.html` minimale (una sola riga di testo) e fare push per verificare il deploy:
   ```bash
   echo "<h1>A Due Passi Da – coming soon</h1>" > index.html
   git add index.html
   git commit -m "chore: initial setup"
   git push origin main
   ```
7. Attendere ~1 minuto e visitare l'URL per confermare che il deploy funzioni

### Dettagli Tecnici
- Il branch di deploy è `main` (non `gh-pages`)
- HTTPS è abilitato automaticamente da GitHub (certificato Let's Encrypt)
- L'URL finale sarà del tipo: `https://<username>.github.io/aduepassida-website/`
- Ogni successivo `git push origin main` aggiornerà automaticamente il sito pubblicato

### ✅ Definition of Done

**Checklist:**
- [ ] Repository `aduepassida-website` creato su GitHub con visibilità Public
- [ ] Repository clonato correttamente in locale (cartella presente sul PC)
- [ ] GitHub Pages abilitato (Settings → Pages mostra URL attivo)
- [ ] File `index.html` minimale pushato su branch `main`
- [ ] URL `https://<username>.github.io/aduepassida-website/` raggiungibile da browser
- [ ] La pagina mostra il contenuto del file `index.html` minimale (non un 404)
- [ ] HTTPS attivo (lucchetto verde nella barra del browser)

**Criteri di accettazione:**
Il repository è pubblico, clonabile, e la URL di GitHub Pages risponde correttamente con contenuto via HTTPS. Il deploy automatico è verificato end-to-end con un file reale.

---

## STEP 02 – Struttura File e Cartelle

### Descrizione
Creare tutta la struttura di cartelle e i file vuoti del progetto, esattamente come definita in `requirements.md` §3. Questo "scaffolding" garantisce coerenza e permette a tutti gli step successivi di referenziare i file nei percorsi corretti.

### Attività

1. Nella cartella locale del repository, creare la seguente struttura:
   ```bash
   mkdir -p css js images/hero images/struttura images/camere images/luoghi assets
   ```
2. Creare i file vuoti principali:
   ```bash
   touch index.html
   touch index-en.html
   touch privacy-policy.html
   touch privacy-policy-en.html
   touch sitemap.xml
   touch robots.txt
   touch css/style.css
   touch css/responsive.css
   touch js/main.js
   touch js/form.js
   touch js/map.js
   touch js/gallery.js
   touch js/lang.js
   touch js/cookie-banner.js
   ```
3. Inserire in ogni file HTML vuoto lo scheletro HTML5 minimo (DOCTYPE, html, head, body) con commento `<!-- TODO -->` nel body
4. Aggiungere un commento descrittivo in cima a ogni file `.js` e `.css` per indicarne lo scopo
5. Fare commit e push:
   ```bash
   git add .
   git commit -m "chore: project scaffolding – empty files and folder structure"
   git push origin main
   ```

### Dettagli Tecnici
- Tutti i percorsi relativi usati negli step successivi assumeranno questa struttura come base
- Il file `index.html` di questo step sovrascriverà quello del STEP 01
- I file immagine placeholder verranno aggiunti nello STEP 09
- Il file `favicon.ico` verrà aggiunto nello STEP 20 (SEO)

### ✅ Definition of Done

**Checklist:**
- [ ] Cartelle create: `css/`, `js/`, `images/hero/`, `images/struttura/`, `images/camere/`, `images/luoghi/`, `assets/`
- [ ] File HTML creati e non vuoti (contengono scheletro HTML5 minimo): `index.html`, `index-en.html`, `privacy-policy.html`, `privacy-policy-en.html`
- [ ] File `sitemap.xml` e `robots.txt` presenti (anche vuoti o con placeholder)
- [ ] File JS creati con commento di intestazione: `main.js`, `form.js`, `map.js`, `gallery.js`, `lang.js`, `cookie-banner.js`
- [ ] File CSS creati con commento di intestazione: `style.css`, `responsive.css`
- [ ] Struttura verificata con `ls -R` o esplorer file: nessuna cartella mancante
- [ ] Commit e push eseguiti, struttura visibile su GitHub

**Criteri di accettazione:**
Tutta la struttura di file e cartelle descritta in `requirements.md` §3 è presente nel repository. Ogni file ha almeno il contenuto minimo (non è completamente vuoto/0 byte per i file HTML).

---

## STEP 03 – Configurazione Formspree

### Descrizione
Creare e configurare l'account Formspree gratuito per ricevere le email delle richieste di preventivo. Questo step va completato prima dello sviluppo del form (STEP 15-16) perché produce l'endpoint URL necessario al codice.

### Attività

1. Andare su [formspree.io](https://formspree.io) e cliccare "Get Started Free"
2. Registrarsi con **l'email del gestore** (quella su cui si vogliono ricevere le richieste)
3. Verificare l'indirizzo email cliccando il link nella mail di conferma
4. Nel dashboard Formspree, cliccare **"New Form"**
5. Dare un nome al form: `Richiesta Preventivo – A Due Passi Da`
6. Copiare l'**endpoint univoco** generato, nel formato: `https://formspree.io/f/XXXXXXXX`
7. Annotare l'endpoint in un luogo sicuro (sarà usato negli STEP 15 e 16)
8. Nelle impostazioni del form su Formspree:
   - Verificare che l'email di destinazione sia corretta
   - Abilitare le notifiche email per ogni submit
   - Facoltativamente, personalizzare il messaggio di ringraziamento
9. **Non** inserire ancora l'endpoint nel codice (lo si farà nello STEP 16)

### Dettagli Tecnici
- Piano gratuito: 50 submit/mese, nessuna scadenza
- L'endpoint è del tipo `https://formspree.io/f/abcd1234`
- Il form accetta `POST` in formato `application/json` o `multipart/form-data`
- La funzione `Reply-To` è attiva automaticamente: l'email dell'ospite viene impostata come mittente, così il gestore può rispondere direttamente
- Il campo nascosto `_subject` nel form HTML imposterà l'oggetto dell'email ricevuta
- L'endpoint è visibile nel sorgente HTML pubblico: questo è normale e accettabile per siti statici

### ✅ Definition of Done

**Checklist:**
- [ ] Account Formspree creato con l'email del gestore
- [ ] Email di verifica confermata (account attivo)
- [ ] Nuovo form creato con nome `Richiesta Preventivo – A Due Passi Da`
- [ ] Endpoint URL annotato e conservato (formato: `https://formspree.io/f/XXXXXXXX`)
- [ ] Email di destinazione nel dashboard Formspree corrisponde all'email del gestore
- [ ] Notifiche email abilitate per ogni submit

**Criteri di accettazione:**
L'account Formspree è attivo, verificato e ha un form configurato. L'endpoint è disponibile e sarà pronto per essere integrato nel codice al STEP 16.

---

## STEP 04 – Design System CSS

### Descrizione
Implementare in `css/style.css` il design system completo: reset CSS, variabili custom (design token), tipografia base, componenti riutilizzabili. Questo file è il fondamento visivo di tutto il sito.

### Attività

1. **Reset CSS** – In cima a `style.css`, aggiungere un reset moderno:
   ```css
   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
   html { scroll-behavior: smooth; }
   img { max-width: 100%; display: block; }
   a { color: inherit; text-decoration: none; }
   button { cursor: pointer; border: none; background: none; font: inherit; }
   ul, ol { list-style: none; }
   ```

2. **Variabili CSS** – Aggiungere il blocco `:root` con tutti i design token definiti in `requirements.md` §5.1:
   - Colori (primary terracotta `#C8724A`, secondary verde oliva `#4A7C6B`, accent sabbia `#E8C98A`, bg `#FAF7F2`, ecc.)
   - Font (`--font-heading: 'Playfair Display', serif` · `--font-body: 'Lato', sans-serif`)
   - Spaziatura (da `--spacing-xs: 4px` a `--spacing-xxl: 96px`)
   - Border radius, shadow, transition

3. **Tipografia base** – Stilare `body`, `h1`–`h4`, `p`, `a`:
   ```css
   body { font-family: var(--font-body); font-size: var(--font-size-base); color: var(--color-text); background-color: var(--color-bg); line-height: var(--line-height-base); }
   h1, h2, h3, h4 { font-family: var(--font-heading); color: var(--color-text); }
   ```

4. **Componenti riutilizzabili** – Implementare le classi base:
   - `.container` – `max-width: 1200px; margin: 0 auto; padding: 0 var(--spacing-lg)`
   - `.section` – `padding: var(--spacing-xxl) 0`
   - `.section-title` – stile titolo di sezione (Playfair Display, decorazione sottotitolo)
   - `.btn`, `.btn-primary`, `.btn-outline` – sistema bottoni con hover state
   - `.card` – componente card base con shadow e border-radius
   - `.badge` – piccolo badge colorato (per "Incluso" / "A pagamento")

5. **Google Fonts** – Aggiungere il `<link>` preconnect e stylesheet nel `<head>` di `index.html`:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
   ```

6. **Font Awesome** – Aggiungere il link CDN:
   ```html
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
   ```

7. Collegare `style.css` all'`index.html` con `<link rel="stylesheet" href="css/style.css">`
8. Aprire `index.html` in browser e verificare visivamente che i font e i colori siano applicati

### Dettagli Tecnici
- `font-display: swap` è già incluso nel parametro di Google Fonts URL
- Le variabili CSS sono definite in `:root` e usate ovunque con `var(--nome)`
- Il file `responsive.css` viene popolato nello STEP 21; per ora importarlo nel `<head>` subito dopo `style.css` (anche se vuoto)
- Non usare framework CSS (Bootstrap, Tailwind) – solo CSS custom

### ✅ Definition of Done

**Checklist:**
- [ ] Reset CSS presente e funzionante (margini e padding azzerati, `box-sizing: border-box`)
- [ ] Blocco `:root` con tutte le variabili CSS definite (colori, font, spaziatura, shadow, transition)
- [ ] Font Playfair Display e Lato caricati da Google Fonts CDN e visibili nel browser
- [ ] Font Awesome caricato via CDN (test: un'icona `<i class="fa-solid fa-house">` appare)
- [ ] Classi `.container`, `.section`, `.btn`, `.btn-primary`, `.btn-outline`, `.card`, `.badge` presenti e stilate
- [ ] `style.css` collegato a `index.html` (nessun errore 404 nella console del browser)
- [ ] Aprendo `index.html` in browser: sfondo color `#FAF7F2`, font body Lato, nessun errore console

**Criteri di accettazione:**
Il design system CSS è operativo. Tutti i token visivi (colori, font, spaziatura) sono definiti come variabili CSS e usabili in tutto il progetto. I font e le icone si caricano correttamente dal CDN.

---

## STEP 05 – Layout Base HTML (Scheletro, Header, Footer)

### Descrizione
Costruire lo scheletro semantico completo di `index.html`: `<head>` con meta base, `<header>` con navigazione, tutte le `<section>` vuote con ID corretti, e `<footer>`. È la struttura portante su cui si appoggiano tutti gli step successivi.

### Attività

1. **`<head>`** – Compilare con i meta tag base (quelli SEO completi arriveranno allo STEP 20):
   ```html
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>A Due Passi Da – B&B Corato, Puglia</title>
   <link rel="stylesheet" href="css/style.css">
   <link rel="stylesheet" href="css/responsive.css">
   <!-- Google Fonts e Font Awesome (da STEP 04) -->
   ```

2. **`<header id="site-header">`** – Struttura HTML:
   ```html
   <header id="site-header">
     <div class="container header-inner">
       <a href="#hero" class="logo">A Due Passi Da</a>
       <nav id="main-nav">
         <ul class="nav-links">
           <li><a href="#struttura">La Struttura</a></li>
           <li><a href="#camere">Camere</a></li>
           <li><a href="#servizi">Servizi</a></li>
           <li><a href="#posizione">Dove Siamo</a></li>
           <li><a href="#attrazioni">Dintorni</a></li>
           <li><a href="#recensioni">Recensioni</a></li>
           <li><a href="#preventivo" class="btn btn-primary">Preventivo</a></li>
         </ul>
         <div class="lang-toggle">
           <a href="index.html" class="active" aria-label="Versione italiana">IT</a>
           <span>|</span>
           <a href="index-en.html" aria-label="English version">EN</a>
         </div>
         <button class="hamburger" id="hamburger-btn" aria-label="Apri menu" aria-expanded="false">
           <span></span><span></span><span></span>
         </button>
       </div>
     </div>
   </header>
   ```

3. **`<main>`** – Inserire tutte le sezioni vuote con ID e commento:
   ```html
   <main>
     <section id="hero"><!-- STEP 07 --></section>
     <section id="struttura"><!-- STEP 08 --></section>
     <section id="camere"><!-- STEP 08 --></section>
     <section id="galleria"><!-- STEP 10 --></section>
     <section id="servizi"><!-- STEP 11 --></section>
     <section id="posizione"><!-- STEP 12 --></section>
     <section id="attrazioni"><!-- STEP 13 --></section>
     <section id="recensioni"><!-- STEP 14 --></section>
     <section id="preventivo"><!-- STEP 15 --></section>
     <section id="contatti"><!-- STEP 17 --></section>
     <section id="faq"><!-- STEP 18 --></section>
   </main>
   ```

4. **`<footer id="site-footer">`** – Struttura HTML completa:
   ```html
   <footer id="site-footer">
     <div class="container footer-inner">
       <div class="footer-brand">
         <span class="footer-name">A Due Passi Da</span>
         <p>Via Duomo, 81 – 70033 Corato (BA)</p>
       </div>
       <div class="footer-contacts">
         <a href="mailto:EMAIL_GESTORE"><i class="fa-solid fa-envelope"></i> EMAIL_GESTORE</a>
         <a href="tel:+39XXXXXXXXXX"><i class="fa-solid fa-phone"></i> +39 XXX XXX XXXX</a>
       </div>
       <nav class="footer-nav">
         <a href="#struttura">Struttura</a>
         <a href="#servizi">Servizi</a>
         <a href="#preventivo">Preventivo</a>
         <a href="#contatti">Contatti</a>
         <a href="privacy-policy.html">Privacy Policy</a>
       </nav>
       <p class="footer-copy">© 2026 A Due Passi Da. Tutti i diritti riservati.</p>
     </div>
   </footer>
   ```

5. **CSS Header e Footer** – In `style.css` aggiungere gli stili per:
   - `#site-header`: `position: sticky; top: 0; z-index: 1000; background: var(--color-surface); border-bottom: 1px solid var(--color-border);`
   - `.header-inner`: flexbox, space-between, align-items center
   - `.nav-links`: flexbox, gap, display none su mobile (gestito STEP 06)
   - `.footer-inner`: grid o flexbox multi-colonna, padding, border-top
   - `.footer-copy`: testo piccolo, centrato, color-text-light

6. Aggiungere `<script src="js/main.js" defer></script>` prima di `</body>`

### Dettagli Tecnici
- Sostituire `EMAIL_GESTORE` e `+39XXXXXXXXXX` con i dati reali prima della pubblicazione
- Il `logo` è testuale (SVG o testo puro) per ora; il file `assets/logo.svg` arriverà dopo
- Gli anchor link nell'header usano smooth scroll già attivato dal CSS (`scroll-behavior: smooth` nello STEP 04)
- L'header sticky usa `scroll-behavior` CSS, non JS (JS serve solo per aggiungere shadow allo scroll, STEP 06)

### ✅ Definition of Done

**Checklist:**
- [ ] `<head>` completo con charset, viewport, title, link CSS
- [ ] Header con logo, lista link di navigazione, toggle IT/EN e pulsante hamburger presenti nel DOM
- [ ] Tutte le 11 sezioni `<section>` con ID corretti presenti nel `<main>` (anche se vuote)
- [ ] Footer con indirizzo, contatti, link navigazione e copyright presenti
- [ ] `main.js` collegato con attributo `defer` prima di `</body>`
- [ ] Aprendo in browser: header visibile in cima, footer visibile in fondo, nessun errore console
- [ ] I link di navigazione nell'header portano correttamente alle rispettive sezioni (smooth scroll)
- [ ] La struttura HTML valida (nessun tag non chiuso) – verificabile con [validator.w3.org](https://validator.w3.org)

**Criteri di accettazione:**
Lo scheletro HTML è completo e semanticamente corretto. Header e footer sono visivamente presenti e stilati. Tutti gli ID delle sezioni esistono e sono raggiungibili tramite anchor link.

---

## STEP 06 – Header Sticky e Menu Mobile

### Descrizione
Implementare i comportamenti JavaScript dell'header: shadow progressiva allo scroll, apertura/chiusura del menu hamburger su mobile, chiusura automatica del menu al click su un link.

### Attività

1. **In `js/main.js`** – Aggiungere le funzioni `initStickyHeader()` e `initMobileMenu()`:

   ```javascript
   // Sticky header: aggiunge shadow quando si scrolla
   function initStickyHeader() {
     const header = document.getElementById('site-header');
     window.addEventListener('scroll', () => {
       header.classList.toggle('scrolled', window.scrollY > 10);
     });
   }

   // Menu hamburger mobile
   function initMobileMenu() {
     const btn   = document.getElementById('hamburger-btn');
     const nav   = document.getElementById('main-nav');
     const links = nav.querySelectorAll('a');

     btn.addEventListener('click', () => {
       const isOpen = nav.classList.toggle('nav-open');
       btn.setAttribute('aria-expanded', isOpen);
       btn.classList.toggle('active', isOpen);
     });

     // Chiudi menu al click su un link
     links.forEach(link => {
       link.addEventListener('click', () => {
         nav.classList.remove('nav-open');
         btn.setAttribute('aria-expanded', 'false');
         btn.classList.remove('active');
       });
     });
   }

   document.addEventListener('DOMContentLoaded', () => {
     initStickyHeader();
     initMobileMenu();
   });
   ```

2. **In `css/style.css`** – Aggiungere gli stili per:
   ```css
   /* Shadow header allo scroll */
   #site-header.scrolled { box-shadow: var(--shadow-md); }

   /* Hamburger button */
   .hamburger { display: none; flex-direction: column; gap: 5px; padding: 4px; }
   .hamburger span { display: block; width: 24px; height: 2px; background: var(--color-text); transition: var(--transition-base); }
   /* Animazione X quando aperto */
   .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
   .hamburger.active span:nth-child(2) { opacity: 0; }
   .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
   ```

3. **In `css/responsive.css`** – Aggiungere le regole mobile per il menu:
   ```css
   @media (max-width: 767px) {
     .hamburger { display: flex; }
     #main-nav .nav-links {
       display: none;
       flex-direction: column;
       position: absolute;
       top: 100%;
       left: 0; right: 0;
       background: var(--color-surface);
       padding: var(--spacing-md);
       border-bottom: 1px solid var(--color-border);
       box-shadow: var(--shadow-md);
     }
     #main-nav.nav-open .nav-links { display: flex; }
   }
   ```

4. Testare manualmente su mobile (DevTools, viewport < 768px):
   - Hamburger visibile, nav links nascosti
   - Click hamburger → menu apre con animazione X
   - Click su link → menu si chiude
   - Scroll della pagina → shadow appare sull'header

### Dettagli Tecnici
- `position: absolute` del menu mobile assume che `#site-header` abbia `position: relative` (aggiungere se non presente)
- Il `z-index` del menu deve essere inferiore a quello dell'header (es. header z-index: 1000, menu z-index: 999) per evitare conflitti
- Il menu rimane sempre visibile su desktop (`@media (min-width: 768px)` con `.nav-links { display: flex }`)

### ✅ Definition of Done

**Checklist:**
- [ ] Scrollando la pagina oltre 10px, l'header acquisisce una shadow visibile
- [ ] Su viewport < 768px: l'hamburger è visibile, i link di navigazione sono nascosti
- [ ] Click sull'hamburger: il menu si apre (`.nav-links` diventa visibile)
- [ ] L'hamburger anima in una "X" quando il menu è aperto
- [ ] Click su un qualsiasi link del menu mobile: il menu si chiude
- [ ] Su viewport ≥ 768px: hamburger non visibile, nav links sempre visibili in orizzontale
- [ ] `aria-expanded` sull'hamburger si aggiorna correttamente (false → true → false)
- [ ] Nessun errore JS nella console

**Criteri di accettazione:**
L'header è interattivo su tutti i viewport. Il menu hamburger funziona correttamente su mobile con apertura, chiusura e animazione. Lo shadow dinamico è presente allo scroll.

---

## STEP 07 – Sezione Hero

### Descrizione
Implementare la sezione hero: immagine di sfondo a tutta larghezza, overlay semitrasparente, titolo del B&B, tagline e CTA "Richiedi Preventivo". Usa l'immagine placeholder finché non arrivano le foto reali (STEP 09).

### Attività

1. **Immagine placeholder temporanea** – Scaricare un'immagine da Unsplash (tema Puglia/paesaggio caldo) e salvarla in `images/hero/hero-placeholder.jpg`. Oppure usare un URL diretto come sfondo temporaneo.

2. **HTML** – Compilare la `<section id="hero">`:
   ```html
   <section id="hero">
     <div class="hero-overlay">
       <div class="hero-content">
         <p class="hero-pre-title">Benvenuti a Corato, Puglia</p>
         <h1 class="hero-title">A Due Passi Da</h1>
         <p class="hero-tagline">Il tuo appartamento privato nel cuore della Puglia</p>
         <div class="hero-badges">
           <span><i class="fa-solid fa-star"></i> 9.5 Posizione</span>
           <span><i class="fa-solid fa-users"></i> Fino a 10 ospiti</span>
           <span><i class="fa-solid fa-mug-hot"></i> Colazione inclusa</span>
         </div>
         <a href="#preventivo" class="btn btn-primary hero-cta">
           Richiedi Preventivo
           <i class="fa-solid fa-arrow-right"></i>
         </a>
       </div>
     </div>
   </section>
   ```

3. **CSS** – In `style.css`:
   ```css
   #hero {
     min-height: 100vh;
     background-image: url('../images/hero/hero-placeholder.jpg');
     background-size: cover;
     background-position: center;
     background-attachment: fixed; /* parallax leggero */
     position: relative;
   }
   .hero-overlay {
     position: absolute; inset: 0;
     background: rgba(0, 0, 0, 0.45);
     display: flex; align-items: center; justify-content: center;
   }
   .hero-content {
     text-align: center; color: #FFFFFF;
     max-width: 700px; padding: var(--spacing-lg);
   }
   .hero-pre-title { font-family: var(--font-body); letter-spacing: 3px; text-transform: uppercase; font-size: 0.85rem; opacity: 0.85; margin-bottom: var(--spacing-sm); }
   .hero-title { font-size: clamp(2.5rem, 6vw, 4.5rem); margin-bottom: var(--spacing-md); color: #FFFFFF; }
   .hero-tagline { font-size: 1.2rem; opacity: 0.9; margin-bottom: var(--spacing-lg); }
   .hero-badges { display: flex; gap: var(--spacing-md); justify-content: center; flex-wrap: wrap; margin-bottom: var(--spacing-xl); }
   .hero-badges span { background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); padding: 6px 14px; border-radius: 20px; font-size: 0.9rem; }
   .hero-cta { font-size: 1.1rem; padding: 14px 32px; display: inline-flex; align-items: center; gap: var(--spacing-sm); }
   ```

4. **CSS `btn-primary`** (se non già completo nello STEP 04):
   ```css
   .btn-primary { background-color: var(--color-primary); color: #FFFFFF; padding: 12px 28px; border-radius: var(--border-radius); transition: var(--transition-base); }
   .btn-primary:hover { background-color: #B05F3A; transform: translateY(-2px); box-shadow: var(--shadow-md); }
   ```

5. **Mobile responsive** – In `responsive.css`:
   ```css
   @media (max-width: 767px) {
     #hero { min-height: 70vh; background-attachment: scroll; /* fix iOS */ }
     .hero-title { font-size: 2.2rem; }
   }
   ```

### Dettagli Tecnici
- `background-attachment: fixed` crea effetto parallax ma va disabilitato su mobile (bug iOS)
- `clamp(2.5rem, 6vw, 4.5rem)` scala automaticamente il titolo tra viewport piccoli e grandi
- L'immagine hero sarà sostituita con una foto reale dopo lo STEP 09
- Il CTA "Richiedi Preventivo" punta a `#preventivo` con smooth scroll

### ✅ Definition of Done

**Checklist:**
- [ ] La sezione hero occupa almeno `100vh` su desktop
- [ ] L'immagine di sfondo placeholder è visibile e copre tutta la sezione (`cover`)
- [ ] L'overlay scuro semitrasparente è presente e il testo è leggibile
- [ ] Il titolo "A Due Passi Da" è visibile, in Playfair Display, colore bianco
- [ ] La tagline è visibile sotto il titolo
- [ ] I badge (posizione, ospiti, colazione) sono visibili
- [ ] Il bottone "Richiedi Preventivo" è visibile, cliccabile, e porta alla sezione `#preventivo` con scroll
- [ ] Su mobile (< 768px): la sezione è alta almeno `70vh`, il testo è leggibile, nessun overflow
- [ ] Nessun errore 404 per l'immagine (file presente in `images/hero/`)

**Criteri di accettazione:**
La sezione hero è visivamente impattante, il testo è leggibile, il CTA funziona. L'immagine di sfondo carica correttamente. Il layout è corretto sia su desktop che su mobile.

---

## STEP 08 – Sezione Struttura e Camere

### Descrizione
Implementare le sezioni che presentano l'appartamento B&B nella sua totalità e le 4 camere singolarmente, incluso l'avviso di accessibilità (no ascensore).

### Attività

1. **HTML sezione `#struttura`**:
   ```html
   <section id="struttura" class="section">
     <div class="container">
       <h2 class="section-title">La Struttura</h2>
       <p class="section-subtitle">Appartamento privato nel cuore di Corato</p>
       <div class="struttura-grid">
         <div class="struttura-info">
           <p>A Due Passi Da è un appartamento privato di 50 m² situato in Via Duomo, 81, nel centro storico di Corato (BA). Con 4 camere e una capacità di fino a 10 ospiti, è la scelta ideale per famiglie e gruppi che vogliono vivere la Puglia autentica con il comfort di una casa privata.</p>
           <ul class="struttura-highlights">
             <li><i class="fa-solid fa-check"></i> 50 m² · 4 camere · fino a 10 ospiti</li>
             <li><i class="fa-solid fa-check"></i> Ingresso indipendente e appartamento privato</li>
             <li><i class="fa-solid fa-check"></i> Insonorizzazione · Vista sulla città</li>
             <li><i class="fa-solid fa-check"></i> Punteggio posizione 9.5/10</li>
             <li><i class="fa-solid fa-check"></i> A 700 m dalla Stazione FS di Corato</li>
           </ul>
           <div class="accessibility-notice">
             <i class="fa-solid fa-triangle-exclamation"></i>
             <span>I piani superiori sono raggiungibili esclusivamente tramite scale. La struttura non dispone di ascensore.</span>
           </div>
         </div>
         <div class="struttura-image">
           <img src="images/struttura/struttura-1.jpg" alt="Esterno del B&B A Due Passi Da a Corato" width="600" height="400" loading="lazy">
         </div>
       </div>
     </div>
   </section>
   ```

2. **HTML sezione `#camere`**:
   ```html
   <section id="camere" class="section section-alt">
     <div class="container">
       <h2 class="section-title">Le Camere</h2>
       <p class="section-subtitle">4 camere per un totale di 10 ospiti</p>
       <div class="camere-grid">
         <!-- Ripetere per ciascuna delle 4 camere -->
         <div class="card camera-card">
           <img src="images/camere/camera-1.jpg" alt="Camera 1 – Matrimoniale" width="400" height="280" loading="lazy">
           <div class="card-body">
             <h3>Camera Matrimoniale</h3>
             <p>Letto matrimoniale, armadio, TV, vista sulla città. Aria condizionata.</p>
             <ul class="camera-features">
               <li><i class="fa-solid fa-bed"></i> Letto matrimoniale</li>
               <li><i class="fa-solid fa-snowflake"></i> Aria condizionata</li>
               <li><i class="fa-solid fa-tv"></i> TV schermo piatto</li>
             </ul>
           </div>
         </div>
         <!-- Camera 2, 3, 4... -->
       </div>
     </div>
   </section>
   ```
   > Creare 4 card. Le tipologie esatte delle camere (matrimoniale, singola, familiare, comunicante) andranno confermate dal gestore prima della pubblicazione. Per ora usare placeholder descrittivi.

3. **CSS** – In `style.css`:
   - `.struttura-grid`: CSS Grid 2 colonne su desktop, 1 su mobile
   - `.struttura-highlights`: lista con icone check verdi
   - `.accessibility-notice`: box arancione/warning con bordo sinistro colorato
   - `.camere-grid`: CSS Grid `repeat(auto-fill, minmax(260px, 1fr))`
   - `.camera-card img`: height fissa `200px`, `object-fit: cover`
   - `.section-alt`: `background-color: var(--color-surface)` (alternanza sezioni)

### Dettagli Tecnici
- Le immagini in `images/camere/` e `images/struttura/` sono ancora placeholder (file vuoti o immagini di test)
- Le foto reali sostituiranno i placeholder dopo lo STEP 09
- Il gestore deve confermare i nomi e le caratteristiche delle 4 camere prima della pubblicazione finale

### ✅ Definition of Done

**Checklist:**
- [ ] Sezione `#struttura` visibile con: testo descrittivo, lista highlights con icone, avviso accessibilità
- [ ] L'avviso "no ascensore" è visivamente distinto (box colorato/warning)
- [ ] Sezione `#camere` visibile con 4 card, una per camera
- [ ] Ogni card camera ha: immagine placeholder, titolo, descrizione, lista features con icone
- [ ] Layout a griglia funziona: 2+ colonne su desktop, 1 colonna su mobile
- [ ] Attributi `alt`, `width`, `height`, `loading="lazy"` presenti su tutte le immagini
- [ ] Nessun errore 404 per le immagini (i file placeholder esistono)

**Criteri di accettazione:**
Le sezioni struttura e camere sono visivamente complete con tutti i contenuti testuali reali. Le card camere sono presentate in griglia responsiva. L'avviso accessibilità è ben visibile.

---

## STEP 09 – Raccolta e Ottimizzazione Immagini

### Descrizione
Raccogliere le immagini dei luoghi d'interesse da fonti libere (Wikimedia Commons, Unsplash), ottimizzarle nelle dimensioni corrette e posizionarle nelle cartelle del progetto. Per le foto della struttura, preparare placeholder definitivi di buona qualità.

### Attività

1. **Immagini luoghi** – Scaricare da Wikimedia Commons o Unsplash (licenza CC0 / Unsplash License):

   | File destinazione | Soggetto | Fonte consigliata |
   |---|---|---|
   | `images/luoghi/castel-del-monte.jpg` | Castel del Monte, Andria | Wikimedia Commons (dominio pubblico) |
   | `images/luoghi/trani-cattedrale.jpg` | Cattedrale di Trani sul mare | Wikimedia Commons |
   | `images/luoghi/bari-san-nicola.jpg` | Basilica San Nicola, Bari | Wikimedia Commons |
   | `images/luoghi/altamura.jpg` | Centro storico Altamura | Wikimedia Commons |
   | `images/luoghi/matera-sassi.jpg` | Sassi di Matera | Unsplash (query: "Matera") |
   | `images/luoghi/alberobello-trulli.jpg` | Trulli, Alberobello | Wikimedia Commons |
   | `images/luoghi/corato-centro.jpg` | Centro storico Corato | Wikimedia Commons |

2. **Immagine hero definitiva placeholder** – Scaricare da Unsplash (query: "Puglia landscape", "Bari", "Italian courtyard") in alta risoluzione

3. **Immagini struttura placeholder** – Se non disponibili foto reali, usare immagini Unsplash di interni appartamenti caldi/mediterranei

4. **Ottimizzazione dimensioni** – Ridimensionare ogni immagine alle specifiche di `requirements.md` §9.1:

   | Cartella | Dimensione target | Peso max |
   |---|---|---|
   | `images/hero/` | 1920×1080px | 300 KB |
   | `images/struttura/` | 1200×800px | 200 KB |
   | `images/camere/` | 600×400px | 80 KB |
   | `images/luoghi/` | 800×530px | 100 KB |

   Strumenti gratuiti per ottimizzare: [Squoosh.app](https://squoosh.app) (browser), [TinyJPEG](https://tinyjpeg.com), o ImageMagick da terminale:
   ```bash
   # Esempio con ImageMagick (se installato)
   convert input.jpg -resize 800x530^ -gravity center -extent 800x530 -quality 82 output.jpg
   ```

5. **Verifica licenze** – Per ogni immagine scaricata, annotare la fonte e la licenza in un file `images/CREDITS.md`:
   ```markdown
   # Crediti Immagini
   - castel-del-monte.jpg: Wikimedia Commons, autore X, licenza CC BY-SA 4.0
   - matera-sassi.jpg: Unsplash, photographer Y, Unsplash License
   ```

6. **Immagine OG** – Creare/salvare `assets/og-image.jpg` (1200×630px) – usare una delle foto hero

7. Fare commit di tutte le immagini:
   ```bash
   git add images/ assets/og-image.jpg images/CREDITS.md
   git commit -m "assets: add placeholder and location images"
   git push origin main
   ```

### Dettagli Tecnici
- Le foto della struttura reale saranno fornite dal gestore in un secondo momento e sostituiranno i placeholder
- Le immagini WebP sono preferibili ma JPEG è accettabile per compatibilità massima
- Attributo `loading="lazy"` già aggiunto negli STEP 07-08; le nuove immagini di questo step beneficeranno automaticamente del lazy load

### ✅ Definition of Done

**Checklist:**
- [ ] Immagine hero presente in `images/hero/hero-placeholder.jpg` (≤ 300 KB)
- [ ] 2 immagini struttura in `images/struttura/` (≤ 200 KB ciascuna)
- [ ] 4 immagini camere in `images/camere/` (≤ 80 KB ciascuna)
- [ ] 7 immagini luoghi in `images/luoghi/` con nomi corretti (≤ 100 KB ciascuna)
- [ ] `assets/og-image.jpg` presente (1200×630px, ≤ 200 KB)
- [ ] File `images/CREDITS.md` con fonte e licenza di ogni immagine scaricata
- [ ] Tutte le immagini si aprono correttamente in browser (nessun file corrotto)
- [ ] Nessuna immagine supera il peso massimo definito
- [ ] Licenze verificate: nessun copyright violato

**Criteri di accettazione:**
Tutte le immagini necessarie sono presenti nelle cartelle corrette, ottimizzate nelle dimensioni/peso, con licenze verificate e documentate.

---

## STEP 10 – Galleria Fotografica con Lightbox

### Descrizione
Implementare la sezione galleria con griglia di thumbnail cliccabili. Al click si apre un lightbox fullscreen con navigazione prev/next e chiusura via ESC o click sfondo. Nessuna libreria esterna: tutto in JS e CSS puri.

### Attività

1. **HTML** – In `<section id="galleria">`:
   ```html
   <section id="galleria" class="section">
     <div class="container">
       <h2 class="section-title">Galleria</h2>
       <div class="gallery-grid" id="gallery-grid">
         <img class="gallery-thumb" src="images/struttura/struttura-1.jpg" alt="Struttura esterna" data-full="images/struttura/struttura-1.jpg" data-caption="Esterno della struttura">
         <!-- tutte le immagini struttura, camere, spazi esterni -->
       </div>
     </div>
   </section>

   <!-- Lightbox (fuori dal container, a livello body) -->
   <div id="lightbox" class="lightbox" role="dialog" aria-modal="true" aria-label="Galleria immagini" hidden>
     <button class="lightbox-close" aria-label="Chiudi"><i class="fa-solid fa-xmark"></i></button>
     <button class="lightbox-prev" aria-label="Immagine precedente"><i class="fa-solid fa-chevron-left"></i></button>
     <button class="lightbox-next" aria-label="Immagine successiva"><i class="fa-solid fa-chevron-right"></i></button>
     <figure class="lightbox-figure">
       <img id="lightbox-img" src="" alt="">
       <figcaption id="lightbox-caption"></figcaption>
     </figure>
   </div>
   ```

2. **JS in `gallery.js`**:
   ```javascript
   export function initGallery() {
     const thumbs   = document.querySelectorAll('.gallery-thumb');
     const lightbox = document.getElementById('lightbox');
     const lbImg    = document.getElementById('lightbox-img');
     const lbCap    = document.getElementById('lightbox-caption');
     const btnClose = lightbox.querySelector('.lightbox-close');
     const btnPrev  = lightbox.querySelector('.lightbox-prev');
     const btnNext  = lightbox.querySelector('.lightbox-next');
     let current = 0;

     function openAt(index) {
       current = index;
       lbImg.src = thumbs[index].dataset.full;
       lbImg.alt = thumbs[index].alt;
       lbCap.textContent = thumbs[index].dataset.caption || '';
       lightbox.hidden = false;
       document.body.style.overflow = 'hidden';
     }

     function close() {
       lightbox.hidden = true;
       document.body.style.overflow = '';
     }

     thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => openAt(i)));
     btnClose.addEventListener('click', close);
     lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
     btnPrev.addEventListener('click', () => openAt((current - 1 + thumbs.length) % thumbs.length));
     btnNext.addEventListener('click', () => openAt((current + 1) % thumbs.length));
     document.addEventListener('keydown', e => {
       if (lightbox.hidden) return;
       if (e.key === 'Escape')     close();
       if (e.key === 'ArrowLeft')  btnPrev.click();
       if (e.key === 'ArrowRight') btnNext.click();
     });
   }
   ```

3. **CSS** per galleria e lightbox:
   ```css
   .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--spacing-sm); }
   .gallery-thumb { width: 100%; height: 180px; object-fit: cover; border-radius: var(--border-radius); cursor: pointer; transition: var(--transition-base); }
   .gallery-thumb:hover { transform: scale(1.03); box-shadow: var(--shadow-md); }

   .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 2000; display: flex; align-items: center; justify-content: center; }
   .lightbox[hidden] { display: none; }
   .lightbox-figure { max-width: 90vw; max-height: 90vh; text-align: center; }
   .lightbox-figure img { max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: var(--border-radius); }
   figcaption { color: rgba(255,255,255,0.75); margin-top: var(--spacing-sm); font-size: 0.9rem; }
   .lightbox-close, .lightbox-prev, .lightbox-next { position: fixed; color: white; font-size: 1.5rem; padding: var(--spacing-md); background: rgba(255,255,255,0.1); border-radius: 50%; transition: var(--transition-fast); }
   .lightbox-close { top: var(--spacing-md); right: var(--spacing-md); }
   .lightbox-prev  { left: var(--spacing-md); top: 50%; transform: translateY(-50%); }
   .lightbox-next  { right: var(--spacing-md); top: 50%; transform: translateY(-50%); }
   .lightbox-close:hover, .lightbox-prev:hover, .lightbox-next:hover { background: rgba(255,255,255,0.25); }
   ```

4. In `main.js`, aggiungere chiamata `initGallery()` nel `DOMContentLoaded`

### ✅ Definition of Done

**Checklist:**
- [ ] La griglia galleria mostra le thumbnail in layout a griglia (3+ colonne su desktop)
- [ ] Hover sulle thumbnail: effetto zoom e shadow
- [ ] Click su thumbnail: lightbox si apre con immagine a piena dimensione
- [ ] Il lightbox mostra la caption sotto l'immagine
- [ ] Tasto ESC chiude il lightbox
- [ ] Click sullo sfondo scuro chiude il lightbox
- [ ] Pulsanti prev/next funzionano e la navigazione è ciclica (last → first e viceversa)
- [ ] Tasti freccia ← → della tastiera navigano le immagini
- [ ] Con lightbox aperto, lo scroll della pagina è bloccato (`overflow: hidden`)
- [ ] Attributi ARIA presenti sul lightbox (`role="dialog"`, `aria-modal`, `aria-label`)

**Criteri di accettazione:**
La galleria è completamente funzionante: visualizzazione a griglia, apertura lightbox, navigazione prev/next con tastiera e mouse, chiusura. Tutto implementato senza librerie esterne.

---

## STEP 11 – Sezione Servizi

### Descrizione
Implementare la sezione servizi con griglia di icone divise per categoria, badge "Incluso" / "A pagamento", e visualizzazione chiara di tutti i servizi del B&B estratti da Booking.

### Attività

1. **Dati servizi** – Definire in `js/main.js` (o in un blocco `<script>` inline) la struttura dati:
   ```javascript
   const SERVICES = [
     // Connettività
     { icon: 'fa-wifi',             label: 'Wi-Fi 135 Mbps',          category: 'Connettività',  included: true  },
     // Comfort
     { icon: 'fa-snowflake',        label: 'Aria condizionata',        category: 'Comfort',       included: true  },
     { icon: 'fa-temperature-half', label: 'Riscaldamento',            category: 'Comfort',       included: true  },
     { icon: 'fa-volume-xmark',     label: 'Insonorizzazione',         category: 'Comfort',       included: true  },
     // Cucina
     { icon: 'fa-mug-hot',          label: 'Colazione italiana',       category: 'Cucina',        included: true  },
     { icon: 'fa-kitchen-set',      label: 'Cucina attrezzata',        category: 'Cucina',        included: true  },
     { icon: 'fa-shirt',            label: 'Lavatrice',                category: 'Cucina',        included: true  },
     // Bagno
     { icon: 'fa-shower',           label: 'Bagno privato',            category: 'Bagno',         included: true  },
     { icon: 'fa-pump-soap',        label: 'Prodotti da bagno',        category: 'Bagno',         included: true  },
     { icon: 'fa-wind',             label: 'Asciugacapelli',           category: 'Bagno',         included: true  },
     // Spazi esterni
     { icon: 'fa-sun',              label: 'Terrazza solarium',        category: 'Spazi',         included: true  },
     { icon: 'fa-chair',            label: 'Patio esterno',            category: 'Spazi',         included: true  },
     // Famiglia
     { icon: 'fa-baby',             label: 'Seggiolone',               category: 'Famiglia',      included: true  },
     { icon: 'fa-baby-carriage',    label: 'Passeggino disponibile',   category: 'Famiglia',      included: true  },
     // Mobilità
     { icon: 'fa-car',              label: 'Parcheggio (€20/gg)',      category: 'Mobilità',      included: false },
     { icon: 'fa-plane',            label: 'Navetta aeroporto',        category: 'Mobilità',      included: false },
     { icon: 'fa-bicycle',          label: 'Noleggio biciclette',      category: 'Mobilità',      included: false },
     // Flessibilità
     { icon: 'fa-clock',            label: 'Check-in flessibile',      category: 'Flessibilità',  included: true  },
     { icon: 'fa-file-invoice',     label: 'Fattura su richiesta',     category: 'Flessibilità',  included: true  },
     // Sicurezza
     { icon: 'fa-fire-extinguisher',label: 'Estintori',                category: 'Sicurezza',     included: true  },
     { icon: 'fa-shield-halved',    label: 'Rilevatore CO',            category: 'Sicurezza',     included: true  },
     { icon: 'fa-key',              label: 'Accesso con chiavi',       category: 'Sicurezza',     included: true  },
   ];
   ```

2. **Rendering dinamico** – In `main.js`, funzione che genera le card HTML dai dati:
   ```javascript
   function renderServices() {
     const grid = document.getElementById('services-grid');
     if (!grid) return;
     grid.innerHTML = SERVICES.map(s => `
       <div class="service-item">
         <i class="fa-solid ${s.icon} service-icon"></i>
         <span class="service-label">${s.label}</span>
         <span class="badge ${s.included ? 'badge-included' : 'badge-paid'}">
           ${s.included ? 'Incluso' : 'A pagamento'}
         </span>
       </div>
     `).join('');
   }
   ```

3. **HTML** – In `<section id="servizi">`:
   ```html
   <section id="servizi" class="section">
     <div class="container">
       <h2 class="section-title">I Nostri Servizi</h2>
       <p class="section-subtitle">Tutto quello che ti serve per un soggiorno perfetto</p>
       <div class="services-grid" id="services-grid"></div>
       <p class="services-note"><i class="fa-solid fa-circle-info"></i> I servizi contrassegnati come "A pagamento" sono disponibili su richiesta a costi aggiuntivi.</p>
     </div>
   </section>
   ```

4. **CSS**:
   ```css
   .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: var(--spacing-md); margin: var(--spacing-xl) 0; }
   .service-item { display: flex; flex-direction: column; align-items: center; text-align: center; padding: var(--spacing-lg) var(--spacing-md); background: var(--color-surface); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border); gap: var(--spacing-sm); transition: var(--transition-base); }
   .service-item:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
   .service-icon { font-size: 1.8rem; color: var(--color-primary); }
   .service-label { font-size: 0.9rem; font-weight: 700; color: var(--color-text); }
   .badge { font-size: 0.72rem; padding: 3px 10px; border-radius: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
   .badge-included { background: #D4EDDA; color: #155724; }
   .badge-paid     { background: #F8F0DC; color: #856404; }
   ```

### ✅ Definition of Done

**Checklist:**
- [ ] Tutti i servizi definiti nell'array `SERVICES` sono visualizzati nella griglia
- [ ] Ogni servizio mostra: icona Font Awesome, etichetta, badge incluso/a pagamento
- [ ] Badge verdi per servizi inclusi, badge gialli per servizi a pagamento
- [ ] La griglia si adatta responsivamente (5+ colonne desktop, 2-3 tablet, 2 mobile)
- [ ] Hover su ogni card: effetto elevazione visibile
- [ ] Nota informativa sui servizi a pagamento presente sotto la griglia
- [ ] Nessun errore JS nella console (icone Font Awesome caricate)

**Criteri di accettazione:**
Tutti i servizi reali del B&B sono visualizzati con chiarezza, con distinzione visiva tra inclusi e a pagamento. La griglia è responsiva e le icone si caricano correttamente.

---

## STEP 12 – Sezione Posizione e Mappa Leaflet

### Descrizione
Implementare la sezione "Dove Siamo" con mappa interattiva Leaflet.js + OpenStreetMap, marker con popup, e indicazioni testuali per raggiungere la struttura. La mappa viene inizializzata solo quando diventa visibile (IntersectionObserver).

### Attività

1. **CDN Leaflet** – Nel `<head>` di `index.html`:
   ```html
   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
   <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" defer></script>
   ```

2. **HTML** – In `<section id="posizione">`:
   ```html
   <section id="posizione" class="section section-alt">
     <div class="container">
       <h2 class="section-title">Dove Siamo</h2>
       <div class="posizione-grid">
         <div class="posizione-info">
           <address class="posizione-address">
             <i class="fa-solid fa-location-dot"></i>
             <strong>A Due Passi Da</strong><br>
             Via Duomo, 81<br>70033 Corato (BA), Puglia
           </address>
           <ul class="posizione-list">
             <li><i class="fa-solid fa-train"></i> <strong>700 m</strong> dalla Stazione FS di Corato</li>
             <li><i class="fa-solid fa-plane"></i> <strong>42 km</strong> dall'Aeroporto di Bari (navetta disponibile)</li>
             <li><i class="fa-solid fa-car"></i> Uscita A14 Corato-Ruvo di Puglia + SP231</li>
             <li><i class="fa-solid fa-star"></i> Punteggio posizione <strong>9.5/10</strong></li>
           </ul>
           <div class="posizione-parking">
             <i class="fa-solid fa-square-parking"></i>
             <span>Parcheggio privato disponibile su prenotazione (€20/giorno)</span>
           </div>
         </div>
         <div id="map-container" style="height: 380px; border-radius: var(--border-radius-lg);"></div>
       </div>
     </div>
   </section>
   ```

3. **JS in `map.js`** – Con inizializzazione lazy via IntersectionObserver:
   ```javascript
   export function initMap() {
     const mapEl = document.getElementById('map-container');
     if (!mapEl) return;

     const BB_COORDS = [41.1524, 16.4176]; // ⚠️ DA VERIFICARE con gestore
     let mapInitialized = false;

     const observer = new IntersectionObserver((entries) => {
       if (entries[0].isIntersecting && !mapInitialized) {
         mapInitialized = true;
         observer.disconnect();

         const map = L.map('map-container', { scrollWheelZoom: false }).setView(BB_COORDS, 16);

         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
           maxZoom: 19
         }).addTo(map);

         const customIcon = L.divIcon({
           html: '<i class="fa-solid fa-house-chimney" style="font-size:28px;color:#C8724A;"></i>',
           className: '',
           iconSize: [30, 30],
           iconAnchor: [15, 30]
         });

         L.marker(BB_COORDS, { icon: customIcon })
           .addTo(map)
           .bindPopup('<strong>A Due Passi Da</strong><br>Via Duomo, 81 – Corato (BA)<br><a href="https://share.google/NTKoIOnzQw9XD2mrI" target="_blank">Apri in Google Maps</a>')
           .openPopup();
       }
     }, { threshold: 0.1 });

     observer.observe(mapEl);
   }
   ```

4. **CSS**:
   ```css
   .posizione-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-xl); align-items: start; }
   .posizione-list li { display: flex; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-sm) 0; border-bottom: 1px solid var(--color-border); }
   .posizione-list .fa-solid { color: var(--color-primary); width: 20px; }
   .posizione-parking { margin-top: var(--spacing-md); padding: var(--spacing-md); background: var(--color-accent); border-radius: var(--border-radius); display: flex; gap: var(--spacing-sm); align-items: center; }
   @media (max-width: 767px) { .posizione-grid { grid-template-columns: 1fr; } #map-container { height: 280px !important; } }
   ```

5. Aggiungere `initMap()` al `DOMContentLoaded` in `main.js`

> ⚠️ **Nota critica:** Le coordinate `[41.1524, 16.4176]` sono approssimative per Corato (BA). Prima della pubblicazione finale, il gestore deve fornire le coordinate precise (clic su Google Maps → "Cosa c'è qui?" mostra lat/lng esatte).

### ✅ Definition of Done

**Checklist:**
- [ ] La mappa non si carica finché la sezione non è visibile (scroll test: aprire DevTools → Network, verificare che le tile OSM non vengano scaricate fino al raggiungimento della sezione)
- [ ] La mappa si carica correttamente quando la sezione diventa visibile
- [ ] Il tile layer OpenStreetMap è visibile (mappa geografica di Corato)
- [ ] Il marker personalizzato (icona casa arancione) è posizionato su Via Duomo, Corato
- [ ] Click sul marker: popup con nome, indirizzo e link "Apri in Google Maps"
- [ ] Lo scroll con rotella sul mouse NON muove la mappa (UX: evita scroll hijack)
- [ ] Le indicazioni testuali (stazione, aeroporto, autostrada) sono presenti e corrette
- [ ] Layout 2 colonne su desktop, 1 colonna su mobile
- [ ] Nessun errore console (Leaflet caricato, mappa inizializzata)
- [ ] Attributo `href` del link Google Maps punta all'URL corretto del gestore

**Criteri di accettazione:**
La mappa è interattiva, mostra la posizione corretta del B&B con marker personalizzato e popup. Il caricamento lazy funziona. Le indicazioni testuali per raggiungere la struttura sono complete e accurate.

---

## STEP 13 – Sezione Attrazioni con Filtri Categoria

### Descrizione
Implementare la sezione "Dintorni" con card per ogni luogo d'interesse e un sistema di filtro per categoria. I filtri mostrano/nascondono le card dinamicamente senza reload.

### Attività

1. **Dati attrazioni** – Array in `main.js`:
   ```javascript
   const ATTRACTIONS = [
     { name: 'Castel del Monte', distance: '~30 km', category: 'cultura', img: 'images/luoghi/castel-del-monte.jpg', desc: 'Patrimonio UNESCO, capolavoro dell\'architettura medievale sveva.' },
     { name: 'Trani', distance: '~25 km', category: 'cultura', img: 'images/luoghi/trani-cattedrale.jpg', desc: 'La cattedrale romanica a strapiombo sul mare Adriatico.' },
     { name: 'Bari', distance: '~45 km', category: 'cultura', img: 'images/luoghi/bari-san-nicola.jpg', desc: 'Basilica di San Nicola, lungomare e il cuore della Puglia.' },
     { name: 'Altamura', distance: '~35 km', category: 'enogastronomia', img: 'images/luoghi/altamura.jpg', desc: 'Pane DOP famoso nel mondo e cattedrale medievale.' },
     { name: 'Matera', distance: '~80 km', category: 'cultura', img: 'images/luoghi/matera-sassi.jpg', desc: 'I Sassi, Capitale Europea della Cultura, Patrimonio UNESCO.' },
     { name: 'Alberobello', distance: '~70 km', category: 'cultura', img: 'images/luoghi/alberobello-trulli.jpg', desc: 'I trulli simbolo della Valle d\'Itria, Patrimonio UNESCO.' },
     { name: 'Centro Corato', distance: 'A piedi', category: 'cultura', img: 'images/luoghi/corato-centro.jpg', desc: 'Il centro storico, la cattedrale e le tradizioni locali.' },
   ];
   ```

2. **Rendering e filtri** – Funzione JS in `main.js`:
   ```javascript
   function initAttractions() {
     const grid    = document.getElementById('attrazioni-grid');
     const filters = document.querySelectorAll('[data-filter]');
     if (!grid) return;

     function render(category = 'tutti') {
       const filtered = category === 'tutti' ? ATTRACTIONS : ATTRACTIONS.filter(a => a.category === category);
       grid.innerHTML = filtered.map(a => `
         <div class="card attraction-card" data-category="${a.category}">
           <img src="${a.img}" alt="${a.name}" width="400" height="260" loading="lazy">
           <div class="card-body">
             <span class="attraction-distance"><i class="fa-solid fa-location-dot"></i> ${a.distance}</span>
             <h3>${a.name}</h3>
             <p>${a.desc}</p>
           </div>
         </div>
       `).join('');
     }

     filters.forEach(btn => {
       btn.addEventListener('click', () => {
         filters.forEach(b => b.classList.remove('active'));
         btn.classList.add('active');
         render(btn.dataset.filter);
       });
     });

     render(); // render iniziale: tutti
   }
   ```

3. **HTML** – In `<section id="attrazioni">`:
   ```html
   <section id="attrazioni" class="section">
     <div class="container">
       <h2 class="section-title">Dintorni e Attrazioni</h2>
       <div class="filter-tabs">
         <button class="filter-btn active" data-filter="tutti">Tutti</button>
         <button class="filter-btn" data-filter="cultura">Cultura & Storia</button>
         <button class="filter-btn" data-filter="enogastronomia">Enogastronomia</button>
         <button class="filter-btn" data-filter="mare">Mare & Spiagge</button>
       </div>
       <div class="attractions-grid" id="attrazioni-grid"></div>
     </div>
   </section>
   ```

4. **CSS**:
   ```css
   .filter-tabs { display: flex; gap: var(--spacing-sm); flex-wrap: wrap; margin-bottom: var(--spacing-xl); }
   .filter-btn { padding: 8px 20px; border-radius: 20px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); transition: var(--transition-fast); font-family: var(--font-body); }
   .filter-btn:hover, .filter-btn.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
   .attractions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--spacing-lg); }
   .attraction-card img { width: 100%; height: 200px; object-fit: cover; border-radius: var(--border-radius) var(--border-radius) 0 0; }
   .attraction-distance { display: inline-block; font-size: 0.8rem; color: var(--color-primary); font-weight: 700; margin-bottom: var(--spacing-xs); }
   ```

### ✅ Definition of Done

**Checklist:**
- [ ] Tutte le 7 attrazioni sono visualizzate nel rendering iniziale
- [ ] I bottoni filtro categoria sono visibili e stilati
- [ ] Click su filtro "Cultura & Storia": mostra solo le card con `category: 'cultura'`
- [ ] Click su "Tutti": tutte le card sono visibili
- [ ] Il filtro attivo è evidenziato visivamente (bottone colorato)
- [ ] Ogni card ha: immagine, distanza, nome, descrizione
- [ ] Le immagini si caricano correttamente (lazy load)
- [ ] Layout a griglia responsiva

**Criteri di accettazione:**
Le attrazioni sono tutte presentate con foto e descrizione. Il sistema di filtro per categoria funziona correttamente senza reload della pagina.

---

## STEP 14 – Sezione Recensioni

### Descrizione
Implementare la sezione recensioni con slider/carousel di card. Le recensioni sono dati statici hardcoded in HTML, aggiornabili manualmente dal gestore.

### Attività

1. **HTML** – In `<section id="recensioni">`:
   ```html
   <section id="recensioni" class="section section-alt">
     <div class="container">
       <h2 class="section-title">Cosa Dicono i Nostri Ospiti</h2>
       <p class="section-subtitle">Basato su 69 recensioni verificate · Posizione 9.5/10</p>
       <div class="reviews-slider" id="reviews-slider">
         <div class="review-card">
           <div class="review-stars">★★★★★</div>
           <blockquote class="review-text">"Appartamento bellissimo, pulitissimo e accogliente. Posizione perfetta, a pochi passi dal centro. Torneremo sicuramente!"</blockquote>
           <footer class="review-footer">
             <span class="review-author">Maria R.</span>
             <span class="review-date">Luglio 2025</span>
             <span class="review-source">Booking.com</span>
           </footer>
         </div>
         <!-- Aggiungere 3-5 recensioni reali da Booking -->
       </div>
       <div class="reviews-nav">
         <button class="review-btn-prev" aria-label="Recensione precedente"><i class="fa-solid fa-chevron-left"></i></button>
         <div class="reviews-dots" id="reviews-dots"></div>
         <button class="review-btn-next" aria-label="Recensione successiva"><i class="fa-solid fa-chevron-right"></i></button>
       </div>
     </div>
   </section>
   ```

2. **CSS Slider** – Tecnica CSS scroll-snap:
   ```css
   .reviews-slider { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: var(--spacing-lg); padding-bottom: var(--spacing-md); scrollbar-width: none; }
   .reviews-slider::-webkit-scrollbar { display: none; }
   .review-card { flex: 0 0 min(420px, 90vw); scroll-snap-align: start; background: var(--color-surface); border-radius: var(--border-radius-lg); padding: var(--spacing-xl); border: 1px solid var(--color-border); box-shadow: var(--shadow-sm); }
   .review-stars { color: #F5A623; font-size: 1.3rem; margin-bottom: var(--spacing-sm); }
   .review-text { font-style: italic; color: var(--color-text); line-height: 1.7; margin-bottom: var(--spacing-md); }
   .review-footer { display: flex; gap: var(--spacing-sm); align-items: center; flex-wrap: wrap; }
   .review-author { font-weight: 700; }
   .review-source { font-size: 0.8rem; color: var(--color-text-light); margin-left: auto; }
   .reviews-nav { display: flex; align-items: center; justify-content: center; gap: var(--spacing-lg); margin-top: var(--spacing-lg); }
   ```

3. **JS** – Navigazione prev/next (scroll programmato):
   ```javascript
   function initReviews() {
     const slider  = document.getElementById('reviews-slider');
     const btnPrev = document.querySelector('.review-btn-prev');
     const btnNext = document.querySelector('.review-btn-next');
     if (!slider) return;
     const cardWidth = () => slider.querySelector('.review-card').offsetWidth + 32; // gap
     btnPrev.addEventListener('click', () => slider.scrollBy({ left: -cardWidth(), behavior: 'smooth' }));
     btnNext.addEventListener('click', () => slider.scrollBy({ left:  cardWidth(), behavior: 'smooth' }));
   }
   ```

4. Aggiungere almeno 4 recensioni placeholder credibili. Il gestore sostituirà con recensioni reali.

### ✅ Definition of Done

**Checklist:**
- [ ] Almeno 4 card recensioni visibili
- [ ] Ogni card ha: stelle, testo, nome autore, data, fonte (Booking.com)
- [ ] Lo slider è scorrevole orizzontalmente (touch su mobile, scroll su desktop)
- [ ] I pulsanti prev/next scrollano le card correttamente
- [ ] Il titolo sezione mostra la media e il numero recensioni (9.5/10 · 69 recensioni)
- [ ] Nessuna scrollbar visibile nello slider

**Criteri di accettazione:**
La sezione recensioni è visivamente curata. Lo slider è funzionante su mobile (touch) e desktop (click).

---

## STEP 15 – Form Richiesta Preventivo (HTML + Validazione JS)

### Descrizione
Costruire l'HTML del form preventivo e implementare tutta la logica di validazione lato client in `form.js`. La connessione a Formspree avviene nel STEP 16.

### Attività

1. **HTML** – In `<section id="preventivo">`:
   ```html
   <section id="preventivo" class="section">
     <div class="container">
       <h2 class="section-title">Richiedi un Preventivo</h2>
       <p class="section-subtitle">Prenota direttamente, senza commissioni</p>
       <div class="form-wrapper">
         <form id="quote-form" action="https://formspree.io/f/XXXXXXXX" method="POST" novalidate>
           <input type="hidden" name="_subject" value="Nuova richiesta preventivo – A Due Passi Da">
           <input type="hidden" name="_language" value="it">

           <div class="form-row">
             <div class="form-group">
               <label for="nome_cognome">Nome e Cognome <span aria-hidden="true">*</span></label>
               <input type="text" id="nome_cognome" name="nome_cognome" placeholder="Mario Rossi" autocomplete="name" required>
               <span class="form-error" id="err-nome" aria-live="polite"></span>
             </div>
             <div class="form-group">
               <label for="email">Email <span aria-hidden="true">*</span></label>
               <input type="email" id="email" name="email" placeholder="mario@esempio.it" autocomplete="email" required>
               <span class="form-error" id="err-email" aria-live="polite"></span>
             </div>
           </div>

           <div class="form-row">
             <div class="form-group">
               <label for="telefono">Telefono <span class="optional">(opzionale)</span></label>
               <input type="tel" id="telefono" name="telefono" placeholder="+39 333 123 4567" autocomplete="tel">
               <span class="form-error" id="err-telefono" aria-live="polite"></span>
             </div>
             <div class="form-group">
               <label for="num_ospiti">Numero di ospiti <span aria-hidden="true">*</span></label>
               <input type="number" id="num_ospiti" name="num_ospiti" min="1" max="10" placeholder="2" required>
               <span class="form-error" id="err-ospiti" aria-live="polite"></span>
             </div>
           </div>

           <div class="form-row">
             <div class="form-group">
               <label for="data_arrivo">Data di arrivo <span aria-hidden="true">*</span></label>
               <input type="date" id="data_arrivo" name="data_arrivo" required>
               <span class="form-error" id="err-arrivo" aria-live="polite"></span>
             </div>
             <div class="form-group">
               <label for="data_partenza">Data di partenza <span aria-hidden="true">*</span></label>
               <input type="date" id="data_partenza" name="data_partenza" required>
               <span class="form-error" id="err-partenza" aria-live="polite"></span>
             </div>
           </div>

           <div class="form-group">
             <label for="tipo_camera">Tipologia di sistemazione <span aria-hidden="true">*</span></label>
             <select id="tipo_camera" name="tipo_camera" required>
               <option value="">-- Seleziona --</option>
               <option value="intero_appartamento">Intero appartamento (fino a 10 persone)</option>
               <option value="camera_matrimoniale">Camera matrimoniale</option>
               <option value="camera_familiare">Camera familiare</option>
               <option value="camere_comunicanti">Camere comunicanti</option>
             </select>
             <span class="form-error" id="err-camera" aria-live="polite"></span>
           </div>

           <div class="form-group">
             <label for="note">Richieste speciali <span class="optional">(opzionale)</span></label>
             <textarea id="note" name="note" rows="4" maxlength="500" placeholder="Arrivo tardivo, allergie alimentari, esigenze particolari..."></textarea>
             <span class="form-counter" id="note-counter">0/500</span>
           </div>

           <div class="form-group form-group-checkbox">
             <label class="checkbox-label">
               <input type="checkbox" id="gdpr_consent" name="gdpr_consent" required>
               <span>Acconsento al trattamento dei miei dati personali per ricevere risposta alla mia richiesta, ai sensi del <a href="privacy-policy.html" target="_blank">Regolamento GDPR</a>. <span aria-hidden="true">*</span></span>
             </label>
             <span class="form-error" id="err-gdpr" aria-live="polite"></span>
           </div>

           <button type="submit" class="btn btn-primary form-submit" id="form-submit-btn">
             <span class="btn-text">Invia Richiesta</span>
             <span class="btn-spinner" hidden><i class="fa-solid fa-spinner fa-spin"></i></span>
           </button>
         </form>

         <div id="form-success" class="form-success" hidden>
           <i class="fa-solid fa-circle-check"></i>
           <h3>Richiesta inviata!</h3>
           <p>Grazie! Ti risponderemo entro 24 ore all'indirizzo email fornito.</p>
           <p class="form-success-wa">Preferisci WhatsApp? <a id="wa-link" href="#" target="_blank">Contattaci direttamente <i class="fa-brands fa-whatsapp"></i></a></p>
         </div>
       </div>
     </div>
   </section>
   ```

2. **JS in `form.js`** – Validazione completa:
   ```javascript
   export function initForm() {
     const form      = document.getElementById('quote-form');
     const submitBtn = document.getElementById('form-submit-btn');
     const success   = document.getElementById('form-success');
     const noteEl    = document.getElementById('note');
     const waLink    = document.getElementById('wa-link');
     if (!form) return;

     // Contatore caratteri textarea
     noteEl.addEventListener('input', () => {
       document.getElementById('note-counter').textContent = `${noteEl.value.length}/500`;
     });

     // Link WA dinamico
     const WA_NUMBER = '39XXXXXXXXXX'; // ← sostituire con numero reale
     const WA_TEXT   = encodeURIComponent('Ciao! Vorrei richiedere un preventivo per il B&B A Due Passi Da.');
     if (waLink) waLink.href = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

     // Validatori
     const validators = {
       nome_cognome: v => v.trim().length >= 2 ? null : 'Inserisci il tuo nome e cognome (min. 2 caratteri)',
       email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Inserisci un indirizzo email valido',
       telefono: v => !v || /^[\d\s+\-()]{9,}$/.test(v) ? null : 'Numero di telefono non valido',
       num_ospiti: v => (parseInt(v) >= 1 && parseInt(v) <= 10) ? null : 'Inserisci un numero tra 1 e 10',
       data_arrivo: (v, form) => {
         if (!v) return 'Seleziona la data di arrivo';
         const today = new Date().toISOString().split('T')[0];
         return v >= today ? null : 'La data di arrivo deve essere oggi o futura';
       },
       data_partenza: (v, form) => {
         const arrivo = form.querySelector('#data_arrivo').value;
         if (!v) return 'Seleziona la data di partenza';
         return v > arrivo ? null : 'La partenza deve essere dopo l\'arrivo';
       },
       tipo_camera: v => v ? null : 'Seleziona una tipologia di sistemazione',
       gdpr_consent: (v, form) => form.querySelector('#gdpr_consent').checked ? null : 'Il consenso è obbligatorio',
     };

     function validateField(name) {
       const el  = form.querySelector(`[name="${name}"]`);
       const err = document.getElementById(`err-${name === 'nome_cognome' ? 'nome' : name === 'num_ospiti' ? 'ospiti' : name === 'data_arrivo' ? 'arrivo' : name === 'data_partenza' ? 'partenza' : name === 'tipo_camera' ? 'camera' : name}`);
       if (!el || !err || !validators[name]) return true;
       const msg = validators[name](el.value, form);
       err.textContent = msg || '';
       el.classList.toggle('input-error', !!msg);
       return !msg;
     }

     form.addEventListener('submit', async (e) => {
       e.preventDefault();
       const fields = Object.keys(validators);
       const valid  = fields.map(f => validateField(f)).every(Boolean);
       if (!valid) return;

       // Stato loading
       submitBtn.querySelector('.btn-text').hidden   = true;
       submitBtn.querySelector('.btn-spinner').hidden = false;
       submitBtn.disabled = true;

       const formData = Object.fromEntries(new FormData(form).entries());
       // Submit avviene nel STEP 16
       console.log('Form valido, pronto per invio:', formData);
     });
   }
   ```

3. **CSS**:
   ```css
   .form-wrapper { max-width: 720px; margin: 0 auto; }
   .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); }
   .form-group { display: flex; flex-direction: column; gap: var(--spacing-xs); margin-bottom: var(--spacing-md); }
   label { font-weight: 700; font-size: 0.9rem; }
   input, select, textarea { padding: 10px 14px; border: 1px solid var(--color-border); border-radius: var(--border-radius); font-family: var(--font-body); font-size: 1rem; transition: border-color var(--transition-fast); background: var(--color-surface); }
   input:focus, select:focus, textarea:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(200,114,74,0.15); }
   input.input-error, select.input-error { border-color: #DC3545; }
   .form-error { color: #DC3545; font-size: 0.82rem; min-height: 1.2em; }
   .optional { font-weight: 400; color: var(--color-text-light); font-size: 0.85rem; }
   .form-counter { font-size: 0.8rem; color: var(--color-text-light); text-align: right; }
   .form-success { text-align: center; padding: var(--spacing-xxl); background: #D4EDDA; border-radius: var(--border-radius-lg); }
   .form-success .fa-circle-check { font-size: 3rem; color: #28A745; margin-bottom: var(--spacing-md); }
   @media (max-width: 767px) { .form-row { grid-template-columns: 1fr; } }
   ```

### ✅ Definition of Done

**Checklist:**
- [ ] Il form HTML è visibile con tutti i campi: nome, email, telefono, ospiti, date, tipologia, note, GDPR
- [ ] Submit senza dati: mostra messaggi di errore inline su ogni campo obbligatorio
- [ ] Campo email con formato errato: mostra errore appropriato
- [ ] Data partenza precedente all'arrivo: mostra errore su data partenza
- [ ] Numero ospiti > 10: mostra errore
- [ ] GDPR non spuntato: mostra errore
- [ ] Contatore caratteri textarea funziona (incrementa al digitare)
- [ ] Con form compilato correttamente: nessun errore visibile, bottone diventa "loading" (spinner)
- [ ] Il link WhatsApp nel messaggio di successo è costruito correttamente (URL `wa.me/...`)
- [ ] Attributi ARIA (`aria-live`, `aria-describedby`) presenti sui messaggi di errore
- [ ] Layout form responsivo (2 colonne → 1 colonna su mobile)
- [ ] Nessun errore JS nella console

**Criteri di accettazione:**
Il form è completo con tutti i campi richiesti. La validazione lato client è robusta e mostra messaggi di errore chiari e inline. Il link WhatsApp nel success message è correttamente configurato.

---

## STEP 16 – Integrazione Formspree

### Descrizione
Collegare il form al servizio Formspree, gestire la risposta asincrona, mostrare il messaggio di successo o l'errore, e testare l'invio reale.

### Attività

1. **Sostituire** `XXXXXXXX` nell'endpoint del form (attributo `action` in HTML e nella costante JS) con il valore reale ottenuto nello STEP 03

2. **In `form.js`** – Sostituire il `console.log` del STEP 15 con la chiamata fetch reale:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/XXXXXXXX'; // ← endpoint reale

   try {
     const response = await fetch(FORMSPREE_ENDPOINT, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
       body: JSON.stringify(formData)
     });

     if (response.ok) {
       form.hidden = true;
       success.hidden = false;
       success.scrollIntoView({ behavior: 'smooth', block: 'center' });
     } else {
       throw new Error(`HTTP ${response.status}`);
     }
   } catch (err) {
     console.error('Errore invio form:', err);
     const errGeneral = document.getElementById('form-general-error') || (() => {
       const el = document.createElement('p');
       el.id = 'form-general-error';
       el.className = 'form-error-general';
       el.textContent = 'Si è verificato un errore. Riprova o contattaci direttamente via email.';
       form.prepend(el);
       return el;
     })();
     errGeneral.hidden = false;
   } finally {
     submitBtn.querySelector('.btn-text').hidden   = false;
     submitBtn.querySelector('.btn-spinner').hidden = true;
     submitBtn.disabled = false;
   }
   ```

3. **Test end-to-end** con dati reali:
   - Compilare il form con dati di test
   - Cliccare "Invia Richiesta"
   - Verificare che il messaggio di successo appaia
   - Verificare che l'email arrivi nella casella del gestore
   - Verificare che l'oggetto dell'email sia "Nuova richiesta preventivo – A Due Passi Da"
   - Verificare che il Reply-To sia l'email inserita nel form (per risposta diretta)

4. **Test errore** – Temporaneamente modificare l'endpoint con un valore sbagliato, verificare che appaia il messaggio di errore generico, poi ripristinare

5. **CSS per errore generico**:
   ```css
   .form-error-general { background: #F8D7DA; border: 1px solid #F5C6CB; color: #721C24; padding: var(--spacing-md); border-radius: var(--border-radius); margin-bottom: var(--spacing-md); }
   ```

### ✅ Definition of Done

**Checklist:**
- [ ] L'endpoint Formspree reale è inserito nel codice (sia `action` HTML che costante JS)
- [ ] Invio form valido: la richiesta HTTP POST a Formspree va a buon fine (Network tab DevTools: status 200)
- [ ] Il form scompare e appare il messaggio di successo dopo l'invio
- [ ] L'email di test è ricevuta nella casella del gestore entro 1 minuto
- [ ] L'oggetto dell'email ricevuta è "Nuova richiesta preventivo – A Due Passi Da"
- [ ] Il campo Reply-To nell'email è l'indirizzo inserito nel form
- [ ] Il corpo dell'email contiene tutti i campi compilati con le loro etichette
- [ ] Con endpoint sbagliato: appare messaggio di errore generico visibile all'utente
- [ ] Il bottone submit si riabilita dopo errore (l'utente può riprovare)
- [ ] Nessun errore JS nella console in caso di successo

**Criteri di accettazione:**
Il form invia correttamente a Formspree e il gestore riceve l'email con tutti i dati. Il flusso success/error è gestito correttamente con feedback visivo all'utente. Test end-to-end completato con email reale ricevuta.

---

## STEP 17 – Sezione Contatti e Link WhatsApp

### Descrizione
Implementare la sezione contatti con email, telefono, link WhatsApp diretto (no autenticazione), orari disponibilità e link opzionale a Booking.com.

### Attività

1. **HTML** – In `<section id="contatti">`:
   ```html
   <section id="contatti" class="section section-alt">
     <div class="container">
       <h2 class="section-title">Contatti</h2>
       <p class="section-subtitle">Siamo disponibili per qualsiasi informazione</p>
       <div class="contatti-grid">
         <div class="contact-card">
           <i class="fa-solid fa-envelope contact-icon"></i>
           <h3>Email</h3>
           <a href="mailto:EMAIL_GESTORE" class="contact-link">EMAIL_GESTORE</a>
           <p class="contact-note">Risposta entro 24 ore</p>
         </div>
         <div class="contact-card">
           <i class="fa-solid fa-phone contact-icon"></i>
           <h3>Telefono</h3>
           <a href="tel:+39XXXXXXXXXX" class="contact-link">+39 XXX XXX XXXX</a>
           <p class="contact-note">Lun–Dom · 9:00–20:00</p>
         </div>
         <div class="contact-card contact-card-wa">
           <i class="fa-brands fa-whatsapp contact-icon"></i>
           <h3>WhatsApp</h3>
           <a href="https://wa.me/39XXXXXXXXXX?text=Ciao!%20Vorrei%20richiedere%20un%20preventivo%20per%20il%20B%26B%20A%20Due%20Passi%20Da." class="contact-link btn btn-outline" target="_blank" rel="noopener noreferrer">
             Scrivici su WhatsApp
           </a>
           <p class="contact-note">Nessun login richiesto</p>
         </div>
       </div>
       <div class="booking-link-box">
         <p>Preferisci prenotare tramite una piattaforma esterna?</p>
         <a href="https://www.booking.com/hotel/it/aduepassida-corato.it.html" target="_blank" rel="noopener" class="btn btn-outline">
           <i class="fa-solid fa-external-link"></i> Vedi su Booking.com
         </a>
       </div>
     </div>
   </section>
   ```

2. **CSS**:
   ```css
   .contatti-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-lg); margin: var(--spacing-xl) 0; }
   .contact-card { text-align: center; padding: var(--spacing-xl); background: var(--color-surface); border-radius: var(--border-radius-lg); border: 1px solid var(--color-border); }
   .contact-icon { font-size: 2.5rem; color: var(--color-primary); margin-bottom: var(--spacing-md); display: block; }
   .contact-card-wa .contact-icon { color: #25D366; }
   .contact-link { color: var(--color-primary); font-weight: 700; font-size: 1rem; }
   .contact-note { color: var(--color-text-light); font-size: 0.85rem; margin-top: var(--spacing-xs); }
   .booking-link-box { text-align: center; padding: var(--spacing-lg); border: 1px dashed var(--color-border); border-radius: var(--border-radius); margin-top: var(--spacing-xl); }
   @media (max-width: 767px) { .contatti-grid { grid-template-columns: 1fr; } }
   ```

3. Sostituire `EMAIL_GESTORE` e `+39XXXXXXXXXX` e il link WhatsApp con i dati reali del gestore
4. Verificare che il link WhatsApp apra correttamente il messaggio precompilato su mobile e desktop

### ✅ Definition of Done

**Checklist:**
- [ ] 3 card contatti visibili: Email, Telefono, WhatsApp
- [ ] Link email (`mailto:`) cliccabile e apre il client email
- [ ] Link telefono (`tel:`) cliccabile e funziona su mobile (avvia chiamata)
- [ ] Link WhatsApp apre wa.me con messaggio precompilato (senza richiedere autenticazione)
- [ ] Il link WhatsApp ha `target="_blank"` e `rel="noopener noreferrer"`
- [ ] Box "Booking.com" presente con link funzionante
- [ ] Layout 3 colonne su desktop, 1 colonna su mobile
- [ ] I dati di contatto reali del gestore sono inseriti (non placeholder)

**Criteri di accettazione:**
I canali di contatto sono tutti funzionanti. Il link WhatsApp non richiede login ed è testato su mobile. Email e telefono sono cliccabili.

---

## STEP 18 – Sezione FAQ (Accordion)

### Descrizione
Implementare la sezione FAQ con accordion: click su domanda espande/collassa la risposta. Un solo item aperto alla volta. Tutta la logica in JS vanilla con animazione CSS.

### Attività

1. **HTML** – In `<section id="faq">`:
   ```html
   <section id="faq" class="section">
     <div class="container">
       <h2 class="section-title">Domande Frequenti</h2>
       <div class="accordion" id="faq-accordion">

         <div class="accordion-item">
           <button class="accordion-trigger" aria-expanded="false" aria-controls="faq-1">
             A che ora è il check-in e il check-out?
             <i class="fa-solid fa-chevron-down"></i>
           </button>
           <div class="accordion-panel" id="faq-1" hidden>
             <p>Il check-in è flessibile: contattaci per concordare l'orario più comodo. Il check-out è indicativamente entro le ore 11:00.</p>
           </div>
         </div>

         <!-- Ripetere per tutte le FAQ -->
         <!-- 2. La colazione è inclusa? -->
         <!-- 3. Il parcheggio è disponibile? -->
         <!-- 4. C'è l'ascensore? -->
         <!-- 5. Il Wi-Fi è gratuito? -->
         <!-- 6. Sono ammessi animali? -->
         <!-- 7. Come raggiungo la struttura dalla stazione/aeroporto? -->
         <!-- 8. Come funziona la richiesta preventivo? -->
         <!-- 9. Quali lingue parla il gestore? -->
         <!-- 10. Posso ricevere fattura? -->
         <!-- 11. La struttura è adatta alle famiglie? -->
         <!-- 12. Qual è la politica di cancellazione? -->

       </div>
     </div>
   </section>
   ```

2. **JS in `main.js`**:
   ```javascript
   function initAccordion() {
     const triggers = document.querySelectorAll('.accordion-trigger');
     triggers.forEach(trigger => {
       trigger.addEventListener('click', () => {
         const isOpen  = trigger.getAttribute('aria-expanded') === 'true';
         // Chiudi tutti
         triggers.forEach(t => {
           t.setAttribute('aria-expanded', 'false');
           t.classList.remove('open');
           document.getElementById(t.getAttribute('aria-controls')).hidden = true;
         });
         // Apri il cliccato (se era chiuso)
         if (!isOpen) {
           trigger.setAttribute('aria-expanded', 'true');
           trigger.classList.add('open');
           document.getElementById(trigger.getAttribute('aria-controls')).hidden = false;
         }
       });
     });
   }
   ```

3. **CSS**:
   ```css
   .accordion-item { border-bottom: 1px solid var(--color-border); }
   .accordion-trigger { width: 100%; text-align: left; padding: var(--spacing-lg) 0; display: flex; justify-content: space-between; align-items: center; gap: var(--spacing-md); font-family: var(--font-body); font-size: 1rem; font-weight: 700; color: var(--color-text); }
   .accordion-trigger .fa-chevron-down { transition: transform var(--transition-base); flex-shrink: 0; }
   .accordion-trigger.open .fa-chevron-down { transform: rotate(180deg); }
   .accordion-panel { padding: 0 0 var(--spacing-lg) 0; color: var(--color-text-light); line-height: 1.7; }
   .accordion-panel[hidden] { display: none; }
   ```

4. Inserire tutte le 12 FAQ con domande e risposte complete basate sui dati della struttura

### ✅ Definition of Done

**Checklist:**
- [ ] Tutte le 12 FAQ sono presenti con domanda e risposta
- [ ] Click su domanda: risposta si apre (hidden rimosso)
- [ ] Click su domanda già aperta: risposta si chiude
- [ ] Aprendo una domanda, le altre si chiudono automaticamente (un solo item aperto)
- [ ] L'icona chevron ruota 180° quando il panel è aperto
- [ ] `aria-expanded` si aggiorna correttamente (false/true)
- [ ] Tutti i link dell'accordion sono raggiungibili da tastiera (Tab + Enter)
- [ ] Le risposte rispecchiano i dati reali della struttura

**Criteri di accettazione:**
Tutte le FAQ sono presenti con contenuti accurati. L'accordion funziona correttamente con apertura/chiusura e un solo item aperto alla volta. Accessibile da tastiera.

---

## STEP 19 – Cookie Banner e Privacy Policy

### Descrizione
Implementare il banner cookie GDPR e le pagine Privacy Policy (IT e EN). Il banner salva la preferenza in localStorage e non si ripresenta nelle visite successive.

### Attività

1. **HTML del banner** – Aggiungere prima di `</body>` in `index.html`:
   ```html
   <div id="cookie-banner" class="cookie-banner" role="dialog" aria-live="polite" aria-label="Consenso cookie" hidden>
     <div class="cookie-content">
       <p>Questo sito utilizza solo cookie tecnici necessari al funzionamento. Nessun cookie di profilazione o tracking. <a href="privacy-policy.html">Leggi la Privacy Policy</a>.</p>
       <div class="cookie-actions">
         <button id="cookie-accept" class="btn btn-primary">Ho capito</button>
       </div>
     </div>
   </div>
   ```

2. **JS in `cookie-banner.js`**:
   ```javascript
   export function initCookieBanner() {
     const banner  = document.getElementById('cookie-banner');
     const btnOk   = document.getElementById('cookie-accept');
     if (!banner) return;

     const STORAGE_KEY = 'cookieConsent';

     try {
       if (!localStorage.getItem(STORAGE_KEY)) {
         setTimeout(() => { banner.hidden = false; }, 1500); // delay lieve
       }
     } catch (e) { /* localStorage non disponibile: mostra banner */ banner.hidden = false; }

     btnOk.addEventListener('click', () => {
       try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch (e) {}
       banner.hidden = true;
     });
   }
   ```

3. **CSS**:
   ```css
   .cookie-banner { position: fixed; bottom: 0; left: 0; right: 0; background: var(--color-text); color: #fff; padding: var(--spacing-md) var(--spacing-lg); z-index: 9999; }
   .cookie-content { max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: var(--spacing-lg); flex-wrap: wrap; }
   .cookie-content a { color: var(--color-accent); text-decoration: underline; }
   .cookie-banner[hidden] { display: none; }
   ```

4. **Privacy Policy** – Compilare `privacy-policy.html` con il contenuto minimo GDPR definito in `requirements.md` §11.2:
   - Titolare del trattamento: [Nome Gestore], Via Duomo 81, Corato – [email]
   - Dati raccolti: quelli inviati tramite il form di contatto
   - Finalità: rispondere alle richieste di preventivo
   - Base giuridica: art. 6(1)(b) GDPR (misure pre-contrattuali)
   - Subprocessor: Formspree Inc. (invio email)
   - Diritti: accesso, rettifica, cancellazione via email al titolare
   - Nessun cookie di profilazione o analytics
   - Ultimo aggiornamento: [data]

5. Creare `privacy-policy-en.html` con la versione inglese

### ✅ Definition of Done

**Checklist:**
- [ ] Il banner appare alla prima visita (localStorage vuoto) dopo ~1.5 secondi
- [ ] Click "Ho capito": banner scompare e non riappare nei refresh successivi (localStorage impostato)
- [ ] In sessione con `localStorage.cookieConsent` già impostato: banner non appare
- [ ] La Privacy Policy è accessibile dal link nel banner e dal footer
- [ ] `privacy-policy.html` contiene: titolare, dati raccolti, finalità, base giuridica, diritti, subprocessor
- [ ] `privacy-policy-en.html` creata con contenuto equivalente in inglese
- [ ] Il banner ha `role="dialog"` e `aria-live="polite"` per accessibilità

**Criteri di accettazione:**
Il banner GDPR funziona correttamente. La Privacy Policy è completa, accessibile e specifica Formspree come subprocessor. La preferenza di consenso viene correttamente salvata.

---

## STEP 20 – SEO: Meta Tag, JSON-LD, Sitemap, robots.txt

### Descrizione
Completare tutti i meta tag SEO, aggiungere i dati strutturati JSON-LD, generare la sitemap e il robots.txt con gli URL reali, e aggiungere il favicon.

### Attività

1. **Meta tag completi** nel `<head>` di `index.html` (sostituire tutti i placeholder con valori reali):
   ```html
   <title>A Due Passi Da – B&B Corato (BA) | Appartamento Puglia</title>
   <meta name="description" content="B&B A Due Passi Da a Corato (BA), Puglia. Appartamento privato 50m², 4 camere, fino a 10 ospiti. Colazione inclusa, Wi-Fi 135Mbps, terrazza. Prenota direttamente.">
   <meta name="keywords" content="b&b corato, bed and breakfast corato bari, affittacamere puglia, appartamento corato, vacanze puglia, castel del monte vicino">
   <link rel="canonical" href="https://<username>.github.io/<repo>/">
   <link rel="alternate" hreflang="it" href="https://<username>.github.io/<repo>/index.html">
   <link rel="alternate" hreflang="en" href="https://<username>.github.io/<repo>/index-en.html">

   <!-- Open Graph -->
   <meta property="og:type"        content="website">
   <meta property="og:title"       content="A Due Passi Da – B&B Corato, Puglia">
   <meta property="og:description" content="Appartamento privato nel cuore di Corato. Colazione, Wi-Fi, terrazza. Prenota direttamente senza commissioni.">
   <meta property="og:image"       content="https://<username>.github.io/<repo>/assets/og-image.jpg">
   <meta property="og:url"         content="https://<username>.github.io/<repo>/">
   <meta property="og:locale"      content="it_IT">

   <!-- Twitter Card -->
   <meta name="twitter:card"        content="summary_large_image">
   <meta name="twitter:title"       content="A Due Passi Da – B&B Corato">
   <meta name="twitter:description" content="B&B nel centro di Corato, Puglia. Preventivo diretto senza commissioni.">
   <meta name="twitter:image"       content="https://<username>.github.io/<repo>/assets/og-image.jpg">

   <!-- Favicon -->
   <link rel="icon" type="image/x-icon" href="favicon.ico">
   ```

2. **JSON-LD** – Aggiungere nel `<head>` con tutti i dati reali della struttura (come da `requirements.md` §8.2), sostituendo tutte le coordinate, telefono, email con i valori reali

3. **`sitemap.xml`** – Compilare con gli URL reali:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url><loc>https://<username>.github.io/<repo>/</loc><priority>1.0</priority><changefreq>monthly</changefreq></url>
     <url><loc>https://<username>.github.io/<repo>/index-en.html</loc><priority>0.8</priority></url>
     <url><loc>https://<username>.github.io/<repo>/privacy-policy.html</loc><priority>0.3</priority></url>
   </urlset>
   ```

4. **`robots.txt`** – Compilare con URL reale:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://<username>.github.io/<repo>/sitemap.xml
   ```

5. **Favicon** – Creare/scaricare un `favicon.ico` semplice (es. le iniziali "AD" in terracotta su sfondo bianco) con uno strumento online gratuito come [favicon.io](https://favicon.io) e salvarlo come `favicon.ico` nella root

6. Replicare i meta tag su `index-en.html` con valori in inglese e `hreflang` invertiti

### ✅ Definition of Done

**Checklist:**
- [ ] `<title>` e `<meta name="description">` presenti e contenenti keyword rilevanti su tutte le pagine
- [ ] Tag Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) completi e con URL assoluti
- [ ] `og:image` punta a `assets/og-image.jpg` (1200×630px esistente)
- [ ] JSON-LD `LodgingBusiness` valido: testare su [validator.schema.org](https://validator.schema.org)
- [ ] `sitemap.xml` raggiungibile all'URL pubblico e valido XML
- [ ] `robots.txt` raggiungibile e contiene link alla sitemap
- [ ] Tag `hreflang` presenti sia su `index.html` (IT) che su `index-en.html` (EN)
- [ ] Favicon visibile nella tab del browser
- [ ] Nessun placeholder `<username>` o `<repo>` rimasto nei file

**Criteri di accettazione:**
Tutti i meta tag sono presenti con valori reali. JSON-LD supera la validazione schema.org. Sitemap e robots.txt sono accessibili e corretti. Il favicon è visibile.

---

## STEP 21 – CSS Responsive Completo

### Descrizione
Completare `responsive.css` con tutte le media query necessarie per garantire che ogni sezione del sito sia ottimizzata per mobile (< 768px), tablet (768–1023px) e desktop (≥ 1024px).

### Attività

Implementare in `responsive.css` le regole per ogni breakpoint, coprendo tutte le sezioni sviluppate negli STEP precedenti:

```css
/* ─── TABLET (768px – 1023px) ─── */
@media (min-width: 768px) and (max-width: 1023px) {
  .services-grid        { grid-template-columns: repeat(3, 1fr); }
  .attractions-grid     { grid-template-columns: repeat(2, 1fr); }
  .contatti-grid        { grid-template-columns: repeat(3, 1fr); }
  .struttura-grid       { grid-template-columns: 1fr 1fr; }
}

/* ─── MOBILE (< 768px) ─── */
@media (max-width: 767px) {
  /* Container */
  .container            { padding: 0 var(--spacing-md); }
  /* Sezioni */
  .section              { padding: var(--spacing-xl) 0; }
  /* Tipografia */
  .section-title        { font-size: 1.8rem; }
  /* Hero */
  #hero                 { min-height: 70vh; background-attachment: scroll; }
  /* Struttura */
  .struttura-grid       { grid-template-columns: 1fr; }
  /* Camere */
  .camere-grid          { grid-template-columns: 1fr; }
  /* Servizi */
  .services-grid        { grid-template-columns: repeat(2, 1fr); }
  /* Posizione */
  .posizione-grid       { grid-template-columns: 1fr; }
  #map-container        { height: 260px !important; }
  /* Attrazioni */
  .attractions-grid     { grid-template-columns: 1fr; }
  /* Form */
  .form-row             { grid-template-columns: 1fr; }
  /* Contatti */
  .contatti-grid        { grid-template-columns: 1fr; }
  /* Footer */
  .footer-inner         { flex-direction: column; gap: var(--spacing-lg); text-align: center; }
  .footer-nav           { flex-wrap: wrap; justify-content: center; }
}

/* ─── SMALL MOBILE (< 480px) ─── */
@media (max-width: 479px) {
  .hero-badges          { flex-direction: column; align-items: center; }
  .services-grid        { grid-template-columns: repeat(2, 1fr); }
  .filter-tabs          { flex-direction: column; }
}
```

### Attività di verifica responsive

Per ogni sezione, testare con DevTools (Chrome → Toggle device toolbar) a 375px (iPhone SE), 768px (iPad), 1024px (desktop):

1. Nessun overflow orizzontale su nessun viewport
2. Testo leggibile senza zoom
3. Bottoni e link con area di tap ≥ 44×44px su mobile
4. Immagini non overflow-ano il loro contenitore
5. Il menu hamburger funziona su viewport mobile
6. Il form è usabile su mobile (input non troppo piccoli)

### ✅ Definition of Done

**Checklist:**
- [ ] Nessun overflow orizzontale a 375px (iPhone SE): verificare con DevTools (barra scorrimento orizzontale assente)
- [ ] Tutte le griglie a più colonne collassano in 1 colonna su mobile (≤ 767px)
- [ ] La sezione servizi mostra 2 colonne su mobile, non 1
- [ ] Il form mostra i campi in colonna singola su mobile
- [ ] La mappa ha altezza ridotta su mobile (260px) e non trabocca
- [ ] Il footer ha layout verticale su mobile
- [ ] Testo base leggibile senza zoom a 375px
- [ ] Test su tablet (768px): layout a 2 colonne dove previsto
- [ ] Test su Chrome, Firefox, Safari (DevTools per browser simulation)

**Criteri di accettazione:**
Il sito è completamente responsivo su tutti i viewport. Nessun overflow orizzontale. Tutte le sezioni sono usabili e leggibili su mobile.

---

## STEP 22 – Versione Inglese (index-en.html)

### Descrizione
Creare la versione inglese completa del sito copiando `index.html` e traducendo tutti i testi. I file JS e CSS sono condivisi, solo l'HTML cambia.

### Attività

1. **Copiare** `index.html` in `index-en.html`
2. **Modificare** `<html lang="it">` in `<html lang="en">`
3. **Aggiornare** il toggle lingua: su `index-en.html` il link `IT` punta a `index.html`, `EN` è `.active`
4. **Tradurre** tutti i testi:
   - Navigazione
   - Sezione Hero (tagline, badge, CTA)
   - Sezione Struttura e Camere
   - Array `SERVICES` in JS → inline nel HTML o come variabile JS separata per EN
   - Sezione Posizione (indicazioni raggiungibilità)
   - Array `ATTRACTIONS` → descrizioni in EN
   - Recensioni (se usano testo in italiano)
   - Form: label, placeholder, opzioni select, messaggi errore (aggiornare in `form.js` con condizionale lingua)
   - FAQ: tutte le 12 coppie domanda/risposta
   - Contatti: testi descrittivi
   - Footer: copyright, nav link labels
   - Campi nascosti form: `_subject` → "New quote request – A Due Passi Da", `_language` → "en"
5. **Aggiornare** i meta tag SEO in inglese (title, description, OG, hreflang)
6. **Aggiornare** il JSON-LD: campo `description` in inglese
7. **Duplicare** la logica JS per i messaggi di errore del form gestendo la lingua:
   ```javascript
   const LANG = document.documentElement.lang || 'it';
   const ERROR_MESSAGES = {
     it: { nome: 'Inserisci il tuo nome (min. 2 caratteri)', email: 'Email non valida', ... },
     en: { nome: 'Please enter your full name (min. 2 characters)', email: 'Invalid email address', ... }
   };
   ```

### ✅ Definition of Done

**Checklist:**
- [ ] `index-en.html` esiste e si apre correttamente
- [ ] `<html lang="en">` presente
- [ ] Tutti i testi visibili nella pagina sono in inglese (nessun testo italiano residuo)
- [ ] Il toggle EN è evidenziato come attivo su `index-en.html`
- [ ] Click su "IT" da `index-en.html`: porta a `index.html`
- [ ] I meta tag SEO (title, description) sono in inglese
- [ ] I messaggi di errore del form sono in inglese su `index-en.html`
- [ ] Il campo `_subject` del form su `index-en.html` è in inglese
- [ ] Tag `hreflang` correttamente impostati in entrambe le pagine
- [ ] La versione inglese è responsive e visivamente identica alla italiana

**Criteri di accettazione:**
La versione inglese è completa e priva di testo italiano. Il toggle lingua funziona in entrambe le direzioni. SEO e form sono correttamente configurati per la lingua EN.

---

## STEP 23 – Toggle Lingua IT/EN

### Descrizione
Implementare in `lang.js` eventuali miglioramenti al toggle lingua: evidenziazione del link attivo basata sull'URL corrente, e smooth transition visiva tra le versioni.

### Attività

1. **In `lang.js`**:
   ```javascript
   export function initLang() {
     const langLinks = document.querySelectorAll('.lang-toggle a');
     const currentPage = window.location.pathname;

     langLinks.forEach(link => {
       const linkPath = new URL(link.href, window.location.origin).pathname;
       // Marca come attivo il link corrispondente alla pagina corrente
       if (currentPage.endsWith(linkPath.split('/').pop()) ||
           (currentPage.endsWith('/') && linkPath.endsWith('index.html'))) {
         link.classList.add('active');
         link.setAttribute('aria-current', 'page');
       }
     });
   }
   ```

2. **CSS** per il toggle:
   ```css
   .lang-toggle { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; font-weight: 700; }
   .lang-toggle a { color: var(--color-text-light); padding: 4px 8px; border-radius: 4px; transition: var(--transition-fast); }
   .lang-toggle a:hover { color: var(--color-primary); }
   .lang-toggle a.active { color: var(--color-primary); border-bottom: 2px solid var(--color-primary); }
   ```

3. Verificare che su `index.html` il link "IT" sia `.active` e su `index-en.html` il link "EN" sia `.active`

### ✅ Definition of Done

**Checklist:**
- [ ] Su `index.html`: "IT" è visivamente evidenziato come attivo
- [ ] Su `index-en.html`: "EN" è visivamente evidenziato come attivo
- [ ] Il link alla lingua attiva ha `aria-current="page"`
- [ ] Click su lingua non attiva: naviga correttamente all'altra versione
- [ ] Il toggle è visibile sia su mobile (in menu) che su desktop (nell'header)

**Criteri di accettazione:**
Il toggle lingua indica sempre chiaramente la lingua corrente. La navigazione tra versioni funziona correttamente in entrambe le direzioni.

---

## STEP 24 – Ottimizzazione Performance

### Descrizione
Ottimizzare il sito per il caricamento rapido: lazy loading immagini, deferimento JS, ottimizzazione CDN, e verifica PageSpeed Insights.

### Attività

1. **Verifica `loading="lazy"`** su tutte le immagini al di sotto del fold (tutto tranne il hero)
2. **Verifica `defer`** su tutti i tag `<script>` non inline
3. **Preconnect** per i CDN esterni (già parzialmente in STEP 04):
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">
   <link rel="dns-prefetch" href="https://unpkg.com">
   ```
4. **Preload dell'immagine hero** (above the fold):
   ```html
   <link rel="preload" as="image" href="images/hero/hero-placeholder.jpg">
   ```
5. **Verificare** che la mappa Leaflet usi IntersectionObserver (già implementato in STEP 12)
6. **Verificare** peso totale delle immagini: nessun file supera i limiti di `requirements.md` §9.1
7. **Testare con Google PageSpeed Insights** (pagespeed.web.dev):
   - Inserire l'URL di GitHub Pages
   - Obiettivo: Performance score ≥ 85 su mobile, ≥ 90 su desktop
   - Correggere i warning principali segnalati
8. **Testare con Lighthouse** in Chrome DevTools (tab Performance)

### ✅ Definition of Done

**Checklist:**
- [ ] Tutti i tag `<script>` hanno attributo `defer`
- [ ] Tutte le immagini sotto il fold hanno `loading="lazy"`
- [ ] L'immagine hero ha `<link rel="preload">` nel head
- [ ] Tag `preconnect` presenti per Google Fonts e CDN principali
- [ ] Nessun file immagine supera il peso massimo definito
- [ ] Google PageSpeed Insights: Performance ≥ 85 su mobile
- [ ] Google PageSpeed Insights: Performance ≥ 90 su desktop
- [ ] Nessun errore nella console del browser (warning minori accettabili)

**Criteri di accettazione:**
Il sito raggiunge score PageSpeed ≥ 85 mobile e ≥ 90 desktop. Le ottimizzazioni di caricamento (lazy load, defer, preload) sono tutte implementate.

---

## STEP 25 – Testing Completo Pre-Pubblicazione

### Descrizione
Eseguire il ciclo completo di test funzionali, responsive, SEO, accessibilità e GDPR prima della pubblicazione. Ogni test fallito blocca il deploy.

### Attività

Eseguire sistematicamente ogni test della checklist su: Chrome desktop, Firefox desktop, Safari desktop (se disponibile), Chrome mobile (DevTools iPhone SE 375px), Chrome tablet (DevTools iPad 768px).

Per il test del form, usare dati reali e verificare la ricezione dell'email.

### ✅ Definition of Done – MASTER CHECKLIST

**Funzionalità Core:**
- [ ] Form: submit con dati validi → email ricevuta dal gestore con tutti i campi
- [ ] Form: submit senza dati → errori inline su tutti i campi obbligatori
- [ ] Form: data partenza < arrivo → errore visibile
- [ ] Form: messaggio di successo visibile dopo invio
- [ ] Form: link WhatsApp nel messaggio di successo funziona
- [ ] Form: errore di rete → messaggio errore generico visibile, bottone si riabilita
- [ ] Mappa: carica correttamente, marker visibile, popup con indirizzo
- [ ] Mappa: scroll rotella non muove la mappa (scrollWheelZoom: false)
- [ ] Galleria: lightbox apre, naviga prev/next, chiude con ESC e click sfondo
- [ ] Servizi: tutti i badge incluso/a pagamento corretti
- [ ] FAQ: accordion apre/chiude, un solo item aperto alla volta
- [ ] Filtri attrazioni: tutti i filtri categoria funzionano
- [ ] Slider recensioni: navigazione prev/next funziona
- [ ] Toggle IT/EN: navigazione in entrambe le direzioni funziona
- [ ] Link email nel footer: apre client email
- [ ] Link telefono nel footer: funziona su mobile
- [ ] Link WhatsApp contatti: apre wa.me senza login
- [ ] Link Booking.com: si apre in nuova tab
- [ ] Cookie banner: appare alla prima visita (clear localStorage e reload)
- [ ] Cookie banner: scompare dopo click "Ho capito"
- [ ] Cookie banner: non riappare al reload successivo
- [ ] Privacy Policy: raggiungibile da footer e dal banner
- [ ] Smooth scroll: tutti i link di navigazione scrollano fluidi alla sezione

**Responsive (testare a 375px, 768px, 1024px):**
- [ ] Nessun overflow orizzontale a 375px
- [ ] Menu hamburger funziona su mobile
- [ ] Hero visibile e testo leggibile su mobile
- [ ] Form usabile su mobile (input accessibili)
- [ ] Mappa visibile su mobile (260px altezza)
- [ ] Footer layout verticale su mobile

**SEO:**
- [ ] `<title>` presente e descrittivo su tutte le pagine
- [ ] `<meta name="description">` presente su tutte le pagine
- [ ] JSON-LD valido: [validator.schema.org](https://validator.schema.org)
- [ ] Open Graph: testare con [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] `sitemap.xml` accessibile all'URL pubblico
- [ ] `robots.txt` accessibile all'URL pubblico
- [ ] Tutte le immagini hanno attributo `alt` non vuoto
- [ ] Nessun link rotto: verificare con browser o strumento online

**Accessibilità:**
- [ ] Navigazione completa via Tab (tutti gli elementi interattivi raggiungibili)
- [ ] Form: ogni input ha `<label>` associata
- [ ] Accordion: `aria-expanded` si aggiorna correttamente
- [ ] Lightbox: `aria-modal="true"` presente
- [ ] Bottoni senza testo visibile hanno `aria-label`

**Contenuti:**
- [ ] Nessun placeholder `EMAIL_GESTORE`, `+39XXXXXXXXXX`, `XXXXXXXX` rimasto
- [ ] Tutte le coordinate GPS della mappa sono quelle reali (confermate dal gestore)
- [ ] I dati di contatto nel footer, sezione contatti e form sono quelli reali
- [ ] Le tipologie delle 4 camere sono confermate dal gestore
- [ ] Nessun link punta ancora a `https://formspree.io/f/XXXXXXXX` (endpoint placeholder)

**Criteri di accettazione:**
TUTTI gli item della master checklist sono spuntati. Zero item non spuntati sono tollerati per procedere al deploy.

---

## STEP 26 – Deploy Finale e Pubblicazione

### Descrizione
Eseguire il commit finale, pushare su GitHub e verificare che il sito live su GitHub Pages sia identico alla versione locale testata.

### Attività

1. **Commit finale** di tutti i file modificati:
   ```bash
   git add .
   git commit -m "feat: complete website v1.0 – A Due Passi Da B&B"
   git push origin main
   ```

2. **Attendere** ~1-3 minuti per il deploy automatico di GitHub Pages

3. **Verificare il sito live** all'URL: `https://<username>.github.io/aduepassida-website/`
   - Aprire in un browser pulito (incognito, senza cache locale)
   - Verificare che le immagini si carichino (non 404)
   - Verificare che il form funzioni con l'endpoint reale
   - Verificare che la mappa si carichi
   - Verificare che i font si carichino dal CDN

4. **Test su device reale** (se disponibile):
   - Aprire l'URL su smartphone reale
   - Testare il link WhatsApp su mobile
   - Testare la navigazione e il form

5. **Verificare** che GitHub Pages stia usando HTTPS (lucchetto nella barra del browser)

6. **Annotare** l'URL definitivo del sito in un file `README.md` del repository:
   ```markdown
   # A Due Passi Da – Sito Web Vetrina
   🌐 Sito live: https://<username>.github.io/aduepassida-website/
   📍 B&B a Corato (BA), Via Duomo 81
   ```

### ✅ Definition of Done

**Checklist:**
- [ ] Tutti i file committati e pushati su branch `main`
- [ ] GitHub Actions (o Pages build) completata senza errori (verificare in Settings → Pages)
- [ ] URL `https://<username>.github.io/aduepassida-website/` risponde con il sito corretto
- [ ] Test in browser incognito: nessuna risorsa mancante (console senza errori 404)
- [ ] Il form invia correttamente dal sito live (email reale ricevuta)
- [ ] HTTPS attivo (lucchetto verde)
- [ ] `README.md` con URL del sito aggiornato
- [ ] Sito testato su almeno un device mobile reale o emulato

**Criteri di accettazione:**
Il sito è pubblicamente accessibile via HTTPS su GitHub Pages. Tutte le funzionalità testate in locale funzionano anche sul sito live. L'email di test è ricevuta correttamente.

---

## STEP 27 – Inserimento URL su Google Maps

### Descrizione
Aggiungere il link al sito web appena pubblicato nel profilo Google Maps del B&B, in modo che chiunque trovi la struttura su Maps possa visitare direttamente il sito.

### Attività

1. Aprire [Google Maps](https://maps.google.com) e cercare "A Due Passi Da Corato" oppure usare il link: https://share.google/NTKoIOnzQw9XD2mrI
2. Cliccare sulla scheda della struttura
3. Cliccare su **"Suggerisci una modifica"** oppure, se si è il proprietario verificato, accedere a **Google Business Profile**
4. **Se proprietario verificato (consigliato):**
   - Andare su [business.google.com](https://business.google.com)
   - Selezionare il profilo "A Due Passi Da"
   - Cliccare "Modifica profilo" → sezione "Contatti"
   - Inserire l'URL del sito: `https://<username>.github.io/aduepassida-website/`
   - Salvare la modifica
5. **Se non proprietario verificato:**
   - Cliccare "Suggerisci una modifica" sulla scheda Maps
   - Aggiungere/modificare il campo "Sito Web"
   - Inserire l'URL del sito
   - Attendere la revisione di Google (normalmente 1-7 giorni)
6. **Verificare** dopo qualche giorno che il link sia visibile nella scheda Google Maps della struttura
7. **Consiglio:** Se non già fatto, reclamare la proprietà del profilo Google Business (gratuito, richiede verifica via cartolina/telefono) per avere controllo diretto sul profilo

### ✅ Definition of Done

**Checklist:**
- [ ] URL del sito inserito nel campo "Sito Web" del profilo Google Maps (via Google Business o suggerimento)
- [ ] Verifica effettuata: cercando "A Due Passi Da Corato" su Google Maps, il link al sito appare nella scheda
- [ ] Click sul link nella scheda Maps porta correttamente al sito

**Criteri di accettazione:**
Il link al sito web è visibile e funzionante nel profilo Google Maps della struttura. Chiunque trovi il B&B su Google Maps può accedere direttamente al sito vetrina.

---

## Riepilogo Finale

| Fase | Step | Descrizione |
|---|---|---|
| **Setup** | 01–03 | Repository, struttura file, Formspree |
| **CSS Foundation** | 04 | Design system, variabili, componenti |
| **HTML Shell** | 05–06 | Scheletro pagina, header, footer, menu mobile |
| **Sezioni Statiche** | 07–09 | Hero, struttura, camere, immagini |
| **Sezioni Interattive** | 10–14 | Galleria, servizi, mappa, attrazioni, recensioni |
| **Form** | 15–16 | Preventivo con validazione e Formspree |
| **Sezioni Finali** | 17–19 | Contatti, FAQ, cookie/privacy |
| **SEO & i18n** | 20–23 | Meta tag, EN, toggle lingua |
| **Qualità** | 24–25 | Performance, testing completo |
| **Launch** | 26–27 | Deploy, Google Maps |

> Ogni step completato con DoD soddisfatto avvicina al lancio. Buon sviluppo! 🚀

---

*Documento generato da `business_requirements.md` v1.1 e `requirements.md` v1.0.*  
*I placeholder `<username>`, `<repo>`, `EMAIL_GESTORE`, `+39XXXXXXXXXX`, `XXXXXXXX` devono essere sostituiti con i valori reali del gestore prima della pubblicazione.*
