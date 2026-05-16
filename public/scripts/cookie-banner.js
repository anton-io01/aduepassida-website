/**
 * cookie-banner.js — Adapted for Astro
 * Removed: ES module export
 * Changed: IIFE pattern, same localStorage logic
 */

(function() {
    const STORAGE_KEY = 'aduepassida_cookie_consent';
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    // Check if user already consented
    const hasConsented = localStorage.getItem(STORAGE_KEY);
    if (hasConsented) {
        banner.remove();
        return;
    }

    // Show banner
    banner.hidden = false;

    // Accept button
    const acceptBtn = document.getElementById('cookie-accept');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                necessary: true,
                functional: true,
                analytics: false,
                timestamp: new Date().toISOString()
            }));
            banner.style.animation = 'slideDown 0.3s ease-out';
            setTimeout(() => banner.remove(), 300);
        });
    }
})();
