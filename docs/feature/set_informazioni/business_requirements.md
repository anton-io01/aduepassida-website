# Business Requirements - Sistema di Configurazione B&B

## 1. Visione del Progetto

### 1.1 Obiettivo Principale
Creare un sistema di configurazione centralizzato che permetta la personalizzazione semplice e rapida di tutti gli aspetti del sito web del B&B "A Due Passi Da", eliminando la necessità di modificare direttamente il codice per aggiornare informazioni di base, contenuti e impostazioni operative.

### 1.2 Problema da Risolvere
Attualmente, ogni modifica alle informazioni del B&B (contatti, prezzi, servizi, descrizioni) richiede l'intervento diretto sul codice HTML/JavaScript, rendendo il processo lento, soggetto a errori e accessibile solo a personale tecnico.

### 1.3 Soluzione Desiderata
Un sistema di configurazione basato su file JSON strutturati in cartelle separate per categoria, modificabili direttamente dal proprietario del B&B per gestire autonomamente tutte le informazioni rilevanti senza necessità di interfaccia web di amministrazione.

## 2. Ambito del Progetto

### 2.1 Funzionalità Core Richieste

#### 2.1.1 Gestione Informazioni Generali
- **Nome e Branding**: Nome del B&B, slogan/descrizione breve, categoria/stelle
- **Contatti**: Email principale, telefono principale, WhatsApp, social media
- **Indirizzo Completo**: Via, CAP, città, provincia, regione, coordinate GPS, distanza da stazione e aeroporto
- **Descrizioni**: Descrizione completa della struttura

#### 2.1.2 Gestione Proprietà Struttura
- **Caratteristiche Fisiche**: Superficie totale (m²), numero totale di camere, numero massimo di ospiti
- **Servizi Strutturali Configurabili**: Ingresso indipendente, parcheggio privato, giardino/terrazza, piscina, accessibilità per disabili (gestiti con flag attiva/disattiva)

#### 2.1.3 Gestione Camere e Tipologie (Sistema Flessibile)
- **Sistema Dinamico**: Possibilità di aggiungere/togliere tipologie di camera senza modificare il codice
- **Configurazione per Camera**: Nome/tipologia, numero e tipologie letti, capacità massima persone, superficie (m²), servizi inclusi (aria condizionata, TV, bagno privato, etc.), descrizione testuale
- **Gestione Immagini**: Percorsi configurabili per le foto di ogni tipologia camera

#### 2.1.4 Gestione Servizi Offerti
- **Categorizzazione**: Servizi inclusi nel prezzo, servizi a pagamento, servizi su richiesta
- **Sistema Configurabile**: Lista di servizi comuni (Wi-Fi, colazione, aria condizionata, TV, asciugacapelli, minibar, servizio navetta, lavanderia, animali ammessi) attivabili/disattivabili con flag true/false
- **Descrizioni e Icone**: Testi descrittivi e associazione icone per ogni servizio attivo

#### 2.1.5 Struttura File di Configurazione
- **Organizzazione**: Cartella `config/` con file JSON separati per categoria:
  - `business.json`: Info generali, contatti, indirizzo
  - `property.json`: Struttura, caratteristiche, servizi strutturali
  - `rooms.json`: Configurazione dinamica camere e tipologie
  - `services.json`: Servizi offerti con flag attivazione
  - `faq.json`: Domande e risposte frequenti
  - `media.json`: Percorsi immagini e gallerie
- **Editor**: Modifica diretta dei file JSON (nessuna interfaccia web richiesta)

#### 2.1.6 Gestione FAQ
- **Lista Fissa Predefinita**: Set base di domande e risposte comuni per B&B
- **Sistema Dinamico**: Possibilità di aggiungere, rimuovere o modificare FAQ
- **Gestione semplice**: Struttura JSON con domanda, risposta e ordine di visualizzazione

#### 2.1.7 Gestione Media e Immagini (Sistema Misto)
- **Percorsi Configurabili**: Organizzazione file immagini tramite percorsi relativi
- **Gestione Singola**: Immagini specifiche configurabili per camera/servizio
- **Gallerie Automatiche**: Supporto per gallerie basate su cartelle
- **Sezioni Coperte**: Hero section, struttura (esterni), camere (ciascuna tipologia), servizi, posizione/dintorni, galleria generale

#### 2.1.8 Gestione Orari e Politiche
- **Orari**: Check-in e check-out configurabili
- **Politiche**: Cancellazione, animali ammessi, politica fumatori
- **Pagamenti**: Metodi di pagamento accettati configurabili

### 2.2 Funzionalità Avanzate Desiderate

#### 2.2.1 Multilingua
- **Supporto Lingue**: Italiano (principale) e Inglese
- **Traduzioni**: Gestione contenuti tradotti per tutte le sezioni configurabili
- **Switch Lingua**: Mantenimento del sistema di switch lingua esistente

#### 2.2.2 Integrazioni Esterne Configurabili
- **Booking Platforms**: Link configurabili per Booking.com e Airbnb
- **Google Maps**: Coordinate e configurazione mappa
- **Social Media**: Link profili social (Facebook, Instagram, etc.)
- **Form Contatto**: Configurazione endpoint form (es. Formspree)

## 3. Requisiti di Business

### 3.1 Requisiti Funzionali

#### 3.1.1 Facilità d'Uso
- **Editing Diretto File JSON**: Sistema basato su modifica diretta di file JSON con struttura chiara e documentata
- **Aggiornamenti Rapid**: Modifiche ai file JSON si riflettono immediatamente sul sito dopo refresh
- **Validazione Dati**: Struttura JSON con schema predefinito per prevenire errori di inserimento

#### 3.1.2 Completezza
- **Copertura Completa**: Tutti gli aspetti configurabili
- **Flessibilità**: Possibilità aggiungere nuovi campi
- **Scalabilità**: Supporto crescita struttura

#### 3.1.3 Affidabilità
- **Consistenza Dati**: Coerenza garantita tramite struttura JSON standardizzata
- **Validazione Struttura**: Controllo automatico integrità file configurazione

### 3.2 Requisiti Non-Funzionali

#### 3.2.1 Performance
- **Caricamento Rapido**: Configurazioni cached
- **Impatto Minimo**: No rallentamenti sito
- **Ottimizzazione**: File compressi quando possibile

#### 3.2.2 Sicurezza
- **Validazione Input**: Prevenzione injection attraverso sanitizzazione dati JSON
- **Protezione File**: File di configurazione in cartella separata con accesso appropriato

#### 3.2.3 Manutenibilità
- **Codice Pulito**: Struttura organizzata
- **Documentazione**: Guide per utilizzo
- **Debug Facilitato**: Logging errori

## 4. Stakeholder

### 4.1 Utenti Primari
- **Proprietario B&B**: Gestione quotidiana configurazioni
- **Staff Amministrativo**: Aggiornamenti contenuti e prezzi

### 4.2 Utenti Secondari
- **Sviluppatori**: Manutenzione ed estensioni sistema
- **Designer**: Personalizzazione aspetto e layout

## 5. Criteri di Successo

### 5.1 KPI Quantitativi
- **Riduzione Tempo**: 80% meno tempo per aggiornamenti contenuti
- **Autonomia Utente**: 95% modifiche eseguibili senza assistenza tecnica
- **Errori Ridotti**: 90% meno errori di pubblicazione

### 5.2 KPI Qualitativi
- **Soddisfazione Utente**: Feedback positivo su facilità d'uso
- **Completezza**: Tutte le informazioni desiderate configurabili
- **Flessibilità**: Sistema adattabile a future esigenze

## 6. Vincoli e Limitazioni

### 6.1 Vincoli Tecnici
- **Stack Esistente**: Compatibilità con HTML/CSS/JavaScript attuale
- **Hosting**: Limitazioni del server GitHub Pages
- **Browser Support**: Compatibilità con browser moderni

### 6.2 Vincoli di Budget
- **Costi Minimi**: Soluzione open-source quando possibile
- **Manutenzione**: Costi di gestione contenuti ridotti

### 6.3 Vincoli Temporali
- **Implementazione Graduale**: Priorità alle funzionalità core
- **Testing Adeguato**: Validazione prima rilascio

## 7. Rischi e Mitigazione

### 7.1 Rischi Tecnici
- **Compatibilità**: Test su diversi browser/dispositivi
- **Performance**: Monitoraggio impatto caricamento
- **Sicurezza**: Validazione input e access control

### 7.2 Rischi Operativi
- **Formazione Utente**: Documentazione e guide dettagliate
- **Adozione**: Interfaccia semplice e intuitiva
- **Supporto**: Sistema di help e troubleshooting

## 8. Deliverables

### 8.1 Documentazione
- **Manuale Utente**: Guida completa utilizzo sistema
- **Documentazione Tecnica**: Architettura e API
- **Guide Migrazione**: Istruzioni per aggiornamenti

### 8.2 Sistema Configurazione
- **File Configurazione**: Struttura JSON ben organizzata in cartella `config/`
- **Loader JavaScript**: Script per caricamento e parsing automatico configurazioni
- **Validazione Schema**: Script verifica integrità struttura file JSON

### 8.3 Integrazione
- **Modifiche Codice**: Integrazione con sito esistente
- **Testing Suite**: Test automatici funzionalità
- **Deploy Procedure**: Processo aggiornamento produzione

## 9. Timeline di Alto Livello

### 9.1 Fase 1: Core Configuration - Struttura e Setup (1-2 settimane)
- Creazione cartella `config/` e struttura file JSON (`business.json`, `property.json`)
- Gestione informazioni generali, contatti e indirizzo
- Integrazione base con sito esistente (sostituzione dati hardcoded)
- Script di caricamento e parsing configurazioni

### 9.2 Fase 2: Property Management - Camere e Servizi (2 settimane)
- Sistema flessibile camere (`rooms.json`)
- Configurazione servizi con flag attivazione (`services.json`)
- Gestione immagini per camere e sezioni (`media.json`)
- Integrazione dinamica servizi strutturali con flag true/false

### 9.3 Fase 3: Content e FAQ (1-2 settimane)
- Sistema FAQ dinamico (`faq.json`)
- Gestione orari e politiche configurabili
- Supporto multilingua Italiano/Inglese per contenuti configurabili
- Integrazioni esterne configurabili (Booking.com, Airbnb, Google Maps, Social)

### 9.4 Fase 4: Testing e Documentazione (1 settimana)
- Testing integrazione completa
- Validazione struttura JSON
- Documentazione utente per modifica file JSON
- Documentazione tecnica e guida di riferimento

## 10. Definizione di Done

### 10.1 Criteri di Accettazione
- Tutti i file di configurazione funzionanti
- Integrazione completa con sito esistente
- Documentazione utente completa
- Test superati con successo
- Performance mantenute o migliorate

### 10.2 Validazione
- Test utente con proprietario B&B
- Verifica completezza configurazioni
- Controllo compatibilità cross-browser
- Validazione sicurezza accessi

---

**Nota**: Questo documento definisce i requisiti di alto livello senza entrare in dettagli implementativi tecnici. I documenti successivi (requirements.md e implementation_plan.md) conterranno specifiche dettagliate e piano di sviluppo tecnico.
