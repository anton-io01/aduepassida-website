/**
 * Quote request validation and Web3Forms submission
 */
(function () {
    const form = document.getElementById('quote-form');
    if (!form) return;

    const send = document.getElementById('form-submit-btn');
    const sendAndOpen = document.getElementById('form-submit-wa');
    const success = document.getElementById('form-success');
    const successContact = document.getElementById('form-success-contact');
    const serviceError = document.getElementById('form-error');
    const errorContact = document.getElementById('form-error-contact');
    const fallback = document.getElementById('form-whatsapp-fallback');
    const fallbackLink = fallback.querySelector('a');
    const counter = document.getElementById('note-counter');

    const {
        nome_cognome: name, email, telefono: phone, richiesta_tipo: type,
        data_arrivo: arrival, data_partenza: departure, num_adulti: adults,
        num_bambini: children, note, gdpr_consent: consent,
    } = form.elements;
    const stayFields = [arrival, departure, adults, children];
    const requiredMarkers = form.querySelectorAll('[data-stay-required]');
    const optionalMarkers = form.querySelectorAll('[data-stay-optional]');
    const errors = JSON.parse(form.dataset.errors);
    const whatsappFields = JSON.parse(form.dataset.whatsappFields);
    const formatter = new Intl.DateTimeFormat(document.documentElement.lang === 'it' ? 'it-IT' : 'en-GB', {
        dateStyle: 'medium',
    });
    let busy = false;
    let submitted = false;
    let childrenChosen = false;

    function dateValue(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${date.getFullYear()}-${month}-${day}`;
    }

    function updateDateLimits() {
        const today = dateValue(new Date());
        arrival.min = today;
        departure.min = today;
        if (arrival.value >= today) {
            const nextDay = new Date(`${arrival.value}T12:00:00`);
            nextDay.setDate(nextDay.getDate() + 1);
            departure.min = dateValue(nextDay);
        }
    }

    function updateRequiredFields() {
        const optional = type.value === 'informazioni';
        for (const field of stayFields) field.required = !optional;
        for (const marker of requiredMarkers) marker.hidden = optional;
        for (const marker of optionalMarkers) marker.hidden = !optional;

        // Preserve a deliberate zero without treating the initial default as a choice.
        children.options[0].hidden = !optional;
        if (optional && !childrenChosen && children.value === '0') children.value = '';
        if (!optional && children.value === '') children.value = '0';
    }

    function showError(field, text) {
        field.classList.toggle('input-error', Boolean(text));
        field.setAttribute('aria-invalid', String(Boolean(text)));
    }

    function validateDate(field, invalidMessage, requiredMessage) {
        if (field.validity.badInput) return invalidMessage;
        if (!field.value) return field.required ? requiredMessage : '';
        if (field.value < arrival.min) return errors.datePast;
        if (field === departure && arrival.value && field.value <= arrival.value) return errors.dateOrder;
        return '';
    }

    function guestCount(field) {
        return field.value === '' ? null : Number(field.value);
    }

    function validateGuests() {
        const adultCount = guestCount(adults);
        const childCount = guestCount(children);
        const badAdults = adultCount === null ? adults.required :
            !Number.isInteger(adultCount) || adultCount < 1 || adultCount > 5;
        const badChildren = childCount === null ? children.required :
            !Number.isInteger(childCount) || childCount < 0 || childCount > 4;
        const overCapacity = !badAdults && !badChildren &&
            adultCount !== null && childCount !== null && adultCount + childCount > 5;
        const messages = [
            badAdults && errors.guestsAdults,
            badChildren && errors.guestsChildren,
            overCapacity && errors.guestsTotal,
        ].filter(Boolean);

        document.getElementById('err-ospiti').textContent = messages.join(' ');
        showError(adults, badAdults || overCapacity);
        showError(children, badChildren || overCapacity);
    }

    function validate() {
        updateDateLimits();
        const checks = [
            [name, 'err-nome', name.value.trim().length < 2 && errors.name],
            [email, 'err-email', !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) && errors.email],
            [phone, 'err-telefono', phone.value.trim() && !/^[\d\s+\-()]{9,}$/.test(phone.value.trim()) && errors.phone],
            [type, 'err-tipo', !type.value && errors.type],
            [arrival, 'err-arrivo', validateDate(arrival, errors.arrivalInvalid, errors.arrival)],
            [departure, 'err-partenza', validateDate(departure, errors.departureInvalid, errors.departure)],
            [consent, 'err-gdpr', !consent.checked && errors.gdpr],
        ];
        for (const [field, errorId, message] of checks) {
            const error = document.getElementById(errorId);
            if (error.textContent !== (message || '')) error.textContent = message || '';
            showError(field, message);
        }
        validateGuests();
        return form.querySelector('[aria-invalid="true"]');
    }

    function createPayload() {
        const data = new FormData(form);
        for (const field of [name, phone, note]) data.set(field.name, field.value.trim());
        for (const field of stayFields) {
            if (!field.value) data.delete(field.name);
        }
        const adultCount = guestCount(adults);
        const childCount = guestCount(children);
        if (adultCount !== null && childCount !== null) {
            data.set('num_ospiti', String(adultCount + childCount));
        }
        return Object.fromEntries(data);
    }

    function createWhatsAppUrl(payload) {
        const message = [form.dataset.whatsappHeading, ''];
        for (const [field, label] of Object.entries(whatsappFields)) {
            const value = payload[field]?.trim();
            if (!value) continue;

            let displayValue = value;
            if (field === type.name) displayValue = type.selectedOptions[0].text;
            if (field === arrival.name || field === departure.name) {
                displayValue = formatter.format(new Date(`${value}T12:00:00`));
            }
            message.push(`${label}: ${displayValue}`);
        }
        return `${form.dataset.whatsappUrl}?text=${encodeURIComponent(message.join('\n'))}`;
    }

    note.addEventListener('input', () => {
        counter.textContent = `${note.value.length}/500`;
    });
    form.addEventListener('focusin', updateDateLimits);
    form.addEventListener('change', event => {
        if (event.target === children) childrenChosen = children.value !== '';
        if (event.target === type) updateRequiredFields();
        if (submitted) validate();
        else updateDateLimits();
    });

    for (const button of [send, sendAndOpen]) {
        button.addEventListener('click', event => {
            if (event.detail > 1) event.preventDefault();
        });
    }

    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (busy || form.hidden) return;

        submitted = true;
        serviceError.hidden = true;
        const firstInvalid = validate();
        if (firstInvalid) {
            firstInvalid.focus();
            return;
        }

        busy = true;
        send.disabled = true;
        sendAndOpen.disabled = true;

        const withWhatsApp = event.submitter === sendAndOpen;
        const payload = createPayload();
        fallback.hidden = !withWhatsApp;
        if (withWhatsApp) fallbackLink.href = createWhatsAppUrl(payload);
        else fallbackLink.removeAttribute('href');

        try {
            const request = fetch(form.action, {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (withWhatsApp) {
                // Keep the opening inside the original user gesture, including on mobile.
                try {
                    window.open(fallbackLink.href, '_blank', 'noopener,noreferrer');
                } catch {
                    // The manual link is available regardless of the browser's response.
                }
            }

            const response = await request;
            const result = await response.json();
            if (!response.ok || result.success !== true) throw new Error('Web3Forms rejected the submission');

            form.reset();
            counter.textContent = '0/500';
            form.hidden = true;
            successContact.hidden = withWhatsApp;
            success.hidden = false;
            success.focus({ preventScroll: true });
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch {
            errorContact.hidden = withWhatsApp;
            serviceError.hidden = false;
        } finally {
            busy = false;
            send.disabled = false;
            sendAndOpen.disabled = false;
        }
    });

    form.noValidate = true;
    updateRequiredFields();
    updateDateLimits();
    send.disabled = false;
    sendAndOpen.disabled = false;
})();
