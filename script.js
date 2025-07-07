function renderNote({ title, date, content, emotion }) {
  const noteCard = document.createElement('div');
  noteCard.classList.add('note-card');

  noteCard.innerHTML = `
    <h3>${title}</h3>
    <small>${date} - Emoção: ${emotion}</small>
    <p>${content}</p>
  `;

  notesGrid.prepend(noteCard);
}

const form = document.getElementById('noteForm');
const notesGrid = document.getElementById('notesGrid');
window.addEventListener("DOMContentLoaded", () => {
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  storedNotes.forEach(note => renderNote(note));
});
const darkModeToggle = document.getElementById('darkModeToggle');

const emojiButtons = document.querySelectorAll("#emojiSelector button");
const emotionInput = document.getElementById("emotion");

emojiButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    emojiButtons.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    emotionInput.value = btn.textContent;
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const rawDate = document.getElementById('date').value;
  const [yyyy, mm, dd] = rawDate.split("-");
  const date = `${dd}/${mm}/${yyyy}`;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const emotion = document.getElementById('emotion').value;
  const note = { title, date, content, emotion };
  renderNote(note);
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  storedNotes.push(note);
  localStorage.setItem("notes", JSON.stringify(storedNotes));
  form.reset();
  emojiButtons.forEach(b => b.classList.remove("selected"));
});

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkModeToggle.textContent =
    document.body.classList.contains('dark') ? '☀️' : '🌙';
});
