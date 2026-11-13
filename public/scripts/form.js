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

    const adults = form.elements.num_adulti;
    const children = form.elements.num_bambini;
    const guestError = document.getElementById('err-ospiti');
    const guestMessages = {
        adults: guestError.closest('fieldset').dataset.errorAdults,
        children: guestError.closest('fieldset').dataset.errorChildren,
        total: guestError.closest('fieldset').dataset.errorTotal
    };

    function validateGuests() {
        const adultCount = Number(adults.value);
        const childCount = Number(children.value);
        const invalidAdults = !Number.isInteger(adultCount) || adultCount < 1 || adultCount > 5;
        const invalidChildren = children.value === '' || !Number.isInteger(childCount) || childCount < 0 || childCount > 4;
        const overCapacity = !invalidAdults && !invalidChildren && adultCount + childCount > 5;

        let error = '';
        if (invalidAdults) {
            error = guestMessages.adults;
        } else if (invalidChildren) {
            error = guestMessages.children;
        } else if (overCapacity) {
            error = guestMessages.total;
        }

        guestError.textContent = error;
        adults.classList.toggle('input-error', invalidAdults || overCapacity);
        children.classList.toggle('input-error', invalidChildren || overCapacity);
        adults.setAttribute('aria-invalid', String(invalidAdults || overCapacity));
        children.setAttribute('aria-invalid', String(invalidChildren || overCapacity));
        return !invalidAdults && !invalidChildren && !overCapacity;
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
        gdpr_consent: (v, form) => form.querySelector('#gdpr_consent').checked ? null : 'err'
    };

    // Error ID mapping
    const errIdMap = {
        'nome_cognome': 'err-nome',
        'data_arrivo': 'err-arrivo',
        'data_partenza': 'err-partenza',
        'richiesta_tipo': 'err-tipo',
        'gdpr_consent': 'err-gdpr'
    };

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
        const guestsValid = validateGuests();
        if (!valid || !guestsValid) return;

        submitBtn.disabled = true;

        const formData = new FormData(form);
        formData.set('num_ospiti', String(Number(adults.value) + Number(children.value)));

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
