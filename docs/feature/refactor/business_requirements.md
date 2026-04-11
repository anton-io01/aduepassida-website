# Business Requirements — Refactor Sito B&B A Due Passi Da

## Overview
Ristrutturazione del sito web del B&B "A Due Passi Da" per riflettere correttamente il modello di business (appartamento unico con 2 camere interne, non hotel multi-camera). Completamento della versione inglese, aggiunta di sezioni mancanti, correzione problemi UX/UI e ottimizzazione mobile.

---

## Current State vs Target State

| Aspetto | Attuale | Target |
|---------|---------|--------|
| Modello | 4 camere separate, fino a 10 ospiti | Appartamento unico, 2 camere + divano letto, fino a 4-5 ospiti |
| Inglese | File vuoto (index-en.html: 12 righe) | Versione completa tradotta manualmente |
| Sezioni | Struttura, Camere (4 card), Servizi, Preventivo, Contatti, FAQ | Struttura, **Galleria Appartamento**, Servizi, **Dove Siamo**, **Dintorni**, **Recensioni**, Preventivo, Contatti, FAQ |
| Menu | Camere, Dove Siamo, Dintorni, Recensioni (link vuoti) | Galleria, Dove Siamo, Dintorni, Recensioni (funzionanti) |
| UX Mobile | FAQ e contatti non centrati | Padding/margini corretti, layout consistente |
| Pulsante | Spinner rotante permanente | Solo testo "Invia Richiesta" |

---

## Actors and Flow

**Primary Actor:** Visitatore del sito (potenziale cliente)

**Flow principale:**
1. Utente atterra sulla landing page (ITA o ENG)
2. Naviga attraverso le sezioni via menu o scroll
3. Visualizza struttura, galleria foto, servizi, posizione, attrazioni
4. Legge recensioni per validazione sociale
5. Compila form preventivo o clicca WhatsApp
6. Riceve conferma invio

---

## Business Rules

### BR-1: Modello Appartamento Unico
- L'appartamento è un'unità singola non frazionabile
- Contiene 2 camere da letto (1 matrimoniale + 1 singola)
- Include divano letto in soggiorno/cucina
- Capacità massima: 4-5 ospiti (non 10)
- **Non è possibile** prenotare camere singolarmente

### BR-2: Contenuti Versione Italiana
- Tutti i testi devono riflettere il modello appartamento unico
- Numero camere: 2 (non 4)
- Capienza: fino a 4-5 ospiti
- Metratura: 50m² (confermato)

### BR-3: Versione Inglese
- Traduzione manuale completa di index.html
- SEO-friendly: meta tag, description, Open Graph in inglese
- Hreflang corretto (it/en)
- Stessa struttura sezioni della versione italiana

### BR-4: Sezione Dove Siamo
- Mappa Google Maps embed (iframe)
- Indirizzo completo: Via Duomo, 81, 70033 Corato (BA)
- Indicazioni dalla Stazione FS Corato (700m)
- Indicazioni da Aeroporto Bari (42km)
- Foto via/esterno (se disponibile)

### BR-5: Sezione Dintorni
- Card attrazioni principali Puglia:
  - Bari (città vecchia, lungomare)
  - Trani (cattedrale sul mare)
  - Castel del Monte (patrimonio UNESCO)
  - Alberobello (trulli)
  - Polignano a Mare (spiaggia)
- Per ogni attrazione: nome, distanza da Corato, breve descrizione, placeholder foto

### BR-6: Sezione Recensioni
- 3-4 testimonial statici selezionati
- Per ogni recensione: nome ospite, provenienza (opzionale), rating, testo
- Design coerente con il resto del sito
- NO widget esterni (Booking/TripAdvisor)

### BR-7: Galleria Appartamento
- Sostituisce la sezione "Le Camere" (4 card)
- Usa nuova cartella `/images/appartamento/`
- Layout: grid o carousel con lightbox
- Placeholder iniziale (foto da aggiungere poi dall'utente)

### BR-8: Form Preventivo
- Mantiene Formspree (già configurato: `mbdpwbbo`)
- **Rimuove** spinner rotante (`fa-spinner fa-spin`)
- Pulsante mostra solo testo "Invia Richiesta"
- Mantiene comportamento post-submit (messaggio successo)

### BR-9: Correzioni Mobile
- FAQ: correggere padding/margini su viewport < 768px
- Contatti: verificare centratura cards su mobile
- Mantenere allineamento sinistro del testo (leggibilità)

---

## Edge Cases and Constraints

### EC-1: Immagini mancanti
- Galleria appartamento: creare struttura con placeholder
- Sezione Dintorni: usare placeholder generici per attrazioni
- Utente caricherà foto reali successivamente

### EC-2: Formspree quota
- Formspree free tier: 50 invii/mese
- Se quota superata: form mostra errore generico (comportamento esistente)

### EC-3: Google Maps embed
- Richiede connessione internet
- Fallback: indirizzo testuale cliccabile

### EC-4: Vecchi link camere
- Link diretti a `#camere` da esterni diventeranno invalidi
- Accettabile: sito in fase di ristrutturazione

---

## Acceptance Criteria

### AC-1: Rimuovere sezione Camere
```gherkin
Given visitatore sulla homepage
When scrolla o clicca menu
Then NON vede voce "Camere" nel menu
And NON vede sezione "Le Camere" con 4 card
```

### AC-2: Versione inglese completa
```gherkin
Given visitatore clicca "EN" nel language toggle
Then vede index-en.html con tutte le sezioni tradotte
And meta tag sono in inglese
And hreflang punta correttamente a versione IT
```

### AC-3: Sezione Dove Siamo
```gherkin
Given visitatore clicca "Dove Siamo" nel menu
Then vede mappa Google embed funzionante
And vede indirizzo completo
And vede indicazioni stazione e aeroporto
```

### AC-4: Sezione Dintorni
```gherkin
Given visitatore clicca "Dintorni" nel menu
Then vede almeno 5 card attrazioni
And ogni card mostra nome, distanza, descrizione
```

### AC-5: Sezione Recensioni
```gherkin
Given visitatore clicca "Recensioni" nel menu
Then vede 3-4 testimonial con nome, rating, testo
And layout è coerente con il resto del sito
```

### AC-6: Galleria Appartamento
```gherkin
Given visitatore nella sezione galleria
Then vede placeholder o foto in /images/appartamento/
And NON vede più le 4 card camere separate
And layout è grid o carousel
```

### AC-7: Pulsante preventivo senza spinner
```gherkin
Given visitatore nella sezione preventivo
When guarda il pulsante "Invia Richiesta"
Then NON vede icona spinner rotante
And vede solo testo "Invia Richiesta"
```

### AC-8: Correzioni testi capienza
```gherkin
Given visitatore su qualsiasi pagina
Then legge "2 camere" e "fino a 4-5 ospiti" (non 4 camere / 10 ospiti)
And JSON-LD structured data è aggiornato
```

### AC-9: Mobile FAQ e Contatti
```gherkin
Given visitatore su dispositivo mobile (width < 768px)
When visualizza sezione FAQ e Contatti
Then elementi hanno padding/margini corretti
And layout è usabile senza overflow orizzontale
```

---

## Impact Map

| Modulo | File | Impatto |
|--------|------|---------|
| Menu | `index.html`, `index-en.html` | Rimuovere "Camere", aggiungere "Galleria" |
| Struttura | `index.html`, `index-en.html` | Aggiornare testi (2 camere, 4-5 ospiti) |
| Camere | `index.html` | **Eliminare** sezione #camere |
| Galleria | `index.html`, `index-en.html` | **Nuova** sezione al posto di Camere |
| Dove Siamo | `index.html`, `index-en.html` | **Nuova** sezione #posizione |
| Dintorni | `index.html`, `index-en.html` | **Nuova** sezione #attrazioni |
| Recensioni | `index.html`, `index-en.html` | **Nuova** sezione #recensioni |
| Preventivo | `index.html`, `index-en.html` | Rimuovi spinner dal pulsante |
| FAQ | `index.html`, `index-en.html` | Correggere CSS mobile |
| CSS | `css/style.css`, `css/responsive.css` | Aggiustamenti layout |
| Assets | `/images/appartamento/` | **Nuova** cartella |

---

## Open Points

- [ ] **OP-1:** Fornire foto per galleria appartamento (da caricare in `/images/appartamento/`)
- [ ] **OP-2:** Fornire testimonial reali per sezione recensioni (opzionale: usare placeholder inizialmente)
- [ ] **OP-3:** Verificare link Booking.com aggiornato (se esiste listing)

---

## Next Steps

1. **Crea implementation plan** con ordine modifiche:
   - Fase 1: Rimozione sezione Camere + correzione testi
   - Fase 2: Nuova versione inglese
   - Fase 3: Nuove sezioni (Dove Siamo, Dintorni, Recensioni, Galleria)
   - Fase 4: Fix mobile e pulsante preventivo
   - Fase 5: Testing e verifica

2. **Stima effort:** ~4-6 ore di sviluppo

3. **Prerequisiti:**
   - OP-1 e OP-2 opzionali (placeholder accettabili)
   - Accesso Google Maps API non richiesto (embed standard)

---

## Riferimenti

- File risposte: `@/home/anton/Project/B&B - A Due Passi Da/docs/feature/refactor/sparring_log.md`
- Sorgente IT: `@/home/anton/Project/B&B - A Due Passi Da/index.html`
- Sorgente EN: `@/home/anton/Project/B&B - A Due Passi Da/index-en.html`
- CSS: `@/home/anton/Project/B&B - A Due Passi Da/css/style.css`, `@/home/anton/Project/B&B - A Due Passi Da/css/responsive.css`
