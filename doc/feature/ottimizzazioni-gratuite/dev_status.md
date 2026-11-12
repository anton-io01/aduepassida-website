# Development Status — Ottimizzazioni gratuite
Started / Last updated: 2026-11-12
## Identity and Fixed Base
Feature/branch: feature/ottimizzazioni-gratuite
Directory: /Users/antonio.modugno/Downloads/aduepassida-website
Origin fetch/push: https://github.com/anton-io01/aduepassida-website.git
Base origin/main: 988378f63dc958ad2516e57582a51c5e44d1140f
Fase: pronto per commit locale, nessun push autorizzato.
## Overall Status
- [ ] In Progress
- [x] Completed
- [ ] Blocked
## Steps
| Step | Title | Status | Completed | Notes |
|---|---|---|---|---|
| 1 | SEO, conversione e pagine bilingui | Done | 2026-11-12 | Incremento unico |
## Pending Step Execution Packets
Step 1, nessuna dipendenza: implementare FR01 URL canonical autonomi/hreflang/sitemap; FR02 capienza max5 con matrimoniale, singolo trasformabile matrimoniale, divano singolo e culla su richiesta; FR03 schede Google 4.3/5 count4 verificato browser 12/11/2026 e Booking 9.4/10 count72 da risultato indicizzato consultato stessa data con dicitura non-live; FR04 CTA e WhatsApp contestuale, informazioni con date/ospiti opzionali e disponibilità validata; FR05 quattro landing IT/EN con link home e workflow archive; FR06 manutenzione e Search Console qui. File: index.html,index-en.html,privacy-policy*.html,css/style.css,js/form.js,robots.txt,sitemap.xml,.github/workflows/pages.yml, nuove appartamento-corato.html,apartment-corato.html,come-arrivare.html,getting-here.html. Nessun DB o nuova dipendenza. Preserve Web3Forms, no POST reali, no nuovi tracker. Test parser HTML/XML/link, node --check, mock DOM/fetch, browser desktop/mobile su server Python. DoD da aggiornare anche nel piano:
- [x] D1: parsing SEO/XML, JS syntax e link locali superati.
- [x] D2: flussi form validi/invalidi/successo/errore verificati con mock senza invio reale.
- [x] D3: home e landing IT/EN controllate nel browser, mobile senza overflow.
- [x] D4: rating/fonte/data, letti, culla e inclusione nel pacchetto verificati; diff pulito.
Prossima azione: commit locale dei file espliciti, poi richiesta push con SHA completo/branch/repository. Nessun errore tecnico aperto.
## Verification Evidence
Google Maps browser: 4.3 stelle, 4 recensioni; indirizzo/telefono/dominio coerenti. Coordinate 41.152258,16.4112871. Booking accesso diretto robot-check, usare rilevazione indicizzata esplicita.
## Decisions and Notes
Sito distribuito statico root, Astro non pubblicato: nessuna migrazione. Widget manuali approvati, link Google fornito utente. Testimonianze esistenti non attribuite ai widget. Niente nuove promesse tariffarie o distanze. Skill Sites letta ma hosting GitHub esistente gestito dal workflow esplicitamente richiesto; nessuna registrazione Sites.
## Blocking Issues
Nessuno.
## Completion Summary
Implementati SEO sul dominio definitivo, 4 landing bilingui, contenuti 5 posti letto e culla, schede Google/Booking manuali, CTA, WhatsApp contestuale e form informazioni senza date obbligatorie. Workflow include nuove pagine e favicon esistente. Nessun push/deploy, nessun invio reale di email.

## Evidenze finali — 2026-11-12
- Parser Python HTML: 8 pagine, canonical autonomi, tre alternate per pagina, H1 unico, ID unici, link/file/frammenti locali tutti risolti. XML sitemap: 8 URL.
- JSON-LD valido, dominio definitivo; widget precedono recensioni; assenza badge obsoleto 9.5 e capienza 4–5.
- JavaScript: parsing dei 6 moduli tramite node_repl + vm.Script (export funzione rimosso soltanto nel test). node non disponibile nel PATH, nessuna installazione necessaria.
- Mock DOM/fetch esegue initForm reale: IT/EN informazioni senza date, disponibilità senza dati, ospiti 0/6/2.5, date invertite, successo API, rifiuto API e errore rete: tutti passati. Dati preservati dopo errore, bottone riabilitato. Nessun POST reale.
- Browser localhost: home IT/EN, quattro landing, link landing→form, invio vuoto con errore italiano, selezione informazioni elimina required dalla data. Screenshot verificati. Larghezza mobile effettiva 354 px (override richiesto 390) e desktop 1309 px (override 1440): scrollWidth uguale innerWidth, nessun overflow; immagini senza errori nel campione.
- Pacchetto statico di prova /tmp/aduepassida-preview.tar include gli stessi file della lista workflow; controllo file nuovi e favicon superato. L'effettiva esecuzione GitHub Actions avverrà dopo push/integrazione su main.
- git diff --check superato; HEAD discende dalla base immutabile. Server localhost avviato con permesso dopo rifiuto sandbox, poi fermato alla consegna.
- Screenshot locale /tmp/aduepassida-ottimizzazioni.png (artefatto QA temporaneo, non versionato).

## Manutenzione e operazioni del titolare
### Valutazioni
Aggiornare in index.html e index-en.html entrambe le rating-card: valore, scala, conteggio, data e testo della fonte. Google: https://maps.app.goo.gl/uHFp76dv4UJYkMze9. Booking: https://www.booking.com/hotel/it/aduepassida-corato.it.html#tab-reviews. Booking qui è una rilevazione da indice, esplicitamente dichiarata; sostituirla con una verifica diretta appena disponibile. Non aggiungere aggregateRating alle testimonianze esistenti, non autenticate da questa feature.
### Search Console
Dopo pubblicazione: aggiungere/verificare proprietà dominio aduepassidabnb.it con il metodo proposto da Google nell'account del titolare; inviare https://aduepassidabnb.it/sitemap.xml; ispezionare homepage IT/EN e 4 landing e richiedere scansione. Controllare canonical scelto e impression/clic a 28 giorni. Nessuna configurazione account/DNS eseguita in questa attività; non inventare token di verifica.
### Conversioni
Tenere registro mensile richieste ricevute, fonte dichiarata, prenotazioni confermate e notti. Nessun analytics aggiunto senza configurazione/gestione consenso. Verificare personalmente un invio reale e ricezione email dopo deploy; test automatici non provano consegna al destinatario.
### Informazioni da riallineare
Google mostra colazione non inclusa mentre il sito dice inclusa; Booking descrive cucina/lavatrice con supplemento mentre homepage le indica incluse. Non cambiare autonomamente condizioni commerciali: il titolare deve confermare e riallineare le piattaforme. Le nuove pagine chiedono conferma delle condizioni. Vecchie distanze e testimonianze restano da verificare; nessuna nuova distanza inventata. Il prototipo Astro non è distribuito e non è stato migrato o sincronizzato: modifiche future al sito live devono partire dagli HTML root e dal workflow Pages.
