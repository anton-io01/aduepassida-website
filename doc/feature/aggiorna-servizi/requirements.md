# Requirements — Aggiornamento servizi

Fonte `business_requirements.md` e analisi della base fissa.

## 1. Obiettivo e flusso

`Services.astro` rende lo stesso catalogo sulle home `/` e `/index-en.html` con le etichette della lingua selezionata.

## 2. Requisiti funzionali

- FR-01 — Eliminare dal catalogo e dalle traduzioni le chiavi `soundproofing`, `stroller`, `invoice`, `extinguisher`, `codetector` e `keys`. Rif. BR-01.
- FR-02 — Sostituire `highchair` con `crib` nella stessa posizione del catalogo e con la stessa indicazione di servizio incluso. Rif. BR-02.
- FR-03 — Localizzare `crib` come «Culla per bambini» e «Crib». Rif. BR-02.
- FR-04 — Conservare contenuto, ordine relativo e indicazioni di costo delle altre voci. Rif. BR-03.

## 3. Requisiti non funzionali

- NFR-01 — Le chiavi del catalogo corrispondono esattamente alle chiavi delle etichette in entrambe le lingue.

## 4. Dati e impatto

- `src/data/services.yaml` contiene chiave, icona, categoria e indicazione di servizio incluso.
- `src/i18n/it.json` e `src/i18n/en.json` contengono le etichette localizzate in `services.labels`.

## 5. Configurazione

Build Astro con installazione esistente da lockfile. Nessuna migrazione dati.

## 6. Vincoli e casi limite

Il «Rilevatore CO» corrisponde alla voce del rilevatore indicata nella richiesta. Le occorrenze testuali nelle altre sezioni sono fuori perimetro.

## 7. Accettazione e prove

- AC-01 — Date le due home generate, quando si legge la griglia, allora mostra la culla inclusa e omette tutte le voci rimosse. Rif. FR-01–03.
- AC-02 — Date le griglie della base e della nuova build, quando si confrontano le voci rimanenti, allora ordine, testi e badge coincidono. Rif. FR-04 e NFR-01.

Eseguire la build e confrontare etichette e badge nelle due pagine servite localmente.

## 8. Punti aperti

Nessuno.
