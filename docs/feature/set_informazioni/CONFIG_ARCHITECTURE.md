# Architettura Sistema di Configurazione B&B

## Overview

Sistema di configurazione centralizzato basato su file JSON per il sito web del B&B "A Due Passi Da". Permette la gestione autonoma di contenuti, camere, servizi e impostazioni senza modificare il codice.

## Architettura

```
┌─────────────────────────────────────────────────────────────┐
│                    index.html (UI)                          │
├─────────────────────────────────────────────────────────────┤
│  Header  │  Hero  │  Camere  │  Servizi  │  FAQ  │  Footer  │
└──────────┴────────┴──────────┴───────────┴───────┴──────────┘
       │         │        │          │        │        │
       ▼         ▼        ▼          ▼        ▼        ▼
┌─────────────────────────────────────────────────────────────┐
│                   js/config-init.js                           │
│         (Orchestratore: chiama tutti i renderer)              │
└─────────────────────────────────────────────────────────────┘
       │         │        │          │        │        │
       ▼         ▼        ▼          ▼        ▼        ▼
┌─────────────────────────────────────────────────────────────┐
│                   Renderers (Moduli UI)                     │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │RoomsRenderer │ │ServicesRend. │ │ FAQRenderer  │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│  ┌──────────────┐ ┌──────────────┐                        │
│  │SchemaRend.   │ │Config-init   │                        │
│  └──────────────┘ └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    ConfigManager API                          │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │   get()      │ │getBusiness() │ │ getRooms()   │        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │getServices() │ │  getFAQ()    │ │isFeatureEnab.│        │
│  └──────────────┘ └──────────────┘ └──────────────┘        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   ConfigLoader                              │
│         (Caricamento file JSON con Fetch API)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    File JSON Config                         │
│  business.json │ property.json │ rooms.json │ services.json  │
│  faq.json      │ media.json    │ policies.json              │
└─────────────────────────────────────────────────────────────┘
```

## Moduli

### 1. ConfigLoader (`js/config-loader.js`)

**Responsabilità**: Caricamento file JSON

**API**:
- `loadFile(filename)` - Carica singolo file JSON
- `loadAll()` - Carica tutti i file config in parallelo
- `loadEssential()` - Carica solo business e property
- `clearCache()` - Pulisce cache

**Caratteristiche**:
- Caching in memory
- Fallback automatici per file mancanti
- Gestione errori graceful
- Caricamento parallelo per performance

### 2. ConfigManager (`js/config-manager.js`)

**Responsabilità**: Accesso e gestione configurazioni

**API pubbliche**:
```javascript
Config.init()                    // Inizializza sistema
Config.get(path)                 // Accesso dot-notation
Config.getBusiness()             // Info business
Config.getProperty()             // Caratteristiche struttura
Config.getRooms()                // Array camere
Config.getServices()             // Array servizi abilitati
Config.getFAQ()                  // Array FAQ ordinate
Config.getPolicies()             // Politiche e orari
Config.getMedia()                // Asset multimediali
Config.isFeatureEnabled(id)      // Check feature flag
Config.hasAmenity(id)            // Check amenity
Config.isReady()                 // Stato pronto
Config.waitForReady()            // Promise attesa
```

### 3. Renderers

#### RoomsRenderer (`js/rooms-renderer.js`)
Renderizza griglia camere dinamicamente.

**Metodi**:
- `render()` - Renderizza tutte le camere
- `createRoomCard(room, index)` - Crea card singola
- `updateSubtitle()` - Aggiorna sottotitolo sezione

#### ServicesRenderer (`js/services-renderer.js`)
Renderizza griglia servizi con badge categoria.

**Metodi**:
- `render()` - Renderizza servizi abilitati
- `createServiceItem(service)` - Crea elemento servizio

#### FAQRenderer (`js/faq-renderer.js`)
Renderizza accordion FAQ.

**Metodi**:
- `render()` - Renderizza FAQ ordinate
- `createFAQItem(faq, index)` - Crea elemento FAQ
- `initAccordion()` - Inizializza comportamento accordion

#### SchemaRenderer (`js/schema-renderer.js`)
Genera Schema.org JSON-LD dinamico.

**Metodi**:
- `render()` - Genera e inserisce schema
- `buildAddress()`, `buildGeo()`, `buildAmenities()` - Builder

### 4. ConfigInit (`js/config-init.js`)

**Responsabilità**: Orchestrazione inizializzazione

**Funzioni**:
- `init()` - Entry point
- `populateHeader()` - Logo e branding
- `populateFooter()` - Contatti e indirizzo
- `populateHero()` - Sezione hero
- `populateStructure()` - Sezione struttura
- `populateContacts()` - Sezione contatti
- `populateForm()` - Form preventivo

## Flusso Dati

### Inizializzazione Pagina
```
DOMContentLoaded
    │
    ▼
Config.init()
    │
    ├── ConfigLoader.loadAll()
    │       ├── fetch(config/business.json)
    │       ├── fetch(config/property.json)
    │       ├── fetch(config/rooms.json)
    │       ├── fetch(config/services.json)
    │       ├── fetch(config/faq.json)
    │       ├── fetch(config/media.json)
    │       └── fetch(config/policies.json)
    │
    ▼
Config pronto
    │
    ▼
populateHeader()
populateFooter()
populateHero()
populateStructure()
populateContacts()
populateForm()
    │
    ▼
Renderers
RoomsRenderer.render()
ServicesRenderer.render()
FAQRenderer.render()
SchemaRenderer.render()
```

## Struttura File JSON

### business.json
```json
{
  "name": "string",
  "tagline": "string",
  "description": "string",
  "contacts": {
    "email": "string",
    "phone": "string",
    "whatsapp": "string"
  },
  "address": {
    "street": "string",
    "zip": "string",
    "city": "string",
    "province": "string",
    "coordinates": {
      "lat": number,
      "lng": number
    }
  }
}
```

### property.json
```json
{
  "totalArea": number,
  "totalRooms": number,
  "maxGuests": number,
  "features": {
    "independentEntrance": boolean,
    "privateParking": boolean,
    "terrace": boolean,
    "accessibility": boolean
  }
}
```

### rooms.json
```json
{
  "rooms": [
    {
      "id": "string",
      "name": "string",
      "type": "enum",
      "capacity": number,
      "beds": [{"type": "enum", "count": number}],
      "amenities": ["string"],
      "images": ["string"]
    }
  ]
}
```

### services.json
```json
{
  "services": [
    {
      "id": "string",
      "name": "string",
      "category": "included|paid|on_request",
      "enabled": boolean,
      "icon": "string"
    }
  ],
  "commonAmenities": {
    "wifi": boolean,
    "breakfast": boolean,
    "ac": boolean
  }
}
```

## Convenzioni

### Naming
- File JSON: `kebab-case.json`
- ID: `snake_case`
- Classi JS: `PascalCase`
- Funzioni: `camelCase`

### Path Dot-Notation
```javascript
Config.get('business.name');              // → "A Due Passi Da"
Config.get('business.contacts.phone');   // → "+39..."
Config.get('property.features.terrace'); // → true
```

### Error Handling
- Log in console con prefisso `[Modulo]`
- Fallback a valori default
- Graceful degradation (sito funziona anche con config parziale)

## Performance

### Ottimizzazioni
- Caching in-memory di tutti i config
- Caricamento parallelo file JSON
- Lazy loading immagini (browser native)
- Nessuna dipendenza esterna

### Metriche
- Caricamento config: < 100ms
- Rendering camere: < 50ms per 4 camere
- First Paint: non impattato

## Sicurezza

- Escape HTML in tutti i contenuti dinamici
- No eval() o parsing unsafe
- Validazione percorsi immagini (no path traversal)

## Estensibilità

Per aggiungere un nuovo campo configurabile:

1. Aggiungere campo al file JSON appropriato
2. Aggiungere getter in ConfigManager (se necessario)
3. Aggiungere rendering nel renderer appropriato
4. Aggiornare documentazione

## Debug

### Console Logging
Tutti i moduli loggano in console:
```
[ConfigLoader] Caricato: config/business.json
[ConfigManager] Pronto
[ConfigInit] Logo aggiornato: A Due Passi Da
[RoomsRenderer] Rendering 4 camere...
```

### API Debug
```javascript
Config.debug();           // Stampa tutta la configurazione
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- iOS Safari 13+

## Limitazioni

- Modifiche richiedono refresh pagina
- No validazione real-time (solo console log)
- Backup/versioning gestito via Git

## Riferimenti

- `config/README.md` - Guida utente
- `docs/feature/set_informazioni/requirements.md` - Requisiti tecnici
- `docs/feature/set_informazioni/implementation_plan.md` - Piano implementazione
