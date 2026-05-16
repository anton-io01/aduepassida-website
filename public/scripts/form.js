/**
 * form.js — Adapted for Astro + Netlify Forms
 * Removed: Formspree fetch, ES module export
 * Changed: Uses native Netlify form submit with AJAX fallback
 */

(function() {
    const form = document.getElementById('quote-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const success = document.getElementById('form-success');
    const noteEl = document.getElementById('note');
    const waLink = document.getElementById('wa-link');
    if (!form) return;

    // Character counter for textarea
    if (noteEl) {
        noteEl.addEventListener('input', () => {
            const counter = document.getElementById('note-counter');
            if (counter) counter.textContent = `${noteEl.value.length}/500`;
        });
    }

    // Validators
    const validators = {
        nome_cognome: v => v.trim().length >= 2 ? null : 'err',
        email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'err',
        telefono: v => !v || /^[\d\s+\-()]{9,}$/.test(v) ? null : 'err',
        richiesta_tipo: v => v ? null : 'err',
        data_arrivo: (v, form) => {
            if (!v) return 'err';
            const today = new Date().toISOString().split('T')[0];
            return v >= today ? null : 'err';
        },
        data_partenza: (v, form) => {
            const arrivo = form.querySelector('#data_arrivo').value;
            if (!v) return 'err';
            return v > arrivo ? null : 'err';
        },
        num_ospiti: v => (parseInt(v) >= 1 && parseInt(v) <= 5) ? null : 'err',
        gdpr_consent: (v, form) => form.querySelector('#gdpr_consent').checked ? null : 'err'
    };

    // Error ID mapping
    const errIdMap = {
        'nome_cognome': 'err-nome',
        'num_ospiti': 'err-ospiti',
        'data_arrivo': 'err-arrivo',
        'data_partenza': 'err-partenza',
        'richiesta_tipo': 'err-tipo',
        'gdpr_consent': 'err-gdpr'
    };

    // Get error messages from the DOM (set by i18n in Astro component)
    function getErrorMsg(name) {
        const errEl = document.getElementById(errIdMap[name] || `err-${name}`);
        return errEl ? errEl.dataset.msg || 'Required' : 'Required';
    }

    function validateField(name) {
        const el = form.querySelector(`[name="${name}"]`);
        const errId = errIdMap[name] || `err-${name}`;
        const err = document.getElementById(errId);

        if (!el || !err || !validators[name]) return true;

        const msg = validators[name](el.type === 'checkbox' ? el.checked : el.value, form);
        err.textContent = msg ? (err.dataset.msg || 'Required') : '';
        if (el.type !== 'checkbox') el.classList.toggle('input-error', !!msg);
        return !msg;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fields = Object.keys(validators);
        const valid = fields.map(f => validateField(f)).every(Boolean);
        if (!valid) return;

        submitBtn.disabled = true;

        const formData = new FormData(form);

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                form.hidden = true;
                success.hidden = false;
                success.scrollIntoView({ behavior: 'smooth', block: 'center' });
                form.reset();
                const counter = document.getElementById('note-counter');
                if (counter) counter.textContent = '0/500';
            } else {
                throw new Error('Submit failed');
            }
        } catch (error) {
            console.error('Form error:', error);
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error-general';
            errorDiv.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i> Error sending. Please try again or contact us via WhatsApp.';
            form.insertBefore(errorDiv, form.firstChild);
            setTimeout(() => errorDiv.remove(), 5000);
        } finally {
            submitBtn.disabled = false;
        }
    });
})();
