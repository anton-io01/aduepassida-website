# Piano — Aggiorna contatti
_Fonte: requirements.md_

## Copertura

FR-01–05 e NFR-01 sono coperti dallo step 1.

## Step 1 — Aggiornare recapiti e visibilità

### File

Modificare `index.html`, `index-en.html`, `js/form.js`, `src/components/{Contacts,Footer,QuoteForm,SEOHead}.astro` e `src/i18n/{it,en}.json`.

### Dipendenze

Nessuna.

### Implementazione

Sostituire indirizzo e numeri nelle home, nelle traduzioni e nei link del preventivo. Togliere la nota WhatsApp e nascondere il box Booking con `hidden`. Aggiornare lo stato di sviluppo dopo le verifiche. Configurazione e database non applicabili.

### Verifiche e criteri di completamento

- [x] Controlli su destinazioni, dizionari JSON e diff superati (AC-01, FR-01–03).
- [x] HTML delle home analizzato con HTML::Parser, nota assente, attributo hidden presente sul box Booking e CSS senza override di display (AC-01–02, FR-04–05, NFR-01).

## Punti aperti e rischi

Nessun punto aperto. Verificare separatamente le due home statiche perché hanno strutture diverse.
