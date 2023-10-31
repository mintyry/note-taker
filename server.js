//ask Diarmuid about notes link; make route handler or change html
//ask about how server.js knows whats body is
//stringify err, throw err

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/api/notes', (req, res) => {
    const existingNotes = require('./db/db.json');
    res.json(existingNotes);
})

app.post('/api/notes', (req, res) => {
    const existingNotes = require('./db/db.json');
    const newNotes = existingNotes.push(req.body)
    fs.writeFile('./db/db.json', newNotes, ()=>{
        if(err){
            console.log(err)
        } else {
            console.log('Note saved!')
        }
    })
})



app.listen (PORT, () => console.log(`app running at http://localhost:${PORT}`))