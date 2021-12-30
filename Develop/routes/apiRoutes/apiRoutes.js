const router = require('express').Router();
const { notes } = require('../../db/db.json');

router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    console.log(req.body);
    // Need a function to turn the info into a an object
    // const newNote = createNewNote(req.body, notes);
    // res.json(newNote);
})

module.exports = router;