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

    const isInformation = () => form.elements.richiesta_tipo.value === 'informazioni';
    const localToday = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    };
    const dateFields = ['data_arrivo', 'data_partenza', 'num_ospiti'];
    function updateRequirements() {
        dateFields.forEach(name => {
            const input = form.elements[name];
            input.required = !isInformation();
            const marker = form.querySelector(`label[for="${input.id}"] span`);
            if (marker) marker.textContent = isInformation() ? message('(opzionale)', '(optional)') : '*';
        });
    }
    form.elements.richiesta_tipo.addEventListener('change', updateRequirements);
    updateRequirements();
    form.elements.data_arrivo.min = localToday();
    function updateWhatsApp() {
        const arrival = form.elements.data_arrivo.value;
        const departure = form.elements.data_partenza.value;
        const guests = form.elements.num_ospiti.value;
        const details = [message('Ciao! Vorrei informazioni per un soggiorno a Corato.', 'Hello! I would like information about a stay in Corato.')];
        if (arrival) details.push(`${message('Arrivo', 'Check-in')}: ${arrival}`);
        if (departure) details.push(`${message('Partenza', 'Check-out')}: ${departure}`);
        if (guests) details.push(`${message('Ospiti', 'Guests')}: ${guests}`);
        document.querySelectorAll('[data-whatsapp-request]').forEach(link => {
            link.href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(details.join(' '))}`;
        });
    }
    form.addEventListener('input', updateWhatsApp);
    updateWhatsApp();

    // Validators
    const validators = {
        nome_cognome: v => v.trim().length >= 2 ? null : message('Inserisci il tuo nome e cognome (min. 2 caratteri)', 'Enter your full name (at least 2 characters)'),
        email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : message('Inserisci un indirizzo email valido', 'Enter a valid email address'),
        telefono: v => !v || /^[\d\s+\-()]{9,}$/.test(v) ? null : message('Numero di telefono non valido', 'Enter a valid phone number'),
        num_ospiti: v => (!v && isInformation()) ? null : Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= 5 ? null : message('Inserisci un numero tra 1 e 5', 'Enter a number from 1 to 5'),
        data_arrivo: (v, form) => {
            if (!v && isInformation()) return null;
            if (!v) return message('Seleziona la data di arrivo', 'Select your check-in date');
            const today = localToday();
            return v >= today ? null : message('La data di arrivo deve essere oggi o futura', 'Check-in must be today or later');
        },
        data_partenza: (v, form) => {
            const arrivo = form.querySelector('#data_arrivo').value;
            if (!v && isInformation()) return null;
            if (v && isInformation() && !arrivo) return v >= localToday() ? null : message('La partenza deve essere oggi o futura', 'Check-out must be today or later');
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
            'num_ospiti': 'err-ospiti',
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
        el.setAttribute('aria-invalid', String(!!msg));
        el.setAttribute('aria-describedby', errId);
        return !msg;
    }

    if (form.elements.richiesta_tipo) form.noValidate = true;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (submitBtn.disabled) return;
        errorMessage.hidden = true;

        const fields = Object.keys(validators);
        const valid = fields.map(f => validateField(f)).every(Boolean);
        if (!valid) {
            form.querySelector('[aria-invalid="true"]')?.focus();
            return;
        }

        submitBtn.disabled = true;

        try {
            const payload = Object.fromEntries(new FormData(form));
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
            updateRequirements();
            updateWhatsApp();
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
