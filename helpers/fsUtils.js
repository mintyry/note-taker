//require fs to read and write file
const fs = require('fs');
//require util module for promisifying
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
//promise promises to give you the result when you need it

//do we need this?
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
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
//race condition**


module.exports = { readFromFile, writeToFile, readAndAppend, readAndRemove };
