# Requisiti tecnici

## Contesto e flusso
Il visitatore usa quattro pagine Astro e il modulo bilingue Web3Forms.

## Requisiti funzionali
- FR-01 (BR-01). Menu compatto ai tablet, gestione Esc e lingua corrente.
- FR-02 (BR-01). Link di salto, offset delle ancore e spazio riservato al banner.
- FR-03 (BR-02). Stato di invio localizzato e istruzione di riprova.
- FR-04 (BR-02). Carosello manuale, foto attiva esposta e indicatori decorativi.
- FR-05 (BR-03). Sottotitoli piattaforma, voto accessibile, icone decorative nascoste e link informativa esplicito.
- FR-06 (BR-03). Dimensioni immagini dai metadati.
- FR-07 (BR-04). Letture geometriche separate dalle scritture per WhatsApp.

## Requisiti non funzionali
- NFR-01. Contrasto pulsanti almeno 4,5:1.
- NFR-02. Rispetto di prefers-reduced-motion.
- NFR-03. Nessun overflow delle home tra tablet e desktop.

## Dati e configurazione
Si riusano dati, endpoint, metadati immagini e storage esistenti. Nessuna configurazione o migrazione.

## Impatto tecnico e casi limite
BaseLayout, Header e CSS gestiscono il salto e il menu. QuoteForm, traduzioni e form.js gestiscono attesa ed errore. Reviews, FAQ, Services, Contacts e componenti foto gestiscono la semantica. FloatingWhatsApp, cookie-banner.js e CSS condividono l’altezza del banner. I layout stretti e gli invii interrotti devono conservare un percorso utilizzabile.

## Accettazione e verifiche
Dato un viewport tablet, quando si apre il menu in IT o EN, la pagina non sfora. Dato il banner aperto, raggiungere un controllo con Tab lo rende visibile. Dato un invio in attesa o rifiutato, l’utente vede lo stato appropriato. Dato il carosello, ogni azione espone una sola foto. Verificare build, contrasto, markup e flussi nel browser locale. Nessun punto aperto.
