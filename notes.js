class Note {

  constructor(id = (Math.floor(Math.random() * 10000) + 1),title = 'Sample Title', body = 'Sample Body', positionX = 20, positionY = 10) {
    this.id = id,
    this.title = title,
    this.body = body,
    this.positionX = positionX,
    this.positionY = positionY
  };

};


function createNote() {
  const targetBody = document.querySelector('#main');
  const note = new Note();
  console.log(note);

  const appendNote = `
  <div class="anote" id="anote-${note.id}">
    <div class="anote-header"></div>
    <div class="anote-content">
      <input type="text" class="anote-title" value="${note.title}">
      <textarea class="anote-body" cols="30" rows="10">${note.body}</textarea>
    </div>
  </div>
  `
  targetBody.innerHTML += appendNote;

};

const addNote = document.querySelector('#add-note');
addNote.addEventListener('click', createNote)
