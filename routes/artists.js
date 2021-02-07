'use strict'

const express = require('express')

const artistsController = require('../controllers/artistsController')
const { getArtistByMbId, getArtists, getMusicIndex } = artistsController

const router = express.Router()

// GET
router.get('/artists/:mbid', getArtistByMbId)
router.get('/artists/', getArtists)
router.get('/', getMusicIndex)

module.exports = router
