const { format } = require("date-fns");

//* Syntax for aliasing - import v4 as uuid 
const { v4: uuid } = require('uuid');

console.log(format(new Date(), "yyyyMMdd\thh:mm:ss"));

console.log(uuid());
