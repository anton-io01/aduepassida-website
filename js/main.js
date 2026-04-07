/**
 * main.js
 * Entry point: initializes all modules on DOMContentLoaded
 * STEP 05-06: Layout Base and initialization
 */

// Sticky header: adds shadow when scrolling
function initStickyHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 10);
    });
}

// Mobile hamburger menu
function initMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const nav = document.getElementById('main-nav');
    if (!btn || !nav) return;
    
    const links = nav.querySelectorAll('a');

    btn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav-open');
        btn.setAttribute('aria-expanded', isOpen);
        btn.classList.toggle('active', isOpen);
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-open');
            btn.setAttribute('aria-expanded', 'false');
            btn.classList.remove('active');
        });
    });
}

// Services data and rendering
const SERVICES = [
    // Connettività
    { icon: 'fa-wifi', label: 'Wi-Fi 135 Mbps', category: 'Connettività', included: true },
    // Comfort
    { icon: 'fa-snowflake', label: 'Aria condizionata', category: 'Comfort', included: true },
    { icon: 'fa-temperature-half', label: 'Riscaldamento', category: 'Comfort', included: true },
    { icon: 'fa-volume-xmark', label: 'Insonorizzazione', category: 'Comfort', included: true },
    // Cucina
    { icon: 'fa-mug-hot', label: 'Colazione italiana', category: 'Cucina', included: true },
    { icon: 'fa-kitchen-set', label: 'Cucina attrezzata', category: 'Cucina', included: true },
    { icon: 'fa-shirt', label: 'Lavatrice', category: 'Cucina', included: true },
    // Bagno
    { icon: 'fa-shower', label: 'Bagno privato', category: 'Bagno', included: true },
    { icon: 'fa-pump-soap', label: 'Prodotti da bagno', category: 'Bagno', included: true },
    { icon: 'fa-wind', label: 'Asciugacapelli', category: 'Bagno', included: true },
    // Spazi esterni
    { icon: 'fa-sun', label: 'Terrazza solarium', category: 'Spazi', included: true },
    { icon: 'fa-chair', label: 'Patio esterno', category: 'Spazi', included: true },
    // Famiglia
    { icon: 'fa-baby', label: 'Seggiolone', category: 'Famiglia', included: true },
    { icon: 'fa-baby-carriage', label: 'Passeggino disponibile', category: 'Famiglia', included: true },
    // Mobilità
    { icon: 'fa-car', label: 'Parcheggio (€20/gg)', category: 'Mobilità', included: false },
    { icon: 'fa-plane', label: 'Navetta aeroporto', category: 'Mobilità', included: false },
    { icon: 'fa-bicycle', label: 'Noleggio biciclette', category: 'Mobilità', included: false },
    // Flessibilità
    { icon: 'fa-clock', label: 'Check-in flessibile', category: 'Flessibilità', included: true },
    { icon: 'fa-file-invoice', label: 'Fattura su richiesta', category: 'Flessibilità', included: true },
    // Sicurezza
    { icon: 'fa-fire-extinguisher', label: 'Estintori', category: 'Sicurezza', included: true },
    { icon: 'fa-shield-halved', label: 'Rilevatore CO', category: 'Sicurezza', included: true },
    { icon: 'fa-key', label: 'Accesso con chiavi', category: 'Sicurezza', included: true }
];

function renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    
    grid.innerHTML = SERVICES.map(s => `
        <div class="service-item">
            <i class="fa-solid ${s.icon} service-icon"></i>
            <span class="service-label">${s.label}</span>
            <span class="badge ${s.included ? 'badge-included' : 'badge-paid'}">
                ${s.included ? 'Incluso' : 'A pagamento'}
            </span>
        </div>
    `).join('');
}

// FAQ Accordion
function initAccordion() {
    const triggers = document.querySelectorAll('.accordion-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isOpen = trigger.getAttribute('aria-expanded') === 'true';
            
            // Close all panels
            triggers.forEach(t => {
                t.setAttribute('aria-expanded', 'false');
                t.classList.remove('open');
                document.getElementById(t.getAttribute('aria-controls')).hidden = true;
            });
            
            // Open clicked panel (if it was closed)
            if (!isOpen) {
                trigger.setAttribute('aria-expanded', 'true');
                trigger.classList.add('open');
                document.getElementById(trigger.getAttribute('aria-controls')).hidden = false;
            }
        });
    });
}

// Import form module (ES6 module - if issues, inline the code)
async function loadFormModule() {
    try {
        const { initForm } = await import('./form.js');
        initForm();
    } catch (e) {
        console.warn('ES6 modules not supported, form.js should be inlined');
    }
}

// Import cookie banner module
async function loadCookieBanner() {
    try {
        const { initCookieBanner } = await import('./cookie-banner.js');
        initCookieBanner();
    } catch (e) {
        console.warn('ES6 modules not supported, cookie-banner.js should be inlined');
    }
}

// Initialize all on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initMobileMenu();
    renderServices();
    initAccordion();
    loadFormModule();
    loadCookieBanner();
});
