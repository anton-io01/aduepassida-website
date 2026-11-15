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

export const homePaths = { it: '/', en: '/index-en.html' };
export const privacyPaths = { it: '/privacy-policy.html', en: '/privacy-policy-en.html' };
