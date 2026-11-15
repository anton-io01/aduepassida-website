# Stato di sviluppo · Adulti e bambini nel preventivo

_Avvio: 13 novembre 2026_

## Identità e base

- Branch `feature/ospiti-adulti-bambini`.
- Directory `/Users/antonio.modugno/Documents/Codex/2026-11-13/su-x20/work/aduepassida-website`.
- Origin fetch e push `https://github.com/anton-io01/aduepassida-website.git`.
- Base `origin/main`, commit `9073ca23a8a9e9efbea0197f6faabe77735530bb`.
- Fase di consegna: pronto per commit locale e successiva autorizzazione del push.

## Stato

- [ ] In corso
- [x] Completato
- [ ] Bloccato

## Step

| Step | Titolo | Stato | Data |
|---|---|---|---|
| 1 | Aggiornare e verificare il modulo preventivo | Completato | 13 novembre 2026 |

## Step pendenti

Nessuno.

## Evidenze del 13 novembre 2026

- DOD-01. Assemblati e serviti i file previsti dal workflow Pages. Build Astro completata con quattro pagine. Entrambi gli script superano `node --check`, i dizionari sono JSON validi e `git diff --check` è pulito. Astro segnala il riferimento preesistente a `hero-bg.jpg` nel CSS.
- DOD-02. Nel browser, sui quattro percorsi italiani e inglesi, verificati etichette, valori iniziali, opzioni e disposizione su due colonne a 1100 px e su una colonna a 390 px. Verificato il passaggio con Tab da Adulti a Bambini.
- DOD-03. Su ciascun percorso verificati i messaggi per adulti mancanti e per 2 adulti con 4 bambini. Il server di prova ha ricevuto esattamente quattro richieste valide in JSON o URL-encoded secondo il modulo. Verificati i valori `1, 4, 5` e `5, 0, 5` per adulti, bambini e totale in entrambi gli ambienti. I POST sono stati diretti a un server locale.
- Il browser da terminale non poteva avviarsi per un vincolo macOS. Le prove sono state completate nel browser integrato.

## Decisioni

Scelta A confermata in chat. Raccogliere il conteggio dei bambini. Mantenere il limite complessivo già applicato e la chiave del totale.

## Blocchi

Nessuno.

## Riepilogo finale

Selettori distinti per adulti e bambini da 0 a 17 anni, limite di cinque ospiti e conteggi inclusi nella richiesta. Verifiche completate nelle due lingue e nei due ambienti. Codice e documenti pronti per il commit locale.
