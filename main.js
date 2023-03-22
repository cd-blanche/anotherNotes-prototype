function load() {
  const notes = document.querySelectorAll('.anote');
  const noteBody = document.querySelectorAll('.anote-body');
  const noteTitle = document.querySelectorAll('.anote-title');
  const position = JSON.parse(localStorage.note_position);

  

  notes.forEach(note => {
    note.addEventListener('input', saveNote);
    
    note.addEventListener('mousedown', dragNote)
    // code to fetch and set position of previously saved notes
    // -------------------------
    note.style.top = `${position.notePosY}px`
    note.style.left = `${position.notePosX}px`
    // -------------------------
    // code to save note title and body 
  });

  noteBody.forEach((body, index) => {
    body.textContent = 'Sample Body';
  });
  noteTitle.forEach((title, index) => {
    title.textContent = 'Sample Title'
  });

};
// function to drag note
function dragNote(e) {
  let notePosX;
  let notePosY;

  document.onmousemove = (event) => {
    notePosX = event.x - e.layerX;
    notePosY = event.y - e.layerY;
    e.target.parentNode.style.left = `${notePosX}px`
    e.target.parentNode.style.top = `${notePosY}px`
  };
  document.onmouseup = () => {
    // save position to localStorage
    // -------------------------
    localStorage.setItem('note_position', JSON.stringify(
      {
        'notePosX': notePosX,
        'notePosY': notePosY,
      }
    ));
    // -------------------------
    document.onmousemove = null;
    document.onmouseup = null;
    console.log('stopped moving');
  };
};
// function to save title and body
function saveNote(e) {
  console.log(e.target.textContent);
};

load();

console.log(localStorage)

/*
  anote Object
  {
    'anotes': {
      'id(numeric value)': {
        'id': // note id
        'title': // note title,
        'body': // note body,
        'notePosX: // note position x,
        'notePosY': // note position Y,
      },
      'id(numerc value)': {
        'id': // note
        'title': // note title,
        'body': // note body,
        'notePosX: // note position x,
        'notePosY': // note position Y,
      }
    }
  }


*/