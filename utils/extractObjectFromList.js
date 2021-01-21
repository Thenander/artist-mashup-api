'use strict'

/**
 * @param {Array} list
 * @param {object} searchObj
 * @returns {object}
 */
module.exports = function extractObjectFromList(list, searchObj) {
  const keys = Object.keys(searchObj)
  try {
    let found = null
    for (const key of keys) {
      found = list.find(obj => obj[key] === searchObj[key])
      if (found) {
        break
      }
    }
    return found
  } catch (error) {
    console.log(error)
    throw error
  }
}
