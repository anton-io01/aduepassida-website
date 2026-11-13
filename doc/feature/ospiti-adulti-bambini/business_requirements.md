# Requisiti di business · Adulti e bambini nel preventivo

## Obiettivo

La struttura riceve i conteggi di adulti e bambini per preparare il preventivo.

## Attori e flusso

Il visitatore seleziona i due conteggi nella sezione «Numero di ospiti» e invia il modulo. La struttura riceve i conteggi e il totale.

## Regole

- BR-01. Il visitatore seleziona almeno un adulto. La selezione parte vuota e richiede una scelta esplicita.
- BR-02. Il visitatore seleziona quanti bambini da 0 a 17 anni inclusi soggiorneranno. Il valore iniziale è zero. Il modulo raccoglie solo il conteggio.
- BR-03. La somma deve essere al massimo cinque. In caso di errore il modulo mostra un messaggio e consente di correggere la richiesta.
- BR-04. I conteggi e il totale accompagnano i dati del preventivo nelle versioni italiana e inglese.

## Casi limite

Cinque adulti senza bambini e un adulto con quattro bambini sono combinazioni valide. Senza adulti, con conteggi mancanti o con più di cinque ospiti complessivi l’invio viene bloccato.

## Criteri di accettazione

```gherkin
Scenario: AC-01 Selezione degli ospiti
  Given il visitatore apre il modulo
  Then vede un selettore per gli adulti e uno per i bambini di 0–17 anni
  And il numero di bambini è inizialmente zero

Scenario: AC-02 Validazione
  Given il visitatore compila il resto del modulo
  When lascia gli adulti senza valore o seleziona più di cinque ospiti complessivi
  Then l’invio viene bloccato e compare un messaggio nella lingua della pagina

Scenario: AC-03 Invio
  Given il visitatore ha compilato il modulo con una combinazione valida
  When invia la richiesta
  Then il modulo trasmette i due conteggi e il totale
```

## Impatto

Moduli italiano e inglese di GitHub Pages e Astro, validazione nel browser e dati inviati tramite Web3Forms e Netlify Forms.

## Punti aperti

Nessuno.

## Passi successivi

Definire i requisiti tecnici e verificare i moduli pubblicabili con invii intercettati in locale.
