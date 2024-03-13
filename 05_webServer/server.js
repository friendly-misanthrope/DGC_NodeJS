// NodeJS Common Core modules
const http = require('http');
const path = require('path');
const fs  = require('fs');
const fsPromises = require('fs').promises;

// Custom/third-party modules
const logEvents = require('./logEvents');
const EventEmitter = require('events');

class Emitter extends EventEmitter {};

// Initialize emitter object
const myEmitter = new Emitter();

// Event emitter 
myEmitter.on('log', (msg, fileName) => {
  logEvents(msg, fileName);
});

// Set port
const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, res) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes('image') ?
        'utf8'
        : ''
    );
    const data = contentType === 'application/json' ? JSON.parse(rawData)
      : rawData;
    res.writeHead(
      filePath.includes('404.html') ? 404
        : 200,
      {'Content-Type': contentType}
      );
    res.end(
      contentType === 'application/json'
        ? JSON.stringify(data)
        : data
    );
  } catch(e) {
    console.error(e);
    myEmitter.emit('log', `${e.name}: ${e.message}`, 'errLog.txt');
    res.statusCode = 500;
    res.end();
  }
}

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');
  const extension = path.extname(req.url);

  let contentType;
  switch(extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    default:
      contentType = 'text/html';
  }

  let filePath =
    contentType === 'text/html' && req.url === '/'
      ? path.join(__dirname, 'views', 'index.html')
      : contentType === 'text/html' && req.url.slice(-1) === '/'
        ? path.join(__dirname, 'views', req.url, 'index.html')
        : contentType === 'text/html'
          ? path.join(__dirname, 'views', req.url)
          : path.join(__dirname, req.url);

  // .html ext not required in browser if below is included:
  if (!extension && req.url.slice(-1) !== '/'){
    filePath += '.html';
  }

  const fileExists = fs.existsSync(filePath);
  if (fileExists) {
    // Serve the file
    serveFile(filePath, contentType, res);
  } else {
    // error/redirect/etc
    switch(path.parse(filePath).base){
      case 'old-page.html':
        res.writeHead(301, {'Location': './new-page.html'});
        res.end();
        break;

      case 'www-page.html':
        res.writeHead(301, {'Location': '/'});
        res.end();
        break;
      
      default:
        // Serve a 404 response
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);

    }
    console.log(path.parse(filePath));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});