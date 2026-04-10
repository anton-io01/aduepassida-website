/**
 * FAQRenderer - Modulo per rendering dinamico delle FAQ
 * Renderizza accordion FAQ da config/faq.json
 */

const FAQRenderer = {
  /**
   * Renderizza tutte le FAQ
   */
  render() {
    const container = document.getElementById('faq-accordion');
    if (!container) {
      console.log('[FAQRenderer] Container non trovato');
      return;
    }

    // Ottieni FAQ da config
    const faqs = window.Config ? window.Config.getFAQ() : [];
    
    if (!faqs || faqs.length === 0) {
      console.warn('[FAQRenderer] Nessuna FAQ trovata');
      container.innerHTML = '<p class="no-faq">Nessuna domanda frequente disponibile.</p>';
      return;
    }

    console.log(`[FAQRenderer] Rendering ${faqs.length} FAQ...`);

    // Pulisci container
    container.innerHTML = '';

    // Renderizza ogni FAQ
    faqs.forEach((faq, index) => {
      const item = this.createFAQItem(faq, index);
      container.appendChild(item);
    });

    // Inizializza accordion
    this.initAccordion();

    console.log('[FAQRenderer] FAQ renderizzate');
  },

  /**
   * Crea un elemento FAQ
   * @param {Object} faq 
   * @param {number} index 
   * @returns {HTMLElement}
   */
  createFAQItem(faq, index) {
    const item = document.createElement('div');
    item.className = 'accordion-item';

    const faqId = faq.id || `faq-${index}`;

    item.innerHTML = `
      <button class="accordion-trigger" aria-expanded="false" aria-controls="${faqId}">
        ${this.escapeHtml(faq.question || 'Domanda')}
        <i class="fa-solid fa-chevron-down"></i>
      </button>
      <div class="accordion-panel" id="${faqId}" hidden>
        <p>${this.escapeHtml(faq.answer || 'Risposta')}</p>
      </div>
    `;

    return item;
  },

  /**
   * Inizializza funzionalità accordion
   */
  initAccordion() {
    const triggers = document.querySelectorAll('.accordion-trigger');
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const panel = document.getElementById(trigger.getAttribute('aria-controls'));
        
        // Toggle stato
        trigger.setAttribute('aria-expanded', !isExpanded);
        panel.hidden = isExpanded;
        trigger.classList.toggle('open', !isExpanded);
      });
    });
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
  module.exports = FAQRenderer;
}
