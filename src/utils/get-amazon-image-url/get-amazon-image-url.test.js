import { getAmazonImageUrl } from './get-amazon-image-url'

describe('Test getAmazonImageUrl(str, big)', () => {
  const validTestValue = [
    { str: 'String', big: true, expect: 'https://images-na.ssl-images-amazon.com/images/I/String._SL1400_.jpg' },
    { str: 'String', big: false, expect: 'https://images-na.ssl-images-amazon.com/images/I/String._SS64_.jpg' },
    { str: null, big: false, expect: '/assets/img/no-photo.jpg' },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(getAmazonImageUrl(value.str, value.big)).toBe(value.expect)
      expect(getAmazonImageUrl(value.str, value.big)).not.toBeNull()
      expect(typeof getAmazonImageUrl(value.str, value.big)).toBe('string')
    })
  })
})
