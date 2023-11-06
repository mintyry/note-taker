//VARIABLES
//require the express module
const express = require('express');
//allows us to use the middleware to handle requests and responses; essentially makes the app.
const app = express();
//establish port number; default is 3000 if no other port # is generated.
const PORT = process.env.PORT || 3000;
//require fs in order to read and write files
const fs = require('fs');
//require path module from node, providing utilities for working with file and folder paths.
const path = require('path');
//requires uuid file to give each json object a uuid.
const uuid = require('./helpers/uuid');
//requires utils folder with proper functions for getting, posting, deleting api notes
const { readFromFile, readAndAppend, readAndRemove } = require('./helpers/fsUtils');


//APP.USE
//allows the middleware to know we're processing json and parses it into an array/object.
app.use(express.json());
// parsing of different types of data from req.body
app.use(express.urlencoded({ extended: true }));
// allows us to make paths for files that are in this folder.
app.use(express.static('public'));


//ROUTE HANDLERS
//route handler for notes made bc index.js specifies this path; leads sends notes.html(page) to client
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

//route handler for api/notes specified in index.js; promisified readFile allows complete reading of file before actions happen (sending back to client)
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => {
            res.json(JSON.parse(data))
        });
})

//.post() allows us to create, in this case, creates new notes
app.post('/api/notes', (req, res) => {
    // access title and text content from req.body, adds id to it.
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        id: uuid()
    };
    readAndAppend(newNote, './db/db.json');
    res.json(newNote);
})

//route handler to delete notes
app.delete('/api/notes/:id', (req, res) => {
    readAndRemove(req.params.id, './db/db.json');
    res.json('note deleted!');
});


//method covers get, post, update, delete, etc. using * wildcard is saying for any route that isnt any of the above (which is why it's all the way down here), send them back to the homepage.
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// listens for events in the app and has the app run
app.listen(PORT, () => console.log(`app running at http://localhost:${PORT}`))