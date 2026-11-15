# Chiarimenti sul numero di ospiti nel preventivo

_Data: 13 novembre 2026_

## Base di lavoro

- Repository `https://github.com/anton-io01/aduepassida-website.git`
- Directory `/Users/antonio.modugno/Documents/Codex/2026-11-13/su-x20/work/aduepassida-website`
- Riferimento `origin/main`
- Commit di base `9073ca23a8a9e9efbea0197f6faabe77735530bb`
- Branch `feature/ospiti-adulti-bambini`

## Requisito

> Nella sezione «Richiedi un Preventivo», permettere al visitatore di selezionare separatamente il numero di adulti e il numero di bambini da 0 a 17 anni inclusi. Riportare i due conteggi nella richiesta inviata alla struttura.

Il modulo attuale accetta da 1 a 5 ospiti. Il limite di 5 si applicherà alla somma di adulti e bambini, con almeno un adulto. Il modulo è disponibile in italiano e in inglese, sia nella versione statica pubblicata su GitHub Pages sia nel progetto Astro configurato per Netlify.

## Domande

### Q1 — Età dei bambini

L’età individuale può servire a preparare il preventivo se le tariffe dipendono dall’età. Raccoglierla richiede un campo per ogni bambino selezionato.

- [x] A) Raccogliere il numero di bambini e indicare che la fascia è 0–17 anni inclusi.
- [ ] B) Raccogliere il numero di bambini e richiedere anche l’età in anni compiuti di ciascuno, da 0 a 17.
- [ ] Altro (risposta libera) ___

**Risposta** A, confermata in chat.
