const { describe, expect } = require('@jest/globals')

const {
  extractObjectFromList,
  getValueByKeyRecursively,
  paginate,
  setPageAndLimitFromQuery,
  ensureItemsAreBelowMax,
} = require('./index')

describe('Utils', () => {
  describe('Function: setPageAndLimitFromQuery', () => {
    test('should be defined', () => {
      expect(setPageAndLimitFromQuery).toBeDefined()
    })

    test('should be a function', () => {
      expect(setPageAndLimitFromQuery).toBeFunction()
    })

    test('when used without arguments - return a default object', () => {
      // Arrange
      const expected = { limit: 25, page: 1 }

      // Act
      const actual = setPageAndLimitFromQuery()

      // Assert
      expect(actual).toEqual(expected)
    })

    test('when used with strings instead of numbers - return a default object', () => {
      // Arrange
      const arg = { limit: 'shj', page: 'JohnDoe' }
      const expected = { limit: 25, page: 1 }

      // Act
      const actual = setPageAndLimitFromQuery(arg)

      // Assert
      expect(actual).toEqual(expected)
    })

    test('when used with stringified numbers instead of numbers - works as expected', () => {
      // Arrange
      const arg = { limit: '40', page: '3' }
      const expected = { limit: 40, page: 3 }

      // Act
      const actual = setPageAndLimitFromQuery(arg)

      // Assert
      expect(actual).toEqual(expected)
    })

    test('when used with one string and one number - returns default and number', () => {
      // Arrange
      const arg = { limit: 'test', page: 3 }
      const expected = { limit: 25, page: 3 }

      // Act
      const actual = setPageAndLimitFromQuery(arg)

      // Assert
      expect(actual).toEqual(expected)
    })

    test('when used with one number and one string - returns number and default', () => {
      // Arrange
      const arg = { limit: 10, page: 'test' }
      const expected = { limit: 10, page: 1 }

      // Act
      const actual = setPageAndLimitFromQuery(arg)

      // Assert
      expect(actual).toEqual(expected)
    })
  })

  describe('Function: ensureItemsAreBelowMax', () => {
    test('should be defined', () => {
      expect(ensureItemsAreBelowMax).toBeDefined()
    })

    test('should be a function', () => {
      expect(ensureItemsAreBelowMax).toBeFunction()
    })

    test('when used without argument - returns 100', () => {
      // Arrange
      const expected = 100

      // Act
      const actual = ensureItemsAreBelowMax()

      // Assert
      expect(actual).toEqual(expected)
    })

    test('when used with 25 as argument - returns 25', () => {
      // Arrange
      const expected = 25
      const arg = 25

      // Act
      const actual = ensureItemsAreBelowMax(arg)

      // Assert
      expect(actual).toEqual(expected)
    })

    test('when used with string as argument - returns 100', () => {
      // Arrange
      const expected = 100
      const arg = 'test'

      // Act
      const actual = ensureItemsAreBelowMax(arg)

      // Assert
      expect(actual).toEqual(expected)
    })

    test('when used with number larger than 100 as argument - returns 100', () => {
      // Arrange
      const expected = 100
      const arg = 2214

      // Act
      const actual = ensureItemsAreBelowMax(arg)

      // Assert
      expect(actual).toEqual(expected)
    })

    test('when used with an object arg - returns 100', () => {
      // Arrange
      const expected = 100
      const arg = { num: 2214 }

      // Act
      const actual = ensureItemsAreBelowMax(arg)

      // Assert
      expect(actual).toEqual(expected)
    })

    describe('- when used with invalid arguments...', () => {
      // Arrange
      const _getTestDataListForNumbers = () => {
        const n = 100
        const cases = [
          [50, 50],
          [150, n],
          ['', n],
          [{}, n],
          [[], n],
          [null, n],
          [undefined, n],
          [NaN, n],
          [() => {}, n],
        ]
        return cases
      }

      // Act + Assert
      test.each(_getTestDataListForNumbers())(
        'when used with %p as argument - returns %d',
        (arg, expected) => {
          expect(ensureItemsAreBelowMax(arg)).toEqual(expected)
        }
      )
    })
  })

  describe('Function: paginate', () => {
    test('should be defined', () => {
      expect(paginate).toBeDefined()
    })

    test('should be a function', () => {
      expect(paginate).toBeFunction()
    })

    test('when used without arguments - return an empty object', () => {
      expect(paginate()).toEqual({})
    })

    test('when used with 3 numbers as arguments - works as expected', () => {
      // Arrange
      const numberOfItems = 123
      const page = 4
      const limit = 25
      const expected = {
        currentPage: 4,
        hasNextPage: true,
        hasPreviousPage: true,
        lastPage: 5,
        limit: 25,
        nextPage: 5,
        numberOfItems: 123,
        previousPage: 3,
      }

      // Act
      const actual = paginate(numberOfItems, page, limit)

      // Assert
      expect(actual).toEqual(expected)
    })

    test('when used with 3 invalid arguments - returns an empty object', () => {
      // Arrange
      const numberOfItems = '123'
      const page = 'TEST'
      const limit = 25
      const expected = {}

      // Act
      const actual = paginate(numberOfItems, page, limit)

      // Assert
      expect(actual).toEqual(expected)
    })
  })

  describe('Function: getValueByKeyRecursively', () => {
    test('should be defined', () => {
      expect(getValueByKeyRecursively).toBeDefined()
    })

    test('should be a function', () => {
      expect(getValueByKeyRecursively).toBeFunction()
    })

    test('when used without arguments - returns null', () => {
      // Arrange
      const expected = null

      // Act
      const actual = getValueByKeyRecursively()

      // Assert
      expect(actual).toEqual(expected)
    })

    describe('- when used with invalid arguments...', () => {
      const _getTestDataList = () => {
        const cases = [
          [1, null],
          ['string', null],
          [NaN, null],
          [undefined, null],
          [null, null],
          [[], null],
          [{}, null],
          [() => {}, null],
          [Infinity, null],
        ]
        return cases
      }

      test.each(_getTestDataList())(
        'when used with %p - return %p',
        (arg, expected) => {
          expect(getValueByKeyRecursively(arg)).toEqual(expected)
        }
      )
    })

    test('when used with valid arguments - works as expected', () => {
      //Arrange
      const arg = {
        company: {
          name: 'The company',
          staff: [
            { ceo: 'John Doe' },
            { workers: [{ name: 'Jane Doe' }, { name: 'Another Doe' }] },
          ],
        },
      }
      const expected = [{ name: 'Jane Doe' }, { name: 'Another Doe' }]

      // Act
      const actual = getValueByKeyRecursively(arg, 'workers')

      // Assert
      expect(actual).toEqual(expected)
    })
  })
})
