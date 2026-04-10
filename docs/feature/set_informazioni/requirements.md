# Requirements - Sistema di Configurazione B&B

## 1. Overview

Questo documento definisce i requisiti tecnici e funzionali dettagliati per il sistema di configurazione del B&B "A Due Passi Da". Fornisce le specifiche necessarie per la creazione dell'implementation plan e lo sviluppo del sistema.

---

## 2. Requisiti Funzionali

### 2.1 Architettura del Sistema di Configurazione

#### 2.1.1 Struttura File System
| Requisito | ID | Descrizione | Priorità |
|-----------|-----|-------------|----------|
| FS-001 | Creazione cartella `config/` nella root del progetto | Alta |
| FS-002 | Organizzazione file JSON separati per dominio funzionale | Alta |
| FS-003 | File di configurazione versionabili via Git | Alta |
| FS-004 | Supporto per percorsi relativi per asset (immagini) | Alta |

#### 2.1.2 File di Configurazione Richiesti
| File | Scopo | Contenuto Principale |
|------|-------|---------------------|
| `business.json` | Informazioni generali | Nome, slogan, contatti, social |
| `property.json` | Caratteristiche struttura | Superficie, camere, ospiti, servizi flag |
| `rooms.json` | Configurazione camere | Array dinamico tipologie camera |
| `services.json` | Servizi offerti | Lista servizi con flag enabled |
| `faq.json` | Domande frequenti | Array domande/risposte |
| `media.json` | Asset multimediali | Percorsi immagini e gallerie |
| `policies.json` | Orari e politiche | Check-in/out, regole, pagamenti |

### 2.2 Requisiti File `business.json`

#### 2.2.1 Schema Dati Business
```json
{
  "name": "string (obbligatorio, max 100 char)",
  "tagline": "string (max 200 char)",
  "category": "string (es: 'B&B', 'Agriturismo')",
  "stars": "number (1-5, opzionale)",
  "description": "string (max 2000 char)",
  "contacts": {
    "email": "string (valid email format)",
    "phone": "string (con prefisso internazionale)",
    "whatsapp": "string (numero per WA link)",
    "social": {
      "facebook": "string (url, opzionale)",
      "instagram": "string (url, opzionale)",
      "twitter": "string (url, opzionale)"
    }
  },
  "address": {
    "street": "string (via e numero civico)",
    "zip": "string (5 char italiano)",
    "city": "string",
    "province": "string (2 char, es: 'BA')",
    "region": "string (es: 'Puglia')",
    "country": "string (default: 'IT')",
    "coordinates": {
      "lat": "number",
      "lng": "number"
    }
  },
  "distances": {
    "station": "string (es: '700 m')",
    "airport": "string (es: '42 km')"
  }
}
```

#### 2.2.2 Validazione Business
| Campo | Validazione | Messaggio Errore |
|-------|-------------|------------------|
| email | Regex email standard | "Formato email non valido" |
| phone | Min 8 char, solo numeri e + | "Numero telefono non valido" |
| coordinates | Lat -90/90, Lng -180/180 | "Coordinate GPS non valide" |
| zip | Regex `/^\d{5}$/` | "CAP non valido" |

### 2.3 Requisiti File `property.json`

#### 2.3.1 Schema Dati Property
```json
{
  "totalArea": "number (m², > 0)",
  "totalRooms": "number (> 0)",
  "maxGuests": "number (> 0)",
  "features": {
    "independentEntrance": "boolean",
    "privateParking": "boolean",
    "garden": "boolean",
    "terrace": "boolean",
    "pool": "boolean",
    "accessibility": "boolean"
  }
}
```

#### 2.3.2 Rendering Dinamico Features
| Requisito | ID | Descrizione |
|-----------|-----|-------------|
| PF-001 | Ogni feature booleana deve controllare visibilità elemento UI corrispondente | Alta |
| PF-002 | Feature attive mostrano badge/icona nella sezione struttura | Alta |
| PF-003 | Feature disattivate nascondono completamente il riferimento UI | Alta |
| PF-004 | Feature parcheggio e accessibilità influenzano anche sezione FAQ dinamica | Media |

### 2.4 Requisiti File `rooms.json`

#### 2.4.1 Schema Dati Rooms (Array)
```json
{
  "rooms": [
    {
      "id": "string (unique, snake_case)",
      "name": "string (max 50 char)",
      "type": "enum: single, double, twin, triple, family, suite, communicating",
      "capacity": "number (max ospiti)",
      "area": "number (m², opzionale)",
      "beds": [
        {
          "type": "enum: single, double, bunk, sofa",
          "count": "number"
        }
      ],
      "amenities": ["string (array id servizi)"],
      "description": "string (max 500 char)",
      "images": ["string (array percorsi relativi)"],
      "featured": "boolean (mostra in evidenza)"
    }
  ]
}
```

#### 2.4.2 Funzionalità Sistema Camere
| Requisito | ID | Descrizione | Priorità |
|-----------|-----|-------------|----------|
| RM-001 | Rendering dinamico card camere basato su array rooms | Alta |
| RM-002 | Ordinamento camere per campo `order` o alfabetico | Media |
| RM-003 | Supporto aggiunta nuova camera senza modifica codice | Alta |
| RM-004 | Validazione che id camera sia unique | Alta |
| RM-005 | Gestione immagini multiple per camera con gallery | Media |
| RM-006 | Filtraggio camere featured per sezione hero/promo | Bassa |

### 2.5 Requisiti File `services.json`

#### 2.5.1 Schema Dati Services
```json
{
  "services": [
    {
      "id": "string (unique)",
      "name": "string",
      "category": "enum: included, paid, on_request",
      "enabled": "boolean",
      "icon": "string (font awesome class)",
      "description": "string (max 200 char)"
    }
  ],
  "commonAmenities": {
    "wifi": "boolean",
    "breakfast": "boolean",
    "ac": "boolean",
    "tv": "boolean",
    "hairdryer": "boolean",
    "minibar": "boolean",
    "shuttle": "boolean",
    "laundry": "boolean",
    "pets": "boolean"
  }
}
```

#### 2.5.2 Rendering Servizi
| Requisito | ID | Descrizione |
|-----------|-----|-------------|
| SV-001 | Servizi con `enabled: false` non visualizzati | Alta |
| SV-002 | Categorizzazione visiva per badge included/paid/on_request | Alta |
| SV-003 | Icone Font Awesome configurabili per servizio | Media |
| SV-004 | Common amenities influenzano structured data Schema.org | Alta |

### 2.6 Requisiti File `faq.json`

#### 2.6.1 Schema Dati FAQ
```json
{
  "faqs": [
    {
      "id": "string (unique)",
      "question": "string (max 200 char)",
      "answer": "string (max 1000 char)",
      "order": "number",
      "category": "enum: general, booking, services, policies"
    }
  ]
}
```

#### 2.6.2 Funzionalità FAQ
| Requisito | ID | Descrizione | Priorità |
|-----------|-----|-------------|----------|
| FQ-001 | Rendering accordion dinamico da array faqs | Alta |
| FQ-002 | Ordinamento per campo `order` crescente | Media |
| FQ-003 | Supporto aggiunta/rimozione FAQ senza codice | Alta |
| FQ-004 | Possibile filtraggio per categoria (futuro) | Bassa |

### 2.7 Requisiti File `media.json`

#### 2.7.1 Schema Dati Media
```json
{
  "hero": {
    "background": "string (percorso relativo)",
    "overlay": "boolean (default: true)"
  },
  "structure": {
    "exterior": ["string (array percorsi)"],
    "interior": ["string (array percorsi)"],
    "common": ["string (array percorsi)"]
  },
  "rooms": {
    "pattern": "string (es: 'images/camere/{roomId}/')",
    "fallback": "string (immagine default)"
  },
  "gallery": {
    "path": "string (cartella galleria)",
    "autoScan": "boolean"
  }
}
```

#### 2.7.2 Gestione Immagini
| Requisito | ID | Descrizione |
|-----------|-----|-------------|
| MD-001 | Supporto percorsi relativi dalla root progetto | Alta |
| MD-002 | Fallback su immagine default se percorso non trovato | Media |
| MD-003 | Lazy loading per immagini galleria | Alta |
| MD-004 | Supporto auto-scan cartella per gallerie (opzionale) | Bassa |

### 2.8 Requisiti File `policies.json`

#### 2.8.1 Schema Dati Policies
```json
{
  "checkIn": {
    "time": "string (es: '14:00' o 'Flessibile')",
    "notes": "string (max 200 char)"
  },
  "checkOut": {
    "time": "string (es: '11:00')",
    "notes": "string"
  },
  "cancellation": {
    "policy": "string (max 500 char)",
    "deadline": "string (es: '48 ore')"
  },
  "pets": {
    "allowed": "boolean",
    "policy": "string (max 300 char)",
    "fee": "string (opzionale)"
  },
  "smoking": {
    "allowed": "boolean",
    "areas": "string (max 200 char)"
  },
  "payments": {
    "methods": ["string (array: cash, card, transfer, paypal)"],
    "notes": "string"
  }
}
```

### 2.9 Requisiti Loader e Integrazione

#### 2.9.1 Sistema di Caricamento
| Requisito | ID | Descrizione | Priorità |
|-----------|-----|-------------|----------|
| LD-001 | Caricamento asincrono file JSON all'avvio | Alta |
| LD-002 | Gestione errori con fallback a valori default | Alta |
| LD-003 | Caching configurazioni in memory | Media |
| LD-004 | Reload configurazioni senza refresh (opzionale) | Bassa |
| LD-005 | Logging errori caricamento in console | Media |

#### 2.9.2 API JavaScript
| Metodo | Descrizione | Return |
|--------|-------------|--------|
| `Config.get(key)` | Recupero valore per chiave | any |
| `Config.getBusiness()` | Oggetto business completo | object |
| `Config.getRooms()` | Array camere | array |
| `Config.getServices()` | Array servizi abilitati | array |
| `Config.getFAQ()` | Array FAQ ordinate | array |
| `Config.isFeatureEnabled(id)` | Stato feature boolean | boolean |

---

## 3. Requisiti Non Funzionali

### 3.1 Performance

| ID | Requisito | Metrica | Priorità |
|-----|-----------|---------|----------|
| NF-P001 | Tempo caricamento configurazioni | < 100ms | Alta |
| NF-P002 | Impact sul primo paint | < 50ms | Alta |
| NF-P003 | Dimensione totale file config | < 100KB | Media |
| NF-P004 | Lazy loading immagini | Native browser | Alta |

### 3.2 Affidabilità

| ID | Requisito | Descrizione | Priorità |
|-----|-----------|-------------|----------|
| NF-R001 | Graceful degradation | Sito funziona con config parziale | Alta |
| NF-R002 | Valori default | Ogni campo ha fallback | Alta |
| NF-R003 | Error handling | Errori loggati, non crash | Alta |
| NF-R004 | Validazione runtime | Controllo tipo e range dati | Media |

### 3.3 Sicurezza

| ID | Requisito | Implementazione | Priorità |
|-----|-----------|-----------------|----------|
| NF-S001 | Sanitizzazione input | Escape HTML in contenuti dinamici | Alta |
| NF-S002 | No eval() | Parsing JSON nativo | Alta |
| NF-S003 | Path traversal | Validazione percorsi immagini | Media |

### 3.4 Manutenibilità

| ID | Requisito | Descrizione | Priorità |
|-----|-----------|-------------|----------|
| NF-M001 | Commenti JSON | Supporto JSON5 o documentazione | Media |
| NF-M002 | Schema version | Versione in ogni file config | Bassa |
| NF-M003 | Backward compatibility | Supporto schema legacy | Media |

### 3.5 Compatibilità

| ID | Requisito | Target | Priorità |
|-----|-----------|--------|----------|
| NF-C001 | Browser support | Chrome, Firefox, Safari, Edge (ultime 2 versioni) | Alta |
| NF-C002 | Mobile | iOS Safari, Chrome Mobile | Alta |
| NF-C003 | GitHub Pages | No dipendenze server-side | Alta |
| NF-C004 | ES6+ | Arrow functions, fetch API, template literals | Alta |

---

## 4. Interfacce e Contratti

### 4.1 Interfaccia ConfigLoader

```javascript
// Contratto obbligatorio per il loader
interface ConfigLoader {
  // Caricamento file singolo
  loadFile(filename: string): Promise<Object>;
  
  // Caricamento batch tutti i config
  loadAll(): Promise<ConfigCollection>;
  
  // Accesso valore con path dot-notation
  get(path: string): any;
  
  // Validazione schema
  validate(file: string, schema: Object): boolean;
}

// Oggetto configurazione completo
type ConfigCollection = {
  business: BusinessConfig;
  property: PropertyConfig;
  rooms: RoomsConfig;
  services: ServicesConfig;
  faq: FAQConfig;
  media: MediaConfig;
  policies: PoliciesConfig;
}
```

### 4.2 Schema Validation Rules

| File | Regole Validazione |
|------|-------------------|
| business.json | Required: name, email, phone, address.street, address.city |
| property.json | Required: totalArea, totalRooms, maxGuests. Numbers > 0 |
| rooms.json | Array non vuoto. Ogni room richiede: id, name, type, capacity |
| services.json | Almeno un servizio enabled. IDs unici |
| faq.json | Max 20 FAQ. Ogni FAQ richiede: id, question, answer |
| media.json | Percorsi validi (no traversal ../) |
| policies.json | Times in formato HH:MM o stringa "Flessibile" |

---

## 5. Casi d'Uso

### 5.1 UC-001: Modifica Contatto Telefono
**Attore**: Proprietario B&B
**Scenario**:
1. Utente apre `config/business.json`
2. Modifica campo `contacts.phone`
3. Salva file
4. Ricarica pagina sito
5. Nuovo telefono visibile in header, footer, e form

**Post-condizioni**: 
- Link `tel:` aggiornato ovunque
- WhatsApp link aggiornato se usa stesso numero
- Footer aggiornato

### 5.2 UC-002: Aggiunta Nuova Camera
**Attore**: Proprietario B&B
**Scenario**:
1. Utente apre `config/rooms.json`
2. Aggiunge nuovo oggetto all'array `rooms`
3. Compila campi richiesti: id, name, type, capacity
4. Specifica immagini in array `images`
5. Salva file
6. Ricarica pagina sito
7. Nuova camera appare automaticamente in sezione "Camere"

**Post-condizioni**:
- Card camera renderizzata con dati forniti
- Immagini caricate da percorsi specificati
- Sezione struttura aggiornata con numero camere

### 5.3 UC-003: Disabilitazione Servizio
**Attore**: Proprietario B&B
**Scenario**:
1. Utente apre `config/services.json`
2. Trova servizio da disabilitare
3. Cambia `enabled` da `true` a `false`
4. Salva file
5. Ricarica pagina sito
6. Servizio non più visibile in lista

**Post-condizioni**:
- Servizio rimosso dalla griglia servizi
- Icona non più renderizzata
- Structured data aggiornato (se applicabile)

### 5.4 UC-004: Aggiunta FAQ
**Attore**: Proprietario B&B
**Scenario**:
1. Utente apre `config/faq.json`
2. Aggiunge oggetto all'array `faqs`
3. Compila: id, question, answer, order
4. Salva file
5. Ricarica pagina sito
6. Nuova FAQ appare in accordion con ordinamento corretto

**Post-condizioni**:
- FAQ visibile in sezione FAQ
- Ordinamento rispetta campo `order`
- Accordion funzionante

---

## 6. Criteri di Accettazione

### 6.1 Test Funzionali

| ID | Test | Criterio di Successo |
|-----|------|----------------------|
| A-001 | Caricamento tutti i config | Tutti i file JSON caricati senza errori console |
| A-002 | Modifica business info | Cambio nome visibile immediatamente dopo refresh |
| A-003 | Feature flags | Disabilitazione feature nasconde elemento UI |
| A-004 | Aggiunta camera | Nuova camera renderizzata correttamente |
| A-005 | Rimozione camera | Camera rimossa non più visibile |
| A-006 | Servizi enabled | Solo servizi enabled mostrati |
| A-007 | FAQ ordinate | Ordinamento rispetta campo order |
| A-008 | Immagini camere | Percorsi configurabili funzionanti |
| A-009 | Fallback mancanti | Sito funziona anche con config parziale |
| A-010 | Validazione email | Email non valida logga warning, usa default |

### 6.2 Test Non Funzionali

| ID | Test | Criterio di Successo |
|-----|------|----------------------|
| A-NF01 | Performance load | Config caricata in < 100ms |
| A-NF02 | Mobile rendering | Config applicata correttamente su mobile |
| A-NF03 | Cross-browser | Funzionamento identico Chrome, Firefox, Safari |
| A-NF04 | Error handling | Errore in un file non blocca altri |
| A-NF05 | Sanitizzazione | HTML injection non esegue script |

### 6.3 Test Integrazione

| ID | Test | Criterio di Successo |
|-----|------|----------------------|
| A-INT01 | Integrazione esistente | Sito esistente funziona con nuovo sistema |
| A-INT02 | Form contatti | Form usa email e telefono da config |
| A-INT03 | WhatsApp link | Link WA generato correttamente con numero config |
| A-INT04 | Schema.org | Structured data usa valori da config |
| A-INT05 | SEO meta | Meta tag popolati da config business |

---

## 7. Dipendenze e Vincoli

### 7.1 Dipendenze Tecnologiche
- **Nessuna dipendenza esterna** per il sistema di configurazione core
- **Vanilla JavaScript** (ES6+) per loader
- **Fetch API** per caricamento file (nativo browser)

### 7.2 Vincoli di Sistema
- File JSON devono essere validi (no trailing commas)
- Encoding UTF-8 per supporto caratteri speciali italiani
- Percorsi immagini relativi alla root progetto

### 7.3 Limitazioni Note
- No persistenza runtime (modifiche richiedono refresh)
- No validazione real-time (errore visibile solo in console)
- No sistema backup automatico (gestito via Git)

---

## 8. Documentazione Richiesta

### 8.1 Documentazione Utente
- `README_CONFIG.md`: Guida modifica file JSON
- Schema documentato con esempi per ogni file
- Troubleshooting comune

### 8.2 Documentazione Tecnica
- JSDoc per tutte le funzioni Config API
- Schema validation rules documentate
- Note su estensione sistema

---

## 9. Checklist Pre-Implementation

- [ ] Struttura cartelle `config/` definita
- [ ] Schemi JSON validati e documentati
- [ ] Valori default identificati per ogni campo
- [ ] API JavaScript Config progettata
- [ ] Error handling strategy definita
- [ ] Test cases preparati
- [ ] Documentazione schema pronta

---

**Nota**: Questo documento fornisce le specifiche dettagliate per l'implementation plan. Non include dettagli di codifica specifici (nomi esatti funzioni, algoritmi, tool) che saranno definiti nella fase di implementazione.
