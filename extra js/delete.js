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

//____

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

//router handler for api/notes specified in index.js; require/read file from db.json and simply send it back out and display to client
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => {
            res.json(JSON.parse(data))
        });
})

//.post() allows us to create, in this case, creates new notes
app.post('/api/notes', (req, res) => {
    const newNote = {
        title:req.body.title, 
        text:req.body.text, 
        id:uuid()
    };
    readAndAppend(newNote, './db/db.json');
    res.json(newNote);
})


app.delete('/api/notes/:id', (req, res) => {
    readAndRemove(req.params.id, './db/db.json');
    res.json('note deleted!');
});