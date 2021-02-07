'use strict'

const express = require('express')

const router = express.Router()

// GET
router.get('/', (req, res, next) => {
  try {
    res.status(200).json({
      message:
        'Nothing here, sorry. To search the "Music artist mashup API", add an MBID (MusicBrainz Identifier). \n Ex: /music/artists/5700dcd4-c139-4f31-aa3e-6382b9af9032',
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router
