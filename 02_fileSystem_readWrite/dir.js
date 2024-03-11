//* Creating a new directory
const fs = require('fs');
const path = require('path');



//* Only create directory if it doesn't already exist
if (!fs.existsSync(path.join(__dirname, 'new'))) {
  fs.mkdir(path.join(__dirname, 'new'), (err) => {
    if (err) throw err;
    console.log('Directory created');
  });
}

// //* Deleting a directory if it exists
if (fs.existsSync(path.join(__dirname, 'new'))) {
  fs.rmdir(path.join(__dirname, 'new'), (err) => {
    if (err) throw err;
    console.log('Directory removed successfully.');
  });
}



