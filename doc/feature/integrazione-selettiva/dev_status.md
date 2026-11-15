# Integrazione selettiva — stato

## Identità

15 novembre 2026 · `feature/integrazione-selettiva` · `/Users/antonio.modugno/Downloads/aduepassida-website`

Origin fetch e push https://github.com/anton-io01/aduepassida-website.git, base `origin/main` a `8bcc602fc722b21dcf1cd83062c1b561a691290e`. Checkout pulito all’avvio. Implementazione verificata e pronta per il commit locale. Revisione visiva del proprietario in attesa.

## Verifiche e decisioni

- Google Maps ha mostrato 4,4/5, 5 recensioni, Via Duomo 81 e il Plus Code breve 5C26+WG Corato. Il pin 41.152258, 16.4112871 produce il codice 8FHR5C26+WG.
- Booking.com ha mostrato 9,4/10 da 72 recensioni nella sezione recensioni della scheda.
- Vecchio branch consultato come riferimento storico. Codice da implementare su main aggiornato.
- Per informazioni generali un singolo valore ospiti è conservato senza fabbricare un totale. La bozza WhatsApp è aperta con il gesto di invio, prima dell’attesa della risposta di Web3Forms.


## Passi completati

- P1 · Verificati prima schermata e layout responsive, link alle fonti, flottante e relative collisioni.
- P2 · Verificati invio ordinario e combinato, errori accessibili, obbligatorietà dinamica, scelte ospiti e recupero della bozza.
- P3 · Build Astro riuscita con Node 22. Anteprima attiva su http://127.0.0.1:4321/. Verifiche statiche e diff completati.

## Evidenze di verifica

- 12 scenari in browser sulle due home a 375 e 1280 px, con Web3Forms e apertura WhatsApp sostituiti da simulazioni.
- Testati data locale intorno a mezzanotte, minimo partenza, date incoerenti, cinque ospiti consentiti e sei rifiutati, assenza di campi facoltativi, zero esplicito, ospiti parziali, focus e associazioni degli errori.
- Testati risposta positiva, rifiuto HTTP, risposta JSON negativa, errore di rete, doppio clic, popup bloccato, collegamento manuale e bozza dopo reset. I servizi esterni non hanno ricevuto richieste di test.
- Verificati canonical, hreflang, Open Graph, metadati social, robots, sitemap, asset, testimonianze, FAQ, servizi e dati strutturati nelle pagine generate.
- Le dimensioni mobile sono simulate in browser. L’apertura nell’app WhatsApp su telefono e la consegna Web3Forms in produzione restano fuori dalle simulazioni.

## Consegna

Codice e cinque documenti inclusi nel commit locale. Il prossimo passo è la revisione visiva del proprietario. Nessun push autorizzato.
