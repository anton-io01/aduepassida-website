# Stato — Aggiorna contatti
_7 novembre 2026_

## Identità e base fissa

- Branch `feature/aggiorna-contatti`
- Directory `/Users/antonio.modugno/Downloads/aduepassida-website`
- Origin fetch/push `https://github.com/anton-io01/aduepassida-website.git`
- Base `origin/main` a `8a0d45a0668febdc40af15c8920ffc1e4a58ef6b`

## Stato e step

Step 1 completato. Fase di consegna pronta per il commit locale.

## Esecuzione dello step 1

Nelle home statiche, nei componenti Astro Contacts, Footer, QuoteForm e SEOHead, nei dizionari IT ed EN e in `js/form.js`, sostituire i recapiti con `aduepassida.beb@gmail.com`, +39 3387066312 e `393387066312` per WhatsApp. Conservare i messaggi precompilati. Togliere la nota di login e aggiungere `hidden` ai box Booking esistenti. Verificare i link e i JSON, aprire le home statiche nel browser e controllare visibilità, quindi eseguire `git diff --check` e preparare il commit.

## Decisioni

Box conservato nel markup con `hidden` per facilitarne il ripristino. La modifica copre le home statiche pubblicate da GitHub Pages e la variante Astro.

## Evidenze di verifica

- Node ha validato i dizionari IT ed EN, i recapiti delle home e la sintassi di `js/form.js`.
- HTML::Parser ha verificato le destinazioni di tutti i link email, telefono e WhatsApp delle home, l’assenza della nota e la presenza di `hidden` nel box italiano. La home inglese statica non contiene il box.
- Le regole CSS del box non sovrascrivono `display`. Il browser integrato ha bloccato l'apertura dei file locali, quindi il controllo di visibilità è stato eseguito su HTML e CSS. La variante Astro è stata controllata a livello di sorgente.
- `git diff --check` superato.

## Blocchi

Nessun blocco per la consegna locale.

## Riepilogo

Recapiti aggiornati sulle home IT ed EN, link WhatsApp corretti, nota rimossa e box Booking nascosto. Codice e cinque documenti pronti per il commit locale.
