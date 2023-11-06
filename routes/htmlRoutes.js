//just need the router sub-section of express
const router = require('express').Router();
//require path module from node, providing utilities for working with file and folder paths.
const path = require('path');

//display notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

module.exports = router;