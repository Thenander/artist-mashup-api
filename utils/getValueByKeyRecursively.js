'use strict'

module.exports = function getValueByKeyRecursively(obj, inputKey) {
  let value = null
  try {
    for (const key in obj) {
      if (key === inputKey) {
        return obj[key]
      }
      if (obj[key] instanceof Object) {
        value = getValueByKeyRecursively(obj[key], inputKey)
        if (value) {
          break
        }
      }
    }
    return value
  } catch (error) {
    console.log(error)
  }
}
