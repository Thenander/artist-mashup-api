'use strict'

/**
 * @param {Array} list
 * @param {object} searchObj
 * @returns {object}
 */
module.exports = function extractObjectFromList(list, searchObj) {
  const key = Object.keys(searchObj)[0]
  try {
    return list.find(obj => obj[key] === searchObj[key]) || null
  } catch (error) {
    console.log(error)
    throw error
  }
}
