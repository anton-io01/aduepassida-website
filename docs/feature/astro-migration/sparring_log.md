# Sparring Log — Migrazione Sito B&B "A Due Passi Da" ad Astro
_Generated: 2026-05-16_

## Requirement (AI reformulation)

> Migrare il sito web del B&B "A Due Passi Da" dall'attuale stack vanilla (HTML5 + CSS3 + JavaScript puro, no framework, no CMS, multilingua manuale con file duplicati) verso un'architettura moderna basata su **Astro** come static site generator.
>
> **Obiettivi chiave della migrazione:**
> 1. **Astro come SSG** — Strutturare il sito con componenti Astro riutilizzabili (Header, Footer, Layout) mantenendo l'output statico.
> 2. **Decap CMS** — Integrare un CMS headless Git-based per permettere la modifica dei contenuti (testi, immagini, servizi, FAQ, recensioni, attrazioni) tramite interfaccia visuale, senza toccare il codice.
> 3. **Netlify Forms** — Sostituire l'attuale integrazione Formspree con Netlify Forms per il form preventivo.
> 4. **i18n nativo Astro** — Sostituire la gestione multilingua manuale (file duplicati `index.html` / `index-en.html`) con il routing i18n di Astro, usando file di traduzione strutturati.
> 5. **Astro Image** — Ottimizzare automaticamente le immagini in formato WebP con `srcset` responsive, eliminando la gestione manuale.
> 6. **CSS invariato** — Mantenere il CSS vanilla esistente (`style.css` + `responsive.css`) senza riscrittura, integrandolo nel progetto Astro.
> 7. **Configurazione deploy** — Creare `netlify.toml` per configurare il build e il deploy su Netlify (già hosting attuale).
> 8. **SEO** — Mantenere e migliorare il profilo SEO esistente: canonical URLs, hreflang, JSON-LD Schema.org, sitemap.xml, robots.txt, Open Graph, Twitter Card.
>
> **Stato attuale rilevato dall'analisi del codice:**
> - Il sito è un single-page per lingua con 10 sezioni (Hero, Struttura, Galleria, Servizi, Posizione, Attrazioni, Recensioni, Preventivo, Contatti, FAQ).
> - Le due versioni linguistiche (IT/EN) hanno strutture HTML **significativamente diverse** (l'italiana usa accordion per FAQ, l'inglese no; form fields diversi; layout diversi per struttura e preventivo; l'inglese ha social links nel footer, l'italiana no).
> - Il JS è modulare: `main.js` (entry point con services array hardcoded, carousel, accordion), `form.js` (validazione + Formspree), `cookie-banner.js` (GDPR), `gallery.js`, `map.js`, `lang.js` (questi ultimi tre sono placeholder vuoti).
> - Le immagini sono un mix di JPG e PNG, senza ottimizzazione WebP/srcset.
> - Il dominio è `aduepassidabnb.it`, ma canonical/hreflang puntano ancora a `anton-io01.github.io`.
> - Diversi placeholder nel JSON-LD (`USERNAME` al posto del dominio reale).
> - La privacy policy esiste in entrambe le lingue ma come pagine separate.

## Questions

---
### Q1: Strategia per le divergenze IT/EN nell'HTML
**Context:** Dall'analisi del codice, le versioni italiana e inglese non sono semplici traduzioni l'una dell'altra: hanno strutture HTML diverse (la versione IT usa un accordion per le FAQ con `aria-controls`, la EN usa una griglia con toggle semplice; il form IT ha campi diversi da quello EN; il footer IT è a 2 colonne, l'EN a 3 colonne con social links). Questo impatta direttamente su come progettare i componenti Astro e i file di traduzione i18n.

**Options:**
- [ ] A) **Unificare le strutture** — Durante la migrazione, creare un'unica struttura HTML condivisa tra le due lingue, allineando tutte le sezioni (FAQ, form, footer, hero) a un unico design. L'i18n gestisce solo le stringhe. Implicazione: è necessario decidere quale design tenere (IT o EN) e adattare l'altro.
- [ ] B) **Mantenere le divergenze** — Consentire template parzialmente diversi per lingua dove necessario, usando componenti condizionali in Astro (`{lang === 'it' ? <VersioneIT/> : <VersioneEN/>}`). Implicazione: più codice, meno manutenibilità, ma zero regressioni visive.
- [ ] C) **Ibrido** — Unificare le sezioni principali (Hero, Struttura, Galleria, Servizi, Posizione, Attrazioni, Recensioni) e permettere differenze controllate solo per FAQ, form e footer. Implicazione: compromesso tra manutenibilità e fedeltà al design attuale.
- [ ] D) Other (free text): ___

**Answer:** C

---
### Q2: Scope dei contenuti gestibili via Decap CMS
**Context:** Decap CMS permette di rendere editabili parti del sito tramite file Markdown/YAML nella repo Git. Serve definire esattamente quali contenuti saranno gestibili dal CMS e quali resteranno hardcoded nel codice. Questo determina la complessità delle collection Decap e la struttura dei file di contenuto.

**Options:**
- [ ] A) **Scope minimo** — Solo le sezioni con contenuto che cambia frequentemente: Recensioni, Attrazioni/Dintorni, Servizi (lista e prezzi). FAQ e testi delle sezioni restano nel codice.
- [ ] B) **Scope medio** — Come A, più: FAQ, testi delle sezioni principali (Struttura, Hero tagline), informazioni di contatto (email, telefono, indirizzo), immagini galleria. Header/footer restano nel codice.
- [ ] C) **Scope massimo** — Tutto editabile: ogni singolo testo, ogni immagine, metadata SEO per sezione, servizi, FAQ, recensioni, attrazioni, contatti, link social, dati JSON-LD. Solo il layout/struttura HTML resta nel codice.
- [ ] D) Other (free text): ___

**Answer:** B

---
### Q3: Struttura pagine Astro — Single Page o Multi Page?
**Context:** Il sito attuale è una single-page application con anchor links (`#struttura`, `#galleria`, ecc.). Astro supporta sia la modalità single-page che multi-page. La scelta impatta navigation, SEO (ogni pagina separata può avere il proprio title/meta), performance (caricamento iniziale vs. navigazione), e la complessità della migrazione.

**Options:**
- [ ] A) **Mantenere single-page** — Una pagina `index.astro` per lingua con tutte le sezioni, esattamente come adesso. Migrazione 1:1, nessun cambiamento nella UX, minimo rischio di regressione SEO.
- [ ] B) **Multi-page completo** — Ogni sezione diventa una pagina separata (`/struttura`, `/galleria`, `/servizi`, ecc.) con navigazione tradizionale. Miglior SEO per keyword specifiche, ma richiede riscrittura della navigazione e del CSS.
- [ ] C) **Ibrido** — Homepage single-page come adesso, ma pagine separate per Privacy Policy (già separata) e eventuali nuove pagine future (es. blog, offerte speciali). Predispone il sito all'espansione senza rompere la UX attuale.
- [ ] D) Other (free text): ___

**Answer:** C

---
### Q4: Gestione del JavaScript esistente in Astro
**Context:** Il sito ha JavaScript modulare con funzionalità specifiche: sticky header, menu hamburger, carousel struttura, accordion FAQ, rendering dinamico servizi, validazione form, cookie banner GDPR. Alcuni file (`gallery.js`, `map.js`, `lang.js`) sono placeholder vuoti. In Astro, il JS può essere gestito in diversi modi: `<script>` tag nei componenti, client-side islands, o import di file esterni.

**Options:**
- [ ] A) **Migrazione a script Astro** — Riscrivere il JS come script inline nei componenti Astro (`<script>` nel componente), eliminando i file `.js` separati. Implicazione: codice più coeso, ma richiede riscrittura.
- [ ] B) **Import diretto** — Mantenere i file JS esistenti e importarli nei componenti Astro come script client-side. I placeholder vuoti vengono eliminati. Implicazione: migrazione più rapida, meno rischio.
- [ ] C) **Ibrido** — Migrare in componenti Astro le funzionalità semplici (sticky header, carousel, accordion) e mantenere come file separati le funzionalità complesse (form validation, cookie banner). Eliminare i placeholder vuoti.
- [ ] D) Other (free text): ___

**Answer:** B

---
### Q5: Strategia per il rendering dei servizi
**Context:** Attualmente la lista dei 22 servizi è hardcoded come array JavaScript in `main.js` e renderizzata dinamicamente nel DOM. Le etichette sono solo in italiano ("Incluso"/"A pagamento"). In Astro con i18n e Decap CMS, questo approccio deve cambiare: i servizi devono essere traducibili e potenzialmente editabili dal CMS.

**Options:**
- [ ] A) **Servizi da Decap CMS** — Definire i servizi come collection Decap (file YAML/Markdown), con nome, icona, categoria e stato per ogni lingua. Il CMS permette di aggiungere/rimuovere servizi. Implicazione: massima flessibilità, setup più complesso.
- [ ] B) **Servizi da file i18n** — Spostare l'array servizi nei file di traduzione JSON/YAML, renderizzati staticamente da Astro al build. Non editabili dal CMS ma traducibili. Implicazione: setup semplice, ma serve un dev per modificare i servizi.
- [ ] C) **Servizi da file dati Astro** — Un file `services.yaml` condiviso + traduzioni delle label nei file i18n. Renderizzato staticamente. Implicazione: compromesso — la struttura dei servizi è centralizzata, le traduzioni seguono il sistema i18n.
- [ ] D) Other (free text): ___

**Answer:** C

---
### Q6: URL pattern per l'i18n
**Context:** Astro supporta diversi pattern per il routing multilingua. La scelta impatta gli URL, la configurazione del sitemap, i canonical/hreflang, e il comportamento del language switcher. Il sito attuale usa `index.html` (IT) e `index-en.html` (EN) con dominio `aduepassidabnb.it`.

**Options:**
- [ ] A) **Prefisso lingua** — `aduepassidabnb.it/it/` e `aduepassidabnb.it/en/`. La root `/` fa redirect alla lingua default (IT). Implicazione: URL puliti, pattern standard, ma cambio URL rispetto al sito attuale (serve redirect 301).
- [ ] B) **Lingua default senza prefisso** — `aduepassidabnb.it/` per IT (default, senza prefisso) e `aduepassidabnb.it/en/` per EN. Implicazione: gli URL italiani non cambiano (nessun redirect necessario per IT), solo EN cambia da `/index-en.html` a `/en/`.
- [ ] C) **Sottocartelle esplicite** — `aduepassidabnb.it/it/` e `aduepassidabnb.it/en/` senza redirect dalla root (la root mostra una pagina "Seleziona lingua" o redirect basato su `Accept-Language`). Implicazione: più complesso, ma user-friendly per un B&B con clientela internazionale.
- [ ] D) Other (free text): ___

**Answer:** B

---
### Q7: Aggiornamento dei canonical e degli URL SEO
**Context:** Attualmente tutti i canonical, hreflang, Open Graph, sitemap e robots.txt puntano a `anton-io01.github.io/aduepassida-website/`. Il dominio di produzione è `aduepassidabnb.it`. C'è anche un placeholder `USERNAME` nel JSON-LD. La migrazione è l'occasione per allineare tutto al dominio corretto.

**Options:**
- [ ] A) **Aggiornare tutto a `aduepassidabnb.it`** — Canonical, hreflang, OG, sitemap, robots.txt, JSON-LD: tutto punta al dominio di produzione. Il vecchio dominio GitHub viene dismesso.
- [ ] B) **Usare variabile d'ambiente** — Definire `SITE_URL` come variabile nel `netlify.toml` o nella config Astro, così tutti gli URL sono generati dinamicamente. Permette facilmente di testare in staging senza conflitti SEO.
- [ ] C) **Come B, ma con fallback** — Variabile d'ambiente per la flessibilità, ma valore default hardcoded a `https://aduepassidabnb.it` nella config Astro.
- [ ] D) Other (free text): ___

**Answer:** C
---
### Q8: Gestione delle immagini con Astro Image
**Context:** Il sito ha ~19 immagini in formato JPG e PNG organizzate in sottocartelle (`hero/`, `struttura/`, `appartamento/`, `luoghi/`, `camere/`). Alcune sono placeholder. Astro Image (`astro:assets`) può ottimizzare automaticamente in WebP con `srcset` responsive, ma richiede che le immagini siano nella cartella `src/` (non `public/`), oppure si usa il componente `<Image>` per immagini remote/public.

**Options:**
- [ ] A) **Tutte in `src/assets/images/`** — Spostare tutte le immagini nella cartella `src/` per l'ottimizzazione completa al build time (WebP, srcset, dimensioni). Implicazione: le immagini vengono processate ad ogni build, build più lento, ma output ottimale.
- [ ] B) **Immagini statiche in `public/`, solo hero ottimizzata** — Mantenere le immagini in `public/images/` (servite as-is) e ottimizzare solo la hero image e le immagini principali con `<Image>`. Implicazione: build veloce, ottimizzazione parziale.
- [ ] C) **Tutte ottimizzate, gestite via CMS** — Immagini in `src/assets/` per le statiche + configurazione Decap CMS per upload di nuove immagini con path verso `src/assets/`. Implicazione: setup complesso ma permette al CMS di aggiungere immagini che verranno automaticamente ottimizzate.
- [ ] D) Other (free text): ___

**Answer:** A

---
### Q9: Migrazione Formspree → Netlify Forms
**Context:** Il form attuale (versione IT) ha validazione client-side sofisticata in `form.js` e invia a Formspree. La versione EN ha un form con campi diversi (es. `guests` select vs `num_ospiti` number input, nessun campo `richiesta_tipo`). Netlify Forms richiede un attributo `netlify` nel tag `<form>` e gestisce le submission lato server. La validazione client-side può restare.

**Options:**
- [ ] A) **Unificare i form** — Creare un singolo componente form con gli stessi campi per entrambe le lingue, tradotti via i18n. Usare Netlify Forms con notifica email. Implicazione: form coerente, una sola validazione.
- [ ] B) **Form separati per lingua** — Permettere form leggermente diversi per lingua (es. campi extra solo in una lingua). Entrambi usano Netlify Forms. Implicazione: più flessibilità, più manutenzione.
- [ ] C) **Form unificato + Netlify Functions** — Form unico con Netlify Forms, più una Netlify Function per logica aggiuntiva (es. notifica WhatsApp automatica, email di conferma personalizzata). Implicazione: più potente, ma richiede sviluppo backend serverless.
- [ ] D) Other (free text): ___

**Answer:** A

---
### Q10: Gestione della Privacy Policy e Cookie Banner
**Context:** Esistono 4 pagine di privacy policy (IT/EN × versione attuale). Il cookie banner usa `localStorage` e non carica analytics o cookie di terze parti. Con la migrazione ad Astro, la privacy policy può diventare un componente o una pagina Markdown editabile dal CMS. Il cookie banner deve continuare a funzionare.

**Options:**
- [ ] A) **Privacy come pagina Markdown gestita dal CMS** — La privacy policy diventa un file `.md` editabile da Decap CMS, con template Astro dedicato. Cookie banner come componente Astro. Implicazione: il gestore può aggiornare la privacy autonomamente.
- [ ] B) **Privacy come componente Astro statico** — La privacy policy resta come pagina HTML/Astro statica, con testo tradotto via i18n. Cookie banner come componente. Implicazione: serve un dev per aggiornare la privacy, ma struttura più semplice.
- [ ] C) **Privacy dal CMS, cookie banner avanzato** — Come A, più un cookie banner che supporta categorie di cookie (necessari, funzionali, analytics) in previsione di futura integrazione Google Analytics. Implicazione: over-engineering per lo stato attuale, ma futureproof.
- [ ] D) Other (free text): ___

**Answer:** C

---
### Q11: Approccio alla migrazione — Big Bang o Incrementale?
**Context:** La migrazione coinvolge molti aspetti (struttura, i18n, CMS, form, immagini, SEO). Serve decidere se fare tutto in un singolo progetto Astro completamente nuovo (big bang) o procedere in fasi incrementali con verifiche intermedie.

**Options:**
- [ ] A) **Big Bang** — Creare il progetto Astro completo da zero, migrare tutto in una volta, testare e fare il deploy. Il vecchio sito viene sostituito in blocco. Implicazione: più rischioso, ma più rapido se tutto funziona al primo colpo.
- [ ] B) **Incrementale in 3 fasi** — Fase 1: setup Astro + componenti base + CSS + pagine statiche (senza CMS, senza i18n). Fase 2: aggiungere i18n e Netlify Forms. Fase 3: integrare Decap CMS e ottimizzazione immagini. Ogni fase viene verificata prima di procedere. Implicazione: più sicuro, permette rollback, ma più lento.
- [ ] C) **Incrementale in 2 fasi** — Fase 1: setup Astro completo con i18n, componenti, Netlify Forms, ottimizzazione immagini, netlify.toml. Fase 2: integrazione Decap CMS. Implicazione: buon compromesso — il CMS è la parte più complessa e può essere aggiunta dopo che il sito funziona.
- [ ] D) Other (free text): ___

**Answer:** C

---
### Q12: Gestione del branch Git durante la migrazione
**Context:** Il progetto è su GitHub con deploy automatico su Netlify. La migrazione ad Astro cambia completamente la struttura del progetto (da file HTML root a struttura Astro con `src/`, `package.json`, ecc.). Serve decidere come gestire il repository durante la transizione.

**Options:**
- [ ] A) **Branch dedicato `feature/astro-migration`** — Lavorare su un branch separato, merge su `main` solo quando tutto è pronto e testato. Netlify viene aggiornato dopo il merge. Implicazione: il sito attuale continua a funzionare finché non si fa il merge.
- [ ] B) **Repository nuovo** — Creare un repository GitHub nuovo per il progetto Astro, configurare Netlify per puntare al nuovo repo. Il vecchio repo viene archiviato. Implicazione: separazione netta, ma bisogna riconfigurare Netlify e possibili problemi con il dominio.
- [ ] C) **Branch dedicato con Netlify preview** — Come A, ma configurare Netlify per il deploy preview del branch di migrazione, così si può testare il sito Astro su un URL temporaneo prima del merge. Implicazione: testing realistico su infrastruttura Netlify reale.
- [ ] D) Other (free text): ___

**Answer:** C

---
### Q13: Versione di Astro e dipendenze
**Context:** Astro è in continua evoluzione. La scelta della versione determina le API disponibili per i18n, image optimization, e le integrazioni. Serve anche decidere se aggiungere dipendenze extra o restare minimali.

**Options:**
- [ ] A) **Astro latest stable (v5.x)** — Usare l'ultima versione stabile di Astro con le integrazioni ufficiali (`@astrojs/sitemap`, `astro:assets`). Nessun framework UI (no React/Vue). Implicazione: massime feature, documentazione aggiornata, ma potenziali breaking changes rispetto a tutorial più vecchi.
- [ ] B) **Astro v4.x LTS** — Usare la versione LTS più recente per maggiore stabilità. Implicazione: meno feature recenti ma più stabilità e più risorse/tutorial disponibili.
- [ ] C) **Astro latest + integrazioni aggiuntive** — Ultima versione + integrazioni come `astro-i18next` per i18n avanzato, `astro-icon` per le icone. Implicazione: più feature, più dipendenze da mantenere.
- [ ] D) Other (free text): ___

**Answer:** A

---
### Q14: Redirect 301 per preservare il ranking SEO
**Context:** Se gli URL cambiano durante la migrazione (es. da `/index-en.html` a `/en/`), serve configurare redirect 301 nel `netlify.toml` o `_redirects` per preservare il ranking SEO e non rompere eventuali link esterni/backlink. Anche gli URL di GitHub Pages devono essere gestiti.

**Options:**
- [ ] A) **Redirect completi nel `netlify.toml`** — Mappare tutti i vecchi URL ai nuovi: `/index-en.html` → `/en/`, `/privacy-policy.html` → `/privacy-policy/`, `/privacy-policy-en.html` → `/en/privacy-policy/`. Implicazione: SEO preservato, configurazione semplice.
- [ ] B) **Redirect + gestione del vecchio dominio GitHub Pages** — Come A, più un redirect dal dominio GitHub Pages verso `aduepassidabnb.it` (tramite meta refresh o configurazione GitHub). Implicazione: copertura completa, ma serve accesso al repo GitHub Pages.
- [ ] C) **Nessun redirect necessario** — Se si sceglie la strategia di URL senza prefisso per IT (Q6 opzione B), l'URL italiano non cambia. Serve solo il redirect per EN e privacy. Implicazione: meno configurazione, ma solo se Q6=B.
- [ ] D) Other (free text): ___

**Answer:** A

---
### Q15: Font Awesome — CDN o self-hosted?
**Context:** Attualmente Font Awesome 6.5.0 è caricato via CDN (`cdnjs.cloudflare.com`). Con Astro, si può continuare a usare il CDN oppure installarlo come dipendenza npm per un bundle più controllato e potenzialmente più performante (solo le icone usate).

**Options:**
- [ ] A) **Mantenere CDN** — Continuare a caricare Font Awesome via CDN come adesso. Implicazione: zero effort, ma dipendenza esterna, potenziale impatto su performance (carica tutto il CSS anche se si usano poche icone).
- [ ] B) **Self-hosted via npm** — Installare `@fortawesome/fontawesome-free` come dipendenza npm, importare solo gli stili necessari. Implicazione: nessuna dipendenza esterna, bundle ottimizzato, ma setup più complesso.
- [ ] C) **Sostituire con Astro Icon** — Usare `astro-icon` con set di icone SVG inline (es. Heroicons, Lucide). Implicazione: performance ottimale (SVG inline, no font loading), ma richiede la sostituzione di tutte le classi Font Awesome nel CSS/HTML.
- [ ] D) Other (free text): ___

**Answer:** A
