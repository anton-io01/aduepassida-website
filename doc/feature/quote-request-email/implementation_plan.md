# Implementation Plan · Richieste di preventivo via email

## Step 1 · Moduli, informative e verifica locale

Copertura FR-01–FR-05 e NFR-01–NFR-02. Nessuna dipendenza. Aggiornare `index.html`, `index-en.html`, `js/form.js` e le informative HTML. Riutilizzare l’entry point italiano e inizializzare il modulo anche in inglese. Usare la chiave pubblica configurata dal gestore. Nessuna migrazione.

### Definition of Done

- [x] D1 · Entrambe le pagine puntano a Web3Forms e le informative indicano il servizio.
- [x] D2 · Test locali verificano payload, successo, rifiuto, errore di rete e dati non validi.
- [x] D3 · Diff controllato e istruzioni di attivazione registrate nello stato.

La verifica della ricezione reale è successiva alla pubblicazione autorizzata.
