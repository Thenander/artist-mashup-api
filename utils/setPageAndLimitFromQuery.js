'use strict'

module.exports = function setPageAndLimitFromQuery(query) {
  const MAX_ITEMS_PER_PAGE = 100
  const DEFAULT_ITEMS_PER_PAGE = 25

  let page
  let limit

  try {
    const ensureItemsAreBelowMax = items =>
      isNaN(items) || items > MAX_ITEMS_PER_PAGE ? MAX_ITEMS_PER_PAGE : items

    // return object
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
