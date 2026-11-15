# Development status — Aggiornamento servizi

Avviato il 15 novembre 2026.

## Identità e base fissa

- Branch `feature/aggiorna-servizi`.
- Cartella `/Users/antonio.modugno/Documents/Codex/2026-11-15/new-chat/work/aduepassida-website`.
- Origin fetch/push `https://github.com/anton-io01/aduepassida-website.git`.
- Base `origin/main` al commit `50dfc63745e28b2f83636130170b6fdf11327885`.
- Fase di consegna pronta per il commit locale.

## Stato

Step 1 completato il 15 novembre 2026. Criteri S1-T e S1-F verificati.

## Step pendenti

Nessuno.

## Evidenze

Git conferma repository, branch e commit di base. `npm run build` ha generato quattro pagine. Il confronto automatico con la base ha verificato le 16 voci, l’ordine, le traduzioni e i badge in ciascuna lingua e la corrispondenza esatta tra chiavi YAML e JSON. Chromium ha mostrato entrambe le griglie dall’anteprima locale, con la culla inclusa. `git diff --check` superato.

## Decisioni

La richiesta individua la sezione servizi. Il «Rilevatore CO» è la voce del catalogo da rimuovere. Si usa «Culla per bambini» in italiano e «Crib» in inglese.

## Blocchi

Nessuno.

## Riepilogo

Sei servizi rimossi e seggiolone sostituito con la culla in italiano e inglese. Il commit locale raccoglie i tre file sorgente e i cinque documenti della feature. Il push attende l’approvazione esplicita.
