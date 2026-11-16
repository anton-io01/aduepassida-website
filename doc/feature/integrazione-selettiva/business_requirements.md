# Integrazione selettiva — requisiti di business

## Obiettivo e utenti

Chi visita il B&B può verificare disponibilità e prezzo, consultare punteggi di piattaforma e scegliere se aprire WhatsApp con i dati della richiesta.

## Regole

- BR-01 · Marchio come unico H1 e CTA verso il modulo. WhatsApp flottante con messaggio generico bilingue.
- BR-02 · Due schede con punteggio, scala, conteggio, data e fonte, separate dalle testimonianze.
- BR-03 · Disponibilità preselezionata. Informazioni generali con soggiorno e occupanti facoltativi. Massimo cinque ospiti.
- BR-04 · Entrambi i pulsanti inviano tramite Web3Forms. Il secondo apre anche una bozza WhatsApp, con collegamento manuale disponibile e invio a cura del visitatore.
- BR-05 · Date locali ed errori accessibili. Recapiti e pin allineati alle fonti. Percorsi pubblici, servizi, contenuti e pubblicazione di main conservati.
- BR-06 · Anteprima locale e revisione visiva prima del push.

## Accettazione

- AC-01 · Dato un visitatore in italiano o inglese, quando apre la home vede il marchio, le schede e il contatto rapido nella lingua della pagina.
- AC-02 · Data una richiesta generale, quando omette date e ospiti può inviarla. Quando seleziona disponibilità o preventivo, tornano obbligatori.
- AC-03 · Dati valori incoerenti, quando invia il modulo vede errori associati ai campi e il focus va al primo errore.
- AC-04 · Dati un invio valido e un esito simulato, quando sceglie il pulsante combinato può aprire la bozza anche dopo un errore Web3Forms. L’invio ordinario resta via form.
- AC-05 · Dato il build Astro, quando verifica sito e anteprima trova gli URL correnti, il pin corretto e i contenuti esistenti.

## Impatto e punti aperti

Hero, layout, recensioni, posizione, contatti, SEO e modulo con i relativi stili e traduzioni. La revisione visiva del proprietario precede il push.
