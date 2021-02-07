'use strict'

const MAX_ITEMS_PER_PAGE = 100
const DEFAULT_ITEMS_PER_PAGE = 25

function ensureItemsAreBelowMax(items) {
  if (Math.sign(items) < 0) {
    return 0
  }
  if (Number.isInteger(items)) {
    if (items < 1) {
      return 0
    } else if (items < 100 && items > 0) {
      return items
    }
  } else {
    return DEFAULT_ITEMS_PER_PAGE
  }
  return MAX_ITEMS_PER_PAGE
}

function setPageAndLimitFromQuery(query) {
  let page
  let limit

  try {
    if (query) {
      const pageLimit = Number(query.limit)
      page = Number(query.page) || 1
      limit = pageLimit
        ? ensureItemsAreBelowMax(pageLimit)
        : DEFAULT_ITEMS_PER_PAGE
    } else {
      page = 1
      limit = DEFAULT_ITEMS_PER_PAGE
    }
    return { page, limit }
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = { ensureItemsAreBelowMax, setPageAndLimitFromQuery }
