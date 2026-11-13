# Requisiti tecnici · Adulti e bambini nel preventivo

_Data: 13 novembre 2026_

_Fonte: business_requirements.md e analisi della base Git_

## 1. Obiettivo

Implementare i conteggi per categoria in entrambe le versioni del sito.

## 2. Flusso

Il visitatore sceglie i conteggi. Il validatore controlla i due valori prima di creare il corpo della richiesta e presenta l’errore nel gruppo ospiti.

## 3. Requisiti funzionali

- FR-01 (BR-01). Selettore adulti obbligatorio con opzioni da 1 a 5 e scelta iniziale vuota.
- FR-02 (BR-02). Selettore bambini da 0 a 4, inizializzato a 0 e con fascia 0–17 anni nell’etichetta.
- FR-03 (BR-03). Il validatore accetta interi nei rispettivi intervalli e verifica il totale massimo di 5.
- FR-04 (BR-04). La richiesta include entrambi i conteggi e il totale come `num_ospiti`.
- FR-05 (BR-04). Etichette e messaggi sono disponibili in italiano e inglese.

## 4. Requisiti non funzionali

- NFR-01. I due selettori devono essere accessibili da tastiera e avere etichette associate. Il gruppo deve avere un nome e un messaggio di errore annunciabile.
- NFR-02. I selettori usano il layout a due colonne del form e si impilano sui dispositivi stretti.

## 5. Dati

| Campo | Tipo | Vincoli |
|---|---|---|
| `num_adulti` | Intero, serializzato come stringa | 1–5, obbligatorio |
| `num_bambini` | Intero, serializzato come stringa | 0–4, obbligatorio |
| `num_ospiti` | Intero calcolato, serializzato come stringa | Somma da 1 a 5, chiave esistente |

## 6. Impatto tecnico

| File | Modifica |
|---|---|
| `index.html`, `index-en.html` | Gruppo ospiti pubblicato tramite GitHub Pages |
| `src/components/QuoteForm.astro`, `src/i18n/it.json`, `src/i18n/en.json` | Gruppo ospiti e traduzioni della build Astro |
| `js/form.js`, `public/scripts/form.js` | Validazione e preparazione del corpo per Web3Forms e Netlify Forms |
| `css/style.css`, `src/styles/style.css` | Stile del gruppo coerente con il modulo |

## 7. Configurazione

Si usano la configurazione Pages, la build Astro e gli endpoint già presenti.

## 8. Casi limite

Adulti mancanti, valori fuori intervallo o somma superiore a cinque bloccano l’invio. Zero bambini è un valore valido. Cinque adulti o un adulto con quattro bambini rispettano il limite.

## 9. Accettazione

```gherkin
Scenario: AC-01 Selettori accessibili e localizzati
  Given una pagina preventivo in italiano o inglese
  When il visitatore raggiunge il gruppo ospiti
  Then trova due selettori etichettati e zero bambini preselezionati

Scenario: AC-02 Correzione della richiesta
  Given un modulo compilato senza adulti o con più di cinque ospiti
  When il visitatore invia il modulo
  Then vede un errore localizzato e il browser non invia la richiesta

Scenario: AC-03 Invio dei conteggi
  Given un modulo compilato con una combinazione valida
  When il visitatore invia il modulo
  Then il corpo della richiesta contiene i due conteggi e la loro somma
```

## 10. Verifiche

Build Astro, assemblaggio del sito statico e controllo sintattico degli script. Verifica in Chrome dei quattro percorsi locali con invii intercettati, incluse le combinazioni al limite, gli errori e il layout mobile.

## 11. Punti aperti

Nessuno.
