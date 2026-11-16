# Integrazione selettiva — requisiti tecnici

## Funzioni

- FR-01 (BR-01) · Aggiornare Hero e aggiungere il contatto rapido nel layout delle home.
- FR-02 (BR-02) · Generare le schede da dati condivisi e link originali localizzati.
- FR-03 (BR-03, BR-05) · Validare date locali, obbligatorietà dinamica e capacità prima di entrambi gli invii.
- FR-04 (BR-04) · Usare una sola richiesta Web3Forms per gesto e creare la bozza dai soli campi visibili valorizzati.
- FR-05 (BR-05) · Allineare mappa, riferimento Maps, indirizzo e JSON-LD al pin verificato. Rimuovere checkinTime testuale.

## Vincoli e dati

- NFR-01 · Un H1 per home. Nomi accessibili, descrizioni errori e focus sul primo campo non valido.
- NFR-02 · Flottante esterno alla superficie di campi, pulsanti, footer e banner. Safe area su mobile.
- NFR-03 · Architettura Astro e Web3Forms correnti, URL esistenti e dipendenze da lockfile.
- Ospiti separati con totale calcolabile se entrambi i campi sono presenti. Un vuoto facoltativo è omesso. Lo zero esplicito rimane valido per i bambini.
- Punteggi e pin provengono dalle schede originali e i punteggi sono datati. Configurazione e database invariati.

## Impatto tecnico

`Hero.astro`, `FloatingWhatsApp.astro`, `BaseLayout.astro`, `Reviews.astro`, `Location.astro`, `Contacts.astro`, `SEOHead.astro`, `src/data/property.ts`, `src/i18n/`, `QuoteForm.astro`, `public/scripts/form.js` e stili di hero/form.

## Casi limite e verifica

Gli scenari AC-01–05 richiedono anteprima bilingue desktop/mobile, date vicino alla mezzanotte locale, ospiti al limite e oltre, cambio di tipo, esito positivo/negativo e doppio clic con simulazioni. Il collegamento WhatsApp manuale copre i browser che bloccano l’apertura. Verificare build, asset, metadati, robots, sitemap e diff. Nessun invio reale.
