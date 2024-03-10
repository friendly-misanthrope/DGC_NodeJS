// NODEJS TUTORIAL 1, DAVE GRAY CODES

// Differences between NodeJS and Vanilla JS:
// 1.) Node runs on a server instead of in a browser.

// 2.) The terminal window is our console:
console.log("Hello World");

// There's a global object instead of a window object, which is much smaller.
console.log(global);

// 4.) NodeJS has common core modules that we will explore

// 5.) We will use CommonJS modules instead of ES6 modules (import vs require):
const os = require('os');
const path = require('path');

console.log(os.type())
console.log(os.version());
console.log(os.homedir());

// Other values available in NodeJS
// Get full current working directory:
console.log(__dirname);

// Get file name:
console.log(__filename);

// Get base name (name without full path):
console.log(path.basename(__filename));

console.log();

// Get file extension name:
console.log(path.extname(__filename));

// We can get all of the above values using the parse() method,
// which returns an object with all of these values:
console.log(path.parse(__filename));

// SEE math.js FOR CREATING & EXPORTING CUSTOM MODULES

// Importing and using our custom module
const math = require('./math');

console.log(math.add(1,1));