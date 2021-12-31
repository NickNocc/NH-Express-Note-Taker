const express = require('express');
// Importing function from other file
const { createNewNote } = require('./lib/notes');
// Importing database
const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Get api notes
app.get('/api/notes', (req, res) => {
    let results = notes.noteArray;
    res.json(results);
});
// Post notes to database
app.post('/api/notes', (req, res) => {
    let notes2 = notes.noteArray;
    req.body.id = notes2.length.toString();
    // Need a function to turn the info into a an object
    const newNote = createNewNote(req.body, notes2);
    res.json(newNote);
});

// Brings to notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
// Wildcard to redirect if the wrong query is inputted
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});
// Deletes notes by finding the note's id then splicing it from the database array
app.delete('/api/notes/:id', (req, res) => {
    let notes2 = notes.noteArray;
    const itemIndex = notes2.findIndex(({ id }) => id === req.params.id);
    if (itemIndex >= 0) {
      notes.noteArray.splice(itemIndex, 1);
    }
    res.send(`${req} has been deleted`);
})

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
