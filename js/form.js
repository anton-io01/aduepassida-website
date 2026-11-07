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

    // Character counter for textarea
    noteEl?.addEventListener('input', () => {
        counter.textContent = `${noteEl.value.length}/500`;
    });

    // WhatsApp link with real number
    const WA_NUMBER = '393921393823';
    const WA_TEXT = encodeURIComponent('Ciao! Vorrei richiedere un preventivo per il B&B A Due Passi Da.');
    if (waLink) waLink.href = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

    // Validators
    const validators = {
        nome_cognome: v => v.trim().length >= 2 ? null : 'Inserisci il tuo nome e cognome (min. 2 caratteri)',
        email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Inserisci un indirizzo email valido',
        telefono: v => !v || /^[\d\s+\-()]{9,}$/.test(v) ? null : 'Numero di telefono non valido',
        num_ospiti: v => Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= 5 ? null : 'Inserisci un numero tra 1 e 5',
        data_arrivo: (v, form) => {
            if (!v) return 'Seleziona la data di arrivo';
            const today = new Date().toISOString().split('T')[0];
            return v >= today ? null : 'La data di arrivo deve essere oggi o futura';
        },
        data_partenza: (v, form) => {
            const arrivo = form.querySelector('#data_arrivo').value;
            if (!v) return 'Seleziona la data di partenza';
            return v > arrivo ? null : 'La partenza deve essere dopo l\'arrivo';
        },
        richiesta_tipo: v => v ? null : 'Seleziona il tipo di richiesta',
        gdpr_consent: (v, form) => form.querySelector('#gdpr_consent').checked ? null : 'Il consenso è obbligatorio'
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
        return !msg;
    }

    if (form.elements.richiesta_tipo) form.noValidate = true;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (submitBtn.disabled) return;
        errorMessage.hidden = true;

        const fields = Object.keys(validators);
        const valid = fields.map(f => validateField(f)).every(Boolean);
        if (!valid) return;

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
