function load() {
  const notes = document.querySelectorAll('.anote');

  notes.forEach(note => {
    note.addEventListener('mousedown', dragNote)
  });
};
function dragNote(e) {
  document.onmousemove = (event) => {
    e.target.parentNode.style.top = `${event.y - e.layerY}px`
    e.target.parentNode.style.left = `${event.x - e.layerX}px`
  };
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    console.log('stopped moving');
  };
};
load();