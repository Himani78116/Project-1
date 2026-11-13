'use strict';

const form = document.querySelector('#verification-form');
const codeInput = document.querySelector('#verification-code');
const errorOutput = document.querySelector('#code-error');
const statusOutput = document.querySelector('#form-status');

// TODO: implement a pure format-validation helper and accessible error handling.
// No expected OTP, credential, API key, network call or authentication logic belongs here.
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // This guard deliberately blocks all submissions until the exercise is implemented.
    // Keep the demo local even after validation has been completed.
    statusOutput.textContent = 'Starter mode: implement and test input validation before continuing.';
});
