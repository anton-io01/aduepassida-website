/**
 * form.js
 * Quote request validation and Web3Forms submission
 */

export function initForm() {
    const form = document.getElementById('quote-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const success = document.getElementById('form-success');
    const noteEl = document.getElementById('note');
    const counter = document.getElementById('note-counter');
    const errorMessage = document.getElementById('form-error');
    const waLink = document.getElementById('wa-link');
    if (!form) return;

    const isEnglish = document.documentElement.lang === 'en';
    const message = (italian, english) => isEnglish ? english : italian;

    // Character counter for textarea
    noteEl?.addEventListener('input', () => {
        counter.textContent = `${noteEl.value.length}/500`;
    });

    // WhatsApp link with real number
    const WA_NUMBER = '393387066312';
    const WA_TEXT = encodeURIComponent(message('Ciao! Vorrei richiedere un preventivo per il B&B A Due Passi Da.', 'Hello! I would like to request a quote for A Due Passi Da.'));
    if (waLink) waLink.href = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

    const adults = form.elements.num_adulti;
    const children = form.elements.num_bambini;
    const guestError = document.getElementById('err-ospiti');
    const guestMessages = {
        adults: message('Seleziona il numero di adulti (da 1 a 5).', 'Select the number of adults (1 to 5).'),
        children: message('Seleziona il numero di bambini (da 0 a 4).', 'Select the number of children (0 to 4).'),
        total: message('Puoi indicare al massimo 5 ospiti in totale.', 'You can select up to 5 guests in total.')
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
        nome_cognome: v => v.trim().length >= 2 ? null : message('Inserisci il tuo nome e cognome (min. 2 caratteri)', 'Enter your full name (at least 2 characters)'),
        email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : message('Inserisci un indirizzo email valido', 'Enter a valid email address'),
        telefono: v => !v || /^[\d\s+\-()]{9,}$/.test(v) ? null : message('Numero di telefono non valido', 'Enter a valid phone number'),
        data_arrivo: (v, form) => {
            if (!v) return message('Seleziona la data di arrivo', 'Select your check-in date');
            const today = new Date().toISOString().split('T')[0];
            return v >= today ? null : message('La data di arrivo deve essere oggi o futura', 'Check-in must be today or later');
        },
        data_partenza: (v, form) => {
            const arrivo = form.querySelector('#data_arrivo').value;
            if (!v) return message('Seleziona la data di partenza', 'Select your check-out date');
            return v > arrivo ? null : message('La partenza deve essere dopo l\'arrivo', 'Check-out must be after check-in');
        },
        richiesta_tipo: v => v ? null : message('Seleziona il tipo di richiesta', 'Select a request type'),
        gdpr_consent: (v, form) => form.querySelector('#gdpr_consent').checked ? null : message('Il consenso è obbligatorio', 'Consent is required')
    };

    function validateField(name) {
        const el = form.querySelector(`[name="${name}"]`);
        const errIdMap = {
            'nome_cognome': 'err-nome',
            'data_arrivo': 'err-arrivo',
            'data_partenza': 'err-partenza',
            'richiesta_tipo': 'err-tipo',
            'gdpr_consent': 'err-gdpr'
        };
        const errId = errIdMap[name] || `err-${name}`;
        const err = document.getElementById(errId);
        
        if (!el || !err || !validators[name]) return true;
        
        const msg = validators[name](el.value, form);
        err.textContent = msg || '';
        el.classList.toggle('input-error', !!msg);
        return !msg;
    }

    if (form.elements.richiesta_tipo) form.noValidate = true;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (submitBtn.disabled) return;
        errorMessage.hidden = true;

        const fields = Object.keys(validators);
        const valid = fields.map(f => validateField(f)).every(Boolean);
        const guestsValid = validateGuests();
        if (!valid || !guestsValid) return;

        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            formData.set('num_ospiti', String(Number(adults.value) + Number(children.value)));
            const payload = Object.fromEntries(formData);
            const response = await fetch(form.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (!response.ok || result.success !== true) {
                throw new Error('Web3Forms rejected the submission');
            }

            form.reset();
            if (counter) counter.textContent = '0/500';
            form.hidden = true;
            success.hidden = false;
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch {
            errorMessage.hidden = false;
        } finally {
            submitBtn.disabled = false;
        }
    });
}
