# Requirements — Refactor Sito B&B A Due Passi Da
_Generated: 11 Aprile 2026_
_Source: business_requirements.md + codebase analysis_

## 1. Feature Overview

Ristrutturazione completa del sito statico HTML/CSS/JS per riflettere il modello business corretto (appartamento unico vs hotel multi-camera). Include: correzione testi e capienza, versione inglese completa, nuove sezioni (Galleria Appartamento, Dove Siamo, Dintorni, Recensioni), fix UX mobile e rimozione spinner form.

**Repository:** Sito statico HTML5/CSS3/ES6 vanilla, nessun framework
**Architecture:** Single-page landing con sezioni ancorate, mobile-first responsive

---

## 2. Actors and Main Flow

**Primary Actor:** Visitatore del sito (potenziale cliente B&B)

**Main Flow:**
1. Utente atterra su `index.html` (IT) o `index-en.html` (EN)
2. Visualizza Hero con CTA preventivo
3. Scrolla/esplora sezioni via menu sticky
4. Consulta Struttura → Galleria → Servizi → Dove Siamo → Dintorni → Recensioni
5. Compila form preventivo (Formspree) o clicca WhatsApp
6. Riceve conferma/success message

---

## 3. Functional Requirements

### Core Refactor

| ID | Requisito | Ref BR | Stato |
|----|-----------|--------|-------|
| FR-01 | Rimuovere voce "Camere" dal menu navigazione | BR-1 | 🔲 |
| FR-02 | Aggiungere voce "Galleria" al menu (sostituisce Camere) | BR-7 | 🔲 |
| FR-03 | Rimuovere sezione HTML `#camere` con 4 card camere | BR-1 | 🔲 |
| FR-04 | Aggiornare testi Struttura: "2 camere" (non 4), "fino a 4-5 ospiti" (non 10) | BR-2 | 🔲 |
| FR-05 | Aggiornare JSON-LD Schema.org: `numberOfRooms: 2`, descrizione corretta | BR-2 | 🔲 |
| FR-06 | Aggiornare Hero badges: rimuovere "fino a 10 ospiti" se presente | BR-2 | 🔲 |
| FR-07 | Form Preventivo: rimuovere elemento `.btn-spinner` con icona rotante | BR-8 | 🔲 |
| FR-08 | Form Preventivo: pulsante mostra solo testo "Invia Richiesta" | BR-8 | 🔲 |

### Nuove Sezioni IT

| ID | Requisito | Ref BR | Stato |
|----|-----------|--------|-------|
| FR-09 | Creare sezione `#galleria` con grid/carousel placeholder | BR-7 | 🔲 |
| FR-10 | Creare sezione `#posizione` con: indirizzo, mappa Google embed (iframe), indicazioni stazione/aeroporto | BR-4 | 🔲 |
| FR-11 | Creare sezione `#attrazioni` con 5 card attrazioni Puglia (Bari, Trani, Castel del Monte, Alberobello, Polignano) | BR-5 | 🔲 |
| FR-12 | Creare sezione `#recensioni` con 3-4 testimonial statici (nome, rating, testo) | BR-6 | 🔲 |

### Versione Inglese

| ID | Requisito | Ref BR | Stato |
|----|-----------|--------|-------|
| FR-13 | Creare `index-en.html` completo con tutte le sezioni tradotte | BR-3 | 🔲 |
| FR-14 | Tradurre meta tag SEO: title, description, keywords, Open Graph, Twitter Card | BR-3 | 🔲 |
| FR-15 | Aggiornare hreflang: IT punta a EN, EN punta a IT, x-default a IT | BR-3 | 🔲 |
| FR-16 | Tradurre JSON-LD Schema.org in inglese | BR-3 | 🔲 |
| FR-17 | Aggiornare language toggle: EN linka a index-en.html | BR-3 | 🔲 |

### Fix Mobile CSS

| ID | Requisito | Ref BR | Stato |
|----|-----------|--------|-------|
| FR-18 | Correggere padding/margini sezione FAQ su viewport < 768px | BR-9 | 🔲 |
| FR-19 | Verificare e correggere centratura `.contatti-grid` su mobile | BR-9 | 🔲 |
| FR-20 | Mantenere allineamento testo sinistro per leggibilità | BR-9 | 🔲 |

---

## 4. Non-Functional Requirements

| ID | Requisito | Threshold |
|----|-----------|-----------|
| NFR-01 | Performance: Lighthouse Performance score ≥ 80 | Post-deploy test |
| NFR-02 | Accessibility: Lighthouse Accessibility score ≥ 90, WCAG 2.1 AA compliance | Automated audit |
| NFR-03 | SEO: mantenere struttura dati Schema.org valida, meta tag completi | Google Rich Results Test pass |
| NFR-04 | Responsive: layout funzionante da 320px a 1920px | Manual test su device |
| NFR-05 | Browser support: Chrome, Firefox, Safari, Edge (ultime 2 versioni) | Cross-browser test |
| NFR-06 | Lingua: nessun testo italiano in versione inglese (tranne nomi propri) | Code review |

---

## 5. Data Requirements

### Static Content (HTML)

| Elemento | Tipo | Locazione | Note |
|----------|------|-----------|------|
| Testi sezioni | Static HTML | `index.html`, `index-en.html` | Hardcoded, no CMS |
| Immagini galleria | File system | `/images/appartamento/` | Nuova cartella, placeholder iniziale |
| Immagini attrazioni | File system | `/images/luoghi/` o CDN placeholder | Placeholder iniziale |
| Testimonial | Static HTML | `#recensioni` section | Hardcoded |

### Configuration

| Parametro | Valore | File |
|-----------|--------|------|
| Formspree endpoint | `https://formspree.io/f/mbdpwbbo` | `js/form.js` |
| Google Maps embed | `https://www.google.com/maps/embed?pb=...` | `index.html`, `index-en.html` |
| Coordinate | 41.1536, 16.4082 | JSON-LD |

---

## 6. Technical Impact Map

### HTML Files

| Action | Path | Reason |
|--------|------|--------|
| **MODIFY** | `index.html` | Rimuovere sezione Camere, aggiornare testi, aggiungere sezioni mancanti, rimuovere spinner |
| **CREATE** | `index-en.html` | Versione inglese completa (~500 righe) |
| **MODIFY** | `privacy-policy-en.html` | Completare se mancante (attualmente vuota) |

### CSS Files

| Action | Path | Reason |
|--------|------|--------|
| **MODIFY** | `css/style.css` | Aggiungere stili nuove sezioni (galleria, recensioni, dintorni, posizione), rimuovere stili `.camera-card` se non riutilizzati |
| **MODIFY** | `css/responsive.css` | Correggere padding/margini mobile FAQ e contatti |

### JS Files

| Action | Path | Reason |
|--------|------|--------|
| **MODIFY** | `js/form.js` (o inline) | Rimuovere spinner handling, mantenere solo testo pulsante |
| **CREATE** | `js/gallery.js` (opzionale) | Lightbox/carousel galleria se necessario |

### Assets

| Action | Path | Reason |
|--------|------|--------|
| **CREATE** | `/images/appartamento/` | Cartella per foto appartamento |
| **CREATE** | `/images/appartamento/placeholder.jpg` | Placeholder iniziale |
| **CREATE** | `/images/luoghi/` | Cartella per foto attrazioni Puglia |
| **OPTIONAL** | Rinomina `/images/camere/` | Archiviare o rimuovere foto vecchie |

---

## 7. Configuration and Environment

### No Environment Variables Required
Sito statico, nessuna configurazione runtime.

### Hardcoded Configurations

```javascript
// js/form.js - già esistente, verificare
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbdpwbbo';

// Google Maps iframe (embed standard, no API key)
const GMAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18...';
```

### Language Toggle Logic

```html
<!-- IT version -->
<a href="index.html" class="active">IT</a>
<a href="index-en.html">EN</a>

<!-- EN version -->
<a href="index.html">IT</a>
<a href="index-en.html" class="active">EN</a>
```

---

## 8. Edge Cases and Constraints

| Edge Case | Expected Behavior / Handling |
|-----------|------------------------------|
| EC-1: Immagini mancanti | Usare placeholder.jpg con overlay testo "Foto in arrivo" |
| EC-2: Formspree quota exceeded | Mostrare messaggio errore generico + fallback WhatsApp link |
| EC-3: Google Maps embed non carica | Fallback: indirizzo testuale cliccabile che apre Google Maps |
| EC-4: Link esterni a `#camere` | Ritornano 404/anchor not found — accettabile per refactor |
| EC-5: JS disabilitato | Form funziona comunque (Formspree = POST standard), accordion senza animazione |
| EC-6: Viewport molto stretto (< 320px) | Layout si adatta, scroll orizzontale evitato con `min-width: fit-content` |
| EC-7: Vecchi browser (no ES6) | ES6 modules già gestiti con try/catch in main.js |

---

## 9. Acceptance Criteria

### Scenario: Rimuovere sezione Camere
```gherkin
Given visitatore sulla homepage
When scrolla o clicca menu
Then NON vede voce "Camere" nel menu principale
And NON vede sezione "Le Camere" con 4 card separate
And vede invece sezione "Galleria Appartamento"
```

### Scenario: Versione inglese completa
```gherkin
Given visitatore su index.html
When clicca "EN" nel language toggle
Then viene rediretto a index-en.html
And vede tutte le sezioni tradotte in inglese
And meta tag lang="en" è presente
And hreflang alternates sono corretti
```

### Scenario: Sezione Dove Siamo funzionante
```gherkin
Given visitatore sulla pagina
When clicca "Dove Siamo" nel menu
Then scrolla a sezione #posizione
And vede mappa Google Maps embed interattiva
And vede indirizzo: Via Duomo, 81, 70033 Corato (BA)
And vede indicazioni distanza stazione (700m) e aeroporto (42km)
```

### Scenario: Sezione Dintorni con attrazioni
```gherkin
Given visitatore sulla pagina
When scrolla a sezione #attrazioni
Then vede 5 card attrazioni
And ogni card mostra: nome attrazione, distanza da Corato, breve descrizione
And card includono: Bari, Trani, Castel del Monte, Alberobello, Polignano
```

### Scenario: Sezione Recensioni visibile
```gherkin
Given visitatore sulla pagina
When scrolla a sezione #recensioni
Then vede almeno 3 testimonial
And ogni testimonial mostra: nome ospite, stelle rating, testo recensione
And design è coerente con il resto del sito
```

### Scenario: Pulsante preventivo senza spinner
```gherkin
Given visitatore nella sezione #preventivo
When guarda il pulsante submit
Then vede solo testo "Invia Richiesta"
And NON vede icona <i class="fa-solid fa-spinner fa-spin">
And al click, form viene inviato normalmente
```

### Scenario: Informazioni corrette capienza
```gherkin
Given visitatore su qualsiasi pagina (IT o EN)
When legge sezione Struttura o Hero
Then legge "2 camere" (non 4)
And legge "fino a 4-5 ospiti" (non 10)
And JSON-LD structured data riflette valori corretti
```

### Scenario: Mobile layout corretto
```gherkin
Given visitatore su dispositivo mobile (width < 768px)
When visualizza sezione FAQ
Then accordion è utilizzabile senza overflow orizzontale
And padding laterali sono consistenti con altre sezioni
When visualizza sezione Contatti
Then le 3 card sono impilate verticalmente
And testo rimane allineato a sinistra per leggibilità
```

---

## 10. Testing Requirements

### Unit Tests — N/A
Sito statico senza logiche JavaScript complesse che richiedano unit test.

### Integration Tests — N/A
Nessuna integrazione con API esterne (eccetto Formspree già testato).

### End-to-End / Manual Testing

| Test | Metodo | Criterio |
|------|--------|----------|
| Visual regression | Screenshot comparison | No differenze inaspettate su desktop |
| Mobile responsive | Chrome DevTools (iPhone SE, iPhone 12, Pixel 5) | Layout corretto, no scroll orizzontale |
| Form submit | Test submission su Formspree | Email ricevuta correttamente |
| Language toggle | Click test IT ↔ EN | Navigazione fluida, contenuti corretti |
| SEO validation | Google Rich Results Test | Schema.org valido |
| Accessibility | Lighthouse audit | Score ≥ 90 |
| Performance | Lighthouse audit | Score ≥ 80 |
| Cross-browser | Chrome, Firefox, Safari, Edge | Nessun errore visibile |

### Content Checklist

- [ ] Italiano: nessun riferimento a "4 camere" o "10 ospiti"
- [ ] Inglese: tutti i testi tradotti, nessun italiano rimasto
- [ ] Meta tag: title, description, OG, Twitter Card completi in EN
- [ ] JSON-LD: dati corretti in entrambe le lingue
- [ ] Form: funzionante in entrambe le lingue

---

## 11. Open Points

| # | Description | Owner | Status |
|---|-------------|-------|--------|
| OP-1 | Fornire foto reali appartamento per `/images/appartamento/` | Cliente | 🔲 Opzionale — placeholder OK |
| OP-2 | Fornire testimonial reali per sezione Recensioni | Cliente | 🔲 Opzionale — placeholder OK |
| OP-3 | Verificare esistenza listing Booking.com attivo | Cliente | 🔲 Link attuale potrebbe essere outdated |
| OP-4 | Approvare copy inglese prima del deploy | Cliente | 🔲 Da verificare in fase review |

---

## 12. Dependencies

| Dipendenza | Tipo | Note |
|------------|------|------|
| Font Awesome 6.5.0 | CDN | Icone — già incluso |
| Google Fonts (Lato, Playfair) | CDN | Tipografia — già incluso |
| Formspree | Servizio esterno | Form già configurato |
| Google Maps Embed | CDN/iframe | Nessuna API key richiesta |

---

## 13. Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Formspree cambia endpoint | Low | High | Documentare endpoint in requirements |
| Google Maps embed policy change | Low | Medium | Fallback a link testuale |
| SEO ranking drop per cambio contenuti | Medium | Medium | Mantenere URL esistenti, redirect se necessario |
| Traduzione inglese non accurata | Medium | Medium | Review finale con cliente |

---

## 14. Implementation Order (Suggested)

1. **Fase 1 — Core Refactor IT**
   - Rimuovere sezione Camere
   - Aggiornare testi capienza (2 camere, 4-5 ospiti)
   - Rimuovere spinner form
   - Fix mobile CSS

2. **Fase 2 — Nuove Sezioni IT**
   - Galleria Appartamento
   - Dove Siamo (con mappa)
   - Dintorni (5 attrazioni)
   - Recensioni (testimonial)

3. **Fase 3 — Versione Inglese**
   - Duplicare e tradurre index.html
   - Tradurre privacy-policy-en.html
   - Verificare hreflang

4. **Fase 4 — Testing & Deploy**
   - Cross-browser test
   - Mobile test
   - SEO validation
   - Content review

---

**Document References:**
- Business Requirements: `@/home/anton/Project/B&B - A Due Passi Da/docs/feature/refactor/business_requirements.md`
- Sparring Log: `@/home/anton/Project/B&B - A Due Passi Da/docs/feature/refactor/sparring_log.md`
