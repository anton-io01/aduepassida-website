# Sparring Log — Astro su GitHub Pages

_Generato il 15 novembre 2026_

## Base di lavoro

- Repository `anton-io01/aduepassida-website` (`https://github.com/anton-io01/aduepassida-website.git`).
- Riferimento `origin/main` dopo il fetch e base fissa `40349e5e356950b241fe5037334dfdbfd4dad705`.
- Branch `feature/astro-pages`.
- Directory `/Users/antonio.modugno/Documents/Codex/2026-11-15/new-chat/work/aduepassida-website`.

## Requisito

> Usare Astro come unica sorgente del sito e pubblicare la build su GitHub Pages, sul dominio `aduepassidabnb.it`. Rimuovere la versione HTML duplicata e i riferimenti alla piattaforma dismessa. Conservare aspetto, contenuti, lingue e funzionalità della versione pubblica. Usare Web3Forms per inviare i preventivi in italiano e inglese, con `num_adulti`, `num_bambini` e `num_ospiti` calcolato come somma.

Il workflow Pages attuale pubblica i file HTML dalla radice. Entrambe le home statiche usano Web3Forms, verificato anche sulla home pubblica. Il `main` include già i selettori per adulti e bambini, con almeno un adulto e al massimo cinque ospiti in totale. Il componente Astro contiene già questi selettori e usa ancora l’integrazione precedente.

## Domande

### Q1 — Indirizzi pubblici

Oggi la pagina inglese e le informative privacy si raggiungono a `/index-en.html`, `/privacy-policy.html` e `/privacy-policy-en.html`. Astro usa già `/en/`, `/privacy-policy/` e `/en/privacy-policy/`. Entrambe le opzioni conservano l’accesso dai link esistenti.

- [ ] A) Usare i percorsi Astro come indirizzi principali. Generare nella build pagine di reindirizzamento per i vecchi indirizzi e mantenere raggiungibili i collegamenti esistenti.
- [x] B) Conservare gli indirizzi `.html` come principali. Generare direttamente con Astro le pagine agli stessi indirizzi pubblici e mantenere quelli nei link interni.
- [ ] D) Altro (risposta libera) ___

**Risposta** B, confermata in chat il 15 novembre 2026.
