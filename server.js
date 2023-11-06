//VARIABLES
//require the express module
const express = require('express');
//allows us to use the middleware to handle requests and responses; essentially makes the app.
const app = express();
//require path module from node, providing utilities for working with file and folder paths.
const path = require('path');
//establish port number; default is 3000 if no other port # is generated.
const PORT = process.env.PORT || 3000;
// intialized in otder to call in app.use to access all route folders
const routes = require('./routes');


//APP.USE
//allows the middleware to know we're processing json and parses it into an array/object.
app.use(express.json());
// parsing of different types of data from req.body
app.use(express.urlencoded({ extended: true }));
// allows us to make paths for files that are in this folder.
app.use(express.static('public'));
app.use('/', routes);


//ROUTE HANDLERS
//route handler for notes made bc index.js specifies this path; leads sends notes.html(page) to client


//route handler for api/notes specified in index.js; promisified readFile allows complete reading of file before actions happen (sending back to client)





// listens for events in the app and has the app run
app.listen(PORT, () => console.log(`app running at http://localhost:${PORT}`))