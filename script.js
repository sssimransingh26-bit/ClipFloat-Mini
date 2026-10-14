const STORAGE_KEY = "clipfloat-mini-snippets";

const searchInput = document.getElementById("search");
const addForm = document.getElementById("add-form");
const snippetInput = document.getElementById("snippet-input");
const formError = document.getElementById("form-error");
const listEl = document.getElementById("list");
const countEl = document.getElementById("snippet-count");
const toastEl = document.getElementById("toast");

let snippets = loadSnippets();
let toastTimer;

function loadSnippets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) => item && typeof item.id === "string" && typeof item.text === "string"
    );
  } catch {
    return [];
  }
}

function saveSnippets() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
  } catch {
    showToast("Could not save snippets");
  }
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function updateCount() {
  const n = snippets.length;
  countEl.textContent = n === 1 ? "1 snippet" : `${n} snippets`;
}

function showToast(message) {
  toastEl.hidden = false;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 1600);
}

function getQuery() {
  return searchInput.value.trim().toLowerCase();
}

function filteredSnippets() {
  const q = getQuery();
  if (!q) return snippets;
  return snippets.filter((item) => item.text.toLowerCase().includes(q));
}

function render() {
  updateCount();
  const items = filteredSnippets();
  listEl.innerHTML = "";

  if (snippets.length === 0) {
    listEl.append(emptyState("No snippets yet", "Add a note above and it will stay on this device."));
    return;
  }

  if (items.length === 0) {
    listEl.append(emptyState("No matching snippets", "Try a different search term."));
    return;
  }

  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.append(createCard(item)));
  listEl.append(fragment);
}

function emptyState(title, detail) {
  const el = document.createElement("div");
  el.className = "empty";
  el.innerHTML = `<strong>${escapeHtml(title)}</strong>${escapeHtml(detail)}`;
  return el;
}

function createCard(item) {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.id = item.id;

  const text = document.createElement("p");
  text.className = "card-text";
  text.textContent = item.text;

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "btn btn-ghost";
  copyBtn.textContent = "Copy";
  copyBtn.addEventListener("click", () => copySnippet(item.text));

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn btn-danger";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteSnippet(item.id));

  actions.append(copyBtn, deleteBtn);
  card.append(text, actions);
  return card;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function addSnippet(text) {
  snippets.unshift({ id: uid(), text, createdAt: Date.now() });
  saveSnippets();
  render();
}

function deleteSnippet(id) {
  snippets = snippets.filter((item) => item.id !== id);
  saveSnippets();
  render();
}

async function copySnippet(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      fallbackCopy(text);
    }
    showToast("Copied to clipboard");
  } catch {
    try {
      fallbackCopy(text);
      showToast("Copied to clipboard");
    } catch {
      showToast("Copy failed");
    }
  }
}

function fallbackCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.left = "-9999px";
  document.body.append(area);
  area.select();
  const ok = document.execCommand("copy");
  area.remove();
  if (!ok) throw new Error("copy failed");
}

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = snippetInput.value.trim();
  if (!text) {
    formError.hidden = false;
    formError.textContent = "Enter some text before adding.";
    snippetInput.focus();
    return;
  }
  formError.hidden = true;
  formError.textContent = "";
  addSnippet(text);
  snippetInput.value = "";
  snippetInput.focus();
});

searchInput.addEventListener("input", render);

render();
