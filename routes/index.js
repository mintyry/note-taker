//this file is like a table of contents
const router = require('express').Router();
const htmlRoutes = require('./htmlRoutes');
const apiRoutes = require('./apiRoutes');
//require path module from node, providing utilities for working with file and folder paths.
const path = require('path');

//to connect back to those files and their handlers/functions
router.use('/', htmlRoutes);
router.use('/api/notes', apiRoutes);

//method covers get, post, update, delete, etc. using * wildcard is saying for any route that isnt any of the above (which is why this is at the end), send them back to the homepage.
router.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router;