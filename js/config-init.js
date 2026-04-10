/**
 * ConfigInit - Script di inizializzazione configurazioni
 * Popola dinamicamente header, footer e elementi comuni
 */

(function() {
  'use strict';

  // Inizializza quando il DOM è pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM già pronto
    init();
  }

  async function init() {
    try {
      console.log('[ConfigInit] Inizializzazione configurazioni...');

      // Attendi che ConfigManager sia pronto
      if (typeof window.Config === 'undefined') {
        console.error('[ConfigInit] ConfigManager non trovato');
        return;
      }

      // Inizializza e carica config
      await window.Config.init();

      if (!window.Config.isReady()) {
        console.error('[ConfigInit] ConfigManager non pronto');
        return;
      }

      console.log('[ConfigInit] ConfigManager pronto, popolamento UI...');

      // Popola header
      populateHeader();

      // Popola footer
      populateFooter();

      // Popola hero section
      populateHero();

      // Popola sezione contatti
      populateContacts();

      // Popola sezione struttura
      populateStructure();

      // Popola form preventivo
      populateForm();

      // Renderizza camere dinamiche
      if (typeof RoomsRenderer !== 'undefined') {
        RoomsRenderer.updateSubtitle();
        RoomsRenderer.render();
      }

      // Renderizza servizi
      if (typeof ServicesRenderer !== 'undefined') {
        ServicesRenderer.render();
      }

      // Renderizza FAQ
      if (typeof FAQRenderer !== 'undefined') {
        FAQRenderer.render();
      }

      // Genera Schema.org dinamico
      if (typeof SchemaRenderer !== 'undefined') {
        SchemaRenderer.render();
      }

      console.log('[ConfigInit] Inizializzazione completata');

    } catch (error) {
      console.error('[ConfigInit] Errore inizializzazione:', error);
    }
  }

  /**
   * Popola elementi header
   */
  function populateHeader() {
    // Logo
    const logo = document.querySelector('.logo');
    if (logo) {
      const businessName = window.Config.get('business.name', 'B&B');
      logo.textContent = businessName;
      console.log('[ConfigInit] Logo aggiornato:', businessName);
    }
  }

  /**
   * Popola elementi footer
   */
  function populateFooter() {
    const business = window.Config.getBusiness();
    const address = window.Config.get('business.address', {});

    // Footer brand name
    const footerName = document.querySelector('.footer-name');
    if (footerName) {
      footerName.textContent = business.name || 'B&B';
    }

    // Footer address
    const footerAddress = document.querySelector('.footer-brand p');
    if (footerAddress) {
      const addressStr = formatAddress(address);
      footerAddress.textContent = addressStr;
    }

    // Footer contacts
    const footerContacts = document.querySelector('.footer-contacts');
    if (footerContacts) {
      const contacts = business.contacts || {};
      
      // Email
      const emailLink = footerContacts.querySelector('a[href^="mailto:"]');
      if (emailLink && contacts.email) {
        emailLink.href = `mailto:${contacts.email}`;
        emailLink.innerHTML = `<i class="fa-solid fa-envelope"></i> ${contacts.email}`;
      }

      // Phone
      const phoneLink = footerContacts.querySelector('a[href^="tel:"]');
      if (phoneLink && contacts.phone) {
        phoneLink.href = `tel:${contacts.phone}`;
        const formattedPhone = formatPhone(contacts.phone);
        phoneLink.innerHTML = `<i class="fa-solid fa-phone"></i> ${formattedPhone}`;
      }

      // WhatsApp
      const waLink = footerContacts.querySelector('a[href*="wa.me"]');
      if (waLink && contacts.whatsapp) {
        const waMessage = encodeURIComponent('Ciao! Vorrei richiedere un preventivo per il B&B.');
        waLink.href = `https://wa.me/${contacts.whatsapp.replace(/\D/g, '')}?text=${waMessage}`;
        const formattedWa = formatPhone(contacts.whatsapp);
        waLink.innerHTML = `<i class="fa-brands fa-whatsapp"></i> ${formattedWa}`;
      }
    }

    // Footer copyright
    const footerCopy = document.querySelector('.footer-copy');
    if (footerCopy) {
      const year = new Date().getFullYear();
      const name = business.name || 'B&B';
      footerCopy.innerHTML = `&copy; ${year} ${name}. Tutti i diritti riservati.`;
    }

    console.log('[ConfigInit] Footer aggiornato');
  }

  /**
   * Popola elementi hero section
   */
  function populateHero() {
    const business = window.Config.getBusiness();
    
    // Hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.textContent = business.name || 'B&B';
    }

    // Hero tagline
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
      heroTagline.textContent = business.tagline || 'Il tuo soggiorno perfetto';
    }

    // Hero badges
    const property = window.Config.getProperty();
    const maxGuestsBadge = document.querySelector('.hero-badges span:nth-child(2)');
    if (maxGuestsBadge && property.maxGuests) {
      maxGuestsBadge.innerHTML = `<i class="fa-solid fa-users"></i> Fino a ${property.maxGuests} ospiti`;
    }

    console.log('[ConfigInit] Hero aggiornato');
  }

  /**
   * Formatta indirizzo
   */
  function formatAddress(address) {
    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.zip || address.city) {
      parts.push(`${address.zip || ''} ${address.city || ''}`.trim());
    }
    if (address.province) parts.push(`(${address.province})`);
    
    return parts.filter(Boolean).join(' – ') || 'Indirizzo non disponibile';
  }

  /**
   * Formatta numero telefono per visualizzazione
   */
  function formatPhone(phone) {
    if (!phone) return '';
    
    // Rimuovi tutti i non-numeri tranne il +
    const cleaned = phone.replace(/[^\d+]/g, '');
    
    // Formato italiano: +39 XXX XXX XXXX
    if (cleaned.startsWith('+39') && cleaned.length === 13) {
      return `+39 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
    }
    
    return phone;
  }

  /**
   * Popola sezione contatti
   */
  function populateContacts() {
    const business = window.Config.getBusiness();
    const contacts = business.contacts || {};
    const contactsSection = document.getElementById('contatti');
    
    if (!contactsSection) return;

    // Email card
    const emailCard = contactsSection.querySelector('.contact-card:nth-child(1) .contact-link');
    if (emailCard && contacts.email) {
      emailCard.href = `mailto:${contacts.email}`;
      emailCard.textContent = contacts.email;
    }

    // Phone card
    const phoneCard = contactsSection.querySelector('.contact-card:nth-child(2) .contact-link');
    if (phoneCard && contacts.phone) {
      phoneCard.href = `tel:${contacts.phone}`;
      phoneCard.textContent = formatPhone(contacts.phone);
    }

    // WhatsApp card
    const waCard = contactsSection.querySelector('.contact-card-wa .contact-link');
    if (waCard && contacts.whatsapp) {
      const waMessage = encodeURIComponent('Ciao! Vorrei richiedere un preventivo per il B&B.');
      waCard.href = `https://wa.me/${contacts.whatsapp.replace(/\D/g, '')}?text=${waMessage}`;
    }

    console.log('[ConfigInit] Sezione contatti aggiornata');
  }

  /**
   * Popola form preventivo
   */
  function populateForm() {
    // Aggiorna max ospiti da property config
    const property = window.Config.getProperty();
    const numOspitiInput = document.getElementById('num_ospiti');
    
    if (numOspitiInput && property.maxGuests) {
      numOspitiInput.setAttribute('max', property.maxGuests);
      numOspitiInput.setAttribute('placeholder', `1-${property.maxGuests}`);
    }

    // Aggiorna subject del form con nome B&B
    const form = document.getElementById('quote-form');
    const business = window.Config.getBusiness();
    
    if (form && business.name) {
      const subjectInput = form.querySelector('input[name="_subject"]');
      if (subjectInput) {
        subjectInput.value = `Nuova richiesta preventivo – ${business.name}`;
      }
    }

    console.log('[ConfigInit] Form aggiornato');
  }

  /**
   * Popola sezione struttura
   */
  function populateStructure() {
    const business = window.Config.getBusiness();
    const property = window.Config.getProperty();
    const structureSection = document.getElementById('struttura');
    
    if (!structureSection) return;

    // Aggiorna sottotitolo con dati dinamici
    const subtitle = structureSection.querySelector('.section-subtitle');
    if (subtitle && business.name) {
      subtitle.textContent = `Appartamento privato nel cuore di ${business.address?.city || 'Corato'}`;
    }

    // Aggiorna descrizione principale
    const description = structureSection.querySelector('.struttura-info > p');
    if (description && business.name) {
      const addr = business.address || {};
      const city = addr.city || 'Corato';
      const province = addr.province || 'BA';
      description.textContent = `${business.name} è un appartamento privato di ${property.totalArea || 50} m² situato in ${addr.street || 'Via Duomo, 81'}, nel centro storico di ${city} (${province}). Con ${property.totalRooms || 4} camere e una capacità di fino a ${property.maxGuests || 10} ospiti, è la scelta ideale per famiglie e gruppi che vogliono vivere la Puglia autentica con il comfort di una casa privata.`;
    }

    // Aggiorna highlights
    const highlightsList = structureSection.querySelector('.struttura-highlights');
    if (highlightsList) {
      // Pulisci lista esistente
      highlightsList.innerHTML = '';

      // Feature flags mapping
      const features = [
        { key: null, text: `${property.totalArea || 50} m² · ${property.totalRooms || 4} camere · fino a ${property.maxGuests || 10} ospiti`, always: true },
        { key: 'independentEntrance', text: 'Ingresso indipendente e appartamento privato' },
        { key: 'privateParking', text: 'Parcheggio privato disponibile' },
        { key: 'terrace', text: 'Terrazza solarium con vista' },
        { key: 'garden', text: 'Giardino privato' },
        { key: 'pool', text: 'Piscina' },
        { key: null, text: 'Insonorizzazione · Vista sulla città', always: true },
        { key: null, text: `A ${business.distances?.station || '700 m'} dalla Stazione FS di ${business.address?.city || 'Corato'}`, always: true }
      ];

      features.forEach(feature => {
        if (feature.always || (feature.key && window.Config.isFeatureEnabled(feature.key))) {
          const li = document.createElement('li');
          li.innerHTML = `<i class="fa-solid fa-check"></i> ${feature.text}`;
          highlightsList.appendChild(li);
        }
      });
    }

    // Aggiorna nota accessibilità
    const accessibilityNotice = structureSection.querySelector('.accessibility-notice');
    if (accessibilityNotice) {
      const isAccessible = window.Config.isFeatureEnabled('accessibility');
      if (isAccessible) {
        accessibilityNotice.innerHTML = `
          <i class="fa-solid fa-wheelchair"></i>
          <span>La struttura è accessibile ai disabili. Ascensore disponibile.</span>
        `;
        accessibilityNotice.style.background = '#D4EDDA';
        accessibilityNotice.style.borderLeftColor = '#28A745';
      } else {
        accessibilityNotice.innerHTML = `
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>I piani superiori sono raggiungibili esclusivamente tramite scale. La struttura non dispone di ascensore.</span>
        `;
      }
    }

    console.log('[ConfigInit] Sezione struttura aggiornata');
  }

})();
