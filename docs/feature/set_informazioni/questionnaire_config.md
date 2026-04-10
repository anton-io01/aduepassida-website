# Questionario per Sistema di Configurazione B&B

## Obiettivo
Raccogliere informazioni specifiche per creare un sistema di configurazione completo e personalizzabile per il B&B "A Due Passi Da".

## Istruzioni
Seleziona le risposte che meglio descrivono le tue esigenze. Puoi rispondere a tutte le domande o solo a quelle pertinenti.

---

## 1. Struttura dei File di Configurazione

**Come preferisci organizzare i file di configurazione?**

A) [ ] Un singolo file `config.json` con tutte le impostazioni
B) [X] Cartella `config/` con file separati per categoria:
   - `business.json` (info generali, contatti)
   - `property.json` (struttura, camere, servizi)
   - `content.json` (testi, descrizioni, FAQ)
   - `media.json` (percorsi immagini, gallerie)
C) [ ] Sistema modulare con file specifici per ogni sezione
D) [ ] Altro (specificare): _________________________

---

## 2. Informazioni Generali del B&B

**Quali di queste informazioni devono essere configurabili?**

A) [X] Nome del B&B
B) [X] Slogan/descrizione breve
C) [X] Descrizione completa
D) [ ] Anno di apertura/attività
E) [ ] Tipologia struttura (B&B, agriturismo, etc.)
F) [X] Categoria/stelle
G) [ ] Tutte le precedenti

**Informazioni di contatto da rendere configurabili:**

A) [X] Email principale
B) [ ] Email secondaria
C) [X] Telefono principale
D) [ ] Telefono secondario
E) [X] WhatsApp
F) [X] Social media (Facebook, Instagram, etc.)
G) [ ] Tutte le precedenti

---

## 3. Indirizzo e Posizione

**Cosa deve essere configurabile per l'indirizzo?**

A) [X] Via e numero civico
B) [X] CAP
C) [X] Città
D) [X] Provincia
E) [X] Regione
F) [X] Coordinate GPS (latitudine, longitudine)
G) [X] Tutte le precedenti

**Informazioni aggiuntive sulla posizione:**

A) [X] Distanza da stazione/trasporti
B) [ ] Distanza da centro città
C) [X] Distanza da aeroporto
D) [ ] Indicazioni per raggiungere la struttura
E) [ ] Tutte le precedenti

---

## 4. Caratteristiche della Struttura

**Dimensioni e capacità:**

A) [X] Superficie totale (m²)
B) [X] Numero totale di camere
C) [X] Numero massimo di ospiti
D) [ ] Numero di piani
E) [ ] Presenza ascensore (sì/no)
F) [ ] Tutte le precedenti

**Caratteristiche speciali:**

A) [X] Ingresso indipendente
B) [X] Parcheggio privato
C) [X] Giardino/terrazza
D) [X] Piscina
E) [X] Accessibilità per disabili
F) [X] Tutte le precedenti
Aggiungere una lista di servizi comuni attivabili/diattivabili con un flag true/false
---

## 5. Camere e Tipologie

**Quante tipologie di camere vuoi gestire?**

A) [ ] 2-3 tipologie base (singola, doppia, tripla)
B) [ ] 4-5 tipologie specifiche (matrimoniale, familiare, suite, etc.)
C) [X] Sistema flessibile per aggiungere/togliere tipologie
D) [ ] Altro (specificare): _________________________

**Per ogni camera, cosa deve essere configurabile?**

A) [X] Nome/tipologia
B) [X] Numero di letti e tipologie
C) [X] Capacità massima persone
D) [X] Superficie (m²)
E) [ ] Prezzo base per notte
F) [X] Servizi inclusi (aria condizionata, TV, etc.)
G) [X] Descrizione
H) [X] Immagini
I) [ ] Tutte le precedenti

---

## 6. Servizi Offerti

**Come vuoi categorizzare i servizi?**

A) [X] Servizi inclusi nel prezzo
B) [X] Servizi a pagamento
C) [X] Servizi su richiesta
D) [X] Tutte le categorie precedenti

**Quali servizi devono essere configurabili?**

A) [] Wi-Fi
B) [ ] Colazione
C) [ ] Aria condizionata
D) [ ] TV
E) [ ] Asciugacapelli
F) [ ] Minibar
G) [ ] Servizio navetta
H) [ ] Lavanderia
I) [ ] Animali ammessi
J) [ ] Possibilità di aggiungere servizi personalizzati
K) [X] Tutti i precedenti

---

## 7. Immagini e Media

**Come vuoi gestire le immagini?**

A) [ ] Percorsi relativi configurabili per ogni sezione
B) [ ] Gallerie automatiche per cartelle
C) [ ] Immagini singole configurabili per camera/servizio
D) [X] Sistema misto (cartelle + singole)
E) [ ] Altro (specificare): _________________________

**Sezioni con immagini configurabili:**

A) [ ] Hero section
B) [ ] Struttura (esterni)
C) [ ] Camere (ciascuna tipologia)
D) [ ] Servizi
E) [ ] Posizione/dintorni
F) [ ] Galleria generale
G) [X] Tutte le precedenti

---

## 8. Contenuti Testuali

**Quali testi devono essere facilmente modificabili?**

A) [ ] Titoli delle sezioni
B) [ ] Sottotitoli/descrizioni brevi
C) [ ] Testi descrittivi lunghi
D) [ ] Testi dei pulsanti/CTA
E) [ ] Messaggi di successo/errori form
F) [ ] Tutti i precedenti

---

## 9. FAQ (Domande Frequenti)

**Come vuoi gestire le FAQ?**

A) [X] Lista fissa di domande predefinite
B) [X] Sistema dinamico per aggiungere/rimuovere FAQ
C) [ ] Categorizzazione per argomento
D) [ ] Sistema misto (base + personalizzabili)
E) [ ] Altro (specificare): _________________________

---

## 10. Orari e Politiche

**Cosa deve essere configurabile per orari e politiche?**

A) [X] Orario check-in
B) [X] Orario check-out
C) [X] Politica cancellazione
D) [X] Politica animali
E) [X] Politica fumatori
F) [X] Metodi di pagamento accettati
G) [X] Tutti i precedenti

---

## 11. Prezzi e Prenotazioni

**Come vuoi gestire i prezzi?**

A) [ ] Prezzo fisso per camera
B) [ ] Prezzi per stagione (alta, media, bassa)
C) [ ] Prezzi per giorno della settimana
D) [ ] Sconti per soggiorni lunghi
E) [ ] Sistema complesso con tutte le opzioni
F) [ ] Altro (specificare): _________________________

---

## 12. Lingue e Internazionalizzazione

**Quante lingue vuoi supportare?**

A) [ ] Solo italiano
B) [X] Italiano + Inglese
C) [ ] Italiano + Inglese + un'altra lingua
D) [] Sistema multilingua flessibile
E) [ ] Altro (specificare): _________________________

---

## 13. Integrazioni Esterne

**Quali integrazioni esterne devono essere configurabili?**

A) [X] Booking.com
B) [X] Airbnb
C) [X] Google Maps
D) [X] Social media
E) [ ] Google Analytics
F) [ ] Form di contatto (Formspree, etc.)
G) [ ] Tutte le precedenti

---

## 14. SEO e Meta Dati

**Cosa deve essere configurabile per SEO?**

A) [ ] Meta title
B) [ ] Meta description
C) [ ] Keywords
D) [ ] Open Graph (Facebook, social)
E) [ ] Twitter Card
F) [ ] Structured data (Schema.org)
G) [ ] Tutti i precedenti

---

## 15. Personalizzazione Avanzata

**Vuoi la possibilità di personalizzare anche:**

A) [ ] Colori del tema
B) [ ] Font tipografici
C) [ ] Layout delle sezioni
D) [ ] Animazioni e transizioni
E) [ ] Logo e favicon
F) [ ] Tutti i precedenti

---

## 16. Sicurezza e Accesso

**Come vuoi proteggere l'accesso alla configurazione?**

A) [ ] Nessuna protezione (file locali)
B) [ ] Password per accedere al pannello config
C) [ ] Sistema di ruoli (admin, editor)
D) [ ] Autenticazione esterna
E) [ ] Altro (specificare): _________________________

---

## 17. Backup e Versionamento

**Hai bisogno di:**

A) [ ] Backup automatici della configurazione
B) [ ] Storico delle modifiche
C) [ ] Possibilità di ripristinare versioni precedenti
D) [ ] Export/import configurazione
E) [ ] Tutte le precedenti

---

## 18. Interfaccia di Configurazione

**Come preferisci modificare la configurazione?**

A) [X] Editando direttamente i file JSON
B) [ ] Interfaccia web semplice
C) [ ] Pannello di controllo completo
D) [ ] Sistema misto (file + interfaccia)
E) [ ] Altro (specificare): _________________________

---

## Note Aggiuntive

Spazio per eventuali richieste specifiche non coperte dalle domande precedenti:

________________________________________________________________

________________________________________________________________

________________________________________________________________

---

## Come Compilare

1. Seleziona le opzioni desiderate con [x]
2. Aggiungi specifiche dove richiesto
3. Invia il file compilato per procedere con la creazione del sistema di configurazione

**Nota:** Puoi anche rispondere direttamente alle domande senza compilare questo file, se preferisci.
