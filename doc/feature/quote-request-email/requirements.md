# Requirements · Richieste di preventivo via email

## 1. Feature Overview

Integrare Web3Forms nel sito HTML pubblicato.

## 2. Actors and Main Flow

Il browser invia i dati a Web3Forms. Il servizio inoltra alla casella associata alla chiave. La pagina interpreta l’esito API.

## 3. Functional Requirements

- FR-01 · Inviare via POST JSON all’endpoint Web3Forms da entrambe le lingue (BR-01, BR-02).
- FR-02 · Verificare i campi richiesti e mantenere le regole italiane su date e ospiti (AC-02).
- FR-03 · Mostrare conferma localizzata solo su esito API positivo (AC-01).
- FR-04 · Mantenere i dati e riabilitare l’invio dopo un errore (BR-03).
- FR-05 · Identificare Web3Forms nelle informative HTML (BR-04).

## 4. Non-Functional Requirements

- NFR-01 · Nessuna dipendenza runtime aggiuntiva. Usare HTTPS e la chiave pubblica prevista dal servizio.
- NFR-02 · Segnalare esito e errore tramite regioni accessibili. Evitare invii simultanei dalla stessa pagina.

## 5. Data Requirements

Tutti i campi HTML esistenti vengono serializzati, inclusi contatti, dettagli del soggiorno, note, lingua e consenso. La chiave pubblica e l’oggetto sono parametri Web3Forms. Il campo email identifica il mittente a cui rispondere. Nessun database applicativo.

## 6. Technical Impact Map

- Modificare `index.html` e `index-en.html` per endpoint, metadati, caricamento e messaggi.
- Modificare `js/form.js` per validazione, stato di invio e risposta API.
- Modificare `privacy-policy.html` e `privacy-policy-en.html` per descrivere il servizio utilizzato.

## 7. Configuration and Environment

GitHub Pages pubblica i file statici. La chiave Web3Forms fornita dal gestore identifica il modulo nel markup. Non servono variabili di build.

## 8. Edge Cases and Constraints

Campi non validi bloccano il POST. Durante una richiesta il pulsante è disabilitato. In caso di risposta non valida, rifiuto o errore di rete, i campi restano compilati.

## 9. Acceptance Criteria

- Dato un modulo valido, quando l’API risponde con successo, allora compare la conferma locale.
- Dato un modulo non valido, quando si preme invio, allora il browser o lo script evidenzia il problema prima del POST.
- Dato un errore, quando la richiesta termina, allora la pagina consente il tentativo successivo senza perdita dei dati.

## 10. Testing Requirements

Controllare markup e sintassi. Simulare invio riuscito, rifiuto, errore di rete e campi non validi con payload fittizi. Verificare la consegna nella casella dopo la pubblicazione.

## 11. Open Points

Nessun punto bloccante per il codice. Il gestore verifica ricezione e spam dopo l’attivazione.
