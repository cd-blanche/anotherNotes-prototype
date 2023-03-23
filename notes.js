class Note {

  constructor(id = (Math.floor(Math.random() * 10000) + 1),title = 'Sample Title', body = 'Sample Body', positionX = 20, positionY = 10) {
    this.id = id,
    this.title = title,
    this.body = body,
    this.positionX = positionX,
    this.positionY = positionY
    this.deleteNote = function() {
      // create delete note function here
      console.log(this);
      this.remove();
      // debug -> currently only deletes recently added note
    };
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



function createNote() {
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
  
  // Add event listeners to new note
  const deleteBtn = document.querySelector(`#anote-${note.id}`);
  deleteBtn.addEventListener('click', note.deleteNote)

};

function deleteNote(note) {

}

function noteStartup() {
  // let noteCounter = 0;
  // const allNotes = document.querySelectorAll('.anote');
  // noteCounter = allNotes.length;
  // console.log(noteCounter);

  const addNoteBtn = document.querySelector('#add-note');
  addNoteBtn.addEventListener('click', createNote);


};
localStorage.clear();
noteStartup();
