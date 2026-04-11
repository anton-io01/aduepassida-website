# A Due Passi Da – Sito Web Bilingue

Sito web statico bilingue (IT/EN) per il B&B "A Due Passi Da" a Corato (BA).

## Struttura del Sito

### Sezioni Principali
- **Hero**: Presentazione con call-to-action
- **La Struttura / The Structure**: Descrizione appartamento privato (2 camere, 4-5 ospiti)
- **Galleria / Gallery**: Galleria fotografica con placeholder
- **Servizi / Services**: Elenco servizi inclusi e a pagamento
- **Dove Siamo / Location**: Mappa Google embed e indicazioni
- **Dintorni / Surroundings**: 5 attrazioni turistiche (Bari, Trani, Castel del Monte, Alberobello, Polignano)
- **Recensioni / Reviews**: Testimoniali degli ospiti
- **Preventivo / Quote**: Form di contatto con Formspree
- **FAQ**: Domande frequenti

### Versioni Linguistiche
- **Italiano**: `index.html`
- **Inglese**: `index-en.html`
- **Privacy Policy**: `privacy-policy.html` (IT), `privacy-policy-en.html` (EN)

## Tecnologie

- **Frontend**: HTML5, CSS3, JavaScript (vanilla)
- **Stili**: CSS Grid, Flexbox, design responsive
- **Font**: Google Fonts (Lato, Playfair Display)
- **Icone**: Font Awesome 6.5.0
- **Form**: Formspree (endpoint: https://formspree.io/f/mbdpwbbo)
- **Mappa**: Google Maps embed
- **Hosting**: GitHub Pages
- **SEO**: Meta tag Open Graph, Twitter Cards, JSON-LD Schema.org

## Istruzioni per Aggiungere Foto Reali

### Galleria Appartamento
Sostituire i file in `images/appartamento/`:
- `placeholder.jpg` → foto reali degli ambienti
- Aggiornare gli attributi `alt` nelle immagini in `index.html` e `index-en.html`

### Attrazioni Turistiche
Sostituire i file in `images/luoghi/`:
- `bari.jpg`, `trani.jpg`, `castel-del-monte.jpg`, `alberobello.jpg`, `polignano.jpg`
- Mantenere i nomi file per non rompere i riferimenti

## File Chiave

- `index.html` - Versione italiana
- `index-en.html` - Versione inglese
- `css/style.css` - Stili principali
- `css/responsive.css` - Media queries per mobile
- `js/` - Script JavaScript (servizi, galleria, form, lingua, cookie)
- `docs/` - Documentazione di sviluppo

## Validazione e Testing

Il sito è stato testato per:
- ✅ Validazione HTML5
- ✅ Responsive design (320px - 1920px)
- ✅ Accessibilità (ARIA labels, contrasti)
- ✅ SEO (meta tag, JSON-LD, hreflang)
- ✅ Cross-browser compatibility
- ✅ Form funzionante in entrambe le lingue

## Deployment

Il sito è pronto per il deployment su GitHub Pages. Assicurarsi che:
1. Tutti i file siano nella root del repository
2. Il repository sia pubblico
3. GitHub Pages sia abilitato dalla branch `main`
4. Il dominio personalizzato (se presente) sia configurato correttamente
