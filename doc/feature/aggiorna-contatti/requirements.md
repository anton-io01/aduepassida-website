# Requisiti tecnici — Aggiorna contatti
_Fonte: business_requirements.md e base fissa_

## Obiettivo, utenti e flusso

I visitatori delle home IT ed EN possono aprire il canale di contatto scelto.

## Requisiti funzionali

- FR-01 — Usare `mailto:aduepassida.beb@gmail.com` e mostrare lo stesso indirizzo (BR-01).
- FR-02 — Usare `tel:+393387066312` e mostrare +39 3387066312 (BR-02).
- FR-03 — Usare il numero internazionale `393387066312` nei link `wa.me` (BR-03).
- FR-04 — Eliminare la nota di login dai Contatti in entrambe le lingue (BR-04).
- FR-05 — Escludere il box Booking dalla pagina visibile (BR-05).

## Requisiti non funzionali

- NFR-01 — Zero destinazioni precedenti nelle home e nei link WhatsApp del preventivo. Il box nascosto resta fuori dalla navigazione da tastiera.

## Dati e configurazione

Stringhe esistenti per email, telefono e WhatsApp. Configurazione, schema e migrazioni non applicabili.

## Impatto tecnico

| File | Modifica |
|---|---|
| `index.html`, `index-en.html` | Recapiti, metadati e visibilità delle schede dove presenti |
| `js/form.js` | Destinazione WhatsApp |
| `src/components/{Contacts,Footer,QuoteForm,SEOHead}.astro` | Recapiti, metadati e visibilità |
| `src/i18n/{it,en}.json` | Testi e link localizzati |

## Vincoli e casi limite

La home inglese statica espone i recapiti nel preventivo e nel footer. Aggiornare quelle occorrenze. Conservare i messaggi WhatsApp precompilati.

## Accettazione

- AC-01 — Date le home IT ed EN, quando si esaminano i link e i recapiti, allora corrispondono a FR-01–03.
- AC-02 — Data la sezione Contatti, quando viene mostrata, allora la nota è assente e il box Booking non è visibile (FR-04–05, NFR-01).

## Verifiche

Controllare HTML statico, link, risorse Astro e dizionari. Controllare le pagine statiche nel browser se disponibile. In alternativa analizzare il markup e le regole CSS del box. Test unitari non applicabili.

## Punti aperti

Nessuno.
