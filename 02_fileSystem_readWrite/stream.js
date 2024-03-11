//* For larger files, we may not want to read or write all the data at once.
// In this case, we can read and write using a 'stream'.
// This is much more efficient and is a better practice than reading or writing
// large files all at once.

const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname, 'files', 'lorem.txt'), {encoding: 'utf-8'});
const ws = fs.createWriteStream(path.join(__dirname, 'files', 'new-lorem.txt'));

//! Deprecated, use rs.pipe() instead
// rs.on('data', (dataChunk) => {
//   ws.write(dataChunk);
// });


rs.pipe(ws);