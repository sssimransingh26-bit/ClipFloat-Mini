# ClipFloat Mini

A small dark-themed web app for saving, searching, and copying text snippets. Everything runs in the browser and is stored in `localStorage`.

## Features

- Add multiple text snippets
- Instant case-insensitive search
- Copy a snippet to the clipboard
- Delete a snippet
- Persist snippets after refresh
- Snippet count and empty states

## Setup

No install or build step is required.

1. Open the project folder.
2. Double-click `index.html`, or open it from your browser:
   - Chrome / Edge: File → Open File → select `index.html`
3. Start adding snippets.

To serve it locally instead:

```bash
npx --yes serve .
```

Then open the URL shown in the terminal (usually `http://localhost:3000`).

## Files

- `index.html` — page structure
- `style.css` — dark theme and layout
- `script.js` — snippets, search, clipboard, and storage
