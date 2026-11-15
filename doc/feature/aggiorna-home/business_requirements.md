# Business requirements — Aggiornamento delle home bilingui

## Obiettivo

Aggiornare presentazione e informazioni di soggiorno per chi visita il sito in italiano o in inglese.

## Attori e flusso

Il visitatore apre la home, può richiedere un preventivo o contattare la struttura via WhatsApp, poi consulta caratteristiche, posizione e FAQ.

## Regole

- BR-01 — La sezione iniziale mostra i pulsanti preventivo e WhatsApp. Il primo conserva testo e destinazione. Il secondo apre la stessa chat e lo stesso messaggio precompilato dei Contatti.
- BR-02 — La descrizione e i dati pubblici riportano 70 m². L’elenco delle caratteristiche riporta la vista sulla città. Le voci sull’insonorizzazione e sul punteggio di posizione sono rimosse.
- BR-03 — «Apri in Google Maps» apre il profilo della struttura indicato nella richiesta.
- BR-04 — La risposta sulla colazione descrive macchina da caffè e cialde gratuite e invita a contattare l’host per altre esigenze. Le descrizioni correnti dei servizi e dei metadati riportano la stessa offerta.
- BR-05 — La FAQ sulla fattura è rimossa. La risposta per le famiglie indica lo spazio adatto e la culla per neonati su richiesta all’host.

## Vincoli e casi limite

Le due lingue devono dare le stesse informazioni. I pulsanti devono essere leggibili e utilizzabili anche su uno schermo stretto. Il link breve di Google Maps deve essere quello della struttura.

## Accettazione

- AC-01 — Data una home, quando si consulta la sezione iniziale, allora compaiono due pulsanti e i tre badge sono assenti. Il pulsante preventivo porta al modulo e WhatsApp ha la stessa destinazione dei Contatti.
- AC-02 — Data una home, quando si legge «La Struttura», allora descrizione e caratteristiche riportano 70 m² e vista sulla città. Il punteggio è assente.
- AC-03 — Data la sezione posizione, quando si apre il link Maps, allora la destinazione è la scheda A Due Passi Da B&B.
- AC-04 — Date le FAQ di entrambe le lingue, quando si aprono le risposte pertinenti, allora sono indicate le condizioni per colazione e culla e la domanda sulla fattura è assente.

## Impatto e punti aperti

Home, traduzioni, stile dei pulsanti, metadati e link Maps. Nessun punto aperto.
