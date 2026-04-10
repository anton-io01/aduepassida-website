/**
 * ConfigLoader - Modulo per caricamento file JSON di configurazione
 * Gestisce caricamento asincrono, errori e fallback
 */

const ConfigLoader = {
  // Cache per i file già caricati
  _cache: {},

  // File di configurazione disponibili
  _configFiles: [
    'config/business.json',
    'config/property.json',
    'config/rooms.json',
    'config/services.json',
    'config/faq.json',
    'config/media.json',
    'config/policies.json'
  ],

  // Valori fallback per i vari file
  _fallbacks: {
    'config/business.json': {
      name: 'B&B',
      tagline: '',
      contacts: { email: '', phone: '', whatsapp: '' },
      address: { street: '', zip: '', city: '', province: '', region: 'IT', coordinates: { lat: 0, lng: 0 } }
    },
    'config/property.json': {
      totalArea: 0,
      totalRooms: 0,
      maxGuests: 0,
      features: {}
    },
    'config/rooms.json': { rooms: [] },
    'config/services.json': { services: [], commonAmenities: {} },
    'config/faq.json': { faqs: [] },
    'config/media.json': { hero: {}, structure: {}, rooms: {}, gallery: {} },
    'config/policies.json': { checkIn: {}, checkOut: {}, cancellation: {}, pets: {}, smoking: {}, payments: {} }
  },

  /**
   * Carica un singolo file JSON
   * @param {string} filename - Percorso del file (es: 'config/business.json')
   * @returns {Promise<Object>} - Dati JSON parsati
   */
  async loadFile(filename) {
    // Se in cache, ritorna da cache
    if (this._cache[filename]) {
      return this._cache[filename];
    }

    try {
      const response = await fetch(filename);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Salva in cache
      this._cache[filename] = data;
      
      console.log(`[ConfigLoader] Caricato: ${filename}`);
      return data;

    } catch (error) {
      console.error(`[ConfigLoader] Errore caricamento ${filename}:`, error.message);
      
      // Ritorna fallback
      const fallback = this._fallbacks[filename] || {};
      console.warn(`[ConfigLoader] Usato fallback per ${filename}`);
      
      // Salva fallback in cache per evitare retry
      this._cache[filename] = fallback;
      
      return fallback;
    }
  },

  /**
   * Carica tutti i file di configurazione
   * @returns {Promise<Object>} - Oggetto con tutte le configurazioni
   */
  async loadAll() {
    const configs = {};
    
    console.log('[ConfigLoader] Inizio caricamento tutti i config...');
    const startTime = performance.now();

    try {
      // Carica tutti i file in parallelo
      const promises = this._configFiles.map(async (filename) => {
        const key = filename.replace('config/', '').replace('.json', '');
        configs[key] = await this.loadFile(filename);
      });

      await Promise.all(promises);

      const endTime = performance.now();
      console.log(`[ConfigLoader] Caricamento completato in ${(endTime - startTime).toFixed(2)}ms`);

    } catch (error) {
      console.error('[ConfigLoader] Errore caricamento batch:', error);
    }

    return configs;
  },

  /**
   * Pre-carica i file essenziali (business, property)
   * @returns {Promise<Object>}
   */
  async loadEssential() {
    const essential = ['config/business.json', 'config/property.json'];
    const configs = {};

    const promises = essential.map(async (filename) => {
      const key = filename.replace('config/', '').replace('.json', '');
      configs[key] = await this.loadFile(filename);
    });

    await Promise.all(promises);
    return configs;
  },

  /**
   * Ottiene il fallback per un file
   * @param {string} filename 
   * @returns {Object}
   */
  getFallback(filename) {
    return this._fallbacks[filename] || {};
  },

  /**
   * Pulisce la cache
   */
  clearCache() {
    this._cache = {};
    console.log('[ConfigLoader] Cache pulita');
  },

  /**
   * Verifica se un file è in cache
   * @param {string} filename 
   * @returns {boolean}
   */
  isCached(filename) {
    return !!this._cache[filename];
  }
};

// Esporta per moduli (se supportato)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ConfigLoader;
}
