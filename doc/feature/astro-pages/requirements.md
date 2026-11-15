# Requirements — Astro su GitHub Pages

_Generato il 15 novembre 2026. Fonte: business_requirements.md e analisi di origin/main._

## 1. Feature Overview

Sostituire l’assemblaggio dei file HTML in radice con una build statica Astro che conserva gli indirizzi pubblici.

## 2. Attori e flusso

Il browser carica pagine e asset da Pages. JavaScript valida e invia il modulo a Web3Forms. GitHub Actions installa le dipendenze dal lockfile, esegue la build e carica l’artefatto dal branch di pubblicazione.

## 3. Functional Requirements

- FR-01 — Il workflow esegue `npm ci` e `npm run build`; il deploy usa `dist/` e resta riservato a `main`. Rif. BR-01.
- FR-02 — Astro genera i quattro indirizzi pubblici. Link, canonical, alternati e sitemap usano tali indirizzi sul dominio attuale. Rif. BR-02.
- FR-03 — La UI mantiene i contenuti, gli asset e le interazioni della versione pubblicata. Rif. BR-03.
- FR-04 — I moduli inviano via POST JSON all’endpoint Web3Forms già in uso, con la configurazione e i campi esistenti. Rif. BR-04.
- FR-05 — La validazione applica gli intervalli esistenti e calcola il totale prima di ogni richiesta. Rif. BR-05.
- FR-06 — Il repository contiene una sola sorgente del sito e indica Astro e GitHub Pages nel README. Rif. BR-06.
- FR-07 — Successo ed errore hanno messaggi in italiano o inglese secondo la pagina e un errore consente un nuovo tentativo. Rif. BR-04.

## 4. Non-Functional Requirements

- NFR-01 — Installazione riproducibile a partire dal lockfile esistente con Node 22.
- NFR-02 — I quattro indirizzi rispondono dalla sola cartella `dist/` e tutti i riferimenti locali serviti dalla build sono risolvibili.
- NFR-03 — Sono preservate l’etichettatura dei controlli e la lettura degli errori del modulo nelle due lingue.

## 5. Data Requirements

`num_adulti` e `num_bambini` sono valori interi esistenti rappresentati da stringhe nel payload. `num_ospiti` contiene la loro somma. Il browser invia anche tipo richiesta, contatto, date, note e consenso tramite la configurazione pubblica Web3Forms già utilizzata. Nessuna persistenza o migrazione dati.

## 6. Technical Impact Map

| Azione | Percorso | Motivo |
| --- | --- | --- |
| Modificare | `astro.config.mjs`, `src/pages/`, `src/i18n/`, componenti della navigazione e layout | Generazione degli URL, SEO, link e contenuti bilingui |
| Modificare | `src/components/QuoteForm.astro`, `public/scripts/form.js`, privacy IT/EN | Web3Forms, campi, validazione e informativa |
| Allineare | `src/components/`, `src/assets/images/`, `src/styles/`, `public/` | Parità dei contenuti e della presentazione |
| Modificare | `.github/workflows/pages.yml`, `README.md` | Build del sito e istruzioni di manutenzione |
| Rimuovere | HTML, `css/`, `js/`, `images/`, `robots.txt`, `sitemap.xml` in radice e vecchia configurazione di deploy | Copie e configurazioni sostituite |
| Aggiornare | Riferimenti obsoleti nei documenti pertinenti | Rendere esplicito il passaggio all’integrazione attuale |

## 7. Configurazione

Node 22 con `npm ci` in CI. Origine pubblica `https://aduepassidabnb.it`. La configurazione del dominio è gestita da GitHub Pages.

## 8. Casi limite

| Caso | Esito |
| --- | --- |
| Cinque adulti e zero bambini | Payload con totale cinque |
| Due adulti e quattro bambini | Nessuna chiamata al servizio e messaggio localizzato |
| Richieste concorrenti | Pulsante bloccato durante l’invio |
| JavaScript disattivato | Pulsante inattivo e contatto WhatsApp disponibile per evitare l’invio di un totale mancante |
| Errore HTTP, JSON o di rete | Errore localizzato e dati preservati |
| Accesso da vecchio link | La pagina Astro risponde all’indirizzo originale |

## 9. Acceptance Criteria

- AC-01 / FR-01, FR-02 — Given una build da installazione pulita, when viene servito `dist/`, then i quattro URL rispondono con documento e risorse corretti.
- AC-02 / FR-02, FR-03 — Given la home in una lingua, when cambio lingua o apro la privacy, then vedo la pagina pertinente agli URL pubblici e le funzionalità esistenti.
- AC-03 / FR-04, FR-05, FR-07 — Given dati validi e una risposta positiva simulata del servizio, when invio, then il payload ha i tre conteggi e viene mostrata la conferma.
- AC-04 / FR-05, FR-07 — Given dati oltre capacità o un rifiuto del servizio, when invio, then il browser mostra il messaggio pertinente e consente di riprovare dopo un rifiuto.
- AC-05 / FR-01, FR-06 — Given il repository aggiornato, when leggo il workflow e il README, then la sola build Astro alimenta GitHub Pages.

## 10. Testing Requirements

- Build con Node e lockfile. Controllo dell’artefatto, dei link, degli asset e della sitemap.
- Verifica in Chromium con layout desktop e mobile, navigazione bilingue, FAQ, menu, carousel e consenso.
- Intercettazione della richiesta Web3Forms per payload, esito positivo, validazione e recupero dal rifiuto, senza inviare preventivi reali.

## 11. Punti aperti

Nessuna decisione preliminare aperta. La verifica della consegna email reale ricade sull’ambiente pubblicato.
