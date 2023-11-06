//require fs to read and write file
const fs = require('fs');
//require util module for promisifying
const util = require('util');

// Promise version of fs.readFile
//wait until something happens and then .then()
const readFromFile = util.promisify(fs.readFile);
//promise promises to give you the result when you need it
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
// passing in the path destination and content to the writeToFile function
const writeToFile = (destination, content) =>
// write file to destination; the data is stringified content since fs handles strings
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} notes, deleteNote ; The content you want to append to the file.
 *  @param {string} filePath The path to the file you want to save to.
 *  @returns {void} Nothing
 */

const readAndAppend = (notes, filePath) => {
  fs.readFile(filePath, 'utf8', (err, addNote) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(addNote);
      parsedData.push(notes);
      writeToFile(filePath, parsedData);
    }
  });
};

// read file, and then we compare to essentially omit whatever note that has an id that matches req.params.id, then rewrite it
const readAndRemove = (deleteNote, filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      const result = parsedData.filter(note => note.id !== deleteNote );
      writeToFile(filePath, result);
    }
  });
};


// export necessary functions
module.exports = { readFromFile, writeToFile, readAndAppend, readAndRemove };
