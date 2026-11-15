# Implementation Plan — Astro su GitHub Pages

_Generato il 15 novembre 2026. Fonte: requirements.md._

## Copertura

| Requisiti | Step |
| --- | --- |
| FR-02, FR-03, FR-04, FR-05, FR-07, NFR-02, NFR-03 | 1 |
| FR-01, FR-06, NFR-01 | 2 |

## Step 1 — Portare gli indirizzi e i comportamenti pubblici nella build Astro

Confrontare la build con la versione statica di riferimento. Aggiornare `astro.config.mjs`, `src/pages/`, i18n, metadati e link condivisi. Portare le differenze di contenuto, stili, immagini e interazioni necessarie nei componenti, in `src/assets/` e in `public/`. Usare il modulo Web3Forms esistente con convalida e feedback localizzati. Preservare i testi pubblici della privacy.

Dipendenze: Node 22 e lockfile esistente. Nessun database.

Verifica AC-01–04 su anteprima e browser. Ispezionare gli URL e i riferimenti e intercettare il traffico Web3Forms per confermare payload ed esiti.

- [x] S1-T — La build genera i quattro documenti e tutti i riferimenti interni richiesti.
- [x] S1-F — Il browser conferma navigazione, interazioni e invio simulato nelle due lingue, inclusi errore e capacità.

## Step 2 — Pubblicare la build Astro e rimuovere le copie

Sostituire l’assemblaggio nel workflow con installazione bloccata e build Astro. Mantenere il deploy di `dist/` da `main`. Eliminare HTML, stili, script, immagini e file SEO della vecchia versione in radice e la configurazione della piattaforma dismessa. Adeguare README e riferimenti documentali interessati.

Dipendenza: Step 1. Nessun database.

Verifica AC-01 e AC-05 con installazione pulita e build dopo la rimozione. Rieseguire i controlli sulle pagine e ispezionare il diff da committare.

- [x] S2-T — La build pulita passa senza le copie e il workflow carica solo `dist/` per il deploy da `main`.
- [x] S2-F — L’artefatto finale conserva i quattro URL e i flussi verificati. Il README indica la sorgente e la pubblicazione effettive.

## Rischi

La build locale verifica l’integrazione browser simulando le risposte del servizio. Deploy e consegna email reale sono verificabili dopo l’integrazione e la pubblicazione.
