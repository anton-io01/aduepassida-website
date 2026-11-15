# Development Status — Astro su GitHub Pages

_Avviato e aggiornato il 15 novembre 2026_

## Identità e base fissa

- Branch `feature/astro-pages`, repository `anton-io01/aduepassida-website`.
- Directory `/Users/antonio.modugno/Documents/Codex/2026-11-15/new-chat/work/aduepassida-website`.
- Origin fetch/push `https://github.com/anton-io01/aduepassida-website.git`.
- Base `origin/main` verificata al commit `40349e5e356950b241fe5037334dfdbfd4dad705`.
- Fase: pronto per il commit locale.

## Stato

- [ ] In progress
- [x] Completed
- [ ] Blocked

| Step | Titolo | Stato |
| --- | --- | --- |
| 1 | Portare indirizzi e comportamenti pubblici in Astro | Done — 15 novembre 2026 |
| 2 | Pubblicare la build Astro e rimuovere le copie | Done — 15 novembre 2026 |

## Pacchetti operativi pendenti

Nessuno.

## Evidenze

Il fetch e il checkout confermano base e branch. La home pubblica e i due file HTML di riferimento puntano a Web3Forms. S1-T verificato con Node 22.16.0 e `npm run build`. I quattro indirizzi e la sitemap rispondono 200 da `dist/`. S1-F verificato in Chromium con italiano a 1280 px e inglese a 390 px. Confrontati contenuti e layout con la build statica precedente, validate risorse, navigazione, menu, carousel, FAQ, consenso e invio simulato con esito positivo e rifiuto.

S2-T verificato con `npm ci`, nuova build, analisi YAML del workflow e controllo di `dist/`. S2-F verificato ripetendo la suite Chromium sulla build finale. `npm run dev` e `npm run preview` servono i quattro URL con HTTP 200. Testati anche sitemap e robots da preview. Le 15 immagini pubblicate sono identiche byte per byte alle precedenti. `node --check` sullo script del modulo e `git diff --check` passano.

## Decisioni e note

Scelta B ricevuta il 15 novembre 2026. Gli URL pubblici restano quelli esistenti. Il worktree gestito aveva l’indice Git protetto. Il clone dedicato consente di lavorare dalla stessa base. La sitemap viene generata dai percorsi Astro e mantiene lo stesso nome pubblico. Il dossier superato della precedente migrazione resta nella cronologia Git. Il lockfile conserva solo i metadati di una dipendenza facoltativa dichiarata a monte e non installata. Il pulsante si abilita quando è pronta la convalida JavaScript, così il submit nativo non omette il totale. Senza JavaScript la pagina indica il contatto WhatsApp.

## Blocchi

Nessun blocco aperto.

## Riepilogo

Astro genera e pubblica tramite workflow Pages i quattro URL originali. Web3Forms usa la configurazione già pubblica e riceve i tre conteggi nel payload verificato. La build e i test browser sono passati. Il controllo HTTP da terminale ha ricevuto 403 con indicazione di usare l’API dal client. Il test Chromium ha simulato la risposta del servizio. Deploy remoto e consegna effettiva dell’email restano da verificare dopo la pubblicazione. La consegna prevede commit locale e approvazione esplicita del push.
