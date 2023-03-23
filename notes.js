class Note {
  constructor(title = 'Sample Title', body = 'Sample Body', positionX = 20, positionY = 10) {
    this.title = title,
    this.body = body,
    this.positionX = positionX,
    this.positionY = positionY
  }

}

function createNote() {
  return new Note();
}

console.log(createNote())