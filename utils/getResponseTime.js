'use strict'

let START_TIME = 0
let STOP_TIME = 0

const _stopWatch = date => {
  let elapsedTime = 0

  if (START_TIME === 0) START_TIME = date
  else STOP_TIME = date

  if (START_TIME !== 0 && STOP_TIME !== 0) {
    elapsedTime = STOP_TIME - START_TIME
    START_TIME = 0
    STOP_TIME = 0
  }

  return elapsedTime
}

module.exports = function getResponseTime(date) {
  const elapsed = _stopWatch(date)
  return elapsed ? `Server response time: ${elapsed} ms` : ''
}
