/**
 * SchemaRenderer - Modulo per generazione dinamica Schema.org JSON-LD
 * Popola structured data dai file di configurazione
 */

const SchemaRenderer = {
  /**
   * Genera e inserisce lo Schema.org BedAndBreakfast
   */
  render() {
    if (!window.Config || !window.Config.isReady()) {
      console.warn('[SchemaRenderer] Config non pronto');
      return;
    }

    const business = window.Config.getBusiness();
    const property = window.Config.getProperty();
    const amenities = window.Config.getCommonAmenities();

    // Costruisci oggetto Schema.org
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BedAndBreakfast',
      name: business.name || 'B&B',
      description: business.description || 'Appartamento privato nel centro storico',
      image: this.getMainImage(),
      address: this.buildAddress(business.address),
      geo: this.buildGeo(business.address?.coordinates),
      telephone: business.contacts?.phone || '',
      email: business.contacts?.email || '',
      url: window.location.href,
      priceRange: '€€',
      amenityFeature: this.buildAmenities(amenities),
      checkinTime: this.getPolicy('checkIn', 'Flessibile'),
      checkoutTime: this.getPolicy('checkOut', '11:00'),
      numberOfRooms: property.totalRooms || 0,
      petsAllowed: amenities.pets ? true : 'Contattare la struttura'
    };

    // Inserisci nello head
    this.insertSchema(schema);
    console.log('[SchemaRenderer] Schema.org generato');
  },

  /**
   * Costruisce l'indirizzo Schema.org
   */
  buildAddress(address) {
    if (!address) return {};
    
    return {
      '@type': 'PostalAddress',
      streetAddress: address.street || '',
      addressLocality: address.city || '',
      addressRegion: address.province || '',
      postalCode: address.zip || '',
      addressCountry: address.country || 'IT'
    };
  },

  /**
   * Costruisce le coordinate geo
   */
  buildGeo(coordinates) {
    if (!coordinates || !coordinates.lat || !coordinates.lng) {
      return null;
    }

    return {
      '@type': 'GeoCoordinates',
      latitude: String(coordinates.lat),
      longitude: String(coordinates.lng)
    };
  },

  /**
   * Costruisce le amenities
   */
  buildAmenities(amenities) {
    const amenityMap = {
      wifi: 'Wi-Fi gratuito',
      breakfast: 'Colazione inclusa',
      ac: 'Aria condizionata',
      tv: 'TV',
      hairdryer: 'Asciugacapelli',
      minibar: 'Minibar',
      shuttle: 'Servizio navetta',
      laundry: 'Lavanderia',
      pets: 'Animali ammessi'
    };

    const features = [];
    
    Object.keys(amenityMap).forEach(key => {
      if (amenities[key]) {
        features.push({
          '@type': 'LocationFeatureSpecification',
          name: amenityMap[key],
          value: true
        });
      }
    });

    // Aggiungi features strutturali
    const property = window.Config.getProperty();
    if (property.features) {
      if (property.features.terrace) {
        features.push({
          '@type': 'LocationFeatureSpecification',
          name: 'Terrazza',
          value: true
        });
      }
      if (property.features.garden) {
        features.push({
          '@type': 'LocationFeatureSpecification',
          name: 'Giardino',
          value: true
        });
      }
      if (property.features.pool) {
        features.push({
          '@type': 'LocationFeatureSpecification',
          name: 'Piscina',
          value: true
        });
      }
    }

    return features;
  },

  /**
   * Ottiene politica (check-in/check-out)
   */
  getPolicy(type, defaultValue) {
    const policies = window.Config.getPolicies();
    return policies[type]?.time || defaultValue;
  },

  /**
   * Ottiene immagine principale
   */
  getMainImage() {
    const media = window.Config.getMedia();
    if (media.hero?.background) {
      // Converti percorso relativo in URL assoluto
      return new URL(media.hero.background, window.location.origin).href;
    }
    return '';
  },

  /**
   * Inserisce lo schema nello head
   */
  insertSchema(schema) {
    // Rimuovi schema esistente se presente
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) {
      existing.remove();
    }

    // Crea nuovo script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    
    // Inserisci nello head
    document.head.appendChild(script);
  }
};

// Esporta per moduli (se supportato)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SchemaRenderer;
}
