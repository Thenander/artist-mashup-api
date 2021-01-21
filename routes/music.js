'use strict'

const express = require('express')

const musicController = require('../controllers/music')

const router = express.Router()

// GET /music/artist/:id
router.get('/artist/:mbid', musicController.getArtistByMbId)
router.get('/artist/', musicController.getInformation)

module.exports = router
