# Business Requirements · Richieste di preventivo via email

## Overview

Ripristinare l’invio dal sito pubblico A Due Passi. Web3Forms inoltra i dati compilati alla casella `aduepassida.beb@gmail.com`.

## Actors and Flow

Il visitatore compila il modulo in italiano o inglese e invia. Web3Forms accetta la richiesta e la inoltra. Il visitatore vede una conferma nella propria lingua. Il gestore riceve i dati e risponde al visitatore.

## Business Rules

- BR-01 · Usare Web3Forms sulle due pagine pubblicate tramite GitHub Pages.
- BR-02 · Includere tutti i campi del modulo compilato, con l’email del visitatore utilizzabile per rispondere.
- BR-03 · In caso di errore mostrare un messaggio localizzato e conservare i dati per un nuovo tentativo.
- BR-04 · Aggiornare le informative pubblicate per identificare il servizio che riceve i dati.

## Edge Cases and Constraints

Considerare campi obbligatori mancanti, date non valide, tentativi ripetuti, errori del servizio e assenza di rete. La conferma del sito indica accettazione da parte del servizio. La ricezione effettiva si verifica nella casella.

## Acceptance Criteria

- AC-01 · Dato il modulo italiano o inglese compilato, quando il servizio accetta l’invio, allora la pagina mostra la conferma nella lingua del visitatore.
- AC-02 · Dati campi obbligatori mancanti, quando il visitatore tenta l’invio, allora la pagina segnala l’errore senza inviare.
- AC-03 · Dato un rifiuto o un errore di rete, quando l’invio termina, allora la pagina conserva i valori e permette di riprovare.
- AC-04 · Dato il sito pubblicato, quando il gestore invia una richiesta con dati di prova, allora riceve l’email con tutti i campi compilati.

## Impact Map

Pagine HTML pubblicate, modulo JavaScript condiviso, informative IT/EN e configurazione Web3Forms.

## Open Points

La ricezione reale è una verifica di attivazione dopo la pubblicazione.

## Next Steps

Integrare e verificare localmente, quindi pubblicare su approvazione e collaudare la consegna email.
