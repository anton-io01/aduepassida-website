# Configurazione B&B - Guida Utente

Questa cartella contiene tutti i file di configurazione per il sito web del B&B "A Due Passi Da".

## Struttura File

| File | Contenuto | Modifica quando... |
|------|-----------|-------------------|
| `business.json` | Nome, contatti, indirizzo | Cambiano info generali o contatti |
| `property.json` | Caratteristiche struttura | Cambia superficie, camere, feature |
| `rooms.json` | Configurazione camere | Aggiungi/modifichi camere |
| `services.json` | Servizi offerti | Attivi/disattivi servizi |
| `faq.json` | Domande frequenti | Aggiungi/modifichi FAQ |
| `media.json` | Percorsi immagini | Cambi immagini principali |
| `policies.json` | Orari e regole | Modifichi orari o politiche |

## Come Modificare

1. Apri il file JSON con un editor di testo
2. Modifica i valori (mantieni la struttura JSON!)
3. Salva il file
4. Ricarica la pagina del sito per vedere i cambiamenti

## Formati Validi

### Email
Formato standard: `nome@esempio.com`

### Telefono
Con prefisso internazionale: `+39 123 456 7890`

### Coordinate GPS
```json
{
  "lat": 41.1536,
  "lng": 16.4082
}
```

### Feature Flags
Usa `true` o `false`:
```json
{
  "privateParking": true,
  "pool": false
}
```

## Esempi Comuni

### Cambiare numero di telefono
In `business.json`:
```json
{
  "contacts": {
    "phone": "+39 333 123 4567"
  }
}
```

### Disabilitare un servizio
In `services.json`:
```json
{
  "id": "servizio",
  "enabled": false
}
```

### Aggiungere una camera
In `rooms.json`, aggiungi un oggetto all'array `rooms`:
```json
{
  "id": "nuova_camera",
  "name": "Nuova Camera",
  "type": "double",
  "capacity": 2,
  ...
}
```

## Troubleshooting

**Il sito non si aggiorna**: Ricarica la pagina (F5)

**Errore console "JSON invalid"**: Verifica che il JSON sia valido (no virgole finali)

**Campo non visibile**: Verifica che il campo sia correttamente formattato

## Note Importanti

- I file devono essere validi JSON (usa un validatore online se necessario)
- Non usare virgole finali dopo l'ultimo elemento
- Usa sempre le virgolette doppie per le stringhe
- I percorsi immagini devono essere relativi alla root del progetto
