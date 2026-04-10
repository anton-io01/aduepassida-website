/**
 * RoomsRenderer - Modulo per rendering dinamico delle camere
 * Renderizza card camere da config/rooms.json
 */

const RoomsRenderer = {
  /**
   * Renderizza tutte le camere nel container
   */
  render() {
    const container = document.getElementById('rooms-container');
    if (!container) {
      console.error('[RoomsRenderer] Container non trovato');
      return;
    }

    // Ottieni camere da config
    const rooms = window.Config ? window.Config.getRooms() : [];
    
    if (!rooms || rooms.length === 0) {
      console.warn('[RoomsRenderer] Nessuna camera trovata in config');
      container.innerHTML = '<p class="no-rooms">Nessuna camera disponibile al momento.</p>';
      return;
    }

    console.log(`[RoomsRenderer] Rendering ${rooms.length} camere...`);

    // Pulisci container
    container.innerHTML = '';

    // Renderizza ogni camera
    rooms.forEach((room, index) => {
      const card = this.createRoomCard(room, index);
      container.appendChild(card);
    });

    console.log('[RoomsRenderer] Camere renderizzate');
  },

  /**
   * Crea una card camera
   * @param {Object} room - Dati camera
   * @param {number} index - Indice per lazy loading
   * @returns {HTMLElement}
   */
  createRoomCard(room, index) {
    const card = document.createElement('div');
    card.className = 'card camera-card';
    card.setAttribute('data-room-id', room.id || '');

    // Immagine
    const imageSrc = this.getRoomImage(room);
    const imageAlt = room.name || 'Camera';

    // Features HTML
    const featuresHtml = this.renderFeatures(room);

    card.innerHTML = `
      <img src="${imageSrc}" alt="${imageAlt}" width="400" height="280" loading="${index < 2 ? 'eager' : 'lazy'}" style="background: #E0D9D0; min-height: 200px;">
      <div class="card-body">
        <h3>${this.escapeHtml(room.name || 'Camera')}</h3>
        <p>${this.escapeHtml(room.description || '')}</p>
        <ul class="camera-features">
          ${featuresHtml}
        </ul>
      </div>
    `;

    return card;
  },

  /**
   * Ottiene l'immagine della camera
   * @param {Object} room 
   * @returns {string}
   */
  getRoomImage(room) {
    // Prima immagine dall'array
    if (room.images && room.images.length > 0) {
      return room.images[0];
    }

    // Fallback dal pattern di media config
    const media = window.Config ? window.Config.getMedia() : {};
    if (media.rooms && media.rooms.fallback) {
      return media.rooms.fallback;
    }

    // Default placeholder
    return 'images/camere/camera-1.jpg';
  },

  /**
   * Renderizza le feature della camera
   * @param {Object} room 
   * @returns {string}
   */
  renderFeatures(room) {
    const features = [];

    // Letti
    if (room.beds && room.beds.length > 0) {
      const bedSummary = this.formatBeds(room.beds);
      features.push(`<li><i class="fa-solid fa-bed"></i> ${this.escapeHtml(bedSummary)}</li>`);
    }

    // Capacità
    if (room.capacity) {
      features.push(`<li><i class="fa-solid fa-users"></i> Fino a ${room.capacity} persone</li>`);
    }

    // Amenities
    if (room.amenities && room.amenities.length > 0) {
      const amenitiesMap = this.getAmenitiesMap();
      room.amenities.forEach(amenityId => {
        const amenity = amenitiesMap[amenityId];
        if (amenity) {
          features.push(`<li><i class="${amenity.icon}"></i> ${amenity.label}</li>`);
        }
      });
    }

    return features.join('');
  },

  /**
   * Formatta descrizione letti
   * @param {Array} beds 
   * @returns {string}
   */
  formatBeds(beds) {
    const bedTypes = {
      single: 'letto singolo',
      double: 'letto matrimoniale',
      bunk: 'letto a castello',
      sofa: 'divano letto'
    };

    const bedDescriptions = beds.map(bed => {
      const type = bedTypes[bed.type] || bed.type;
      const count = bed.count || 1;
      return count > 1 ? `${count} ${type}s` : type;
    });

    return bedDescriptions.join(' + ');
  },

  /**
   * Mappa amenities con icone
   * @returns {Object}
   */
  getAmenitiesMap() {
    return {
      ac: { icon: 'fa-solid fa-snowflake', label: 'Aria condizionata' },
      tv: { icon: 'fa-solid fa-tv', label: 'TV schermo piatto' },
      wifi: { icon: 'fa-solid fa-wifi', label: 'Wi-Fi veloce' },
      bathroom: { icon: 'fa-solid fa-bath', label: 'Bagno privato' },
      baby: { icon: 'fa-solid fa-baby', label: 'Seggiolone disponibile' },
      hairdryer: { icon: 'fa-solid fa-wind', label: 'Asciugacapelli' },
      minibar: { icon: 'fa-solid fa-wine-glass', label: 'Minibar' }
    };
  },

  /**
   * Escapa HTML per sicurezza
   * @param {string} text 
   * @returns {string}
   */
  escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  /**
   * Aggiorna il sottotitolo della sezione camere
   */
  updateSubtitle() {
    const property = window.Config ? window.Config.getProperty() : {};
    const subtitle = document.querySelector('#camere .section-subtitle');
    
    if (subtitle && property.totalRooms && property.maxGuests) {
      subtitle.textContent = `${property.totalRooms} camere per un totale di ${property.maxGuests} ospiti`;
    }
  }
};

// Esporta per moduli (se supportato)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RoomsRenderer;
}
