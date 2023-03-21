function moveThings() {

  const notes = document.querySelectorAll('.anote');

  notes.forEach(note => {
    note.addEventListener('mousedown', dragNote)
  })

  function dragNote(e) {
    console.log(e.target)
    e.target.onmousemove = () => {
      console.log('moving');
    };
    e.target.onmouseup = () => {
      e.target.onmousemove = null;
      e.target.onmouseup = null;
      console.log('stopped moving');
    };
  };
};

moveThings();