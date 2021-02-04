'use strict'

module.exports = function paginate(numberOfItems, page, limit) {
  if (
    !numberOfItems ||
    !page ||
    !limit ||
    !Number.isInteger(numberOfItems) ||
    !Number.isInteger(page) ||
    !Number.isInteger(limit)
  ) {
    return {}
  }

  return {
    numberOfItems,
    currentPage: page,
    hasNextPage: limit * page < numberOfItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(numberOfItems / limit),
    limit,
  }
}
