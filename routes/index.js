//this file is like a table of contents
const router = require('express').Router();
const htmlRoutes = require('./htmlRoutes');
const apiRoutes = require('./apiRoutes');
const path = require('path');

router.use('/', htmlRoutes);
router.use('/api/notes', apiRoutes);

//method covers get, post, update, delete, etc. using * wildcard is saying for any route that isnt any of the above (which is why it's all the way down here), send them back to the homepage.
router.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = router;