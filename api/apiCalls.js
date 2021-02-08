'use strict'

const axios = require('axios')
const { getValueByKeyRecursively } = require('../utils')
const Log = require('../server/Log')

const log = new Log()

const MUSIC_BRAINZ_API = 'http://musicbrainz.org/ws/2'
const WIKIDATA_API = 'https://www.wikidata.org/w/api.php'
const WIKIPEDIA_API = 'https://en.wikipedia.org/w/api.php'
const COVER_ART_ARCHIVE_API = 'http://coverartarchive.org'

const OPTIONS = {
  headers: {
    'User-Agent': 'CygniHomeTest/1.0.0 ( info@microlab.se )',
    'Content-Type': 'application/json',
  },
}

const _isIterable = obj => {
  if (obj === null || obj === undefined) {
    return false
  }
  return typeof obj[Symbol.iterator] === 'function'
}

/**
 * @param {Array} images
 * @returns {string} url or empty string
 */
const getImageUrl = images => {
  try {
    if (_isIterable(images)) {
      for (const element of images) {
        if (element.front) {
          return element.image ? element.image : ''
        }
      }
    }
    return ''
  } catch (error) {
    throw error
  }
}

/**
 * @param {string} id
 * @returns {Promise}
 */
const getSingleCoverArtUrl = async id => {
  const releaseGroup = 'release-group'
  const url = COVER_ART_ARCHIVE_API + '/' + releaseGroup + '/' + id

  try {
    const res = await axios.get(url, OPTIONS)
    const result = getImageUrl(res.data.images)
    return result
  } catch (error) {
    let err
    if (error.isAxiosError) {
      err = new Error(error.response.statusText)
      err.statusCode = error.response.status
      if (err.statusCode === 404) {
        return null
      }
    } else {
      err = new Error('Unknown error')
      err.statusCode = 500
    }
    throw err
  }
}

/**
 * @param {string} id
 * @returns {Promise}
 */
const getArtistInfoAndRelationsById = async id => {
  const jsonFormat = 'fmt=json'
  const urlRelations = 'inc=url-rels'
  const queryString = [jsonFormat, urlRelations].join('&')
  const query = '?' + queryString
  const url = MUSIC_BRAINZ_API + '/artist/' + id + query

  try {
    const res = await axios.get(url, OPTIONS)
    return res.data
  } catch (error) {
    const err = new Error(error.response.statusText)
    err.statusCode = error.response.status
    throw err
  }
}

/**
 * @param {string} id
 * @returns {Promise}
 */
const getArtistReleasesById = async (id, limit, page) => {
  const calculateOffset = (page - 1) * limit
  const jsonFormat = 'fmt=json'
  const pageLimit = 'limit=' + limit
  const offset = 'offset=' + calculateOffset
  const artistId = 'artist=' + id
  const queryString = [jsonFormat, pageLimit, offset, artistId].join('&')
  const query = '?' + queryString
  const url = MUSIC_BRAINZ_API + '/release-group/' + query

  try {
    const res = await axios.get(url, OPTIONS)
    return res.data
  } catch (error) {
    const err = new Error(error.response.statusText)
    err.statusCode = error.response.status
    throw err
  }
}

/**
 * @param {string} id
 * @returns {Promise}
 */
const getWikipediaSearchStringById = async id => {
  const action = 'action=wbgetentities'
  const wikiId = 'ids=' + id
  const format = 'format=json'
  const props = 'props=sitelinks'
  const queryString = [action, wikiId, format, props].join('&')
  const query = '?' + queryString
  const url = WIKIDATA_API + query

  try {
    const res = await axios.get(url, OPTIONS)
    if (res.data.error) {
      const error = new Error(res.data.error.info)
      error.statusCode = res.data.error.code === 'no-such-entity' ? 400 : 500
      throw error
    }
    const { enwiki } = res.data.entities[id].sitelinks
    return enwiki ? enwiki.title : null
  } catch (error) {
    const err = new Error(error.response.statusText)
    err.statusCode = error.response.status
    throw err
  }
}

/**
 * @param {string} name
 * @returns {Promise}
 */
const getArtistInfoFromWikipediaByName = async name => {
  const action = 'action=query'
  const exintro = 'exintro=true'
  const format = 'format=json'
  const prop = 'prop=extracts'
  const redirects = 'redirects=true'
  const titles = 'titles=' + encodeURI(name)
  const queryString = [action, exintro, format, prop, redirects, titles].join(
    '&'
  )
  const query = '?' + queryString
  const url = WIKIPEDIA_API + query

  try {
    const res = await axios.get(url, OPTIONS)
    const artistInfo = getValueByKeyRecursively(res.data.query, 'extract') || ''
    return artistInfo
  } catch (error) {
    const err = new Error(error.response.statusText)
    err.statusCode = error.response.status
    throw err
  }
}

module.exports = {
  getImageUrl,
  getSingleCoverArtUrl,
  getArtistInfoAndRelationsById,
  getArtistReleasesById,
  getWikipediaSearchStringById,
  getArtistInfoFromWikipediaByName,
}
