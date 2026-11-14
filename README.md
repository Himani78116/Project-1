## Run instructions

1. Keep index.html, style.css and script.js in the same folder.
2. Open index.html in a desktop browser.

That is the whole setup - no installation and no server are required. 

## Validation logic

All of it lives in script.js:

- "isSixAsciiDigits(value)" is a pure check for exactly six ASCII digits using "/^[0-9]{6}$/".
- "getFormatError(value)" is a pure formatter. It checks, in order: 
1. empty -> Please enter your verification code.
2. any non-digit (letters, spaces, symbols) -> Only digits (0-9) are allowed.
3. digit-only but not six long -> The code must contain exactly 6 digits. 
3. otherwise -> null.
- The submit handler reads the raw value exactly as typed. There is no "trim()", no character stripping and no "Number()" conversion, so leading zeros are preserved ("000000" passes as a format) and an invalid value can never be silently cleaned into an accepted one.
- Invalid input is reported inline in "#code-error" (the markup gives it role="alert", and the input already points at both help and error via aria-describedby), aria-invalid="true" is set, and focus returns to the field.
- As soon as the user edits again, a visible error is cleared and the neutral status returns; nothing is auto-accepted on typing or insertion.
- The Submit button stays enabled so every attempt can explain itself rather than leaving a mysterious disabled state. Enter in the field and the button both use the form's submit event.
- A format pass only updates the status text to "Format accepted: six digits entered." There is no expected code, no comparison, no storage, no credential, no API key and no network call.

## Test results

Layout, measured with "getBoundingClientRect()" and "scrollWidth":

| Viewport | Card width | Side gutters | Horizontal overflow | Controls |
| --- | --- | --- | --- | --- |
| 1280 × 800 | 448 px, centred (416 px each side) | 416 px | none | input 50 px tall, button 48 px tall |
| 390 × 844 | 358 px | 16 px each side | none | input 50 px, button 48 px; both 309.22 px wide |
| 360 × 800 | 328 px | 16 px each side | none ("scrollWidth" 360 = viewport) | input 50 px, button 48 px; both 282.81 px wide |

At the same widths the heading measured 28 px, body 16 px, hints 14 px and input text 16 px; the input letter-spacing measured 3 px; the button background measured "rgb(19, 100, 93)" (#13645d) and the card "rgb(255, 255, 255)". At 360 px with an error visible, the error, button, status and note rectangles did not intersect each other.

Validation cases, with the real text produced by the page:

| Input and action | Result |
| --- | --- |
| Empty, Submit clicked with the mouse | `Please enter your verification code.`, `aria-invalid="true"` |
| `abc123`, Enter | `Only digits (0-9) are allowed.`, `aria-invalid="true"` |
| `12345`, Enter (desktop and 360 px) | `The code must contain exactly 6 digits.`, `aria-invalid="true"` |
| `1234567`, Submit clicked | `The code must contain exactly 6 digits.`, `aria-invalid="true"` |
| `12 456` inserted as one block | `Only digits (0-9) are allowed.`, `aria-invalid="true"` |
| `000000`, Enter | No error; status `Format accepted: six digits entered.`, `aria-invalid="false"` |

Keyboard: pressing Tab from the page heading moved focus to the code input; ":focus-visible" matched it with a teal border and a 3 px translucent teal ring. Enter inside the field triggered submission (shown by the five-digit case).

Runtime: 0 uncaught exceptions and 0 console errors during the whole session. The only requests recorded were the three local file loads (index.html, style.css, script.js`); there were 0 http(s) requests, including during the Submit attempts.

Text was entered through DevTools text insertion (one input event per string, the same event a keystroke or paste produces), plus real Tab/Enter key events and real mouse clicks. Individual physical keystrokes and OS clipboard paste were not separately exercised.

## Remaining limitations

- Only Chromium was tested (headless). Firefox, Safari, real iOS/Android hardware, screen readers (NVDA, JAWS, VoiceOver) and 200% zoom were not tested.
- Paste was exercised as a single bulk text insertion, not through the operating-system clipboard.
- Format acceptance is not identity proof. Any six ASCII digits "pass"; the page cannot tell whether a code is correct, expired or already used, and is not a secure registration portal.
- Real verification would need a separate server with expiry, attempt limits and replay protection. That is out of scope for this UI exercise.

## Safety

The demo does not authenticate, verify, send, store or log any code. It does not contain or compare against an expected OTP, a credential, personal data or an API key, and the accepted state confirms only the input shape.