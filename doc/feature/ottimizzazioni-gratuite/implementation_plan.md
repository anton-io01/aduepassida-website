# Implementation Plan — Ottimizzazioni gratuite
## Coverage Matrix
FR-01–06, NFR-01–03, AC-01–05 → Step 1 (un unico incremento statico verificabile).
## Step 1 — SEO, conversione e pagine bilingui
### Overview
Aggiornamento coerente del sito statico, valutazioni manuali e landing utili.
### Files Involved
index.html, index-en.html, privacy-policy*.html, css/style.css, js/form.js, robots.txt, sitemap.xml, .github/workflows/pages.yml; nuove appartamento-corato.html, apartment-corato.html, come-arrivare.html, getting-here.html; cinque documenti feature.
### Dependencies
Nessuna; base fissa e risposte utente registrate.
### 1. Implementation Plan
#### 1.1 Code Changes
Normalizzare URL SEO, testi letti/culla e titoli; aggiungere schede prima delle recensioni; collegare landing localizzate, preservare design; CTA e WhatsApp contestuale; date/ospiti facoltativi per informazioni, obbligatori altrimenti. Rimuovere badge posizione obsoleto 9.5. Correggere coordinate schema da Google verificato. Nessuna attribuzione delle vecchie recensioni alle piattaforme.
#### 1.2 Configuration and Database
Aggiungere quattro landing alla lista archive del workflow; aggiornare sitemap. DB N/A.
#### 1.3 Testing
AC-01/02/03: parser HTML e XML; AC-04: mock form/fetch e JS syntax, UI con form vuoto; AC-05/NFR-02: browser e link locali, viewport mobile; NFR-01/03: diff e assenza POST reali.
#### 1.4 Documentation Updates
dev_status contiene evidenze, manutenzione widget e istruzioni Search Console, limiti e consegna.
### 2. Definition of Done
- [x] D1: parsing SEO/XML, JS syntax e link locali superati.
- [x] D2: flussi form validi/invalidi/successo/errore verificati con mock senza invio reale.
- [x] D3: home e landing IT/EN controllate nel browser, mobile senza overflow.
- [x] D4: rating/fonte/data, letti, culla e inclusione nel pacchetto verificati; diff pulito.
## Open Points and Risks
Valutazioni manuali soggette a variazioni; segnalate come rilevazioni datate. Search Console e ricezione email reali restano operazioni del titolare dopo pubblicazione.
