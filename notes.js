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
  // console.log()
  const note = this.closest('.anote');
  const noteId = note.id;
  console.log(noteId)
  note.remove();
  // remove() this item from the DOM
  // also remove from localStorage
};

const updateNotes = function screenAllNotesAndUpdate() {
  const allNotes = document.querySelectorAll('.anote');
  allNotes.forEach(note => {
    const deleteBtn = note.querySelector('.anote-delete');
    deleteBtn.addEventListener('click', deleteNote);
  });
};

const createNote = function createNewNote() {
  const targetBody = document.querySelector('#main');
  const note = new Note();

  // Set or update localStorage of notes
  if (!localStorage.notes) {
    localStorage.setItem('notes', JSON.stringify([note]));
  } else {
    const currentNotes = JSON.parse(localStorage.getItem('notes'));
    currentNotes.push(note);
    localStorage.setItem('notes', JSON.stringify(currentNotes));
  };

  // Append new note to HTML body
  const appendNote = `
  <div class="anote" id="anote-${note.id}">
    <div class="anote-header">
      <button type="button" class="anote-delete" data-action="delete">&times;</button>
    </div>
    <div class="anote-content">
      <input type="text" class="anote-title" value="Sample Title">
      <textarea class="anote-body" cols="30" rows="10">Sample Body</textarea>
    </div>
  </div>
  `
  targetBody.innerHTML += appendNote;
  updateNotes();
};

// Immediately invoked function expression (IIFE)
(function() {
  const addNoteBtn = document.querySelector('#add-note');
  addNoteBtn.addEventListener('click', createNote);
  // Updates notes
  updateNotes();
})();
localStorage.clear();
