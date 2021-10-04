const winston = require('express')
const expressWinston = require('express')

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.forma.json(),
})

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
})

module.exports = {
  requestLogger,
  errorLogger,
}
