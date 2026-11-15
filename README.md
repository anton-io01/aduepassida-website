# A Due Passi Da

Sito bilingue Astro per l’appartamento A Due Passi Da a Corato (BA). Il sito è pubblicato su GitHub Pages all’indirizzo [aduepassidabnb.it](https://aduepassidabnb.it/).

## Sviluppo locale

Usa Node.js 22 e npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

L’anteprima serve la build statica da `dist/`.

## Pagine e sorgenti

| Indirizzo pubblico | Sorgente |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/index-en.html` | `src/pages/index-en.astro` |
| `/privacy-policy.html` | `src/pages/privacy-policy.astro` |
| `/privacy-policy-en.html` | `src/pages/privacy-policy-en.astro` |

Componenti condivisi in `src/components/`, testi in `src/i18n/`, stili in `src/styles/` e foto in `src/assets/images/`. I file serviti direttamente, come lo sfondo della home, stanno in `public/`. Astro genera anche `/sitemap.xml`.

Il modulo preventivi usa Web3Forms. Entrambe le lingue inviano `num_adulti`, `num_bambini` e la loro somma in `num_ospiti`.

## Pubblicazione

Il workflow `.github/workflows/pages.yml` verifica la build sulle pull request verso `main` e pubblica `dist/` su GitHub Pages da `main`. In **Settings → Pages** la sorgente è **GitHub Actions** e il dominio è `aduepassidabnb.it`.
