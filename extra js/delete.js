app.delete('/api/notes/:id/', (req, res) => {
    console.log(req.params.id);
    // const existingNotes = require('./db/db.json');
   
    const existingNotes =JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    console.log(existingNotes, 'existing notes');
    const notesAfterDeletion = existingNotes.filter((notes) => notes.id !== req.params.id); // how does url even get the id to begin with?
    console.log(notesAfterDeletion, 'notes after deletion');
    // console.log(typeof id); //how can i console log when errors prevent anything from happening? **
    fs.writeFileSync('./db/db.json', JSON.stringify(notesAfterDeletion, null, 2)
    );
   const updatedDb = fs.readFileSync('./db/db.json', 'utf-8');
   console.log(updatedDb, 'updated db');
   res.json({ok:true});
});