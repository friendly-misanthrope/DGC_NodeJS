// READING A FILE:
const fs = require('fs');
const path= require('path');

// fs.readFile() takes the file's relative path,
// data encoding method, and a callback function 
// with error and data parameters.

// Use the path module when doing this to avoid errors that can occur when
// the file path is hard-coded:
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
})

//! Per documentation For all FS methods:
// Log uncaught errors and immediately end process when uncaught exception occurs:
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
}) 

// NodeJS methods operate asynchronously, so the following will finish executing
// before the read operation above:
console.log("Hello........");


// WRITING TO A FILE (creates file if it doesn't already exist)
// Instead of encoding method, writeFile takes the value to be written to the file:
    //* fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), "Nice to meet you, Nick", (err) => {
    //*     if (err) throw err;
    //*     console.log('Writing operation complete');
    //* })

// APPENDING A FILE (creates file if it doesn't already exist)
// Append is almost identical to write, except it will add a value to an existing file.
    //* fs.appendFile(path.join(__dirname, 'files', 'test.txt'), 'Testing appendFile', (err) => {
    //*     if (err) throw err;
    //*     console.log('Append operation complete');
    //* })


// WRITING TO A FILE AND THEN APPENDING
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you.', (err) => {
    if (err) throw err;
    console.log('Write operation complete');

    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\nNice to meet you as well.', (err) => {
        if (err) throw err;
        console.log('Append operation complete');
        // Renaming a file after appending value
        fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
            if (err) throw err;
            console.log('Re-naming operation complete.');
        })
    })
})