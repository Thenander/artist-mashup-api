'use strict'

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`)
  error.statusCode = 404
  next(error)
}

const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500
  res.status(statusCode).json({ message: error.message })
}

module.exports = { notFoundHandler, errorHandler }
