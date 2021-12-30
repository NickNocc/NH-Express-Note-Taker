const express = require('express');
const { createNewNote } = require('./lib/notes');
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


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
