# Requirements — Aggiornamento delle home bilingui

Fonte `business_requirements.md` e analisi della base fissa.

## Obiettivo e flusso

Le home `/` e `/index-en.html` condividono i componenti Astro. Contenuti e azioni usano le traduzioni esistenti. L’utente può passare dalla home al modulo, a WhatsApp o alla scheda Maps e consultare le FAQ.

## Requisiti funzionali

- FR-01 — Rimuovere il markup e le traduzioni dei badge iniziali. Rif. BR-01.
- FR-02 — Conservare il pulsante preventivo e aggiungere WhatsApp con un URL condiviso con i Contatti. Rif. BR-01.
- FR-03 — Usare 70 m² in descrizione, primo punto e metadati. Lasciare la sola vista sulla città e rimuovere il punteggio. Rif. BR-02.
- FR-04 — Usare il link breve verificato nel collegamento esterno della sezione posizione. Rif. BR-03.
- FR-05 — Aggiornare la FAQ colazione e allineare l’etichetta del servizio, la descrizione SEO e i dati strutturati. Rif. BR-04.
- FR-06 — Rimuovere domanda e risposta sulla fattura. Rif. BR-05.
- FR-07 — Aggiornare la FAQ famiglie con la culla per neonati su richiesta. Rif. BR-05.

## Requisiti non funzionali

- NFR-01 — Equivalenza delle informazioni e delle azioni tra le due lingue.
- NFR-02 — Pulsanti leggibili, accessibili e senza sovrapposizioni a 320 e 1280 px.

## Dati e impatto tecnico

| File | Modifica |
| --- | --- |
| `src/components/Hero.astro` | Due azioni e rimozione dei badge |
| `src/components/Contacts.astro`, `src/i18n/utils.ts` | URL WhatsApp condiviso |
| `src/components/Location.astro` | Link alla scheda Maps |
| `src/components/SEOHead.astro` | Offerta caffè nei dati strutturati |
| `src/i18n/it.json`, `src/i18n/en.json` | Testi delle home, FAQ, servizi e descrizione SEO |
| `src/styles/style.css`, `src/styles/responsive.css` | Layout dei pulsanti e rimozione degli stili dei badge |

## Configurazione e casi limite

Build Astro con il lockfile esistente. Nessuna configurazione remota, migrazione o nuova dipendenza. La modifica a Maps riguarda il link esterno. In viewport stretta le azioni possono disporsi su due righe. Gli ID delle FAQ sono generati dall’elenco attuale.

## Accettazione e prove

- AC-01 — Date le due home, quando si controllano la sezione iniziale e i Contatti, allora ci sono due azioni con destinazioni corrette anche su mobile. Rif. FR-01–02, NFR-01–02.
- AC-02 — Dati HTML e metadati, quando si controlla la metratura, allora riportano 70 m². La struttura mostra vista sulla città ed esclude il punteggio. Rif. FR-03.
- AC-03 — Dato il link Maps della home, quando se ne verifica la destinazione, allora conduce alla scheda attesa. Rif. FR-04.
- AC-04 — Data la sezione FAQ, quando si aprono colazione e famiglie, allora appaiono i nuovi testi localizzati e la fattura non compare. Rif. FR-05–07, NFR-01.

Eseguire build Astro, ispezione delle pagine prodotte e prove di layout e interazioni in Chromium. Verificare il link Google Maps senza inviare messaggi esterni.

## Punti aperti

Nessuno.
