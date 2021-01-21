'use strict'

module.exports = function paginate(numberOfItems, page, limit) {
  return {
    numberOfItems,
    currentPage: page,
    hasNextPage: limit * page + limit < numberOfItems,
    hasPreviousPage: page > 1,
    nextPage: page + 1,
    previousPage: page - 1,
    lastPage: Math.ceil(numberOfItems / limit) - 1,
    limit,
  }
}
