# Calculator App

Simple browser-based calculator built with HTML, CSS and JavaScript.

## Features
- Basic arithmetic: +, -, *, /, %
- Decimal support with guards to prevent multiple decimals in the same number
- Delete (DEL), clear (AC), and evaluate (=)
- Responsive layout for small screens

## How to run
1. Open `index.html` in your browser:
   - Double-click the file, or
   - Right-click → Open With → your browser, or
   - Serve the folder with a local server (e.g. VS Code Live Server).

## Files
- `index.html` — UI markup
- `style.css` — styling and responsive layout
- `app.js` — calculator logic and button handling

## Notes
- The evaluator uses `eval()` on the expression string in `app.js`. This is simple but can be unsafe if untrusted input is possible. For production, replace `eval` with a proper expression parser or sanitizer.
- Percentage (%) currently divides the current expression by 100 when pressed.

## Technologies

- HTML
- CSS
- JavaScript

---

Made as a beginner mini project.