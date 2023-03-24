function load() {
  const notes = document.querySelectorAll('.anote');
  const noteBody = document.querySelectorAll('.anote-body');
  const noteTitle = document.querySelectorAll('.anote-title');
  const position = (localStorage.notePosition) ? JSON.parse(localStorage.notePosition) : {};

  

  notes.forEach(note => {
    let notePosX = position.previousX || 20;
    let notePosY = position.previousY || 20;

    note.addEventListener('input', saveNote);
    note.addEventListener('mousedown', dragNote)
    // code to fetch and set position of previously saved notes
    note.style.top = `${notePosY}px`
    note.style.left = `${notePosX}px`
    // code to fetch and set title and body of previously saved notes
    // ...
  });

  noteBody.forEach((body, index) => {
    // body.textContent = 'Sample Body';
  });
  noteTitle.forEach((title, index) => {
    // title.textContent = 'Sample Title'
  });

};
// function to drag note
function dragNote(e) {
  document.onmousemove = (event) => {
    notePosX = event.x - e.layerX;
    notePosY = event.y - e.layerY;
    e.target.parentNode.style.left = `${notePosX}px`
    e.target.parentNode.style.top = `${notePosY}px`
  };
  document.onmouseup = () => {
    // save position to localStorage
    // -------------------------
    localStorage.setItem('notePosition', JSON.stringify(
      {
        'previousX': notePosX,
        'previousY': notePosY,
      }
    ));
    console.log(notePosX, notePosY)
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

console.log(localStorage.notePosition)

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