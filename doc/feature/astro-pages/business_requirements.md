# Business Requirements — Astro su GitHub Pages

## Obiettivo

Mantenere una sola sorgente Astro per il sito bilingue e pubblicarla sul dominio attuale tramite GitHub Pages.

## Attori e flusso

Il visitatore consulta il sito, cambia lingua, apre l’informativa e può chiedere un preventivo. Web3Forms inoltra i dati al gestore tramite la configurazione in uso. Il gestore aggiorna il sito intervenendo nel solo progetto Astro.

## Regole

- BR-01 — Astro genera le pagine. GitHub Pages pubblica la build tramite GitHub Actions.
- BR-02 — Restano pubblici gli indirizzi `/`, `/index-en.html`, `/privacy-policy.html` e `/privacy-policy-en.html`, secondo la scelta B.
- BR-03 — I visitatori ritrovano contenuti, aspetto e funzioni del sito pubblicato in italiano e in inglese.
- BR-04 — Entrambi i moduli usano il servizio Web3Forms già in uso e inviano adulti, bambini e totale.
- BR-05 — Il modulo accetta da uno a cinque adulti, da zero a quattro bambini e al massimo cinque ospiti in totale.
- BR-06 — La versione statica duplicata e i riferimenti alla precedente piattaforma di hosting e moduli escono dalle sorgenti e dalla documentazione operativa.

## Casi limite e vincoli

I vecchi link e i frammenti di navigazione continuano a funzionare. Un totale non valido impedisce l’invio. Un errore del servizio lascia i dati nel modulo e permette di riprovare. La conferma appare dopo un esito positivo.

## Criteri di accettazione

- AC-01 — Data la build, quando GitHub Pages pubblica l’artefatto, allora contiene le quattro pagine Astro agli indirizzi pubblici.
- AC-02 — Date le pagine nelle due lingue, quando il visitatore naviga e usa le interazioni, allora ritrova i contenuti, le immagini, i link e le funzioni esistenti.
- AC-03 — Dato un preventivo valido, quando il visitatore invia, allora Web3Forms riceve i tre conteggi e il browser mostra la conferma dopo la risposta positiva.
- AC-04 — Dato un totale oltre la capienza o un errore del servizio, quando il visitatore invia, allora il modulo indica il problema nella lingua della pagina.
- AC-05 — Dato il repository migrato, quando si aggiorna il sito, allora si interviene nelle sorgenti Astro e si seguono le istruzioni per GitHub Pages.

## Impatto

Pagine e componenti Astro, stili, asset, navigazione, SEO, workflow di deploy, modulo Web3Forms e documentazione.

## Punti aperti e prossimi passi

Le scelte funzionali sono definite. Il deploy effettivo seguirà l’integrazione su `main`.
