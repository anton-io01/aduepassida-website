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

// Initialize all on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initMobileMenu();
});
