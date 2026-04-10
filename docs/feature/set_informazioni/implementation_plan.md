# Implementation Plan - Sistema di Configurazione B&B

## Overview

Questo documento definisce il piano di implementazione dettagliato per il sistema di configurazione del B&B "A Due Passi Da". Ogni step è atomico, sequenziale dove necessario, e include una Definition of Done con criteri di accettazione verificabili.

---

## Fase 1: Core Infrastructure - Setup e Loader Base

### Step 1.1: Creazione Struttura Cartelle e File Template

**Descrizione**: Creare la struttura di base per il sistema di configurazione.

**Azioni**:
1. Creare cartella `config/` nella root del progetto
2. Creare sottocartella `config/templates/` con file JSON template
3. Creare file `config/business.json` con dati attuali del B&B
4. Creare file `config/property.json` con caratteristiche struttura
5. Creare file `.gitkeep` o README vuoto nelle cartelle vuote se necessario

**File da Creare**:
```
config/
├── business.json          (da popolare con dati attuali)
├── property.json          (da popolare con dati attuali)
├── rooms.json             (template vuoto)
├── services.json          (template vuoto)
├── faq.json               (template vuoto)
├── media.json             (template vuoto)
├── policies.json          (template vuoto)
└── README.md              (documentazione base)
```

**Definition of Done**:
- [ ] Cartella `config/` esiste nella root del progetto
- [ ] File `business.json` contiene tutti i dati attuali del B&B (nome, contatti, indirizzo)
- [ ] File `property.json` contiene superficie, camere, ospiti, feature flags
- [ ] Tutti i file JSON sono validi (passano validazione JSON linter)
- [ ] File `config/README.md` creato con struttura documentata
- [ ] Commit Git effettuato con messaggio "feat: add config folder structure"

---

### Step 1.2: Implementazione ConfigLoader Base

**Descrizione**: Creare il modulo JavaScript per il caricamento file JSON.

**Azioni**:
1. Creare file `js/config-loader.js`
2. Implementare funzione `loadFile(filename)` con Fetch API
3. Implementare gestione errori (try/catch, console.error)
4. Implementare fallback per file mancanti
5. Aggiungere logging sviluppo (console.log per debug)

**API da Implementare**:
```javascript
const ConfigLoader = {
  async loadFile(filename),
  async loadAll(),
  handleError(filename, error),
  getFallback(filename)
};
```

**Definition of Done**:
- [ ] File `js/config-loader.js` esiste e contiene la classe/modulo
- [ ] `loadFile('business.json')` ritorna Promise con oggetto JSON parsato
- [ ] Errore 404 (file non trovato) logga in console e ritorna oggetto vuoto
- [ ] Errore JSON invalido logga in console con dettaglio riga/colonna
- [ ] Test manuale: caricamento `business.json` mostra dati corretti in console
- [ ] Test manuale: caricamento file inesistente non causa crash, logga errore graceful
- [ ] Performance test: caricamento < 50ms per file locale

---

### Step 1.3: Implementazione ConfigManager e API Accesso

**Descrizione**: Creare il gestore configurazioni con API per accesso dati.

**Azioni**:
1. Creare file `js/config-manager.js`
2. Implementare oggetto globale `window.Config`
3. Implementare metodi: `get(path)`, `getBusiness()`, `getProperty()`
4. Implementare caching in-memory (oggetto `_cache`)
5. Implementare metodo `init()` per caricamento iniziale

**API da Implementare**:
```javascript
window.Config = {
  async init(),
  get(path),              // dot notation: 'business.contacts.phone'
  getBusiness(),
  getProperty(),
  isReady()               // ritorna true se init completato
};
```

**Definition of Done**:
- [ ] File `js/config-manager.js` esiste e esporta oggetto `Config`
- [ ] `Config.init()` carica `business.json` e `property.json`
- [ ] `Config.get('business.name')` ritorna nome B&B corretto
- [ ] `Config.get('business.contacts.phone')` ritorna telefono
- [ ] `Config.getBusiness()` ritorna oggetto business completo
- [ ] `Config.isReady()` ritorna true dopo init completato
- [ ] Test: `Config.get('nonexistent')` ritorna undefined senza errore
- [ ] Test: accesso a proprietà nested che non esistono ritorna undefined

---

### Step 1.4: Integrazione Header e Footer con Config

**Descrizione**: Sostituire dati hardcoded in header e footer con valori da config.

**Azioni**:
1. Modificare `index.html`: aggiungere script config-loader e config-manager
2. Aggiornare logo/header per usare `Config.get('business.name')`
3. Aggiornare contatti footer per usare `Config.get('business.contacts')`
4. Aggiornare indirizzo footer per usare `Config.get('business.address')`
5. Aggiornare link social per usare `Config.get('business.contacts.social')`

**Elementi HTML da Modificare**:
- Logo: `.logo` text content
- Footer email: `.footer-contacts a[href^="mailto:"]`
- Footer phone: `.footer-contacts a[href^="tel:"]`
- Footer WhatsApp: link WA con numero da config
- Footer address: `.footer-brand p`

**Definition of Done**:
- [ ] Logo header mostra nome da `business.json` (non hardcoded)
- [ ] Email footer usa `business.contacts.email`
- [ ] Telefono footer usa `business.contacts.phone`
- [ ] Link WhatsApp footer usa `business.contacts.whatsapp`
- [ ] Indirizzo footer usa `business.address` (via, cap, città, provincia)
- [ ] Link social footer (se presenti in config) renderizzati dinamicamente
- [ ] Modifica `business.json` e refresh pagina riflette cambiamenti
- [ ] Se file config mancante, sito mostra valori fallback (non crasha)

---

### Step 1.5: Integrazione Sezione Contatti e Form

**Descrizione**: Collegare sezione contatti e form preventivo ai dati config.

**Azioni**:
1. Modificare sezione `#contatti` per renderizzare da config
2. Aggiornare card email, telefono, WhatsApp con dati config
3. Modificare form `#quote-form` per usare endpoint configurabile
4. Aggiornare numero ospiti max nel form da `property.maxGuests`
5. Aggiornare link Booking.com e altre piattaforme esterne

**Elementi da Configurare**:
- Card contatti: email, telefono, WhatsApp
- Form: action URL (Formspree o altro), max ospiti input
- Link esterni: Booking.com, Airbnb

**Definition of Done**:
- [ ] Sezione contatti email usa `business.contacts.email`
- [ ] Sezione contatti telefono usa `business.contacts.phone`
- [ ] Sezione contatti WhatsApp link usa `business.contacts.whatsapp`
- [ ] Form action URL caricato da config (default a Formspree attuale)
- [ ] Input "Numero ospiti" usa `property.maxGuests` come max
- [ ] Link Booking.com visibile solo se presente in config
- [ ] Test: modifica contatti in JSON, refresh, verifica aggiornamento

---

## Fase 2: Property Management - Camere e Servizi

### Step 2.1: Implementazione Rendering Dinamico Camere

**Descrizione**: Sostituire sezione camere hardcoded con rendering dinamico da `rooms.json`.

**Azioni**:
1. Popolare `config/rooms.json` con dati camere attuali
2. Implementare funzione `renderRooms()` in nuovo file `js/rooms-renderer.js`
3. Creare template HTML per card camera dinamica
4. Sostituire HTML hardcoded in `#camere` con container vuoto
5. Chiamare `renderRooms()` dopo `Config.init()`

**Schema HTML Card Camera**:
```html
<div class="card camera-card" data-room-id="{id}">
  <img src="{image}" alt="{name}">
  <div class="card-body">
    <h3>{name}</h3>
    <p>{description}</p>
    <ul class="camera-features">
      <li><i class="fa-solid fa-bed"></i> {beds}</li>
      <!-- amenities -->
    </ul>
  </div>
</div>
```

**Definition of Done**:
- [ ] File `config/rooms.json` popolato con 4 camere attuali
- [ ] File `js/rooms-renderer.js` creato con funzione `renderRooms()`
- [ ] Sezione `#camere` contiene container vuoto `<div id="rooms-container">`
- [ ] 4 card camere renderizzate correttamente con dati da JSON
- [ ] Immagini camere caricate da percorsi in `rooms.json`
- [ ] Features (letti, amenities) mostrate correttamente
- [ ] Test: aggiungere nuova camera a JSON, refresh, appare automaticamente
- [ ] Test: rimuovere camera da JSON, refresh, scompare automaticamente

---

### Step 2.2: Implementazione Sistema Servizi Configurabili

**Descrizione**: Creare sistema servizi con flag enabled/disabled.

**Azioni**:
1. Popolare `config/services.json` con servizi attuali e flag
2. Implementare `js/services-renderer.js` per griglia servizi
3. Creare mapping icone Font Awesome per ogni servizio
4. Implementare badge categoria (included/paid/on_request)
5. Aggiornare sezione `#servizi` per rendering dinamico

**Servizi da Configurare**:
- Wi-Fi, Colazione, Aria condizionata, TV
- Asciugacapelli, Minibar, Navetta, Lavanderia, Animali

**Definition of Done**:
- [ ] File `config/services.json` popolato con servizi attuali
- [ ] Ogni servizio ha campo `enabled: true/false`
- [ ] Servizi con `enabled: false` non renderizzati nella griglia
- [ ] Icone Font Awesome configurate per ogni servizio
- [ ] Badge categoria (included/paid/on_request) visibile
- [ ] Test: cambiare `enabled` da true a false, refresh, servizio scompare
- [ ] Test: cambiare `enabled` da false a true, refresh, servizio appare
- [ ] Test: aggiungere nuovo servizio a JSON, refresh, appare in griglia

---

### Step 2.3: Implementazione Feature Flags Struttura

**Descrizione**: Collegare feature booleane (parcheggio, ascensore, etc.) a visibilità UI.

**Azioni**:
1. Aggiornare `config/property.json` con feature flags
2. Identificare elementi UI condizionali nella sezione struttura
3. Implementare funzione `renderFeatureFlags()`
4. Aggiornare sezione `#struttura` per mostrare/nascondere features
5. Aggiornare nota accessibilità basata su flag

**Feature Flags**:
- `independentEntrance`, `privateParking`, `garden`, `terrace`, `pool`, `accessibility`

**Definition of Done**:
- [ ] `config/property.json` contiene oggetto `features` con 6 booleani
- [ ] Sezione struttura mostra solo features con flag `true`
- [ ] Nota accessibilità (scale/ascensore) aggiornata da flag `accessibility`
- [ ] Feature parcheggio influenza FAQ "Il parcheggio è disponibile?"
- [ ] Test: disabilitare tutte le features, verifica nessun badge mostrato
- [ ] Test: abilitare 3 features, verifica solo quelle visibili
- [ ] Test: modifica flag e refresh riflette cambiamento

---

### Step 2.4: Gestione Immagini Configurabili

**Descrizione**: Implementare sistema percorsi immagini da config.

**Azioni**:
1. Creare `config/media.json` con percorsi immagini esistenti
2. Aggiornare `js/rooms-renderer.js` per usare percorsi da media config
3. Implementare fallback immagine default se percorso non trovato
4. Aggiornare hero background se configurato
5. Aggiornare galleria struttura se implementata

**Struttura media.json**:
```json
{
  "hero": { "background": "images/hero/hero-bg.jpg" },
  "rooms": { "fallback": "images/camere/default.jpg" }
}
```

**Definition of Done**:
- [ ] File `config/media.json` creato con percorsi attuali
- [ ] Hero section usa background da `media.hero.background`
- [ ] Camera senza immagini specifiche usa `media.rooms.fallback`
- [ ] Errore 404 immagine logga in console, mostra placeholder
- [ ] Test: modifica percorso hero in JSON, refresh, nuova immagine visibile
- [ ] Test: percorso immagine inesistente, mostra fallback/placeholder

---

## Fase 3: Content Management - FAQ, Politiche e Multilingua

### Step 3.1: Implementazione FAQ Dinamica

**Descrizione**: Sostituire FAQ hardcoded con sistema dinamico da `faq.json`.

**Azioni**:
1. Popolare `config/faq.json` con FAQ attuali
2. Creare `js/faq-renderer.js` con funzione `renderFAQ()`
3. Implementare ordinamento per campo `order`
4. Sostituire HTML FAQ hardcoded con container dinamico
5. Implementare accordion functionality mantenendo comportamento esistente

**Schema FAQ**:
```json
{
  "faqs": [
    {
      "id": "checkin-time",
      "question": "A che ora è il check-in?",
      "answer": "Il check-in è flessibile...",
      "order": 1,
      "category": "general"
    }
  ]
}
```

**Definition of Done**:
- [ ] `config/faq.json` contiene 10 FAQ attuali del sito
- [ ] Sezione `#faq` renderizzata dinamicamente da JSON
- [ ] FAQ ordinate per campo `order` crescente
- [ ] Accordion funzionante (apri/chiudi) su FAQ dinamiche
- [ ] Test: aggiungere FAQ a JSON, refresh, appare in lista
- [ ] Test: modificare `order`, refresh, ordine cambiato correttamente
- [ ] Test: rimuovere FAQ, refresh, scompare dalla lista

---

### Step 3.2: Implementazione Politiche Configurabili

**Descrizione**: Collegare orari e politiche a `policies.json`.

**Azioni**:
1. Creare `config/policies.json` con politiche attuali
2. Aggiornare FAQ "A che ora è il check-in/check-out?" per usare config
3. Aggiornare FAQ "La colazione è inclusa?" se colazione flag cambia
4. Aggiornare FAQ "Sono ammessi animali?" da `policies.pets`
5. Aggiornare FAQ "Il parcheggio è disponibile?" da `property.features.privateParking`

**Definition of Done**:
- [ ] File `config/policies.json` creato con check-in/out, politiche
- [ ] FAQ check-in mostra orario da `policies.checkIn.time`
- [ ] FAQ check-out mostra orario da `policies.checkOut.time`
- [ ] FAQ animali aggiornata da `policies.pets.allowed` e `policies.pets.policy`
- [ ] FAQ parcheggio aggiornata da `property.features.privateParking`
- [ ] FAQ colazione aggiornata da `services.commonAmenities.breakfast`
- [ ] Test: modifica orario check-in in JSON, FAQ aggiornata dopo refresh

---

### Step 3.3: Supporto Multilingua per Contenuti Configurabili

**Descrizione**: Estendere configurazioni per supportare italiano e inglese.

**Azioni**:
1. Modificare struttura JSON per supportare traduzioni (es. `description.it`, `description.en`)
2. Implementare `Config.getLocalized(key, lang)`
3. Aggiornare renderer per usare lingua corrente
4. Estendere `rooms.json`, `services.json`, `faq.json` con traduzioni
5. Aggiornare `index-en.html` per usare stesso sistema config

**Schema Esempio**:
```json
{
  "name": "A Due Passi Da",
  "description": {
    "it": "Appartamento privato...",
    "en": "Private apartment..."
  }
}
```

**Definition of Done**:
- [ ] `Config.getLocalized('business.description', 'en')` ritorna traduzione inglese
- [ ] `Config.getLocalized('business.description', 'it')` ritorna italiano
- [ ] Camere renderizzate con nome/descrizione in lingua corretta
- [ ] FAQ renderizzate in lingua corretta
- [ ] Servizi renderizzati in lingua corretta
- [ ] `index-en.html` usa stesso `Config` ma con fallback lingua inglese
- [ ] Test: switch lingua cambia contenuti dinamici correttamente

---

### Step 3.4: Integrazione Schema.org Dinamico

**Descrizione**: Aggiornare structured data Schema.org con valori da config.

**Azioni**:
1. Creare `js/schema-renderer.js` per generare JSON-LD dinamico
2. Popolare Schema.org da `business.json`, `property.json`, `services.json`
3. Sostituire script JSON-LD hardcoded in `<head>` con versione dinamica
4. Includere: name, address, geo, telephone, email, amenityFeature, etc.

**Definition of Done**:
- [ ] Script JSON-LD in `<head>` generato dinamicamente
- [ ] Schema.org usa `business.name`, `business.address`, `business.contacts`
- [ ] `geo` coordinates da `business.address.coordinates`
- [ ] `amenityFeature` popolato da `services.commonAmenities`
- [ ] `numberOfRooms` da `property.totalRooms`
- [ ] Test: modifica nome in JSON, Schema.org aggiornato dopo refresh
- [ ] Validazione Google Rich Results Test passa

---

## Fase 4: Testing, Validazione e Documentazione

### Step 4.1: Implementazione Validazione Schema

**Descrizione**: Creare sistema validazione file JSON.

**Azioni**:
1. Creare `js/config-validator.js` con funzioni di validazione
2. Implementare validazione campi required per ogni file
3. Implementare validazione tipo dati (string, number, boolean)
4. Implementare validazione formato (email, phone, coordinates)
5. Aggiungere validazione al caricamento (opzionale, logging)

**Regole da Validare**:
- `business.json`: email valida, phone min 8 char, coordinates in range
- `property.json`: numbers > 0
- `rooms.json`: ogni room ha id, name, type, capacity

**Definition of Done**:
- [ ] File `js/config-validator.js` creato con funzioni validate
- [ ] `validateBusiness(config)` ritorna `{valid: boolean, errors: array}`
- [ ] Email non valida logga: "Invalid email in business.contacts.email"
- [ ] Telefono non valido logga: "Invalid phone format"
- [ ] Coordinate fuori range loggano: "Invalid coordinates"
- [ ] Test: JSON valido passa validazione senza errori
- [ ] Test: JSON con email invalida fallisce validazione con errore specifico

---

### Step 4.2: Testing Integrazione Completa

**Descrizione**: Verificare funzionamento end-to-end del sistema.

**Azioni**:
1. Testare caricamento iniziale di tutti i file config
2. Testare modifica valori e verifica aggiornamento UI
3. Testare rimozione valori e verifica fallback
4. Testare errori (file mancante, JSON invalido)
5. Testare performance (tempo caricamento)

**Test Cases**:
1. Caricamento pagina: tutti i config caricati, nessun errore console
2. Modifica nome B&B: nuovo nome visibile in header dopo refresh
3. Rimozione email: fallback a email default, sito funzionante
4. JSON malformato: errore loggato, sito usa valori fallback
5. Performance: caricamento < 100ms per tutti i config

**Definition of Done**:
- [ ] Test manuale: tutti i file config caricati senza errori
- [ ] Test manuale: modifica `business.name` riflette in header
- [ ] Test manuale: modifica `business.contacts.phone` riflette in footer/contatti
- [ ] Test manuale: aggiunta camera renderizzata correttamente
- [ ] Test manuale: disabilitazione servizio nasconde da griglia
- [ ] Test manuale: sito funziona con un solo file config (fallback others)
- [ ] Performance: console.time mostra caricamento totale < 100ms

---

### Step 4.3: Documentazione Utente

**Descrizione**: Creare guida per utente non-tecnico.

**Azioni**:
1. Creare `config/README_CONFIG.md` con guida completa
2. Documentare struttura ogni file JSON con esempi
3. Creare sezione troubleshooting comune
4. Aggiungere esempi di modifiche frequenti
5. Creare checklist validazione prima commit

**Contenuti README**:
- Come modificare file JSON
- Campi obbligatori vs opzionali
- Formati validi (email, telefono, coordinate)
- Come aggiungere camera, servizio, FAQ
- Come testare modifiche localmente
- Troubleshooting errori comuni

**Definition of Done**:
- [ ] File `config/README_CONFIG.md` esiste e completo
- [ ] Sezione "Struttura File" descrive ogni JSON
- [ ] Sezione "Esempi" mostra modifiche comuni
- [ ] Sezione "Troubleshooting" con 5+ errori comuni
- [ ] Documentazione review-ata per chiarezza (test con utente non-tecnico se possibile)

---

### Step 4.4: Documentazione Tecnica e Commenti

**Descrizione**: Documentare codice per sviluppatori futuri.

**Azioni**:
1. Aggiungere JSDoc a tutte le funzioni in `js/config-*.js`
2. Creare `docs/CONFIG_ARCHITECTURE.md` con architettura sistema
3. Documentare API `window.Config` con parametri e return
4. Aggiungere commenti in linea per logica complessa
5. Creare diagramma flusso dati (testo o mermaid)

**Definition of Done**:
- [ ] JSDoc presente su tutte le funzioni pubbliche
- [ ] File `docs/CONFIG_ARCHITECTURE.md` creato con diagramma flusso
- [ ] README root aggiornato con riferimento sistema config
- [ ] Commenti inline per funzioni complesse (rendering, validazione)
- [ ] Esempi uso API nel file documentazione

---

### Step 4.5: Final Review e Cleanup

**Descrizione**: Pulizia codice, ottimizzazione, preparazione deploy.

**Azioni**:
1. Rimuovere console.log di debug (mantenere solo error)
2. Minificare/ottimizzare file JS se necessario
3. Verificare nessun hardcoded rimasto
4. Verificare tutti i link e riferimenti corretti
5. Commit finale con tutte le modifiche

**Definition of Done**:
- [ ] Nessun `console.log` di debug nel codice production
- [ ] Solo `console.error` per errori rimasti
- [ ] Nessun dato hardcoded (nome, telefono, email, etc.) in HTML/JS
- [ ] Tutti i valori provengono da file JSON config
- [ ] Git commit effettuato con tutti i file
- [ ] README aggiornato
- [ ] Code review completata

---

## Timeline e Milestones

### Milestone 1: Core Infrastructure (Week 1)
- Step 1.1: Struttura cartelle
- Step 1.2: ConfigLoader
- Step 1.3: ConfigManager
- Step 1.4: Header/Footer integration
- Step 1.5: Contatti/Form integration

### Milestone 2: Property Management (Week 2)
- Step 2.1: Camere dinamiche
- Step 2.2: Servizi configurabili
- Step 2.3: Feature flags
- Step 2.4: Immagini config

### Milestone 3: Content Management (Week 3)
- Step 3.1: FAQ dinamica
- Step 3.2: Politiche config
- Step 3.3: Multilingua
- Step 3.4: Schema.org dinamico

### Milestone 4: Testing & Docs (Week 4)
- Step 4.1: Validazione schema
- Step 4.2: Testing integrazione
- Step 4.3: Doc utente
- Step 4.4: Doc tecnica
- Step 4.5: Final review

---

## Risorse e Riferimenti

### File Creati
- `config/business.json` - Info generali B&B
- `config/property.json` - Caratteristiche struttura
- `config/rooms.json` - Configurazione camere
- `config/services.json` - Servizi offerti
- `config/faq.json` - Domande frequenti
- `config/media.json` - Asset multimediali
- `config/policies.json` - Orari e politiche
- `js/config-loader.js` - Caricamento file JSON
- `js/config-manager.js` - API accesso configurazioni
- `js/config-validator.js` - Validazione schema
- `js/rooms-renderer.js` - Rendering camere
- `js/services-renderer.js` - Rendering servizi
- `js/faq-renderer.js` - Rendering FAQ
- `js/schema-renderer.js` - Schema.org dinamico
- `config/README_CONFIG.md` - Guida utente
- `docs/CONFIG_ARCHITECTURE.md` - Architettura tecnica

### Dipendenze
- Nessuna dipendenza esterna richiesta
- Vanilla JavaScript ES6+
- Fetch API (browser moderno)

### Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- iOS Safari 13+

---

**Nota**: Questo implementation plan deve essere seguito sequenzialmente per dipendenze. Ogni step deve essere completato e verificato (Definition of Done) prima di procedere al successivo. I test manuali e la verifica criteri di accettazione sono obbligatori per ogni step.
