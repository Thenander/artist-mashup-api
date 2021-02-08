const { describe, expect } = require('@jest/globals')
const { getImageUrl } = require('./apiCalls')

describe('apiCalls', () => {
  describe('getImageUrl', () => {
    test('should be defined', () => {
      expect(getImageUrl).toBeDefined()
    })

    test('should be a function', () => {
      expect(getImageUrl).toBeFunction()
    })

    test('when used without arguments - returns empty string', () => {
      // Arrange
      const expected = ''

      // Act
      const actual = getImageUrl()

      // Assert
      expect(actual).toEqual(expected)
    })

    describe('when used with "faulty" arguments - returns an empty string', () => {
      // Arrange
      const cases = [
        [-1, ''],
        [1, ''],
        ['1', ''],
        ['test', ''],
        [{}, ''],
        [[], ''],
        [null, ''],
        [undefined, ''],
        [NaN, ''],
        [() => {}, ''],
      ]

      // Act / Assert
      test.each(cases)(
        'when used with %p as argument - returns %p',
        (arg, expected) => {
          expect(getImageUrl(arg)).toEqual(expected)
        }
      )
    })

    test('when used with missing image - returns empty string', () => {
      // Arrange
      const expected = ''
      const args = [{ front: true }]

      // Act
      const actual = getImageUrl(args)

      // Assert
      expect(actual).toEqual(expected)
    })

    test('when used correct argument - works as expected', () => {
      // Arrange
      const url = 'http://www.images.com/image.jpg'
      const expected = url
      const args = [{ front: true, image: url }]

      // Act
      const actual = getImageUrl(args)

      // Assert
      expect(actual).toEqual(expected)
    })
  })
})
