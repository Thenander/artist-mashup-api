'use strict'

const express = require('express')
const { artistsRoutes, indexRoute } = require('./routes')
const { notFoundHandler, errorHandler } = require('./server/errorHandlers')

const port = 3001

const app = express()

app.use('/music', artistsRoutes)
app.use('/', indexRoute)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(
    `— — — — — — — — — SERVER STARTED ON PORT ${port} — — — — — — — — —`
  )
})
