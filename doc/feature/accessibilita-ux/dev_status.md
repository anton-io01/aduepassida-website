# Stato sviluppo

- Branch feature/accessibilita-ux nel checkout locale aduepassida-website
- Origin https://github.com/anton-io01/aduepassida-website.git
- Base origin/main 365d0e123d5d317bb2369f58bd471ae8ba5d40cf
- Fase pronto per commit locale

## Step 1 completato

Menu compatto, focus, contrasto, offset, banner e preventivo aggiornati. Carosello manuale, recensioni con gerarchia e voti accessibili, immagini dimensionate e misurazioni WhatsApp limitate agli elementi visibili.

## Decisioni

- Carosello manuale con indicatori visivi.
- Menu compatto fino a 1050 px. La verifica ha individuato anche un overflow nelle schede Contatti a 768 px, risolto con colonne ridimensionabili.
- Banner senza animazione. L’altezza effettiva viene riservata fino alla chiusura.

## Evidenze

- Build Astro di quattro pagine, controllo sintassi degli script pubblici e git diff --check superati.
- Contrasto del testo bianco sui pulsanti 5,47:1 a riposo e 7,86:1 in hover.
- Browser locale su home IT e EN a 390, 768, 900, 1050, 1051 e 1100 px senza overflow. Menu chiuso con Esc e focus restituito a 900 px in entrambe le lingue.
- Browser locale su quattro pagine con salto al contenuto. Nelle home verificati foto attiva, dimensioni immagini e titoli piattaforma. Nel modulo verificati stato di attesa, errore e successo dopo riprova con endpoint locale simulato.
- Browser a 390 × 740 px con banner da 176 px in italiano e 154 px in inglese. Verificata la riserva esatta di spazio e la rimozione alla chiusura.
- Il comportamento a movimento ridotto è stato verificato nel CSS e negli script. Il servizio Web3Forms in produzione non è stato usato.
