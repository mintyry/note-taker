//ask Diarmuid about notes link; make route handler or change html
//ask about how server.js knows whats body is
//stringify err, throw err

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const uuid = require('./helpers/uuid');

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static('public'));

// GET * should return the index.html file. **We dont need to do this since it's handled by public, correct?

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    const existingNotes = require('./db/db.json');
    res.json(existingNotes);
})

//needs to add uuid to each note
app.post('/api/notes', (req, res) => {
    const existingNotes = require('./db/db.json');
    const { title, text } = req.body;

    // // If all the required properties are present
    // if (title && text) {
    //   // Variable for the object we will save
    //   const newNote = {
    //     title,
    //     text,
    //     note_id: uuid(),
    //   };

    //   readAndAppend(newNote, './db/db.json');
    
    existingNotes.push(req.body) //body is baked in; part of http requests; one of the properties of req for POST
    fs.writeFile('./db/db.json', JSON.stringify(existingNotes, null, 2), err => { //fs needs to take in string
        if(err){
            console.log(err)
        } else {
            console.log('Note saved!');
            res.status(201).end(); //similar to json, send, sendFile; let front end know you dont have to keep waiting
            //route handlers always have to have response; knew to use end bc connection needs to end for functions to run
        }
    })
})



app.listen (PORT, () => console.log(`app running at http://localhost:${PORT}`))