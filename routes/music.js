'use strict'

const express = require('express')

const musicController = require('../controllers/musicController')
const { getArtistByMbId, getInformation, getIndex } = musicController

const router = express.Router()

// GET
router.get('/artist/:mbid', getArtistByMbId)
router.get('/artist/', getInformation)
router.get('/', getIndex)

module.exports = router
