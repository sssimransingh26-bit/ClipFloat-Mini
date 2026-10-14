# ClipFloat Mini

**A lightweight, minimal text snippet manager built for quick access to copied text.**

ClipFloat Mini lets you save, search, and copy text snippets through a clean, modern dark-themed interface. It runs entirely in your browser, with snippets saved locally using `localStorage`.

## ✨ Features

- **Add Snippets** — Save multiple text snippets for quick access.
- **Instant Search** — Find snippets with case-insensitive, real-time search.
- **One-Click Copy** — Copy any snippet directly to your clipboard.
- **Delete Snippets** — Remove snippets you no longer need.
- **Local Persistence** — Your snippets remain saved after refreshing the page.
- **Snippet Counter** — See how many snippets you've saved.
- **Responsive UI** — A clean, dark-themed interface designed for comfortable use.

## 🛠️ Built With

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage` API

## 🚀 Getting Started

No installation, dependencies, or build tools are required.

### Option 1: Open Directly

1. Clone or download this repository.
2. Open the project folder.
3. Double-click `index.html` to launch the app in your browser.
4. Start adding, searching, and copying snippets.

### Option 2: Run Using a Local Server

If you have Node.js installed, run:

```bash
npx --yes serve .
```

Open the local URL displayed in your terminal, usually `http://localhost:3000`.

## 📁 Project Structure

```text
ClipFloat-Mini/
├── index.html    # Application structure
├── style.css     # Styling and responsive layout
├── script.js     # Snippets, search, clipboard, and storage
└── README.md     # Project documentation
```

## 💾 Data Storage and Privacy

ClipFloat Mini stores snippets in your browser's `localStorage`. No backend, account, or external database is required.

Your saved snippets are associated with the browser and origin used to open the application. Clearing browser data or using a different browser may remove or hide previously saved snippets.

## 🎯 Project Goal

The goal of ClipFloat Mini is to make collecting and retrieving useful text quick and convenient through a simple, distraction-free interface.

This project was built as a small application for the **MLH Global Hack Week: Hacktoberfest** challenge, exploring AI-assisted development and rapid prototyping.

## 🔮 Future Improvements

- Keyboard shortcuts for common actions.
- Export and import snippets.
- Improved snippet organization.
- A floating desktop version.

## 📄 License

No license has been specified yet. Add a license if you want to define how others may use, modify, and distribute this project.
