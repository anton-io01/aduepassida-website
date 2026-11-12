# Sparring Log — Ottimizzazioni gratuite
Generato: 2026-11-12

## Identità e base immutabile
- Repository: https://github.com/anton-io01/aduepassida-website.git
- Directory: /Users/antonio.modugno/Downloads/aduepassida-website
- Riferimento: origin/main, aggiornato con git fetch origin.
- SHA base: 988378f63dc958ad2516e57582a51c5e44d1140f
- Branch creato: feature/ottimizzazioni-gratuite
- Workspace iniziale pulito; main locale non modificato.

## Requisito confermato
Realizzare le ottimizzazioni gratuite dell'analisi precedente: SEO tecnico, homepage, percorso di contatto e pagine mirate, senza servizi a pagamento. L'utente ha confermato il progetto e richiesto un branch derivato da main su GitHub.

## Evidenze sulla base
Il workflow .github/workflows/pages.yml pubblica HTML/CSS/JS statici della radice tramite git archive; non compila Astro. La homepage usa Web3Forms. Canonical, hreflang e sitemap contengono il vecchio dominio GitHub. Il workflow include esplicitamente i file da pubblicare: dovrà includere le nuove pagine.

## Scelte conservative proposte
Mantenere hosting, sito statico, lingue IT/EN e Web3Forms; correggere SEO e percorso di contatto sul prodotto effettivamente distribuito. Creare pagina appartamento e pagina arrivo/contatti con informazioni confermate; nessuna promessa su tariffe, sconti, tempi di risposta o distanze non verificati. Nessun nuovo tracker senza configurazione e scelta esplicita; preparare istruzioni per Search Console, che richiede accesso del titolare. Non creare profili esterni. Nessun invio di richieste di prova alla struttura senza autorizzazione specifica. Push subordinato alla conferma finale della terna commit/branch/repository prevista dalla skill.

## Domande WF01

### Q1: Qual è la capienza effettiva e come viene sistemato il quinto ospite?
**Contesto:** Il sito dichiara 4–5 persone, una camera matrimoniale, una singola e un divano letto. Il dettaglio serve per testi commerciali precisi.
- [ ] A) Massimo 5: matrimoniale per 2, singola per 1, divano letto per 2. Pubblicare questa configurazione.
- [ ] B) Massimo 4. Correggere testi e limite del modulo; specificare la disposizione reale.
- [ ] C) Mantenere per ora la formulazione attuale, senza aggiungere dettagli sulla quinta sistemazione.
- [ ] D) Altro (risposta libera): ___
**Risposta:** L'utente conferma massimo 5 ospiti, correggendo la configurazione proposta: camera matrimoniale (2), seconda stanza con letto singolo trasformabile in matrimoniale (fino a 2), divano letto per una persona (1). Culla per neonati disponibile su richiesta; non inferire aumento della capienza massima né gratuità della culla.

### Q2: Come trattare recensioni e punteggio posizione 9.5?
**Contesto:** Il sito contiene tre testimonianze e un punteggio senza fonte verificabile. Non è possibile determinarne l'autenticità dal codice.
- [ ] A) Sono autentici: fornisco fonte/link e confermo che i testi possono essere pubblicati. Mantenerli e attribuirli correttamente.
- [ ] B) Sono dimostrativi o non verificati: rimuoverli dalla pubblicazione finché non abbiamo testimonianze verificabili.
- [ ] C) Non ho ora le fonti: mantenere i contenuti esistenti senza rafforzarne le affermazioni né aggiungere markup recensioni.
- [ ] D) Altro (risposta libera): ___
**Risposta:** L'utente richiede widget con valutazione Booking e Google verificabili sopra la sezione recensioni. La risposta non autentica le tre testimonianze esistenti.

## Follow-up Questions
### Q3: Collegamento Google e aggiornamento dei widget
**Contesto:** La scheda Booking identificata è https://www.booking.com/hotel/it/aduepassida-corato.it.html (Via Duomo 81, Corato). Il risultato consultato il 12 novembre 2026 riporta 9,4/10 e 72 recensioni, ma è una versione indicizzata e non garantisce il valore corrente. Non è stata identificata con certezza la scheda Google; l'embed presente nel sito punta a coordinate, non a un'identità verificabile della struttura. Prima di mostrare valori pubblici occorre verificare le fonti. Richiesta asincrona già inviata in chat per il link Google e la preferenza di aggiornamento.
- [ ] A) Schede gratuite con punteggio, data di verifica e link alle fonti; aggiornamento manuale. Fornire link Google.
- [ ] B) Aggiornamento automatico: valutare integrazione e disponibilità gratuita prima di implementare. Fornire link Google.
- [ ] D) Altro (risposta libera): ___
**Risposta:** in attesa. Nessun widget dinamico o punteggio Google inventato.

## Risposte finali e decisioni
Q3: utente approva schede manuali e fornisce https://maps.app.goo.gl/uHFp76dv4UJYkMze9. Google Maps verificato nel browser il 12/11/2026: A Due Passi Da B&B, Via Duomo 81, telefono e sito coerenti, 4,3/5 su 4 recensioni. Coordinate scheda 41.152258,16.4112871. Booking: risultato indicizzato consultato il 12/11/2026, 9,4/10 su 72 recensioni; accesso diretto protetto da verifica JavaScript. Non presentare la rilevazione indicizzata come live. Le testimonianze esistenti restano separate: il widget non ne certifica la fonte. Niente API né tracker nuovi.
