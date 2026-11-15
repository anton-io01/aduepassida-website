# Implementation plan — Aggiornamento delle home bilingui

Fonte `requirements.md`.

| Requisiti | Step |
| --- | --- |
| FR-01–07 e NFR-01–02 | 1 |

## Step 1 — Aggiornare azioni, contenuti e posizione

Aggiornare `Hero.astro` con i pulsanti preventivo e WhatsApp. Estrarre in `src/i18n/utils.ts` la costruzione del link già usato da `Contacts.astro` e riutilizzarla. Sostituire gli stili dei badge con una disposizione flessibile per i pulsanti.

Aggiornare le traduzioni in `src/i18n/` per struttura, FAQ, servizio caffè e descrizione. In `SEOHead.astro` allineare il servizio nei dati strutturati. In `Location.astro` usare la destinazione Maps fornita nel link esterno.

Nessuna dipendenza fra step. Nessuna configurazione o migrazione. Verificare il risultato con `npm run build`, confronto dei dati renderizzati, anteprima Chromium e prova delle FAQ e degli URL. Documentare gli esiti in `dev_status.md`.

- [x] S1-T — Build riuscita e controlli sulle due pagine renderizzate, sulle destinazioni e sui metadati superati.
- [x] S1-F — In Chromium le due home mostrano i pulsanti senza sovrapposizione a 320 e 1280 px e le FAQ pertinenti si aprono con i nuovi testi.

## Punti aperti

Nessuno.
