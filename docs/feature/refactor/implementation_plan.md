# Implementation Plan — Refactor Sito B&B A Due Passi Da
_Generated: 11 Aprile 2026_
_Source: requirements.md_

## Coverage Matrix

| Requirement | Description | Step(s) |
|-------------|-------------|---------|
| FR-01 | Rimuovere "Camere" dal menu | Step 1 |
| FR-02 | Aggiungere "Galleria" al menu | Step 2 |
| FR-03 | Rimuovere sezione HTML `#camere` | Step 1 |
| FR-04 | Aggiornare testi Struttura (2 camere, 4-5 ospiti) | Step 1 |
| FR-05 | Aggiornare JSON-LD Schema.org | Step 1 |
| FR-06 | Aggiornare Hero badges | Step 1 |
| FR-07 | Rimuovere `.btn-spinner` dal form | Step 1 |
| FR-08 | Pulsante solo testo "Invia Richiesta" | Step 1 |
| FR-09 | Creare sezione `#galleria` | Step 2 |
| FR-10 | Creare sezione `#posizione` con mappa | Step 2 |
| FR-11 | Creare sezione `#attrazioni` (5 card) | Step 2 |
| FR-12 | Creare sezione `#recensioni` | Step 2 |
| FR-13 | Creare `index-en.html` completo | Step 3 |
| FR-14 | Tradurre meta tag SEO (EN) | Step 3 |
| FR-15 | Aggiornare hreflang | Step 1, Step 3 |
| FR-16 | Tradurre JSON-LD (EN) | Step 3 |
| FR-17 | Language toggle link corretto | Step 1, Step 3 |
| FR-18 | Correggere padding FAQ mobile | Step 1 |
| FR-19 | Correggere centratura Contatti mobile | Step 1 |
| FR-20 | Mantenere allineamento sinistro | Step 1 |
| NFR-01 | Performance ≥ 80 | Step 4 |
| NFR-02 | Accessibility ≥ 90 | Step 4 |
| NFR-03 | SEO Schema.org valido | Step 4 |
| NFR-04 | Responsive 320px-1920px | Step 4 |
| NFR-05 | Cross-browser support | Step 4 |
| NFR-06 | No italiano in versione EN | Step 3, Step 4 |

---

## Step 1 — Core Refactor IT: Rimuovere Camere, Correggere Testi, Fix Mobile, Rimuovere Spinner

### Overview
Step iniziale per stabilire la base corretta del sito italiano. Rimuove la sezione camere obsolete, aggiorna tutti i riferimenti alla capienza (2 camere, 4-5 ospiti), corregge problemi CSS mobile e semplifica il pulsante del form.

**Implements:** FR-01, FR-03, FR-04, FR-05, FR-06, FR-07, FR-08, FR-15 (hreflang base), FR-17 (toggle IT), FR-18, FR-19, FR-20, EC-4, EC-5, EC-6

### Files Involved

| Action | Path | Reason |
|--------|------|--------|
| **MODIFY** | `index.html` | Rimuovere menu "Camere", sezione `#camere`, aggiornare testi Struttura/Hero, aggiornare JSON-LD, fix hreflang base |
| **MODIFY** | `css/style.css` | Rimuovere stili `.camere-grid`, `.camera-card` (se non riutilizzati per galleria) |
| **MODIFY** | `css/responsive.css` | Aggiungere regole mobile per FAQ padding, verificare `.contatti-grid` margini |
| **MODIFY** | `js/form.js` (o `index.html` inline) | Rimuovere `.btn-spinner` dall'HTML del pulsante, rimuovere JS che gestisce lo spinner |

### Dependencies
- **None** — Questo è lo step iniziale

---

### 1. Implementation Plan

#### 1.1 Code Changes — index.html

**A. Menu navigazione (linea ~90-98):**
```html
<!-- RIMUOVERE -->
<li><a href="#camere">Camere</a></li>

<!-- AGGIUNGERE (placeholder per ora, attivo in Step 2) -->
<li><a href="#galleria">Galleria</a></li>
```

**B. Rimuovere sezione `#camere` completa (linea ~173-228):**
Eliminare l'intero `<section id="camere" class="section section-alt">...</section>`

**C. Aggiornare sezione Struttura (linea ~130-170):**
- Testo: "4 camere" → "2 camere"
- Testo: "fino a 10 ospiti" → "fino a 4-5 ospiti"
- Highlights: aggiornare bullet points

**D. Aggiornare Hero badges (linea ~118-121):**
- Rimuovere/modificare badge "Fino a 10 ospiti" → "Fino a 4-5 ospiti"

**E. Aggiornare JSON-LD Schema.org (linea ~47-83):**
```javascript
"numberOfRooms": 2,  // era 4
"description": "Appartamento privato nel centro storico di Corato, Puglia. 2 camere, fino a 4-5 ospiti."
```

**F. Verificare language toggle (linea ~99-103):**
```html
<div class="lang-toggle">
    <a href="index.html" class="active" aria-label="Versione italiana">IT</a>
    <span>|</span>
    <a href="index-en.html" aria-label="English version">EN</a>
</div>
```

**G. Rimuovere sezione vuota placeholder (linea ~229):**
```html
<section id="galleria"><!-- Popolato in Step 2 --></section>
```

**H. Form preventivo — rimuovere spinner (linea ~316-319):**
```html
<!-- PRIMA -->
<button type="submit" class="btn btn-primary form-submit" id="form-submit-btn">
    <span class="btn-text">Invia Richiesta</span>
    <span class="btn-spinner" hidden><i class="fa-solid fa-spinner fa-spin"></i></span>
</button>

<!-- DOPO -->
<button type="submit" class="btn btn-primary form-submit" id="form-submit-btn">
    Invia Richiesta
</button>
```

#### 1.2 Configuration and Database
**N/A** — Nessuna configurazione o database

#### 1.3 Testing

**Unit Tests:** N/A

**Integration Tests:** N/A

**Manual/E2E Tests:**
| Test | Criterio |
|------|----------|
| AC-1: Rimuovere sezione Camere | Menu non mostra "Camere", sezione `#camere` assente, vede "Galleria" nel menu |
| AC-7: Pulsante preventivo | Pulsante mostra solo testo, nessuna icona spinner visibile |
| AC-8: Informazioni corrette | Testo "2 camere" e "fino a 4-5 ospiti" in Struttura e Hero |
| AC-9: Mobile layout | FAQ padding corretto su mobile, Contatti centrati |

**Performance/Regression:**
- Lighthouse: nessun peggioramento rispetto a baseline

#### 1.4 Documentation Updates
**N/A**

---

### 2. Definition of Done (DoD)

**Technical criteria:**
- [ ] `index.html` modificato: sezione `#camere` rimossa, menu aggiornato, testi corretti, JSON-LD aggiornato
- [ ] `css/responsive.css` modificato: FAQ e Contatti mobile corretti
- [ ] Form pulsante modificato: solo testo, nessuno spinner
- [ ] Nessun errore HTML validation

**Functional criteria:**
- [ ] AC-1: Sezione Camere completamente rimossa, Galleria visibile nel menu (placeholder)
- [ ] AC-7: Pulsante "Invia Richiesta" senza spinner, form funzionante
- [ ] AC-8: Testi aggiornati ovunque (2 camere, 4-5 ospiti)
- [ ] AC-9: Layout mobile FAQ e Contatti corretto

> ⚠️ **Non iniziare Step 2 finché tutti i DoD non sono verificati.**

---

## Step 2 — Nuove Sezioni IT: Galleria, Dove Siamo, Dintorni, Recensioni

### Overview
Aggiunta delle quattro nuove sezioni mancanti al sito italiano. Ciascuna sezione è indipendente e verificabile separatamente.

**Implements:** FR-02 (completo), FR-09, FR-10, FR-11, FR-12, EC-1, EC-3

### Files Involved

| Action | Path | Reason |
|--------|------|--------|
| **MODIFY** | `index.html` | Aggiungere sezioni `#galleria`, `#posizione`, `#attrazioni`, `#recensioni` |
| **MODIFY** | `css/style.css` | Aggiungere stili: `.gallery-grid`, `.attractions-grid`, `.reviews-grid`, `.map-container` |
| **CREATE** | `images/appartamento/placeholder.jpg` | Placeholder galleria |
| **CREATE** | `images/luoghi/` (opzionale) | Cartella per foto attrazioni |

### Dependencies
- **Step 1 completato** — Menu già aggiornato con link "Galleria"
- **Step 1 completato** — Sezione `#galleria` placeholder esistente (da popolare)

---

### 1. Implementation Plan

#### 1.1 Code Changes — index.html

**A. Sezione Galleria `#galleria` (dopo `#struttura`):**
```html
<section id="galleria" class="section section-alt">
    <div class="container">
        <h2 class="section-title">Galleria Appartamento</h2>
        <p class="section-subtitle">Scopri gli spazi del tuo appartamento a Corato</p>
        <div class="gallery-grid">
            <div class="gallery-item">
                <img src="images/appartamento/placeholder.jpg" alt="Interno appartamento - Foto in arrivo" loading="lazy">
                <div class="gallery-overlay">
                    <span>Foto in arrivo</span>
                </div>
            </div>
            <!-- Ripetere 4-6 placeholder -->
        </div>
        <p class="gallery-note"><i class="fa-solid fa-image"></i> Le foto dell'appartamento verranno aggiunte a breve.</p>
    </div>
</section>
```

**B. Sezione Dove Siamo `#posizione` (popolare placeholder esistente linea ~239):**
```html
<section id="posizione" class="section">
    <div class="container">
        <h2 class="section-title">Dove Siamo</h2>
        <p class="section-subtitle">Nel cuore del centro storico di Corato</p>
        
        <div class="location-grid">
            <div class="location-info">
                <div class="location-address">
                    <i class="fa-solid fa-location-dot"></i>
                    <div>
                        <strong>A Due Passi Da</strong>
                        <p>Via Duomo, 81<br>70033 Corato (BA) - Italia</p>
                    </div>
                </div>
                
                <div class="location-directions">
                    <h3><i class="fa-solid fa-train"></i> Dalla Stazione FS</h3>
                    <p>Stazione di Corato a 700 metri (10 minuti a piedi)</p>
                    
                    <h3><i class="fa-solid fa-plane"></i> Dall'Aeroporto</h3>
                    <p>Aeroporto di Bari Karol Wojtyla a 42 km</p>
                </div>
            </div>
            
            <div class="location-map">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.238123456789!2d16.4082!3d41.1536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA5JzEzLjAiTiAxNsKwMjQnMjkuNSJF!5e0!3m2!1sit!2sit!4v1234567890"
                    width="100%" 
                    height="400" 
                    style="border:0; border-radius: 16px;" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Mappa A Due Passi Da">
                </iframe>
                <p class="map-fallback">
                    <a href="https://maps.google.com/?q=Via+Duomo+81,+Corato,+BA" target="_blank" rel="noopener">
                        <i class="fa-solid fa-external-link"></i> Apri in Google Maps
                    </a>
                </p>
            </div>
        </div>
    </div>
</section>
```

**C. Sezione Dintorni `#attrazioni` (popolare placeholder esistente linea ~240):**
```html
<section id="attrazioni" class="section section-alt">
    <div class="container">
        <h2 class="section-title">Dintorni</h2>
        <p class="section-subtitle">Scopri le meraviglie della Puglia da Corato</p>
        
        <div class="attractions-grid">
            <article class="attraction-card">
                <div class="attraction-image">
                    <img src="images/luoghi/bari.jpg" alt="Bari" loading="lazy" onerror="this.src='images/luoghi/placeholder.jpg'">
                </div>
                <div class="attraction-content">
                    <span class="attraction-distance"><i class="fa-solid fa-route"></i> 42 km</span>
                    <h3>Bari</h3>
                    <p>La città vecchia con il lungomare e la Basilica di San Nicola. Perfetta per una giornata tra storia e cucina.</p>
                </div>
            </article>
            
            <article class="attraction-card">
                <div class="attraction-image">
                    <img src="images/luoghi/trani.jpg" alt="Trani" loading="lazy" onerror="this.src='images/luoghi/placeholder.jpg'">
                </div>
                <div class="attraction-content">
                    <span class="attraction-distance"><i class="fa-solid fa-route"></i> 55 km</span>
                    <h3>Trani</h3>
                    <p>La cattedrale bianca sul mare, il porto e il castello svevo. Una gemma della costa adriatica.</p>
                </div>
            </article>
            
            <article class="attraction-card">
                <div class="attraction-image">
                    <img src="images/luoghi/castel-del-monte.jpg" alt="Castel del Monte" loading="lazy" onerror="this.src='images/luoghi/placeholder.jpg'">
                </div>
                <div class="attraction-content">
                    <span class="attraction-distance"><i class="fa-solid fa-route"></i> 38 km</span>
                    <h3>Castel del Monte</h3>
                    <p>Patrimonio UNESCO, l'enigmatico castello ottagonale di Federico II. Un capolavoro medioevale.</p>
                </div>
            </article>
            
            <article class="attraction-card">
                <div class="attraction-image">
                    <img src="images/luoghi/alberobello.jpg" alt="Alberobello" loading="lazy" onerror="this.src='images/luoghi/placeholder.jpg'">
                </div>
                <div class="attraction-content">
                    <span class="attraction-distance"><i class="fa-solid fa-route"></i> 65 km</span>
                    <h3>Alberobello</h3>
                    <p>I famosi trulli, abitazioni coniche patrimonio UNESCO. Un villaggio unico al mondo.</p>
                </div>
            </article>
            
            <article class="attraction-card">
                <div class="attraction-image">
                    <img src="images/luoghi/polignano.jpg" alt="Polignano a Mare" loading="lazy" onerror="this.src='images/luoghi/placeholder.jpg'">
                </div>
                <div class="attraction-content">
                    <span class="attraction-distance"><i class="fa-solid fa-route"></i> 70 km</span>
                    <h3>Polignano a Mare</h3>
                    <p>Spiagge mozzafiato, scogliere a strapiombo sul mare e la famosa Lama Monachile.</p>
                </div>
            </article>
        </div>
    </div>
</section>
```

**D. Sezione Recensioni `#recensioni` (popolare placeholder esistente linea ~241):**
```html
<section id="recensioni" class="section">
    <div class="container">
        <h2 class="section-title">Recensioni</h2>
        <p class="section-subtitle">Cosa dicono i nostri ospiti</p>
        
        <div class="reviews-grid">
            <article class="review-card">
                <div class="review-header">
                    <div class="review-stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <span class="review-date">Gennaio 2026</span>
                </div>
                <blockquote class="review-text">
                    "Appartamento delizioso nel cuore del centro storico. Pulito, accogliente e perfetto per la nostra famiglia. Antonio è stato gentilissimo!"
                </blockquote>
                <div class="review-author">
                    <strong>Marco e Laura</strong>
                    <span>Da Milano</span>
                </div>
            </article>
            
            <article class="review-card">
                <div class="review-header">
                    <div class="review-stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <span class="review-date">Dicembre 2025</span>
                </div>
                <blockquote class="review-text">
                    "Posizione perfetta per esplorare la Puglia. L'appartamento ha tutto il necessario e la colazione inclusa è stata una piacevole sorpresa."
                </blockquote>
                <div class="review-author">
                    <strong>Famiglia Rossi</strong>
                    <span>Da Torino</span>
                </div>
            </article>
            
            <article class="review-card">
                <div class="review-header">
                    <div class="review-stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                    </div>
                    <span class="review-date">Novembre 2025</span>
                </div>
                <blockquote class="review-text">
                    "Ottimo rapporto qualità-prezzo. L'appartamento è spazioso e ben arredato. Consigliatissimo per chi vuole vivere il vero centro storico."
                </blockquote>
                <div class="review-author">
                    <strong>Giulia B.</strong>
                    <span>Da Roma</span>
                </div>
            </article>
        </div>
    </div>
</section>
```

#### 1.2 Configuration and Database
**N/A**

#### 1.3 Testing

**Manual/E2E Tests:**
| Test | Criterio |
|------|----------|
| AC-3: Sezione Dove Siamo | Mappa embed visibile, indirizzo corretto, indicazioni stazione/aeroporto |
| AC-4: Sezione Dintorni | 5 card attrazioni visibili, distanze indicate |
| AC-5: Sezione Recensioni | 3 testimonial visibili, design coerente |
| AC-6: Galleria Appartamento | Grid placeholder visibile, nessuna card camera |

**Edge Cases:**
- EC-1: Placeholder mostra messaggio "Foto in arrivo"
- EC-3: Mappa fallback link funzionante

#### 1.4 Documentation Updates
**N/A**

---

### 2. Definition of Done (DoD)

**Technical criteria:**
- [ ] Sezioni `#galleria`, `#posizione`, `#attrazioni`, `#recensioni` presenti in `index.html`
- [ ] CSS stili per tutte le nuove sezioni in `style.css`
- [ ] Placeholder immagini creati in `images/appartamento/` e `images/luoghi/`
- [ ] Nessun errore HTML/CSS validation

**Functional criteria:**
- [ ] AC-3: Mappa Google embed interattiva, fallback link funzionante
- [ ] AC-4: 5 card attrazioni (Bari, Trani, Castel del Monte, Alberobello, Polignano)
- [ ] AC-5: 3 testimonial con stelle, testo, autore
- [ ] AC-6: Galleria placeholder con messaggio "Foto in arrivo"

> ⚠️ **Non iniziare Step 3 finché tutti i DoD non sono verificati.**

---

## Step 3 — Versione Inglese Completa

### Overview
Creazione della versione inglese completa duplicando e traducendo l'intero `index.html`, inclusi meta tag SEO, Schema.org e privacy policy.

**Implements:** FR-13, FR-14, FR-15, FR-16, FR-17 (completo), NFR-06

### Files Involved

| Action | Path | Reason |
|--------|------|--------|
| **CREATE** | `index-en.html` | Versione inglese completa (~500 righe) tradotta da `index.html` |
| **MODIFY** | `index.html` | Aggiornare hreflang per includere riferimento a EN |
| **CREATE** | `privacy-policy-en.html` | Privacy policy tradotta (da placeholder vuoto) |

### Dependencies
- **Step 1 completato** — Struttura base corretta (2 camere, no spinner)
- **Step 2 completato** — Tutte le sezioni IT finalizzate (da tradurre)

---

### 1. Implementation Plan

#### 1.1 Code Changes — index-en.html

**Struttura file:** Duplicare `index.html` e tradurre:

| Elemento | Italiano | Inglese |
|----------|----------|---------|
| `lang` | `it` | `en` |
| Title | "A Due Passi Da – B&B Corato, Puglia..." | "A Due Passi Da – Private Apartment Corato, Puglia..." |
| Meta description | "B&B a Corato..." | "Private apartment in Corato... 2 bedrooms, up to 4-5 guests" |
| Hero pre-title | "Benvenuti a Corato, Puglia" | "Welcome to Corato, Puglia" |
| Hero title | "A Due Passi Da" | "A Due Passi Da" |
| Hero tagline | "Il tuo appartamento privato..." | "Your private apartment in the heart of Puglia" |
| Menu items | Struttura, Galleria, Servizi, Dove Siamo... | Structure, Gallery, Services, Location, Surroundings, Reviews, Quote |
| Section titles | La Struttura, Galleria Appartamento... | The Structure, Apartment Gallery... |
| JSON-LD | Italiano | Inglese |
| Form labels | Nome e Cognome, Email... | Full Name, Email... |
| FAQ | Italiano | Inglese |
| Footer | Tutti i testi | Tradotti |

**Hreflang aggiornato (entrambi i file):**
```html
<!-- In index.html (IT) -->
<link rel="alternate" hreflang="it" href="https://anton-io01.github.io/aduepassida-website/">
<link rel="alternate" hreflang="en" href="https://anton-io01.github.io/aduepassida-website/index-en.html">
<link rel="alternate" hreflang="x-default" href="https://anton-io01.github.io/aduepassida-website/">

<!-- In index-en.html (EN) -->
<link rel="alternate" hreflang="it" href="https://anton-io01.github.io/aduepassida-website/">
<link rel="alternate" hreflang="en" href="https://anton-io01.github.io/aduepassida-website/index-en.html">
<link rel="alternate" hreflang="x-default" href="https://anton-io01.github.io/aduepassida-website/">
```

#### 1.2 Configuration and Database
**N/A**

#### 1.3 Testing

**Manual/E2E Tests:**
| Test | Criterio |
|------|----------|
| AC-2: Versione inglese | `index-en.html` accessibile, tutte le sezioni presenti |
| NFR-06: No italiano | Nessun testo italiano in EN (tranne nomi: A Due Passi Da, Corato, Puglia) |
| Language toggle | Click IT/EN naviga correttamente tra le versioni |

#### 1.4 Documentation Updates
**N/A**

---

### 2. Definition of Done (DoD)

**Technical criteria:**
- [ ] `index-en.html` creato con tutte le sezioni tradotte
- [ ] `privacy-policy-en.html` creato con privacy policy tradotta
- [ ] Hreflang corretto in entrambi i file
- [ ] Meta tag SEO tradotti (title, description, OG, Twitter)
- [ ] JSON-LD tradotto

**Functional criteria:**
- [ ] AC-2: Versione inglese completa e navigabile
- [ ] Language toggle funzionante IT ↔ EN
- [ ] Nessun testo italiano in versione EN (nomi propri esclusi)

> ⚠️ **Non iniziare Step 4 finché tutti i DoD non sono verificati.**

---

## Step 4 — Testing, Validazione e Ottimizzazione

### Overview
Fase di verifica completa: testing manuale, audit SEO/accessibilità/performance, cross-browser.

**Implements:** NFR-01, NFR-02, NFR-03, NFR-04, NFR-05, AC-1 through AC-9 (final verification)

### Files Involved

| Action | Path | Reason |
|--------|------|--------|
| **MODIFY** | `css/style.css`, `css/responsive.css` | Fix ottimizzazioni post-testing |
| **MODIFY** | `index.html`, `index-en.html` | Fix minori emergenti dai test |

### Dependencies
- **Step 1, 2, 3 completati** — Tutti i contenuti in place

---

### 1. Implementation Plan

#### 1.1 Code Changes
**Fix iterativi** in base ai risultati dei test:
- Ottimizzazioni CSS per performance
- Fix accessibility (contrasti, aria-label mancanti)
- Fix responsive edge cases

#### 1.2 Configuration and Database
**N/A**

#### 1.3 Testing

**Test Suite Completa:**

| Test | Tool/Metodo | Criterio | FR/NFR Ref |
|------|-------------|----------|------------|
| Lighthouse Performance | Chrome DevTools | Score ≥ 80 | NFR-01 |
| Lighthouse Accessibility | Chrome DevTools | Score ≥ 90 | NFR-02 |
| Lighthouse SEO | Chrome DevTools | No errori critici | NFR-03 |
| Google Rich Results | validator.schema.org | JSON-LD valido | NFR-03 |
| Mobile Responsive | DevTools (320px-768px) | No overflow, layout corretto | NFR-04 |
| Desktop Responsive | DevTools (1920px) | Layout corretto | NFR-04 |
| Cross-browser | Chrome, Firefox, Safari, Edge | Nessun errore visibile | NFR-05 |
| Form submit | Test reale Formspree | Email ricevuta | FR-07, FR-08 |
| Language toggle | Manuale | Navigazione fluida | FR-17 |
| Link check | Manuale | Nessun link rotto | - |
| HTML validation | validator.w3.org | No errori | - |

**Content Checklist:**
- [ ] IT: nessun riferimento a "4 camere" o "10 ospiti"
- [ ] EN: tutti i testi tradotti
- [ ] EN: nessun testo italiano (tranne nomi propri)
- [ ] Entrambe le lingue: form funzionante

#### 1.4 Documentation Updates
**N/A**

---

### 2. Definition of Done (DoD)

**Technical criteria:**
- [ ] Lighthouse Performance ≥ 80
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Google Rich Results Test: JSON-LD valido
- [ ] HTML validation: no errori
- [ ] Cross-browser test: pass su Chrome, Firefox, Safari, Edge

**Functional criteria:**
- [ ] Tutti gli AC (1-9) verificati e passati
- [ ] Form submit funzionante in entrambe le lingue
- [ ] Nessun link rotto

> ⚠️ **Non iniziare Step 5 finché tutti i DoD non sono verificati.**

---

## Step 5 — Assets Finali e Deployment Preparation

### Overview
Preparazione finale: creazione placeholder immagini, cleanup, README aggiornato.

**Implements:** EC-1, OP-1, OP-2

### Files Involved

| Action | Path | Reason |
|--------|------|--------|
| **CREATE** | `images/appartamento/placeholder.jpg` | Placeholder galleria |
| **CREATE** | `images/luoghi/placeholder.jpg` | Placeholder attrazioni |
| **MODIFY** | `README.md` | Aggiornare con nuova struttura |

### Dependencies
- **Step 4 completato** — Testing passato

---

### 1. Implementation Plan

#### 1.1 Code Changes
**README.md aggiornato:**
- Descrizione nuova struttura sito
- Sezioni presenti
- Istruzioni per aggiungere foto reali

#### 1.2 Configuration and Database
**N/A**

#### 1.3 Testing
**N/A** — Step amministrativo

#### 1.4 Documentation Updates
- `README.md`: documentazione aggiornata
- Eventuali note per il cliente su OP-1, OP-2

---

### 2. Definition of Done (DoD)

**Technical criteria:**
- [ ] Placeholder immagini creati
- [ ] README.md aggiornato
- [ ] Codice pulito, nessun commento TODO rimasto

**Functional criteria:**
- [ ] Sito pronto per deploy
- [ ] Istruzioni per aggiunta foto reali documentate

---

## Open Points and Risks

| # | Description | Type | Suggested Resolution |
|---|-------------|------|----------------------|
| 1 | Foto reali appartamento mancanti (OP-1) | Decision | Usare placeholder con messaggio "Foto in arrivo". Cliente caricherà foto post-deploy. |
| 2 | Testimonial reali mancanti (OP-2) | Decision | Usare testimonial di esempio realistici. Cliente può sostituire con reali in futuro. |
| 3 | Link Booking.com potrebbe essere outdated (OP-3) | Risk | Verificare con cliente. Se invalido, rimuovere o aggiornare. |
| 4 | Google Maps embed usa coordinate generiche | Risk | Utilizzare URL embed generico. Per maggiore precisione, cliente può fornire link personalizzato. |
| 5 | Traduzione inglese richiede review native speaker | Risk | Testo fornito è professionale ma review finale consigliata. |

---

## Summary

| Step | Titolo | Focus | Est. Time |
|------|--------|-------|-----------|
| 1 | Core Refactor IT | Rimuovere camere, fix testi, fix mobile, rimuovere spinner | 1h |
| 2 | Nuove Sezioni IT | Galleria, Dove Siamo, Dintorni, Recensioni | 1.5h |
| 3 | Versione Inglese | Traduzione completa index-en.html | 1.5h |
| 4 | Testing | Validazione, audit, fix | 1h |
| 5 | Final Assets | Placeholder, README, cleanup | 0.5h |
| **Total** | | | **~5.5h** |

---

**Document References:**
- Requirements: `@/home/anton/Project/B&B - A Due Passi Da/docs/feature/refactor/requirements.md`
- Business Requirements: `@/home/anton/Project/B&B - A Due Passi Da/docs/feature/refactor/business_requirements.md`
- Sparring Log: `@/home/anton/Project/B&B - A Due Passi Da/docs/feature/refactor/sparring_log.md`
