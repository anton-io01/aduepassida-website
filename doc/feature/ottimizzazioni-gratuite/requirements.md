# Requirements — Ottimizzazioni gratuite
## 1. Feature Overview
Implementa BR-01–06 sul sito statico distribuito da .github/workflows/pages.yml, non sul prototipo Astro.
## 2. Actors and Main Flow
Ospite naviga HTML statici IT/EN; Web3Forms invariato; gestore aggiorna schede manualmente.
## 3. Functional Requirements
FR-01: URL SEO definitivi, canonical autonomi, sitemap/hreflang reciproci (BR-01).
FR-02: testi capienza/culla e CTA espliciti in entrambe le lingue (BR-02,04).
FR-03: due schede valutazioni con provenienza e data (BR-03).
FR-04: informazioni senza date, validazione richiesta disponibilità e WhatsApp contestuale (BR-04).
FR-05: quattro pagine statiche appartamento/arrivo IT/EN, link dalle home e pacchetto Pages (BR-05).
FR-06: istruzioni Search Console e manutenzione nel dev_status, senza nuovi tracker (BR-06).
## 4. Non-Functional Requirements
NFR-01: nessuna nuova dipendenza runtime o richiesta API per valutazioni; HTML leggibile senza JS.
NFR-02: assenza overflow a 390px, link accessibili e form con feedback localizzato.
NFR-03: nessun POST reale in QA, nessun segreto nuovo, nessun push automatico.
## 5. Data Requirements
Solo HTML: rating Google 4.3/5 count4 verificato 2026-11-12; Booking 9.4/10 count72 rilevazione risultato indicizzato 2026-11-12. Nessun aggregateRating delle testimonianze. Date form ISO locali; ospiti interi 1–5.
## 6. Technical Impact Map
| Azione | File | Motivo |
|---|---|---|
| Modifica | index.html, index-en.html | SEO, letti, CTA, schede, link |
| Modifica | privacy-policy.html, privacy-policy-en.html | canonical e alternates |
| Modifica | css/style.css, js/form.js | schede responsive, WhatsApp e validazione |
| Modifica | robots.txt, sitemap.xml | dominio e nuove pagine |
| Modifica | .github/workflows/pages.yml | includere landing |
| Crea | appartamento-corato.html, apartment-corato.html, come-arrivare.html, getting-here.html | contenuti mirati |
| Modifica | doc/feature/ottimizzazioni-gratuite/*.md | tracking esclusivo |
## 7. Configuration and Environment
GitHub Pages statico; nessuna nuova variabile, DB o migrazione. Python HTTP server locale per QA.
## 8. Edge Cases and Constraints
Date opzionali solo per informazioni; se entrambe presenti partenza successiva. Rating non live chiaramente indicati. No informazioni commerciali inventate. Astro non distribuito, non migrare runtime.
## 9. Acceptance Criteria
AC-01 Given pagine When parser SEO Then URL coerenti (FR-01).
AC-02 Given home IT/EN When lette Then letti confermati (FR-02).
AC-03 Given widget When senza JS Then punteggi e fonti visibili (FR-03).
AC-04 Given form When dati invalidi Then nessuna chiamata; When errore simulato Then dati preservati (FR-04).
AC-05 Given landing When aperte a desktop/mobile Then contenuti, CTA e link validi (FR-05).
## 10. Testing Requirements
Parsing HTML/XML e link locali, JS syntax; test form isolato con mock DOM/fetch per evitare email; verifica browser pagine e form vuoto; controllo pacchetto workflow e diff. Nessun benchmark di ranking o ricezione email dichiarato.
## 11. Open Points
Account Search Console e verifica reale ricezione email a cura del gestore dopo pubblicazione; non bloccano implementazione locale.
