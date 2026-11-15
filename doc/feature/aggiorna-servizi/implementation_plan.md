# Implementation plan — Aggiornamento servizi

Fonte `requirements.md`.

| Requisiti | Step |
| --- | --- |
| FR-01–04, NFR-01 | 1 |

## Step 1 — Aggiornare il catalogo bilingue

Rimuovere da `src/data/services.yaml` e da `services.labels` in `src/i18n/it.json` e `src/i18n/en.json` le sei voci elencate nei requisiti. Sostituire la chiave `highchair` con `crib` nella stessa posizione e localizzare il testo. Riutilizzare categoria, icona e indicazione di servizio incluso.

Nessuna dipendenza tra step. Nessuna configurazione o migrazione.

Eseguire `npm run build`. Confrontare la griglia delle due home con l’elenco atteso ricavato dalla base e verificare le chiavi localizzate. Registrare le evidenze in `dev_status.md`.

- [x] S1-T — Build riuscita e corrispondenza esatta tra catalogo e chiavi delle due lingue.
- [x] S1-F — Entrambe le home mostrano la culla inclusa. Le sei voci rimosse e il seggiolone sono assenti dalla griglia, le altre voci conservano ordine, etichette e badge.

## Punti aperti

Nessuno.
