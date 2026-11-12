# Business Requirements — Ottimizzazioni gratuite
## Overview
Migliorare reperibilità sul dominio definitivo e richieste dirette del sito statico IT/EN, senza abbonamenti. Branch feature/ottimizzazioni-gratuite, base 988378f63dc958ad2516e57582a51c5e44d1140f.
## Actors and Flow
Ospite cerca Corato, legge alloggio/arrivo, verifica valutazioni esterne e richiede disponibilità tramite Web3Forms o WhatsApp. Gestore aggiorna manualmente punteggi e verifica Search Console.
## Business Rules
- BR-01: tutti gli URL SEO pubblicati usano https://aduepassidabnb.it e la pagina corretta.
- BR-02: massimo 5 ospiti: matrimoniale, singolo trasformabile in matrimoniale, divano singolo. Culla su richiesta, senza dichiararne gratuità o aumento capienza.
- BR-03: schede Google e Booking sopra le testimonianze con scala, conteggio, fonte e data; nessun aggiornamento automatico o attribuzione delle vecchie testimonianze alle piattaforme.
- BR-04: percorso chiaro disponibilità/prezzo; form conserva Web3Forms e consente domande generiche senza date obbligatorie. Nessun invio reale durante QA.
- BR-05: pagine appartamento e arrivo in IT/EN, con contenuti specifici e collegamenti interni; nessuna distanza o condizione commerciale inventata.
- BR-06: nessun servizio a pagamento, tracker, DB o migrazione hosting; commit locale, push solo con approvazione finale.
## Edge Cases and Constraints
Valutazioni manuali possono variare: rimandare alla fonte attuale. Booking disponibile in indice, non verificabile live: dichiararlo. Google non autentica le testimonianze del sito. Limiti accesso account impediscono attivazione Search Console. La cucina è descritta come a pagamento su Booking: evitare nuove promesse di gratuità; conservare condizioni esistenti senza reinterpretarle.
## Acceptance Criteria
- AC-01 Given pagine pubblicate When ispezionate Then canonical autonomi, hreflang reciproci e sitemap sul dominio definitivo.
- AC-02 Given homepage IT/EN When letta Then configurazione letti e culla sono coerenti con conferma utente.
- AC-03 Given riquadri valutazioni When aperti Then fonte corretta, scala, conteggio e rilevazione sono leggibili senza JS.
- AC-04 Given form When selezionate informazioni Then date e ospiti facoltativi; When richiesta disponibilità Then date valide e ospiti 1–5 obbligatori; errori conservano dati e messaggio localizzato.
- AC-05 Given nuove pagine When navigate Then link, immagini, lingua e CTA funzionano anche su mobile e sono incluse nel pacchetto Pages.
## Impact Map
HTML root, CSS, js/form.js, sitemap/robots, workflow Pages, cinque documenti feature.
## Open Points
Nessun blocco implementativo. Ricezione email reale e account Search Console esclusi da QA automatica; valutazioni manuali da mantenere.
## Next Steps
WF02 requisiti, WF03 piano, WF04 sviluppo e verifiche, commit locale.
