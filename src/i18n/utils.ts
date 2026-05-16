import it from './it.json';
import en from './en.json';

const translations: Record<string, typeof it> = { it, en };

/**
 * Get a translated string by dot-notation key.
 * Example: t('it', 'hero.title') → "A Due Passi Da"
 */
export function t(lang: 'it' | 'en', key: string): any {
  const keys = key.split('.');
  let result: any = translations[lang];
  for (const k of keys) {
    if (result === undefined || result === null) return key;
    result = result[k];
  }
  return result ?? key;
}

/**
 * Get the alternate language URL for the language switcher.
 */
export function getAlternateUrl(lang: 'it' | 'en', path: string = '/'): string {
  if (lang === 'it') {
    // Current is IT, link to EN
    if (path === '/' || path === '') return '/en/';
    return `/en${path}`;
  }
  // Current is EN, link to IT
  if (path === '/en/' || path === '/en') return '/';
  return path.replace(/^\/en/, '');
}

/**
 * Get the alternate language code.
 */
export function getAlternateLang(lang: 'it' | 'en'): 'it' | 'en' {
  return lang === 'it' ? 'en' : 'it';
}
