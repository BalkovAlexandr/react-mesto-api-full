const { ERROR_CODE_INTERNAL_SERVER_ERROR } = require('../errors/errors')

const handleErrors = (err, req, res, next) => {
  const { statusCode = ERROR_CODE_INTERNAL_SERVER_ERROR, message } = err
  res.status(statusCode)
    .send({
      message: statusCode === ERROR_CODE_INTERNAL_SERVER_ERROR
        ? 'На сервере произошла ошибка'
        : message,
    })
  next()
}

module.exports = handleErrors
