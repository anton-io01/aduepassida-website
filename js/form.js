/**
 * form.js
 * Form validation and Formspree integration
 * STEP 15-16: Quote request form
 */

export function initForm() {
    const form = document.getElementById('quote-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const success = document.getElementById('form-success');
    const noteEl = document.getElementById('note');
    const waLink = document.getElementById('wa-link');
    if (!form) return;

    // Character counter for textarea
    noteEl.addEventListener('input', () => {
        document.getElementById('note-counter').textContent = `${noteEl.value.length}/500`;
    });

    // WhatsApp link (replace with real number)
    const WA_NUMBER = '39XXXXXXXXXX';
    const WA_TEXT = encodeURIComponent('Ciao! Vorrei richiedere un preventivo per il B&B A Due Passi Da.');
    if (waLink) waLink.href = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;

    // Validators
    const validators = {
        nome_cognome: v => v.trim().length >= 2 ? null : 'Inserisci il tuo nome e cognome (min. 2 caratteri)',
        email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Inserisci un indirizzo email valido',
        telefono: v => !v || /^[\d\s+\-()]{9,}$/.test(v) ? null : 'Numero di telefono non valido',
        num_ospiti: v => (parseInt(v) >= 1 && parseInt(v) <= 10) ? null : 'Inserisci un numero tra 1 e 10',
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
        tipo_camera: v => v ? null : 'Seleziona una tipologia di sistemazione',
        gdpr_consent: (v, form) => form.querySelector('#gdpr_consent').checked ? null : 'Il consenso è obbligatorio'
    };

    function validateField(name) {
        const el = form.querySelector(`[name="${name}"]`);
        const errIdMap = {
            'nome_cognome': 'err-nome',
            'num_ospiti': 'err-ospiti',
            'data_arrivo': 'err-arrivo',
            'data_partenza': 'err-partenza',
            'tipo_camera': 'err-camera'
        };
        const errId = errIdMap[name] || `err-${name}`;
        const err = document.getElementById(errId);
        
        if (!el || !err || !validators[name]) return true;
        
        const msg = validators[name](el.value, form);
        err.textContent = msg || '';
        el.classList.toggle('input-error', !!msg);
        return !msg;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fields = Object.keys(validators);
        const valid = fields.map(f => validateField(f)).every(Boolean);
        if (!valid) return;

        // Loading state
        submitBtn.querySelector('.btn-text').hidden = true;
        submitBtn.querySelector('.btn-spinner').hidden = false;
        submitBtn.disabled = true;

        const formData = Object.fromEntries(new FormData(form).entries());
        
        // STEP 16: Real Formspree integration will replace this
        console.log('Form valido, pronto per invio:', formData);
        
        // Simulate success for now
        setTimeout(() => {
            form.hidden = true;
            success.hidden = false;
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
            submitBtn.querySelector('.btn-text').hidden = false;
            submitBtn.querySelector('.btn-spinner').hidden = true;
            submitBtn.disabled = false;
        }, 1000);
    });
}
