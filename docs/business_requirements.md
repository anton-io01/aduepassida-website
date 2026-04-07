# Business Requirements Document
## Sito Web Vetrina – B&B "A Due Passi Da"

**Versione:** 1.1  
**Data:** Marzo 2026  
**Autore:** Gestore B&B  
**Stato:** Bozza

---

## 1. Contesto e Obiettivo

### 1.1 Problema
Il B&B "A Due Passi Da" è attualmente visibile su piattaforme OTA (Online Travel Agency) come Booking.com, le quali applicano una commissione su ogni prenotazione ricevuta tramite il loro canale, riducendo il margine del gestore.

### 1.2 Soluzione
Realizzare un sito web vetrina statico, ospitato gratuitamente su **GitHub Pages**, che funga da vetrina professionale per il B&B. Il sito consente ai potenziali ospiti di scoprire la struttura, visualizzarne i servizi e **richiedere un preventivo diretto**, bypassando le commissioni OTA. Il link al sito sarà inserito nel profilo Google Maps della struttura.

### 1.3 Obiettivi Principali
- Aumentare le prenotazioni dirette (senza commissioni)
- Fornire una presenza web professionale e autonoma
- Offrire agli ospiti una modalità semplice per richiedere preventivi
- Valorizzare la struttura e il territorio circostante

---

## 2. Informazioni sulla Struttura

| Campo | Dettaglio |
|---|---|
| **Nome** | A Due Passi Da |
| **Tipologia** | Bed & Breakfast / Appartamento privato |
| **Indirizzo** | Via Duomo, 81 – 70033 Corato (BA), Puglia, Italia |
| **Riferimento Maps** | 5C26+WG Corato, Città Metropolitana di Bari |
| **Coordinate Google Maps** | Da link: https://share.google/NTKoIOnzQw9XD2mrI |
| **Superficie** | 50 m² (appartamento con 2 camere da letto, soggiorno, cucina, 1 bagno) |
| **Capacità totale** | 5 ospiti |
| **Numero camere** | 2 camere (incluse familiari e comunicanti) |
| **Punteggio posizione** | 9.5/10 (da 69 recensioni Booking) |
| **Distanza stazione FS** | 700 m a piedi (Stazione Corato) |
| **Distanza aeroporto** | 42 km (Aeroporto Internazionale di Bari Karol Wojtyla) |
| **Vista** | Vista sulla città |
| **Lingue parlate** | Italiano, Inglese, Spagnolo, Francese |
| **Contatto principale** | Da inserire dal gestore (email + telefono + WhatsApp) |
| **Email**| antoniomodugno01@gmail.com |
| **Email**| +393921393823 |

> ⚠️ **Nota accessibilità:** I piani superiori sono accessibili solo tramite scale (nessun ascensore). Da comunicare chiaramente sul sito.

### 2.1 Servizi Offerti

I servizi sono organizzati per categoria. Quelli contrassegnati con *(a pagamento)* non sono inclusi nel prezzo base.

#### Dotazioni Generali
- Aria condizionata e riscaldamento
- Wi-Fi gratuito ad alta velocità (135 Mbps – adatto a streaming 4K e videochiamate)
- TV a schermo pianto
- Struttura interamente non fumatori
- Insonorizzazione
- Ingresso indipendente
- Appartamento privato in edificio
- Zanzariere e ventilatore
- Ferro, asse da stiro e stirapantaloni

#### Cucina e Ristorazione
- Colazione italiana inclusa
- Cucina completamente attrezzata (piano cottura, forno, frigorifero, utensili, lavatrice, prodotti pulizia)
- Macchina da caffè e bollitore
- Seggiolone per famiglie
- Consegna spesa a domicilio *(a pagamento)*
- Possibilità di pranzo al sacco

#### Camera da Letto e Soggiorno
- Biancheria da letto, lenzuola e asciugamani inclusi *(disponibili a pagamento per soggiorni extra)*
- Armadio/guardaroba e cabina armadio
- Divano letto, zona soggiorno e zona pranzo
- Presa elettrica vicino al letto

#### Bagno
- Bagno privato con doccia, vasca, WC e bidet
- Prodotti da bagno in omaggio
- Asciugacapelli

#### Spazi Esterni
- Balcone, terrazza, terrazza solarium, patio
- Zona pranzo all'aperto

#### Trasporti e Mobilità
- Parcheggio privato *(su prenotazione – €20/giorno)*
- Autorimessa
- Navetta aeroportuale *(a pagamento)*
- Noleggio biciclette *(a pagamento)*
- Autonoleggio
- Passeggini disponibili

#### Servizi Aggiuntivi
- Check-in flessibile
- Servizio lavanderia *(a pagamento)*
- Fattura disponibile su richiesta
- Adatto a famiglie con bambini

#### Sicurezza
- Estintori, allarme antifumo, rilevatore di monossido di carbonio
- Allarme di sicurezza, accesso con chiavi

---

## 3. Requisiti Funzionali

### 3.1 Sezioni del Sito

#### 3.1.1 Hero / Home
- Immagine di copertina ad alto impatto visivo (placeholder inizialmente)
- Nome del B&B ben visibile
- Tagline/sottotitolo evocativo
- Call-to-action principale: **"Richiedi Preventivo"** (link alla sezione form)
- Navigazione sticky nella parte superiore

#### 3.1.2 Galleria Fotografica
- Carousel o griglia di foto della struttura e delle camere
- Placeholder immagini nella versione iniziale
- Supporto per aggiornamento futuro con foto reali
- Sezione separata con foto di luoghi caratteristici vicini (es. Castel del Monte, Trani, Bari, Altamura, Valle d'Itria), recuperate da fonti libere (Unsplash, Wikimedia Commons, ecc.)

#### 3.1.3 Le Camere e la Struttura
- Descrizione delle 4 camere (incluse tipologie familiari e comunicanti)
- Superficie totale appartamento: 50 m²
- Capienza: fino a 10 ospiti totali
- Evidenza di: ingresso indipendente, appartamento privato in edificio, insonorizzazione
- Avviso chiaro: accesso ai piani superiori solo tramite scale (no ascensore)
- Icone o badge per i servizi disponibili in camera

#### 3.1.4 Servizi
Visualizzazione visiva per categorie, con icone rappresentative:

- **Connettività:** Wi-Fi 135 Mbps (streaming 4K, videochiamate)
- **Comfort:** Aria condizionata, riscaldamento, insonorizzazione, ventilatore
- **Cucina:** Colazione inclusa, cucina attrezzata, lavatrice, macchina caffè
- **Bagno:** Bagno privato, prodotti omaggio, asciugacapelli
- **Spazi:** Balcone, terrazza solarium, patio, zona pranzo esterna
- **Famiglia:** Camere familiari, seggiolone, passeggini, adatto a bambini
- **Mobilità:** Parcheggio *(€20/gg)*, navetta aeroporto *(a pagamento)*, noleggio bici
- **Sicurezza:** Rilevatore CO, allarme antifumo, accesso con chiavi
- **Flessibilità:** Check-in flessibile, fattura su richiesta, servizio lavanderia

> Indicare chiaramente quali servizi sono inclusi nel prezzo e quali sono a pagamento.

#### 3.1.5 Posizione e Come Raggiungerci
- Mappa interattiva integrata (Google Maps embed o Leaflet.js + OpenStreetMap)
- Indirizzo esatto: Via Duomo, 81 – 70033 Corato (BA)
- Indicazioni di raggiungibilità:
  - **A piedi:** 700 m dalla Stazione FS di Corato
  - **In auto:** indicazioni autostrada A14 + SP231
  - **In aereo:** 42 km dall'Aeroporto di Bari (navetta disponibile a pagamento)
- Punteggio posizione: **9.5/10** (citabile come punto di forza)
- Parcheggio privato disponibile su prenotazione (€20/giorno)

#### 3.1.6 Attività Vicine e Luoghi d'Interesse
- Lista/griglia di attrazioni turistiche nelle vicinanze con foto libere (Unsplash/Wikimedia):
  - **Castel del Monte** – patrimonio UNESCO (~30 km)
  - **Trani** – cattedrale sul mare, centro storico (~25 km)
  - **Bari** – capoluogo, Basilica di San Nicola, lungomare (~45 km)
  - **Altamura** – pane DOP, cattedrale medievale (~35 km)
  - **Matera** – Sassi UNESCO (~80 km)
  - **Valle d'Itria** – trulli di Alberobello (~70 km)
  - **Centro storico di Corato** – a pochi passi dalla struttura
- Attività praticabili: enogastronomia pugliese, escursionismo, spiagge Adriatico, cultura e storia
- Divisione in categorie: *Cultura & Storia*, *Natura & Paesaggio*, *Enogastronomia*, *Spiagge e Mare*

#### 3.1.7 Recensioni degli Ospiti
- Sezione dedicata alle recensioni
- Visualizzazione con nome ospite, stelle, testo recensione, data
- Placeholder con recensioni di esempio nella versione iniziale
- Possibilità futura di aggiornamento manuale da parte del gestore

#### 3.1.8 Form Richiesta Preventivo
Campi del form:
- Nome e Cognome *(obbligatorio)*
- Email *(obbligatorio)*
- Numero di telefono *(opzionale)*
- Numero di ospiti *(obbligatorio, numerico)*
- Data di arrivo *(obbligatorio, date picker)*
- Data di partenza *(obbligatorio, date picker)*
- Tipologia di camera (selezione singola o multipla)
- Note aggiuntive / richieste speciali *(testo libero, opzionale)*
- Consenso al trattamento dati (GDPR) *(obbligatorio)*
- Pulsante **"Invia Richiesta"**

Azioni al submit:
- Invio email al gestore tramite **Formspree** (servizio gratuito, max 50 invii/mese, nessuna autenticazione complessa)
- Messaggio di conferma all'utente nella pagina ("Grazie! Ti risponderemo entro 24 ore.")
- Opzionale: redirect a WhatsApp tramite link diretto (`wa.me/39XXXXXXXXX?text=...`) presentato come alternativa esplicita dopo il form, senza forzare l'apertura automatica

#### 3.1.9 Sezione Contatti
- Email del gestore (visualizzata e cliccabile con `mailto:`)
- Numero di telefono (cliccabile con `tel:`)
- Eventuale WhatsApp (link diretto `wa.me/`)
- Orari di disponibilità del gestore
- Link alla pagina Booking.com (per chi preferisce prenotare lì)

#### 3.1.10 FAQ – Domande Frequenti
Domande tipiche da includere (risposte basate sui dati reali):
- A che ora è il check-in/check-out? *(check-in flessibile)*
- La colazione è inclusa nel prezzo?
- Il parcheggio è disponibile? *(sì, privato, €20/giorno su prenotazione)*
- C'è l'ascensore? *(no – piani superiori accessibili solo tramite scale)*
- Il Wi-Fi è gratuito? *(sì, 135 Mbps)*
- Sono ammessi animali domestici?
- Come si raggiunge la struttura dalla stazione / aeroporto?
- È disponibile la navetta aeroportuale? *(sì, a pagamento)*
- Come funziona la richiesta di preventivo diretta?
- Quali lingue parla il gestore? *(Italiano, Inglese, Spagnolo, Francese)*
- È possibile ricevere fattura? *(sì, su richiesta)*
- La struttura è adatta alle famiglie con bambini? *(sì)*

#### 3.1.11 Footer
- Nome e logo del B&B
- Email e telefono del gestore
- Link ai social (se disponibili)
- Link alla Privacy Policy (GDPR)
- Anno e copyright
- Link di navigazione rapida

---

## 4. Requisiti Non Funzionali

### 4.1 Lingue
- **Italiano** (lingua principale)
- **Inglese** (versione tradotta, accessibile tramite toggle lingua nell'header)
- Implementazione: file HTML separati (`index.html` per IT, `index-en.html` per EN) oppure soluzione JavaScript per cambio lingua dinamico

### 4.2 Design e UX
- Stile: **Moderno/Minimalista**
- Palette colori: toni caldi e neutri, evocativi della Puglia (terracotta, bianco, sabbia, verde oliva)
- Font: leggibile, elegante (es. Google Fonts: *Lato*, *Playfair Display*)
- Layout responsive: ottimizzato per mobile, tablet e desktop
- Immagini ottimizzate per velocità di caricamento
- Navigazione intuitiva con menu fisso (sticky header)

### 4.3 Performance e Accessibilità
- Sito statico (HTML + CSS + JS vanilla o minimo JS) per massima velocità
- Nessun backend richiesto
- Tempi di caricamento < 3 secondi su connessione standard
- Compatibilità con browser moderni (Chrome, Firefox, Safari, Edge)
- Testi alternativi su tutte le immagini (accessibilità base)

### 4.4 SEO
- Meta tag descrittivi per ogni pagina (titolo, description, keywords)
- Tag Open Graph per condivisione sui social
- Dati strutturati JSON-LD per B&B (schema.org `LodgingBusiness`)
- URL leggibili e descrittivi
- Sitemap.xml

### 4.5 Privacy e GDPR
- Banner cookie (anche per sito statico con Google Maps embed)
- Pagina Privacy Policy dedicata
- Consenso esplicito nel form prima dell'invio
- Nessun dato degli utenti salvato lato sito (Formspree gestisce il dato email)

---

## 5. Stack Tecnologico e Infrastruttura

| Componente | Tecnologia / Servizio | Costo |
|---|---|---|
| **Hosting** | GitHub Pages | Gratuito |
| **Frontend** | HTML5, CSS3, JavaScript vanilla | Gratuito |
| **Form invio email** | Formspree (piano gratuito) | Gratuito (50 submit/mese) |
| **Mappa** | Google Maps Embed o Leaflet.js + OpenStreetMap | Gratuito |
| **Dominio** | `username.github.io/aduepassida` o dominio custom futuro | Gratuito (subdominio GitHub) |
| **Font** | Google Fonts | Gratuito |
| **Icone** | Font Awesome o Heroicons | Gratuito |
| **Immagini luoghi** | Unsplash, Wikimedia Commons (licenza libera) | Gratuito |

---

## 6. Architettura del Sito (Struttura File)

```
aduepassida/
│
├── index.html              # Homepage (IT)
├── index-en.html           # Homepage (EN)
├── privacy-policy.html     # Privacy Policy
│
├── css/
│   └── style.css           # Stili principali
│
├── js/
│   └── main.js             # Script (form, carousel, smooth scroll)
│
├── images/
│   ├── struttura/          # Foto B&B (placeholder inizialmente)
│   ├── camere/             # Foto camere
│   └── luoghi/             # Foto attrazioni locali (libere)
│
└── assets/
    └── icons/              # Icone e loghi
```

---

## 7. Flusso Richiesta Preventivo

```
Utente compila il form
        ↓
Validazione lato client (JS)
        ↓
Invio a Formspree (HTTPS POST)
        ↓
Formspree invia email al gestore
        ↓
Messaggio di conferma mostrato all'utente
        ↓
[Opzionale] Link WhatsApp visibile per contatto diretto
        ↓
Gestore risponde via email o telefono con il preventivo
```

---

## 8. Integrazioni Esterne

### 8.1 Formspree
- Registrazione gratuita su formspree.io
- Creazione di un "form endpoint" associato all'email del gestore
- Inserimento dell'endpoint nell'attributo `action` del form HTML
- Piano gratuito: 50 submit/mese (sufficiente per un B&B piccolo)
- Upgrade disponibile se necessario

### 8.2 WhatsApp (link diretto)
- Nessuna autenticazione richiesta all'utente
- Implementazione tramite link `https://wa.me/39XXXXXXXXX?text=Ciao%2C+vorrei+richiedere+un+preventivo`
- Presentato come bottone/link alternativo visibile nella sezione contatti e dopo il form
- Non è richiesta apertura automatica: l'utente clicca volontariamente

### 8.3 Google Maps
- Embed iframe gratuito per visualizzare la posizione
- Alternativa: Leaflet.js + OpenStreetMap (100% gratuito, nessuna API key)

---

## 9. Deployment su GitHub Pages

### Passi principali:
1. Creare repository pubblico su GitHub (es. `aduepassida-website`)
2. Caricare i file del sito nella repository
3. Abilitare GitHub Pages nelle impostazioni del repository (branch: `main`, root: `/`)
4. Il sito sarà accessibile a `https://username.github.io/aduepassida-website`
5. Inserire questo URL nel profilo Google Maps del B&B come sito web

### Aggiornamenti futuri:
- Modificare i file localmente e fare push su GitHub
- GitHub Pages pubblica automaticamente le modifiche in pochi minuti

---

## 10. Attività di Sviluppo (Work Breakdown)

| # | Attività | Priorità | Note |
|---|---|---|---|
| 1 | Setup repository GitHub + GitHub Pages | Alta | Prerequisito |
| 2 | Struttura HTML base (header, nav, footer, sezioni) | Alta | Scheletro del sito |
| 3 | CSS base (responsive, palette, font) | Alta | Stile minimalista |
| 4 | Sezione Hero con CTA | Alta | Prima impressione |
| 5 | Galleria placeholder camere/struttura | Alta | Da sostituire con foto reali |
| 6 | Sezione Servizi con icone | Media | |
| 7 | Form preventivo + integrazione Formspree | Alta | Core del progetto |
| 8 | Sezione Posizione + mappa integrata | Media | |
| 9 | Sezione Attrazioni e Luoghi d'interesse | Media | Foto libere da web |
| 10 | Sezione Recensioni (statica) | Media | Placeholder |
| 11 | Sezione FAQ | Media | |
| 12 | Sezione Contatti | Alta | Email + tel + WhatsApp |
| 13 | Footer completo | Alta | |
| 14 | Versione inglese del sito | Media | Traduzione testi |
| 15 | Toggle cambio lingua | Media | |
| 16 | SEO meta tag + JSON-LD schema | Media | |
| 17 | Banner cookie + Privacy Policy | Media | GDPR |
| 18 | Test responsive su mobile/tablet/desktop | Alta | |
| 19 | Ottimizzazione immagini | Media | Performance |
| 20 | Pubblicazione e test finale | Alta | |
| 21 | Inserimento link su Google Maps | Alta | Obiettivo finale |

---

## 11. Vincoli e Assunzioni

- Il sito è esclusivamente **statico** (nessun CMS, nessun backend, nessun database)
- Il gestore ha già un account GitHub attivo
- Le foto reali della struttura saranno caricate in un secondo momento
- Il piano gratuito di Formspree (50 submit/mese) è sufficiente per il volume atteso
- Nessun budget disponibile per hosting, dominio custom o servizi a pagamento
- Il gestore aggiornerà manualmente i contenuti (recensioni, foto, prezzi) direttamente nei file HTML

---

## 12. Futuri Sviluppi (Out of Scope v1.0)

- Dominio personalizzato (es. `aduepassidacorato.it`) — acquistabile in futuro (~10€/anno)
- Calendario disponibilità camere in tempo reale
- Sistema di prenotazione online con pagamento
- Blog o sezione news
- Integrazione con Channel Manager
- Analytics (Google Analytics o Matomo)
- Notifiche push per nuove richieste

---

*Documento aggiornato alla v1.1 con i dati reali estratti dalla pagina Booking.com della struttura. I dati di contatto del gestore (email, telefono, WhatsApp) dovranno essere inseriti prima della pubblicazione. Le coordinate GPS precise sono disponibili tramite il link Google Maps fornito dal gestore.*
