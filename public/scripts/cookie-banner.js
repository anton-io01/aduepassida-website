(function () {
    const STORAGE_KEY = 'aduepassida_cookie_consent';
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    try {
        if (localStorage.getItem(STORAGE_KEY)) {
            banner.remove();
            return;
        }
    } catch {
        // The banner remains dismissible when browser storage is unavailable.
    }

    const root = document.documentElement;
    const updateHeight = () => root.style.setProperty('--cookie-banner-height', `${banner.offsetHeight}px`);
    const observer = new ResizeObserver(updateHeight);
    banner.hidden = false;
    updateHeight();
    observer.observe(banner);

    function revealFocus(event) {
        const target = event.target;
        if (!(target instanceof HTMLElement) || banner.contains(target)) return;
        requestAnimationFrame(() => {
            if (document.activeElement !== target || !banner.isConnected) return;
            if (target.getBoundingClientRect().bottom > banner.getBoundingClientRect().top) {
                target.scrollIntoView({ block: 'center', behavior: 'instant' });
            }
        });
    }

    document.addEventListener('focusin', revealFocus);
    document.getElementById('cookie-accept').addEventListener('click', () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                necessary: true,
                functional: true,
                analytics: false,
                timestamp: new Date().toISOString()
            }));
        } catch {
            // Dismiss for the current page even if the choice cannot be saved.
        } finally {
            observer.disconnect();
            document.removeEventListener('focusin', revealFocus);
            root.style.removeProperty('--cookie-banner-height');
            banner.remove();
        }
    });
})();
