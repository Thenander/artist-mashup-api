'use strict'

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`)
  error.status = 404
  next(error)
}

const errorHandler = (error, req, res, next) => {
  const status = error.status || 500
  res.status(status).json({ message: error.message })
}

module.exports = { notFoundHandler, errorHandler }
