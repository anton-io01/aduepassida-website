/**
 * ConfigManager - Gestore configurazioni globali con API di accesso
 * Espone oggetto window.Config per accesso dati in tutto il sito
 */

const ConfigManager = {
  // Stato interno
  _data: {},
  _ready: false,
  _initPromise: null,

  // Valori default per fallback
  _defaults: {
    business: {
      name: 'B&B',
      tagline: '',
      category: '',
      description: '',
      contacts: {
        email: '',
        phone: '',
        whatsapp: ''
      },
      address: {
        street: '',
        zip: '',
        city: '',
        province: '',
        region: '',
        country: 'IT',
        coordinates: { lat: 0, lng: 0 }
      },
      distances: {}
    },
    property: {
      totalArea: 0,
      totalRooms: 0,
      maxGuests: 0,
      features: {
        independentEntrance: false,
        privateParking: false,
        garden: false,
        terrace: false,
        pool: false,
        accessibility: false
      }
    },
    rooms: { rooms: [] },
    services: { services: [], commonAmenities: {} },
    faq: { faqs: [] },
    media: { hero: {}, structure: {}, rooms: {}, gallery: {} },
    policies: { checkIn: {}, checkOut: {}, cancellation: {}, pets: {}, smoking: {}, payments: {} }
  },

  /**
   * Inizializza il ConfigManager caricando tutti i file
   * @returns {Promise<void>}
   */
  async init() {
    if (this._initPromise) {
      return this._initPromise;
    }

    this._initPromise = this._doInit();
    return this._initPromise;
  },

  /**
   * Caricamento effettivo
   * @private
   */
  async _doInit() {
    try {
      console.log('[ConfigManager] Inizializzazione...');
      
      // Carica tutti i config usando ConfigLoader
      if (typeof ConfigLoader !== 'undefined') {
        this._data = await ConfigLoader.loadAll();
      } else {
        console.error('[ConfigManager] ConfigLoader non disponibile');
        this._data = {};
      }

      this._ready = true;
      console.log('[ConfigManager] Pronto');

    } catch (error) {
      console.error('[ConfigManager] Errore inizializzazione:', error);
      this._data = {};
      this._ready = false;
    }
  },

  /**
   * Ottiene un valore dal percorso dot-notation
   * @param {string} path - Percorso es: 'business.contacts.phone'
   * @param {any} defaultValue - Valore default se non trovato
   * @returns {any}
   */
  get(path, defaultValue = undefined) {
    if (!this._ready) {
      console.warn('[ConfigManager] Non pronto, chiamare init() prima');
      return defaultValue;
    }

    const keys = path.split('.');
    let value = this._data;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return defaultValue !== undefined ? defaultValue : this._getDefaultFromPath(path);
      }
    }

    return value;
  },

  /**
   * Ottiene il valore default per un percorso
   * @private
   */
  _getDefaultFromPath(path) {
    const keys = path.split('.');
    let value = this._defaults;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return undefined;
      }
    }

    return value;
  },

  /**
   * Ottiene la configurazione business completa
   * @returns {Object}
   */
  getBusiness() {
    return this.get('business', this._defaults.business);
  },

  /**
   * Ottiene la configurazione property completa
   * @returns {Object}
   */
  getProperty() {
    return this.get('property', this._defaults.property);
  },

  /**
   * Ottiene l'array delle camere
   * @returns {Array}
   */
  getRooms() {
    const rooms = this.get('rooms.rooms', []);
    return Array.isArray(rooms) ? rooms : [];
  },

  /**
   * Ottiene una camera specifica per ID
   * @param {string} roomId 
   * @returns {Object|null}
   */
  getRoomById(roomId) {
    const rooms = this.getRooms();
    return rooms.find(r => r.id === roomId) || null;
  },

  /**
   * Ottiene i servizi abilitati
   * @returns {Array}
   */
  getServices() {
    const services = this.get('services.services', []);
    return Array.isArray(services) ? services.filter(s => s.enabled) : [];
  },

  /**
   * Ottiene tutti i servizi (anche non abilitati)
   * @returns {Array}
   */
  getAllServices() {
    const services = this.get('services.services', []);
    return Array.isArray(services) ? services : [];
  },

  /**
   * Ottiene le amenities comuni
   * @returns {Object}
   */
  getCommonAmenities() {
    return this.get('services.commonAmenities', {});
  },

  /**
   * Ottiene le FAQ ordinate
   * @returns {Array}
   */
  getFAQ() {
    const faqs = this.get('faq.faqs', []);
    if (!Array.isArray(faqs)) return [];
    
    // Ordina per campo order
    return [...faqs].sort((a, b) => (a.order || 0) - (b.order || 0));
  },

  /**
   * Ottiene le politiche
   * @returns {Object}
   */
  getPolicies() {
    return this.get('policies', this._defaults.policies);
  },

  /**
   * Ottiene la configurazione media
   * @returns {Object}
   */
  getMedia() {
    return this.get('media', this._defaults.media);
  },

  /**
   * Verifica se una feature è abilitata
   * @param {string} featureId - ID della feature (es: 'privateParking')
   * @returns {boolean}
   */
  isFeatureEnabled(featureId) {
    return !!this.get(`property.features.${featureId}`, false);
  },

  /**
   * Verifica se una amenity è disponibile
   * @param {string} amenityId - ID dell'amenity (es: 'wifi')
   * @returns {boolean}
   */
  hasAmenity(amenityId) {
    return !!this.get(`services.commonAmenities.${amenityId}`, false);
  },

  /**
   * Verifica se il manager è pronto
   * @returns {boolean}
   */
  isReady() {
    return this._ready;
  },

  /**
   * Attende che il manager sia pronto
   * @returns {Promise<void>}
   */
  async waitForReady() {
    if (this._ready) return;
    if (this._initPromise) return this._initPromise;
    return this.init();
  },

  /**
   * Ottiene il nome formattato dell'indirizzo
   * @returns {string}
   */
  getFormattedAddress() {
    const addr = this.get('business.address', {});
    const parts = [addr.street, addr.zip, addr.city, addr.province].filter(Boolean);
    return parts.join(', ');
  },

  /**
   * Ottiene il link WhatsApp formattato
   * @param {string} message - Messaggio predefinito
   * @returns {string}
   */
  getWhatsAppLink(message = 'Ciao! Vorrei richiedere un preventivo per il B&B.') {
    const phone = this.get('business.contacts.whatsapp', '');
    if (!phone) return '#';
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodedMessage}`;
  },

  /**
   * Ottiene il link telefono formattato
   * @returns {string}
   */
  getPhoneLink() {
    const phone = this.get('business.contacts.phone', '');
    return phone ? `tel:${phone}` : '#';
  },

  /**
   * Ottiene il link email formattato
   * @param {string} subject - Oggetto email
   * @returns {string}
   */
  getEmailLink(subject = 'Richiesta informazioni B&B') {
    const email = this.get('business.contacts.email', '');
    return email ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : '#';
  },

  /**
   * Debug: stampa tutta la configurazione
   */
  debug() {
    console.log('[ConfigManager] Configurazione completa:', this._data);
    console.log('[ConfigManager] Ready:', this._ready);
  }
};

// Espone come window.Config per accesso globale
window.Config = ConfigManager;

// Esporta per moduli (se supportato)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ConfigManager;
}
