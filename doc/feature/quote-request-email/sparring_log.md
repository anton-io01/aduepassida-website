# Sparring Log · Richieste di preventivo via email

_Generato il 7 novembre 2026_

## Base di lavoro

- Repository `https://github.com/anton-io01/aduepassida-website.git`
- Riferimento `origin/main`
- Commit `9f059357d643d660e3aa8641e46b5b6e6614793a`
- Directory `/Users/antonio.modugno/Downloads/AI Workflow/aduepassida-website`
- Branch `feature/quote-request-email`

## Requisito da confermare

> Chi compila il modulo di preventivo di A Due Passi deve poterlo inviare online. La struttura deve ricevere un’email per ogni invio riuscito, con tutti i dati trasmessi dal visitatore.

## Riscontri

- Il 7 novembre 2026 il dominio www ha reindirizzato a `https://aduepassidabnb.it/`, servito da GitHub Pages. Il modulo pubblicato punta a `https://formspree.io/f/mbdpwbbo`.
- Alla base fissata, `index.html` e `index-en.html` puntano allo stesso endpoint Formspree. L’inglese carica `js/form.js` come script classico, ma il file esporta un modulo. Questo può impedire la validazione e i messaggi personalizzati in inglese.
- La versione Astro configura Netlify Forms. Il dominio pubblico serve la versione HTML con Formspree.
- La lettura della pagina pubblica non determina se il modulo Formspree sia attivo, a chi inoltri le richieste o se le email arrivino. Nessuna richiesta di prova inviata.
- [Impostazione del destinatario Formspree](https://help.formspree.io/articles/form-and-project-settings/changing-a-form-email-address)

## Domande

### Q1 · Casella destinataria

Quale indirizzo deve ricevere tutte le richieste?

- [ ] A) `antoniomodugno01@gmail.com`, già pubblicato nella sezione contatti.
- [ ] D) Altro (risposta libera). Indica l’indirizzo da configurare.

**Risposta**

### Q2 · Modulo Formspree già collegato

Hai accesso al modulo `mbdpwbbo` nel pannello Formspree?

- [ ] A) Sì, il modulo è visibile. Verifichiamo la configurazione e riutilizziamo l’endpoint se operativo.
- [ ] B) Ho verificato che non è accessibile. Creiamo un nuovo modulo su un account che controlli e colleghiamo il nuovo URL pubblico.
- [ ] C) Non lo so. Verifichiamo prima la presenza del modulo nel pannello.
- [ ] D) Altro (risposta libera). Indica il servizio o il vincolo da considerare.

**Risposta**

## Risposte ricevute in chat

- Q1 · Altro. Destinatario `aduepassida.beb@gmail.com`.
- Q2 · Il gestore non ha un account Formspree. Valutare un servizio gratuito alternativo o un’email precompilata.

### Q3 · Modalità di invio

- [ ] A) Web3Forms. Il visitatore invia dal sito. Il piano gratuito pubblicizza 250 invii mensili. Serve una Access Key generata per la casella destinataria. I dati transitano da Web3Forms.
- [ ] B) Email precompilata con `mailto:`. Il pulsante apre il programma di posta del visitatore con destinatario, oggetto e campi compilati. Il visitatore preme Invia dalla propria app. Il sito non può verificare l’invio.
- [ ] D) Altro (risposta libera).

**Risposta**

Riferimenti: [Piano Web3Forms](https://web3forms.com/pricing), [Configurazione Web3Forms](https://docs.web3forms.com/getting-started/installation), [Standard mailto](https://www.rfc-editor.org/rfc/rfc6068).

**Decisione Q3** · A, Web3Forms. Il gestore ha fornito la chiave pubblica di invio e chiede le istruzioni per configurazione e pubblicazione.
