
const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

// initialize emitter object
const myEmitter = new MyEmitter();

// add listener to log event when triggered
myEmitter.on('log', (msg) => {
  logEvents(msg);
});

setTimeout(() => {
  myEmitter.emit('log', 'Log event emitted.')
}, 2000);