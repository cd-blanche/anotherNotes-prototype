class Note {
  constructor(
    id = Math.floor(Math.random() * 10000) + 1,
    title = "Sample Title",
    body = "Enter body here",
    positionX = 20,
    positionY = 10
  ) {
    (this.id = id),
      (this.title = title),
      (this.body = body),
      (this.positionX = positionX),
      (this.positionY = positionY);
  }
}

// localStorage structure
/*
  "notes": {
    [
      {
        "id"
        "title"
        "body"
        "positionX"
        "positionY"
      }
    ]
  }
*/

const deleteNote = function deleteThisNote(e) {
  const note = this.closest(".anote");
  const noteId = note.id.split("-")[1];
  const storedNotes = JSON.parse(localStorage.getItem("notes"));
  const updatedNotes = storedNotes.filter((obj) => obj.id != noteId);
  note.remove();
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
};
const saveNote = function saveNoteOnTitleBodyChange(e) {
  const targetNote = e.target;
  const parentNote = targetNote.closest('.anote');
  const noteBody = parentNote.querySelector('.anote-body');
  const noteTitle = parentNote.querySelector('.anote-title');
  const savingText = targetNote.nextElementSibling;
  const noteId = parseInt(parentNote.id.split("-")[1]);
  const storedNotes = JSON.parse(localStorage.getItem("notes"));
  const updatedNotes = storedNotes.map((note) => {
    if (note.id === noteId) {
      console.log(targetNote.value)
      note.title = noteTitle.value;
      note.body = noteBody.textContent;
      return note;
    } else {
      return note;
    }
  });
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
  savingText.style.opacity = 1;
  setTimeout(() => {
    savingText.style.opacity = 0;
  }, 1500);
};
const updateNotes = function screenAllNotesAndUpdate() {
  const allNotes = document.querySelectorAll(".anote");
  allNotes.forEach((note) => {
    const deleteBtn = note.querySelector(".anote-delete");
    let timer;
    deleteBtn.addEventListener("click", deleteNote);
    note.addEventListener("input", () => {
      clearTimeout(timer);
    });
    note.addEventListener('keyup', (e) => {
      clearTimeout(timer);
      timer = setTimeout(saveNote, 1000, e);
    });
  });
};
const createNote = function createNewNote() {
  const noteContainer = document.querySelector("#main");
  const note = new Note();

  // Set or update localStorage of notes
  if (!localStorage.notes) {
    localStorage.setItem("notes", JSON.stringify([note]));
  } else {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    storedNotes.push(note);
    localStorage.setItem("notes", JSON.stringify(storedNotes));
  };

  // Append new note to HTML body
  const appendNote = document.createElement('div');
  appendNote.id = `anote-${note.id}`
  appendNote.classList.add('anote');
  appendNote.innerHTML = `
    <div class="anote-header">
      <button type="button" class="anote-delete" data-action="delete">&times;</button>
    </div>
    <div class="anote-content">
      <input type="text" class="anote-title" value="${note.title}">
      <div class="anote-body" contenteditable="true">${note.body}</div>
      <span class="anote-saving">Saving...</span>
    </div>
  `;
  noteContainer.appendChild(appendNote);
  updateNotes();
};

// Immediately invoked function expression (IIFE)
// Load notes
(function () {
  const noteContainer = document.querySelector("#main");
  const addNoteBtn = document.querySelector("#add-note");
  addNoteBtn.addEventListener("click", createNote);

  // Load localStorage notes
  const storedNotes = JSON.parse(localStorage.getItem("notes"));

  Array.from(storedNotes).forEach((note) => {
    noteContainer.innerHTML += `
    <div class="anote" id="anote-${note.id}">
      <div class="anote-header">
        <button type="button" class="anote-delete" data-action="delete">&times;</button>
      </div>
      <div class="anote-content">
        <input type="text" class="anote-title" value="${note.title}">
        <div class="anote-body" contenteditable="true">${note.body}</div>
        <span class="anote-saving">Saving...</span>
      </div>
    </div>
    `;
  });

  // Updates notes
  updateNotes();
})();

// localStorage.clear();
