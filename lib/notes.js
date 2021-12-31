const fs = require('fs');
const path = require('path');

function createNewNote(body, noteArray) {
    const newNote = body;
    noteArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ noteArray }, null, 2)
    )
};

function deleteNote(array, id) {
    if (id >= 0) {
      array.splice(id, 1);
      let noteArray = array
      fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ noteArray }), null, 2)
    }
}

module.exports = { createNewNote, deleteNote };