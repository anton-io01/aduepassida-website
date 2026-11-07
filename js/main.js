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
    { icon: 'fa-wifi', label: 'Wi-Fi 135 Mbps', labelEn: 'Wi-Fi 135 Mbps', included: true },
    // Comfort
    { icon: 'fa-snowflake', label: 'Aria condizionata', labelEn: 'Air conditioning', included: true },
    { icon: 'fa-temperature-half', label: 'Riscaldamento', labelEn: 'Heating', included: true },
    { icon: 'fa-volume-xmark', label: 'Insonorizzazione', labelEn: 'Soundproofing', included: true },
    // Cucina
    { icon: 'fa-mug-hot', label: 'Colazione italiana', labelEn: 'Italian breakfast', included: true },
    { icon: 'fa-kitchen-set', label: 'Cucina attrezzata', labelEn: 'Equipped kitchen', included: true },
    { icon: 'fa-shirt', label: 'Lavatrice', labelEn: 'Washing machine', included: true },
    // Bagno
    { icon: 'fa-shower', label: 'Bagno privato', labelEn: 'Private bathroom', included: true },
    { icon: 'fa-pump-soap', label: 'Prodotti da bagno', labelEn: 'Toiletries', included: true },
    { icon: 'fa-wind', label: 'Asciugacapelli', labelEn: 'Hair dryer', included: true },
    // Spazi esterni
    { icon: 'fa-sun', label: 'Terrazza solarium', labelEn: 'Sun terrace', included: true },
    { icon: 'fa-chair', label: 'Patio esterno', labelEn: 'Outdoor patio', included: true },
    // Famiglia
    { icon: 'fa-baby', label: 'Seggiolone', labelEn: 'High chair', included: true },
    { icon: 'fa-baby-carriage', label: 'Passeggino disponibile', labelEn: 'Stroller available', included: true },
    // Mobilità
    { icon: 'fa-car', label: 'Parcheggio (€20/gg)', labelEn: 'Parking (€20 per day)', included: false },
    { icon: 'fa-plane', label: 'Navetta aeroporto', labelEn: 'Airport shuttle', included: false },
    { icon: 'fa-bicycle', label: 'Noleggio biciclette', labelEn: 'Bicycle rental', included: false },
    // Flessibilità
    { icon: 'fa-clock', label: 'Check-in flessibile', labelEn: 'Flexible check-in', included: true },
    { icon: 'fa-file-invoice', label: 'Fattura su richiesta', labelEn: 'Invoice on request', included: true },
    // Sicurezza
    { icon: 'fa-fire-extinguisher', label: 'Estintori', labelEn: 'Fire extinguishers', included: true },
    { icon: 'fa-shield-halved', label: 'Rilevatore CO', labelEn: 'Carbon monoxide detector', included: true },
    { icon: 'fa-key', label: 'Accesso con chiavi', labelEn: 'Key access', included: true }
];

function renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    
    const isEnglish = document.documentElement.lang === 'en';
    const includedLabel = isEnglish ? 'Included' : 'Incluso';
    const paidLabel = isEnglish ? 'Paid' : 'A pagamento';

    grid.innerHTML = SERVICES.map(s => `
        <div class="service-item">
            <i class="fa-solid ${s.icon} service-icon"></i>
            <span class="service-label">${isEnglish ? s.labelEn : s.label}</span>
            <span class="badge ${s.included ? 'badge-included' : 'badge-paid'}">
                ${s.included ? includedLabel : paidLabel}
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

// Struttura carousel
function initStrutturaCarousel() {
    const carousel = document.querySelector('.struttura-carousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots   = carousel.querySelectorAll('.carousel-dot');
    const prev   = carousel.querySelector('.carousel-prev');
    const next   = carousel.querySelector('.carousel-next');
    let current  = 0;
    let timer;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function startAuto() {
        timer = setInterval(() => goTo(current + 1), 4000);
    }

    function resetAuto() {
        clearInterval(timer);
        startAuto();
    }

    prev.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
    next.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); resetAuto(); }));

    startAuto();
}

// Initialize all on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initMobileMenu();
    renderServices();
    initAccordion();
    initStrutturaCarousel();
    loadFormModule();
    loadCookieBanner();
});
