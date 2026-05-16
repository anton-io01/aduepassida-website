/**
 * main.js — Adapted for Astro migration
 * Removed: renderServices() (now static), loadFormModule(), loadCookieBanner()
 * Kept: initStickyHeader, initMobileMenu, initAccordion, initStrutturaCarousel
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
    initAccordion();
    initStrutturaCarousel();
});
