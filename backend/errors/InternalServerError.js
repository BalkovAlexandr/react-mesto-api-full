const { ERROR_CODE_INTERNAL_SERVER_ERROR } = require('./errors')

class InternalServerError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = ERROR_CODE_INTERNAL_SERVER_ERROR
  }
}

module.exports = InternalServerError
