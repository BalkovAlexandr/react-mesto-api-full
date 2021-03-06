/* eslint-disable linebreak-style */
const CORS_WHITELIST = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://balkov.mesto.students.nomoredomains.club',
  'https://balkov.mesto.students.nomoredomains.club',
]

const corsOption = {
  credentials: true,
  origin: function checkCorsList(origin, callback) {
    if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}

module.exports = corsOption
