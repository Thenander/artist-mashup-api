'use strict'

const apiCalls = require('../api/apiCalls')
const setPageAndLimitFromQuery = require('../utils/setPageAndLimitFromQuery')
const extractObjectFromList = require('../utils/extractObjectFromList')
const paginate = require('../utils/pagination')

/**
 * @param {Array} arr
 * @returns {Array}
 */
const getAllCoverArtUrls = async arr => {
  return await Promise.all(
    arr.map(async obj => {
      try {
        obj.image = await apiCalls.getSingleCoverArtUrl(obj.id)
        return obj
      } catch (error) {
        console.log('controllers: music: getAllCoverArtUrls', error)
        throw error
      }
    })
  )
}

/**
 * @param {Array} releases
 * @returns {Promise}
 */
const getAlbumInformation = async releases => {
  let res = []
  try {
    for (let i = 0; i < releases.length; i++) {
      const release = releases[i]
      if (release['primary-type'] === 'Album') {
        let obj = {
          title: release.title,
          id: release.id,
        }
        res.push(obj)
      }
    }
    const completeAlbumInformation = getAllCoverArtUrls(res)
    return completeAlbumInformation
  } catch (error) {
    console.log(error)
    throw error
  }
}

// Controllers
exports.getArtistByMbId = async (req, res, next) => {
  const OBJECT_TO_FIND = { type: 'wikidata' }
  const URL_TO_REMOVE = 'https://www.wikidata.org/wiki/'
  const { mbid } = req.params

  try {
    const { page, limit } = setPageAndLimitFromQuery(req.query)

    const musicBrainzData = await apiCalls.getArtistInfoAndRelationsById(mbid)
    const artistName = musicBrainzData.name || ''
    const wikiObject = extractObjectFromList(
      musicBrainzData.relations,
      OBJECT_TO_FIND
    )
    const wikiId = wikiObject.url.resource.replace(URL_TO_REMOVE, '')
    const artistSearchName = await apiCalls.getWikipediaSearchStringById(wikiId)
    const description = await apiCalls.getArtistInfoFromWikipediaByName(
      artistSearchName
    )
    const artistReleases = await apiCalls.getArtistReleasesById(
      mbid,
      limit,
      page
    )
    const totalReleasesCount = artistReleases['release-group-count']
    const albums = await getAlbumInformation(artistReleases['release-groups'])
    const pagination = paginate(totalReleasesCount, page, limit)
    const result = {
      mbid,
      artistName,
      description,
      albums,
      pagination,
    }

    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.getInformation = async (req, res, next) => {
  try {
    res.status(200).json({
      message:
        'To search the "Music artist mashup API", add an MBID (MusicBrainz Identifier). \n Ex: /music/artist/5700dcd4-c139-4f31-aa3e-6382b9af9032',
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
