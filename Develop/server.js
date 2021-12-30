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
    let results = notes;
    res.json(results);
});
// Post notes to database
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    console.log(req.body);
    // Need a function to turn the info into a an object
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
