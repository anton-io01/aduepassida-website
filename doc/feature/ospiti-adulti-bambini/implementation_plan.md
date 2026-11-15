# Piano di implementazione · Adulti e bambini nel preventivo

_Data: 13 novembre 2026_

_Fonte: requirements.md_

## Copertura

Lo step 1 copre FR-01–FR-05, NFR-01–NFR-02 e AC-01–AC-03.

## Step 1 · Aggiornare e verificare il modulo preventivo

### File

- `index.html`, `index-en.html`, `src/components/QuoteForm.astro` e i dizionari `src/i18n/{it,en}.json` per selettori, gruppo e traduzioni.
- `js/form.js` e `public/scripts/form.js` per validazione e invio.
- `css/style.css` e `src/styles/style.css` per lo stile del gruppo.

### Dipendenze

Base fissa `9073ca23a8a9e9efbea0197f6faabe77735530bb`.

### Implementazione

Usare un gruppo con legenda, selettori nativi e messaggio associato. Riutilizzare la griglia responsiva del modulo. Validare gli intervalli e la somma prima di creare il corpo della richiesta. Aggiungere la somma alla chiave `num_ospiti` mantenendo i due campi nuovi. Dichiarare il campo totale anche nel markup Astro affinché Netlify lo rilevi.

### Configurazione e database

Nessuna modifica.

### Verifiche

Servire l’artefatto statico e la build Astro in locale. Controllare in Chrome le etichette, l’ordine da tastiera, il layout mobile, i limiti e i payload, intercettando le richieste ai servizi.

### Documentazione

Aggiornare `dev_status.md` con gli esiti prima del commit.

### Definition of Done

- [x] DOD-01. Assemblaggio statico, build Astro, sintassi JavaScript e diff validi.
- [x] DOD-02. Etichette, opzioni e disposizione desktop/mobile verificate (AC-01).
- [x] DOD-03. Errori localizzati, correzione e corpo inviato verificati nei quattro percorsi (AC-02, AC-03).

## Rischi

I due ambienti hanno script e servizi di invio distinti. Intercettare i POST in entrambi per verificare le rispettive serializzazioni.
