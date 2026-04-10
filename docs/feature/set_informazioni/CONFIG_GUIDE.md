# Guida Completa - Sistema di Configurazione B&B

## 📚 Indice

1. [Introduzione](#introduzione)
2. [File di Configurazione](#file-di-configurazione)
3. [business.json - Informazioni Generali](#businessjson)
4. [property.json - Caratteristiche Struttura](#propertyjson)
5. [rooms.json - Configurazione Camere](#roomsjson)
6. [services.json - Servizi Offerti](#servicesjson)
7. [faq.json - Domande Frequenti](#faqjson)
8. [media.json - Immagini e Asset](#mediajson)
9. [policies.json - Orari e Politiche](#policiesjson)
10. [Esempi Pratici](#esempi-pratici)
11. [Troubleshooting](#troubleshooting)

---

## Introduzione

Questa guida spiega nel dettaglio come funziona il sistema di configurazione del B&B. Ogni file JSON controlla specifiche parti del sito web. Modificando questi file, puoi aggiornare contenuti, aggiungere camere, attivare/disattivare servizi e molto altro - **senza toccare una riga di codice**.

### Come Funziona

1. Apri il file JSON che vuoi modificare
2. Modifica i valori (mantieni la struttura!)
3. Salva il file
4. Ricarica la pagina del sito (F5)
5. Le modifiche sono visibili immediatamente

### Regole Importanti

- I file devono essere **validi JSON** (usa virgolette doppie, no virgole finali)
- Non modificare i nomi dei campi (solo i valori)
- Fai un backup prima di modifiche importanti
- Se rompi qualcosa, il sito mostra valori di default (non crasha)

---

## File di Configurazione

| File | Controlla | Complessità |
|------|-----------|-------------|
| `business.json` | Nome, contatti, indirizzo | ⭐ Facile |
| `property.json` | Superficie, camere, feature | ⭐ Facile |
| `rooms.json` | Camere e tipologie | ⭐⭐ Medio |
| `services.json` | Servizi offerti | ⭐ Facile |
| `faq.json` | Domande e risposte | ⭐ Facile |
| `media.json` | Percorsi immagini | ⭐⭐ Medio |
| `policies.json` | Orari e regole | ⭐ Facile |

---

## business.json

**Cosa controlla**: Tutte le informazioni generali del B&B che compaiono in header, footer, e meta tag.

### Campi

#### `name` (string)
**Descrizione**: Nome del B&B
**Dove compare**: Logo header, footer, titolo pagina, Schema.org
**Esempio**: `"A Due Passi Da"`

#### `tagline` (string)
**Descrizione**: Slogan/descrizione breve
**Dove compare**: Hero section, sotto il titolo principale
**Esempio**: `"Il tuo appartamento privato nel cuore della Puglia"`

#### `category` (string)
**Descrizione**: Tipologia struttura
**Valori**: `"B&B"`, `"Agriturismo"`, `"Appartamento"`, ecc.

#### `description` (string)
**Descrizione**: Descrizione completa della struttura (max 2000 caratteri)
**Dove compare**: Sezione "La Struttura", meta description, Schema.org

### Oggetto `contacts`

#### `contacts.email` (string)
**Formato**: `nome@dominio.com`
**Dove compare**: 
- Footer (icona email)
- Sezione Contatti (card email)
- Link "mailto:" per inviare email
- Schema.org

#### `contacts.phone` (string)
**Formato**: Con prefisso internazionale `+39 392 139 3823`
**Dove compare**:
- Footer (icona telefono)
- Sezione Contatti (card telefono)
- Link "tel:" per chiamare da mobile
- Schema.org

#### `contacts.whatsapp` (string)
**Formato**: Numero con prefisso internazionale, senza spazi `+393921393823`
**Dove compare**:
- Footer (icona WhatsApp)
- Sezione Contatti (card WhatsApp)
- Link diretto WhatsApp Web/App

### Oggetto `address`

#### `address.street` (string)
**Descrizione**: Via e numero civico
**Esempio**: `"Via Duomo, 81"`
**Dove compare**: Footer, Schema.org

#### `address.zip` (string)
**Descrizione**: CAP (5 cifre)
**Esempio**: `"70033"`

#### `address.city` (string)
**Descrizione**: Città
**Esempio**: `"Corato"`

#### `address.province` (string)
**Descrizione**: Sigla provincia (2 lettere)
**Esempio**: `"BA"`

#### `address.region` (string)
**Descrizione**: Regione
**Esempio**: `"Puglia"`

#### `address.country` (string)
**Default**: `"IT"`
**Descrizione**: Codice paese ISO

#### `address.coordinates.lat` (number)
**Descrizione**: Latitudine GPS
**Esempio**: `41.1536`

#### `address.coordinates.lng` (number)
**Descrizione**: Longitudine GPS
**Esempio**: `16.4082`

### Oggetto `distances`

#### `distances.station` (string)
**Descrizione**: Distanza dalla stazione
**Esempio**: `"700 m"`
**Dove compare**: Sezione "La Struttura" (highlights)

#### `distances.airport` (string)
**Descrizione**: Distanza dall'aeroporto
**Esempio**: `"42 km"`

### Modifiche Comuni

#### Cambiare numero di telefono
```json
{
  "contacts": {
    "phone": "+39 333 123 4567",
    "whatsapp": "+393331234567"
  }
}
```
**Effetto**: Il nuovo numero appare in footer, contatti, e link diretti.

#### Cambiare indirizzo
```json
{
  "address": {
    "street": "Via Roma, 123",
    "city": "Bari",
    "province": "BA",
    "zip": "70100"
  }
}
```
**Effetto**: Footer aggiornato, mappa (se implementata), Schema.org.

---

## property.json

**Cosa controlla**: Caratteristiche fisiche della struttura e feature flags.

### Campi Numerici

#### `totalArea` (number)
**Descrizione**: Superficie totale in m²
**Esempio**: `50`
**Dove compare**: Sezione "La Struttura" (testo descrittivo)

#### `totalRooms` (number)
**Descrizione**: Numero totale di camere
**Esempio**: `4`
**Dove compare**: Sottotitolo sezione Camere, Schema.org

#### `maxGuests` (number)
**Descrizione**: Numero massimo di ospiti
**Esempio**: `10`
**Dove compare**: 
- Hero section (badge "Fino a X ospiti")
- Sottotitolo sezione Camere
- Form preventivo (max input ospiti)
- Schema.org

### Oggetto `features` (Feature Flags)

Questi sono booleani (`true` o `false`) che mostrano/nascondono elementi.

#### `features.independentEntrance` (boolean)
**Descrizione**: Ingresso indipendente
**Default**: `true`
**Effetto**: Se `true`, mostra "Ingresso indipendente e appartamento privato" nella lista highlights

#### `features.privateParking` (boolean)
**Descrizione**: Parcheggio privato disponibile
**Default**: `true`
**Effetto**: 
- Se `true`: mostra "Parcheggio privato disponibile" in highlights
- Se `false`: nasconde il riferimento al parcheggio

#### `features.garden` (boolean)
**Descrizione**: Giardino
**Default**: `false`
**Effetto**: Se `true`, mostra "Giardino privato" in highlights

#### `features.terrace` (boolean)
**Descrizione**: Terrazza/solarium
**Default**: `true`
**Effetto**: Se `true`, mostra "Terrazza solarium con vista" in highlights e in Schema.org

#### `features.pool` (boolean)
**Descrizione**: Piscina
**Default**: `false`
**Effetto**: Se `true`, mostra "Piscina" in highlights e in Schema.org

#### `features.accessibility` (boolean)
**Descrizione**: Accessibilità per disabili/ascensore
**Default**: `false`
**Effetto**: 
- Se `true`: cambia la nota accessibilità in positivo (verde)
- Se `false`: mostra nota "raggiungibile solo tramite scale"

### Modifiche Comuni

#### Aggiungere piscina
```json
{
  "features": {
    "pool": true
  }
}
```
**Effetto**: Appare "Piscina" nella lista highlights della struttura.

#### Disabilitare parcheggio
```json
{
  "features": {
    "privateParking": false
  }
}
```
**Effetto**: Scompare il riferimento al parcheggio dalla sezione struttura.

---

## rooms.json

**Cosa controlla**: Configurazione dinamica delle camere. Puoi aggiungere, rimuovere o modificare camere.

### Struttura

```json
{
  "rooms": [
    { /* camera 1 */ },
    { /* camera 2 */ },
    ...
  ]
}
```

### Campi per ogni camera

#### `id` (string, obbligatorio)
**Descrizione**: Identificatore unico della camera (snake_case)
**Esempio**: `"camera_matrimoniale"`, `"suite_vista_mare"`
**Importante**: Deve essere unico e non contenere spazi

#### `name` (string, obbligatorio)
**Descrizione**: Nome visualizzato della camera
**Esempio**: `"Camera Matrimoniale"`, `"Suite Vista Mare"`
**Dove compare**: Titolo card camera

#### `type` (string)
**Descrizione**: Tipologia camera
**Valori possibili**:
- `"single"` - Camera singola
- `"double"` - Camera doppia/matrimoniale
- `"twin"` - Camera con 2 letti singoli
- `"triple"` - Camera tripla
- `"family"` - Camera familiare
- `"suite"` - Suite
- `"communicating"` - Camere comunicanti

#### `capacity` (number, obbligatorio)
**Descrizione**: Numero massimo di ospiti
**Esempio**: `2`, `4`

#### `area` (number, opzionale)
**Descrizione**: Superficie in m²
**Esempio**: `25`

#### `beds` (array)
**Descrizione**: Configurazione letti
**Struttura**:
```json
[
  {
    "type": "single|double|bunk|sofa",
    "count": 1
  }
]
```

**Esempi**:
```json
// Letto matrimoniale
[{ "type": "double", "count": 1 }]

// 2 letti singoli
[{ "type": "single", "count": 2 }]

// Matrimoniale + singolo
[
  { "type": "double", "count": 1 },
  { "type": "single", "count": 1 }
]
```

#### `amenities` (array di string)
**Descrizione**: Servizi inclusi nella camera
**Valori disponibili**:
- `"ac"` - Aria condizionata
- `"tv"` - TV
- `"wifi"` - Wi-Fi
- `"bathroom"` - Bagno privato
- `"baby"` - Seggiolone
- `"hairdryer"` - Asciugacapelli
- `"minibar"` - Minibar

#### `description` (string)
**Descrizione**: Testo descrittivo (max 500 caratteri)
**Dove compare**: Sotto il titolo nella card camera

#### `images` (array di string)
**Descrizione**: Percorsi immagini della camera
**Esempio**: `["images/camere/camera-1.jpg"]`
**Nota**: Se vuoto, usa l'immagine di fallback

#### `featured` (boolean)
**Descrizione**: Camera in evidenza
**Effetto**: Può essere usato per evidenziare camere speciali (futuro)

### Modifiche Comuni

#### Aggiungere una nuova camera
Copia un oggetto camera esistente e modificalo:

```json
{
  "rooms": [
    // ... camere esistenti ...
    {
      "id": "nuova_camera",
      "name": "Camera Deluxe",
      "type": "double",
      "capacity": 2,
      "beds": [{ "type": "double", "count": 1 }],
      "amenities": ["ac", "tv", "wifi", "minibar"],
      "description": "Camera elegante con vista panoramica",
      "images": ["images/camere/camera-deluxe.jpg"],
      "featured": true
    }
  ]
}
```
**Effetto**: Appare automaticamente una nuova card nella sezione Camere.

#### Rimuovere una camera
Semplicemente elimina l'oggetto dall'array `rooms`.

#### Modificare descrizione camera
```json
{
  "id": "camera_matrimoniale",
  "description": "Nuova descrizione della camera matrimoniale"
}
```
**Effetto**: La card si aggiorna con il nuovo testo.

---

## services.json

**Cosa controlla**: Servizi offerti dalla struttura, con flag per attivarli/disattivarli.

### Struttura

```json
{
  "services": [
    { /* servizio 1 */ },
    { /* servizio 2 */ }
  ],
  "commonAmenities": {
    "wifi": true,
    "breakfast": true,
    ...
  }
}
```

### Campi per ogni servizio

#### `id` (string)
**Descrizione**: Identificatore unico
**Esempio**: `"wifi"`, `"parking"`, `"colazione"`

#### `name` (string)
**Descrizione**: Nome visualizzato
**Esempio**: `"Wi-Fi gratuito"`, `"Parcheggio privato"`

#### `category` (string)
**Descrizione**: Categoria servizio (determina il badge)
**Valori**:
- `"included"` - Incluso nel prezzo (badge verde)
- `"paid"` - A pagamento (badge giallo)
- `"on_request"` - Su richiesta (badge arancione)

#### `enabled` (boolean) ⭐ IMPORTANTE
**Descrizione**: Attiva/disattiva il servizio
**Effetto**:
- `true`: Servizio visibile nella griglia
- `false`: Servizio nascosto

#### `icon` (string)
**Descrizione**: Classe Font Awesome
**Esempio**: `"fa-solid fa-wifi"`, `"fa-solid fa-car"`
**Dove trovare icone**: [Font Awesome Icons](https://fontawesome.com/icons)

#### `description` (string)
**Descrizione**: Testo descrittivo (per tooltip o dettagli futuri)

### Oggetto `commonAmenities`

Questi booleani controllano le amenities per Schema.org (SEO).

- `wifi`, `breakfast`, `ac`, `tv`, `hairdryer`, `minibar`, `shuttle`, `laundry`, `pets`

### Modifiche Comuni

#### Disabilitare un servizio
```json
{
  "id": "lavanderia",
  "enabled": false
}
```
**Effetto**: Il servizio scompare dalla griglia servizi.

#### Aggiungere un nuovo servizio
```json
{
  "services": [
    // ... servizi esistenti ...
    {
      "id": " Spa",
      "name": "Accesso Spa",
      "category": "paid",
      "enabled": true,
      "icon": "fa-solid fa-spa",
      "description": "Accesso alla spa con piscina termale"
    }
  ]
}
```
**Effetto**: Appare un nuovo box nella griglia servizi con badge "A pagamento".

#### Cambiare categoria
```json
{
  "id": "parcheggio",
  "category": "included"
}
```
**Effetto**: Il badge cambia da "A pagamento" a "Incluso".

---

## faq.json

**Cosa controlla**: Domande e risposte nella sezione FAQ.

### Struttura

```json
{
  "faqs": [
    {
      "id": "...",
      "question": "...",
      "answer": "...",
      "order": 1,
      "category": "..."
    }
  ]
}
```

### Campi

#### `id` (string)
**Descrizione**: Identificatore unico
**Esempio**: `"checkin-time"`, `"colazione"`, `"animali"`

#### `question` (string)
**Descrizione**: Testo della domanda
**Esempio**: `"A che ora è il check-in?"`
**Dove compare**: Titolo dell'accordion (cliccabile)

#### `answer` (string)
**Descrizione**: Testo della risposta
**Esempio**: `"Il check-in è flessibile..."`
**Dove compare**: Contenuto espandibile dell'accordion

#### `order` (number)
**Descrizione**: Ordine di visualizzazione (crescente)
**Esempio**: `1`, `2`, `3`
**Effetto**: FAQ con order=1 appare prima, order=10 dopo

#### `category` (string, opzionale)
**Descrizione**: Categoria per futuro filtraggio
**Valori**: `"general"`, `"booking"`, `"services"`, `"policies"`

### Modifiche Comuni

#### Aggiungere una FAQ
```json
{
  "faqs": [
    // ... esistenti ...
    {
      "id": "late-checkin",
      "question": "Posso fare check-in tardivo?",
      "answer": "Sì, concordiamo l'orario in base alle tue esigenze.",
      "order": 11,
      "category": "general"
    }
  ]
}
```
**Effetto**: Nuova voce appare nell'accordion FAQ.

#### Modificare risposta
```json
{
  "id": "colazione",
  "answer": "La colazione continentale è inclusa e viene servita dalle 7:30 alle 10:00"
}
```

#### Cambiare ordine
```json
{
  "id": "checkin-time",
  "order": 5  // prima era 1
}
```
**Effetto**: La FAQ si sposta nella posizione 5.

---

## media.json

**Cosa controlla**: Percorsi delle immagini del sito.

### Oggetto `hero`

#### `hero.background` (string)
**Descrizione**: Immagine di sfondo hero section
**Esempio**: `"images/hero/hero-bg.jpg"`

#### `hero.overlay` (boolean)
**Descrizione**: Overlay scuro sopra l'immagine
**Default**: `true`

### Oggetto `structure`

#### `structure.exterior` (array)
**Descrizione**: Immagini esterno struttura
**Esempio**: `["images/struttura/esterno-1.jpg", "images/struttura/esterno-2.jpg"]`

#### `structure.interior` (array)
**Descrizione**: Immagini interni
**Esempio**: `["images/struttura/ingresso.png"]`

### Oggetto `rooms`

#### `rooms.pattern` (string)
**Descrizione**: Pattern percorso camere
**Esempio**: `"images/camere/"`

#### `rooms.fallback` (string)
**Descrizione**: Immagine default se camera senza foto
**Esempio**: `"images/camere/camera-1.jpg"`

### Oggetto `gallery`

#### `gallery.path` (string)
**Descrizione**: Cartella galleria
**Esempio**: `"images/"`

#### `gallery.autoScan` (boolean)
**Descrizione**: Scansione automatica (futuro)
**Default**: `false`

### Modifiche Comuni

#### Cambiare immagine hero
```json
{
  "hero": {
    "background": "images/hero/nuova-foto.jpg"
  }
}
```
**Effetto**: La foto di sfondo iniziale cambia.

**Nota**: L'immagine deve esistere nella cartella specificata!

---

## policies.json

**Cosa controlla**: Orari, politiche e regole del B&B.

### Oggetto `checkIn`

#### `checkIn.time` (string)
**Valori**: `"Flessibile"` o orario `"14:00"`
**Dove compare**: FAQ "A che ora è il check-in?"

#### `checkIn.notes` (string)
**Descrizione**: Note aggiuntive

### Oggetto `checkOut`

#### `checkOut.time` (string)
**Esempio**: `"11:00"`
**Dove compare**: FAQ, Schema.org

### Oggetto `cancellation`

#### `cancellation.policy` (string)
**Descrizione**: Politica di cancellazione

#### `cancellation.deadline` (string)
**Esempio**: `"48 ore"`

### Oggetto `pets`

#### `pets.allowed` (boolean)
**Effetto**: Se `true`, FAQ animali mostra messaggio positivo

#### `pets.policy` (string)
**Descrizione**: Dettaglio politica animali

#### `pets.fee` (string, opzionale)
**Esempio**: `"€10/giorno"`, `null`

### Oggetto `smoking`

#### `smoking.allowed` (boolean)
**Default**: `false`

#### `smoking.areas` (string)
**Esempio**: `"Solo all'esterno"`

### Oggetto `payments`

#### `payments.methods` (array)
**Valori**: `["cash", "card", "transfer", "paypal"]`

#### `payments.notes` (string)
**Descrizione**: Note sui pagamenti

### Modifiche Comuni

#### Cambiare orario check-in
```json
{
  "checkIn": {
    "time": "15:00",
    "notes": "Check-in dalle 15:00 alle 20:00"
  }
}
```
**Effetto**: La FAQ "A che ora è il check-in?" si aggiorna.

#### Permettere animali
```json
{
  "pets": {
    "allowed": true,
    "policy": "Animali di piccola taglia ammessi su richiesta",
    "fee": "€15 a soggiorno"
  }
}
```
**Effetto**: FAQ "Sono ammessi animali?" aggiornata.

---

## Esempi Pratici

### Scenario 1: Cambio Stagionale - Estate

Modifiche da fare:

**1. Aggiungere Piscina (property.json)**
```json
{
  "features": {
    "pool": true
  }
}
```

**2. Attivare Servizio Piscina (services.json)**
```json
{
  "id": "pool",
  "name": "Piscina",
  "enabled": true,
  "category": "included"
}
```

**3. Aggiornare Descrizione (business.json)**
```json
{
  "description": "...con piscina e terrazza solarium..."
}
```

### Scenario 2: Nuova Camera Aggiunta

**rooms.json**:
```json
{
  "rooms": [
    // ... esistenti ...
    {
      "id": "suite_jacuzzi",
      "name": "Suite con Jacuzzi",
      "type": "suite",
      "capacity": 2,
      "area": 35,
      "beds": [{ "type": "double", "count": 1 }],
      "amenities": ["ac", "tv", "wifi", "minibar"],
      "description": "Suite romantica con vasca idromassaggio privata",
      "images": ["images/camere/suite-jacuzzi-1.jpg"],
      "featured": true
    }
  ]
}
```

**Aggiornare conteggio (property.json)**:
```json
{
  "totalRooms": 5,
  "maxGuests": 12
}
```

### Scenario 3: Modifica Rapida Contatti

**business.json**:
```json
{
  "contacts": {
    "phone": "+39 333 999 8888",
    "whatsapp": "+393339998888",
    "email": "nuovaemail@bb.it"
  }
}
```
**Effetti**:
- Header: nessuna modifica (solo logo)
- Footer: telefono, email, WhatsApp aggiornati
- Sezione Contatti: 3 card aggiornate
- Link diretti: mailto, tel, wa.me aggiornati

---

## Troubleshooting

### ❌ "Il sito non si aggiorna"

**Causa**: Cache browser o file non salvato
**Soluzione**:
1. Premi `Ctrl+F5` (Windows) o `Cmd+Shift+R` (Mac) per hard refresh
2. Verifica che il file JSON sia salvato
3. Controlla la console browser (F12 → Console) per errori

### ❌ "Pagina bianca / sito non carica"

**Causa**: JSON non valido (virgola finale, virgolette mancanti)
**Soluzione**:
1. Usa un validatore JSON online (jsonlint.com)
2. Controlla errori in console: `SyntaxError: Unexpected token`
3. Correggi il file e ricarica

### ❌ "Immagine non si vede"

**Causa**: Percorso errato o file mancante
**Soluzione**:
1. Verifica che l'immagine esista nella cartella
2. Controlla il percorso (case-sensitive!)
3. Console mostra errore 404

### ❌ "Servizio non appare"

**Causa**: `enabled: false` o categoria errata
**Soluzione**:
```json
{
  "enabled": true,  // deve essere true
  "category": "included"  // deve essere valido
}
```

### ❌ "FAQ non nell'ordine giusto"

**Causa**: Campo `order` non impostato
**Soluzione**: 
```json
{
  "order": 1  // numeri più bassi = prima
}
```

### ❌ "Feature flag non funziona"

**Causa**: Valore non booleano
**Soluzione**: Usa `true` o `false` (senza virgolette!)
```json
{
  "pool": true,      // ✅ corretto
  "pool": "true"     // ❌ errato (è una stringa)
}
```

---

## Checklist Modifica

Prima di salvare, verifica:

- [ ] JSON valido (usa jsonlint.com)
- [ ] Nessuna virgola finale
- [ ] Virgolette doppie `"` non singole `'`
- [ ] Booleani senza virgolette (`true`, non `"true"`)
- [ ] Numeri senza virgolette (`10`, non `"10"`)
- [ ] Percorsi immagini corretti
- [ ] ID unici (no duplicati)

---

## Contatti Supporto

Per problemi tecnici o domande:
1. Controlla prima questa guida
2. Verifica la console browser (F12)
3. Consulta `docs/CONFIG_ARCHITECTURE.md` per dettagli tecnici

---

**Ultimo aggiornamento**: Aprile 2026
**Versione**: 1.0
