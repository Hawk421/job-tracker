// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  console.error(error)

  res.status(500).json({
    message: 'Internal server error',
  })
}

module.exports = errorHandler