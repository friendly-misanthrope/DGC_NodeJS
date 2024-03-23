// CORS whitelist
const allowedDomains = ['https://localhost:3500', 'http://localhost:3500'];

const corsOptions = {
  origin: (reqOrigin, cb) => {
    !reqOrigin || allowedDomains.indexOf(reqOrigin) !== -1 ?
      cb(null, true)
      : cb(new Error('CORS policy has blocked this request'));
  },
  optionsSuccessStatus: 200
}

module.exports = corsOptions;