'use strict'

const { getResponseTime } = require('../utils')

const reset = '\x1b[0m'
const bright = '\x1b[1m'
const dim = '\x1b[2m'
const underscore = '\x1b[4m'
const blink = '\x1b[5m'
const reverse = '\x1b[7m'
const hidden = '\x1b[8m'

// Foreground colors
const black = '\x1b[30m%s\x1b[0m' // with reset
const red = '\x1b[31m%s%s\x1b[0m' // with reset
const green = '\x1b[32m%s\x1b[0m' // with reset
const yellow = '\x1b[33m%s\x1b[0m' // with reset
const blue = '\x1b[34m%s\x1b[0m' // with reset
const magenta = '\x1b[35m%s\x1b[0m' // with reset
const cyan = '\x1b[36m%s\x1b[0m' // with reset
const white = '\x1b[37m%s\x1b[0m' // with reset

// Background colors
const bgBlack = '\x1b[40m'
const bgRed = '\x1b[41m'
const bgGreen = '\x1b[42m'
const bgYellow = '\x1b[43m'
const bgBlue = '\x1b[44m'
const bgMagenta = '\x1b[45m'
const bgCyan = '\x1b[46m'
const bgWhite = '\x1b[47m'

module.exports = class Log {
  constructor() {}
  error = obj => {
    const date = new Date()
    console.log(red, `[${date}]`, obj)
  }

  info = obj => {
    const date = new Date()
    console.log(blue, `[${date}]`, obj)
  }
}
