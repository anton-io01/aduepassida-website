# Development status — Aggiornamento delle home bilingui

Avviato il 15 novembre 2026.

## Identità e base fissa

- Branch `feature/aggiorna-home`.
- Repository `anton-io01/aduepassida-website`, origin fetch/push `https://github.com/anton-io01/aduepassida-website.git`.
- Cartella `/Users/antonio.modugno/Documents/Codex/2026-11-15/new-chat/work/aduepassida-website`.
- Base `origin/main` al commit `f1c615936806d0b9118f41ee3aa98c5f7720feb9`.
- Fase di consegna pronta per il commit locale.

## Stato

Step 1 completato il 15 novembre 2026. Criteri S1-T e S1-F verificati.

## Step pendenti

Nessuno.

## Evidenze

Git conferma identità, branch e base. Il link Maps ha risposto HTTP 200 dopo il reindirizzamento alla scheda «A Due Passi Da B&B». La build Astro ha generato le quattro pagine. L’HTML di entrambe le home conferma il testo e la destinazione del preventivo, il numero e il messaggio WhatsApp, la metratura, la vista sulla città, il link Maps e i metadati coerenti con il servizio. Chromium ha verificato i due pulsanti a 320 e 1280 px senza sovrapposizione, l’assenza dei badge e l’apertura delle FAQ in entrambe le lingue. L’anteprima locale risponde e `git diff --check` è passato.

## Decisioni

Tenere attivo il widget e indirizzare alla scheda tramite il link testuale. Allineare metadati e servizio caffè alle informazioni correnti. I testi attribuiti agli ospiti sono conservati.

## Blocchi

Nessuno.

## Riepilogo

Home italiana e inglese aggiornate e verificate. Il commit locale raccoglie codice e documenti della feature. Il push attende l’approvazione esplicita.
