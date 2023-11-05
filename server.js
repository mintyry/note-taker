//**stringify err, throw err

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

//router handler for api/notes specified in index.js; require/read file from db.json and simply send it back out and display to client
app.get('/api/notes', (req, res) => {
    const existingNotes = require('./db/db.json');
    res.json(existingNotes);
 })
 
 app.post('/api/notes', (req, res) => {
    // require db.json so we have the content
    const existingNotes = require('./db/db.json');
    // take what client sends to us, specifically what's in title and text
    const { title, text } = req.body;
 
    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            id: uuid(),
        };
        console.log(newNote);
 
        existingNotes.push(newNote) //body is baked in; part of http requests; one of the properties of req for POST
        console.log(existingNotes);
        fs.writeFile('./db/db.json', JSON.stringify(existingNotes, null, 2), err => { //fs needs to take in string
            if (err) {
                console.log(err)
            } else {
                console.log('Note saved!');
                res.status(201).end(); //similar to json, send, sendFile; let front end know you dont have to keep waiting
                //route handlers always have to have response; knew to use end bc connection needs to end for functions to run
            }
        })
    }
 })
 
 
 app.delete('/api/notes/:id', (req, res) => {
     // console.log(req.params.id);
     // const existingNotes = require('./db/db.json');
    
     const existingNotes =JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
     // console.log(existingNotes, 'existing notes');
     const notesAfterDeletion = existingNotes.filter((notes) => notes.id !== req.params.id); // how does url even get the id to begin with?
     // console.log(notesAfterDeletion, 'notes after deletion');
     fs.writeFileSync('./db/db.json', JSON.stringify(notesAfterDeletion, null, 2)
     );
    const updatedDb = fs.readFileSync('./db/db.json', 'utf-8');
 //    console.log(updatedDb, 'updated db');
    res.json({ok:true});
 });



//method covers get, post, update, delete, etc. using * wildcard is saying for any route that isnt any of the above (which is why it's all the way down here), send them back to the homepage.
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})


app.listen(PORT, () => console.log(`app running at http://localhost:${PORT}`))