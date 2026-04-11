# Sparring Log — Modifiche Sito Web B&B A Due Passi Da
_Generated: 11 Aprile 2026_

## Requirement (AI reformulation)
> Modifiche al sito web del B&B "A Due Passi Da" per riflettere correttamente la struttura (appartamento unico con 2 camere, non hotel multi-camera), completare la versione inglese, aggiungere sezioni mancanti (Dove siamo, Dintorni, Recensioni), sostituire la galleria camere con foto dell'appartamento, correggere problemi mobile e il comportamento del pulsante preventivo.

**Confermi questa riformulazione o vuoi aggiungere/correggere qualcosa?**

---

## Questions

---
### Q1: Traduzione inglese — approccio preferito
**Context:** La versione inglese (index-en.html) è attualmente vuota. Servono entrambe le lingue funzionanti.

**Options:**
- [ ] A) Traduzione manuale completa: duplico index.html e traduco tutti i contenuti in inglese di qualità (SEO-friendly, professionale)
- [ ] B) Widget/plugin di traduzione automatica (es. Google Translate widget) — più veloce ma meno professionale e pessimo per SEO
- [ ] C) Soluzione ibrida: traduzione manuale per contenuti principali + widget per dettagli minori
- [ ] D) Other (free text): ___

**Answer:** A

---

### Q2: Sezione "Dove Siamo" — contenuto
**Context:** Il menu punta a #posizione ma la sezione è vuota. Serve aggiungere mappa, indirizzo, indicazioni.

**Options:**
- [ ] A) Mappa Google Maps embed + indirizzo completo + indicazioni dalla stazione/aeroporto + foto della via/esterno
- [ ] B) Solo indirizzo testuale + link a Google Maps (apre in nuova tab) + indicazioni
- [ ] C) Mappa statica (immagine) + indirizzo + distanze dai punti chiave (stazione, aeroporto, centro)
- [ ] D) Other (free text): ___

**Answer:** A

---

### Q3: Sezione "Dintorni" — contenuto
**Context:** Il menu punta a #attrazioni ma la sezione è vuota. Serve mostrare cosa c'è nelle vicinanze.

**Options:**
- [ ] A) Card con attrazioni principali della Puglia (Bari, Trani, Castel del Monte, Alberobello, Polignano) con foto e distanze
- [ ] B) Lista testuale semplice di luoghi da visitare con distanze
- [ ] C) Attrazioni specifiche di Corato (centro storico, chiese, enoteche) + attrazioni Puglia
- [ ] D) Other (free text): ___

**Answer:** A

---

### Q4: Sezione "Recensioni" — contenuto
**Context:** Il menu punta a #recensioni ma la sezione è vuota. Serve decidere cosa mostrare.

**Options:**
- [ ] A) Widget/embed recensioni da Booking.com o TripAdvisor (se disponibile)
- [ ] B) Testimonial statici selezionati (3-4 recensioni positive già esistenti)
- [ ] C) Sezione placeholder con invito a lasciare recensione + link a piattaforme di booking
- [ ] D) Other (free text): ___

**Answer:** B

---

### Q5: Galleria Appartamento — foto
**Context:** Al posto della sezione "Camere" (4 card separate) vuoi una galleria foto dell'appartamento unico.

**Options:**
- [ ] A) Usare le immagini esistenti in /images/camere/ rinominate come galleria appartamento
- [ ] B) Creare una nuova cartella /images/appartamento/ e usare quella (le aggiungerai tu dopo)
- [ ] C) Galleria dinamica con lightbox (click per ingrandire) tipo quella struttura ma più foto
- [ ] D) Other (free text): ___

**Answer:** B

---

### Q6: Form Preventivo — invio
**Context:** Attualmente il form ha uno spinner ma l'invio email non funziona (no backend). Va gestito.

**Options:**
- [ ] A) Integrazione Formspree o similar (servizio terzo per ricevere email) — richiede account
- [ ] B) Invio via WhatsApp: al submit, apre WhatsApp con i dati precompilati da inviare manualmente
- [ ] C) Fallback WhatsApp: se il servizio email fallisce, mostra pulsante WhatsApp con dati precompilati
- [ ] D) Other (free text): ___

**Answer:** L'invio funziona correttamente. Ma il pulsante "Invia Richiesta" presenta una ruota che gira di continuo, fuorviante per chi deve usarlo. Modifica il pulsante rimuovendo la ruota che gira. Deve comparire solo "Invia Richiesta"

---

### Q7: Sezione FAQ mobile — problema specifico
**Context:** Le FAQ non sono centrate su mobile. Serve capire il layout desiderato.

**Options:**
- [ ] A) Centrare il titolo e l'accordion, mantenere testo allineato a sinistra (più leggibile)
- [ ] B) Centrare tutto (titolo, domande, risposte) — stile diverso da desktop
- [ ] C] Mantenere allineamento desktop (sinistra) ma correggere padding/margini che causano problemi su mobile
- [ ] D) Other (free text): ___

**Answer:** C

---

### Q8: Informazioni struttura — correzione testi
**Context:** Il sito attuale dice "4 camere, fino a 10 ospiti" ma è un appartamento unico con 2 camere (matrimoniale + singola) + divano letto.

**Options:**
- [ ] A) Aggiornare tutti i testi a: "Appartamento di 50m² con 2 camere (matrimoniale + singola) + divano letto, fino a 4-5 ospiti"
- [ ] B) Mantenere "fino a 10 ospiti" ma specificare che richiede sistemazioni aggiuntive (divani, letti aggiunti)
- [ ] C) Lasciare discrepanza — l'utente contatta per dettagli
- [ ] D) Other (free text): ___

**Answer:** A

---

## Riepilogo modifiche confermate (da completare dopo le risposte)

| # | Modifica | Stato |
|---|----------|-------|
| 1 | Rimuovere "Camere" dal menu | 🔲 |
| 2 | Rimuovere sezione "Le Camere" | 🔲 |
| 3 | Creare versione inglese completa | 🔲 |
| 4 | Aggiungere sezione "Dove Siamo" funzionante | 🔲 |
| 5 | Aggiungere sezione "Dintorni" funzionante | 🔲 |
| 6 | Aggiungere sezione "Recensioni" funzionante | 🔲 |
| 7 | Sostituire camere con galleria appartamento | 🔲 |
| 8 | Correggere mobile (contatti e FAQ centrati) | 🔲 |
| 9 | Correggere spinner pulsante preventivo | 🔲 |
| 10 | Correggere informazioni capienza/camere | 🔲 |

---

**Istruzioni:** Rispondi alle domande sopra, poi scrivi "fatto" o "pronto per generare documento" per procedere alla fase 2.
