'use strict'

const express = require('express')
const musicRoutes = require('./routes/music')

const port = 3001

const app = express()

app.use(express.json()) // body-parser

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('User-Agent', 'CygniHomeTest/1.0.0 ( info@microlab.se )')
  res.setHeader('Content-Type', 'application/json')
  next()
})

app.use('/music', musicRoutes)

app.use((error, req, res, next) => {
  console.log(error)
  const status = error.statusCode || 500
  const message = error.message
  res.status(status).json({ message })
})

app.listen(port, () => {
  console.log(
    `— — — — — — — — — SERVER STARTED ON PORT ${port} — — — — — — — — —`
  )
})
