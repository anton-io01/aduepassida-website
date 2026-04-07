/**
 * cookie-banner.js
 * GDPR cookie consent banner with localStorage persistence
 * STEP 19: Cookie banner and privacy
 */

export function initCookieBanner() {
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
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem(STORAGE_KEY, 'true');
        banner.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(() => banner.remove(), 300);
    });
}
