'use strict';

const SIX_ASCII_DIGITS = /^[0-9]{6}$/;
const ASCII_DIGITS_ONLY = /^[0-9]+$/;

const form = document.querySelector('#verification-form');
const codeInput = document.querySelector('#verification-code');
const errorOutput = document.querySelector('#code-error');
const statusOutput = document.querySelector('#form-status');

const READY_STATUS = 'Enter the 6-digit code.';
const INVALID_STATUS = 'Code not accepted. Fix the highlighted issue and try again.';
const ACCEPTED_STATUS = 'Format accepted: six digits entered.';

const isSixAsciiDigits = (value) =>
    typeof value === 'string' && SIX_ASCII_DIGITS.test(value);

const getFormatError = (value) => {
    if (value.length === 0) {
        return 'Please enter your verification code.';
    }

    if (!ASCII_DIGITS_ONLY.test(value)) {
        return 'Only digits (0-9) are allowed.';
    }

    if (!isSixAsciiDigits(value)) {
        return 'The code must contain exactly 6 digits.';
    }

    return null;
};

const showError = (message) => {
    errorOutput.textContent = message;
    errorOutput.hidden = false;
    codeInput.setAttribute('aria-invalid', 'true');
    statusOutput.textContent = INVALID_STATUS;
    codeInput.focus();
};

// Hide the error row and drop the invalid state while the user edits. 
const clearError = () => {
    errorOutput.textContent = '';
    errorOutput.hidden = true;
    codeInput.setAttribute('aria-invalid', 'false');
};

// Report a locally accepted format without implying the code was verified. 
const showAccepted = () => {
    clearError();
    statusOutput.textContent = ACCEPTED_STATUS;
};

// keeps their behaviour consistent: clear stale feedback, never auto-accept.
codeInput.addEventListener('input', () => {
    if (!errorOutput.hidden) {
        clearError();
        statusOutput.textContent = READY_STATUS;
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Read the value exactly as entered: no trim(), stripping or coercion.
    const message = getFormatError(codeInput.value);

    if (message !== null) {
        showError(message);
        return;
    }

    showAccepted();
});

// Replace the starter notice now that the format check exists.
statusOutput.textContent = READY_STATUS;
