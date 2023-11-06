//require express with router method in order to sort route handlers into here.
const router = require('express').Router();
//requires uuid file to give each json object a uuid.
const uuid = require('../helpers/uuid');
//requires utils folder with proper functions for getting, posting, deleting api notes
const { readFromFile, readAndAppend, readAndRemove } = require('../helpers/fsUtils');

//All routes are prepended with '/api/notes'

router.get('/', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => {
            res.json(JSON.parse(data))
        });
});

//.post() allows us to create, in this case, creates new notes
router.post('/', (req, res) => {
    // access title and text content from req.body, adds id to it.
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        id: uuid()
    };
    readAndAppend(newNote, './db/db.json');
    res.json(newNote);
});

//route handler to delete notes
router.delete('/:id', (req, res) => {
    readAndRemove(req.params.id, './db/db.json');
    res.json('note deleted!');
});

module.exports = router;