class Note {

  constructor(id = (Math.floor(Math.random() * 10000) + 1),title = 'Sample Title', body = 'Sample Body', positionX = 20, positionY = 10) {
    this.id = id,
    this.title = title,
    this.body = body,
    this.positionX = positionX,
    this.positionY = positionY
  };

};

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
  const note = this.closest('.anote');
  const noteId = note.id.split('-')[1];
  const storedNotes = JSON.parse(localStorage.getItem('notes'));
  const updatedNotes = storedNotes.filter(obj => obj.id != noteId);
  note.remove();
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
};
const saveNote = function saveNoteOnTitleBodyChange(e) {
  const noteId = parseInt(this.id.split('-')[1]);
  const storedNotes = JSON.parse(localStorage.getItem('notes'));
  const updatedNotes = storedNotes.map((note) => {
    if (note.id === noteId) {
      note.title = this.querySelector('.anote-title').value;
      note.body = this.querySelector('.anote-body').value;;
      return note;
    } else {
      return note;
    };
  });
  localStorage.setItem('notes', JSON.stringify(updatedNotes))
};
const updateNotes = function screenAllNotesAndUpdate() {
  const allNotes = document.querySelectorAll('.anote');
  allNotes.forEach(note => {
    const deleteBtn = note.querySelector('.anote-delete');
    deleteBtn.addEventListener('click', deleteNote);
    note.addEventListener('input', saveNote);
  });
};
const createNote = function createNewNote() {
  const noteContainer = document.querySelector('#main');
  const note = new Note();

  // Set or update localStorage of notes
  if (!localStorage.notes) {
    localStorage.setItem('notes', JSON.stringify([note]));
  } else {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    storedNotes.push(note);
    localStorage.setItem('notes', JSON.stringify(storedNotes));
  };

  // Append new note to HTML body
  const appendNote = `
  <div class="anote" id="anote-${note.id}">
    <div class="anote-header">
      <button type="button" class="anote-delete" data-action="delete">&times;</button>
    </div>
    <div class="anote-content">
      <input type="text" class="anote-title" value="Sample Title">
      <textarea class="anote-body" cols="30" rows="10" value="" placeholder="Sample Body"></textarea>
    </div>
  </div>
  `
  noteContainer.innerHTML += appendNote;
  updateNotes();
};

// Immediately invoked function expression (IIFE)
// Load notes
(function() {
  const noteContainer = document.querySelector('#main');
  const addNoteBtn = document.querySelector('#add-note');
  addNoteBtn.addEventListener('click', createNote);

  // Load localStorage notes
  const storedNotes = JSON.parse(localStorage.getItem('notes'));

  Array.from(storedNotes).forEach(note => {
    noteContainer.innerHTML += `
    <div class="anote" id="anote-${note.id}">
      <div class="anote-header">
        <button type="button" class="anote-delete" data-action="delete">&times;</button>
      </div>
      <div class="anote-content">
        <input type="text" class="anote-title" value="${note.title}">
        <textarea class="anote-body" cols="30" rows="10" value="${note.body}" placeholder="Sample Body">${note.body}</textarea>
      </div>
    </div>
    `
  });

  // Updates notes
  updateNotes();
}());

// localStorage.clear();
