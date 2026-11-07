# Requisiti tecnici — Immagini e home inglese

## Flusso

Il visitatore apre la home, consulta le foto e può cambiare lingua o chiedere un preventivo.

## Requisiti

- FR-01 — Ricodificare e ridimensionare le immagini effettivamente usate dalle home statiche (BR-01).
- FR-02 — Allineare markup, fotografie e sezioni inglesi alla home italiana (BR-02).
- FR-03 — Tradurre i testi della pagina e quelli generati da servizi e modulo, inclusa la richiesta WhatsApp (BR-02).
- NFR-01 — Ridurre di almeno il 90% i byte complessivi delle foto usate dalle home statiche, mantenendo proporzioni e caricamento differito fuori dalla prima schermata.

## Impatto

- `images/{hero,struttura,appartamento,luoghi}/` per gli asset statici.
- `index.html` e `index-en.html` per caricamento e parità tra lingue.
- `js/main.js` e `js/form.js` per la localizzazione dei comportamenti condivisi.
- `public/images/hero/hero-bg.jpg` per la copia Astro della copertina.

## Dati, configurazione e vincoli

Il contratto del modulo e gli anchor italiani condivisi dalle due lingue restano compatibili. La variante Astro usa componenti condivisi e converte già le foto di galleria, struttura e dintorni. Nessuna modifica di database o infrastruttura.

## Accettazione e verifiche

AC-01 — Misurare i byte, verificare decodifica, dimensioni e riferimenti delle foto. AC-02 — Confrontare le sezioni e provare menu, carosello, FAQ e validazione del preventivo, senza inviare richieste reali. Controllare la sintassi degli script.

## Punti aperti

Nessuno.
