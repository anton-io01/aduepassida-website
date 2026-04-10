/**
 * ServicesRenderer - Modulo per rendering dinamico dei servizi
 * Renderizza griglia servizi da config/services.json
 */

const ServicesRenderer = {
  /**
   * Renderizza tutti i servizi abilitati
   */
  render() {
    const container = document.getElementById('services-grid');
    if (!container) {
      console.log('[ServicesRenderer] Container non trovato');
      return;
    }

    // Ottieni servizi da config
    const services = window.Config ? window.Config.getServices() : [];
    
    if (!services || services.length === 0) {
      console.warn('[ServicesRenderer] Nessun servizio trovato');
      container.innerHTML = '<p class="no-services">Nessun servizio disponibile.</p>';
      return;
    }

    console.log(`[ServicesRenderer] Rendering ${services.length} servizi...`);

    // Pulisci container
    container.innerHTML = '';

    // Renderizza ogni servizio
    services.forEach((service, index) => {
      const item = this.createServiceItem(service, index);
      container.appendChild(item);
    });

    console.log('[ServicesRenderer] Servizi renderizzati');
  },

  /**
   * Crea un elemento servizio
   * @param {Object} service 
   * @param {number} index 
   * @returns {HTMLElement}
   */
  createServiceItem(service, index) {
    const item = document.createElement('div');
    item.className = 'service-item';

    // Categoria badge
    const categoryLabels = {
      included: 'Incluso',
      paid: 'A pagamento',
      on_request: 'Su richiesta'
    };
    const categoryClass = `badge-${service.category}`;
    const categoryLabel = categoryLabels[service.category] || '';

    item.innerHTML = `
      <div class="service-icon">
        <i class="${service.icon || 'fa-solid fa-check'}"></i>
      </div>
      <span class="service-label">${this.escapeHtml(service.name || 'Servizio')}</span>
      ${categoryLabel ? `<span class="badge ${categoryClass}">${categoryLabel}</span>` : ''}
    `;

    return item;
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
  }
};

// Esporta per moduli (se supportato)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ServicesRenderer;
}
