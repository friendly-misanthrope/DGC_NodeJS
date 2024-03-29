// 3rd party packages
const { format } = require("date-fns");
const { v4: uuid } = require('uuid');

// CommonJS core modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// Async event logger
const logEvents = async (message) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\thh:mm:ss")}`;
  // Log each item
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  console.log(logItem);
  try {
    if (!fs.existsSync(path.join(__dirname, 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, 'logs'));
    }
    await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem)
  } catch(err) {
    console.error(err);
  }
}

module.exports = logEvents;