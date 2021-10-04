const { ERROR_CODE_UNAUTHORIZED } = require('./errors')

class AuthError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = ERROR_CODE_UNAUTHORIZED
  }
}

module.exports = AuthError
