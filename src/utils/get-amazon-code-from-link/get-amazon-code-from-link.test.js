import { getAmazonCodeFromLink } from '@utils/get-amazon-code-from-link'

describe('Test checkIsString(value)', () => {
  const validTestValue = [
    {
      enter:
        'https://www.amazon.com/AmazonBasics-Performance-Alkaline-Batteries-Count/dp/B00MNV8E0C/ref=lp_16225009011_1_1',
      expect: 'B00MNV8E0C',
    },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(getAmazonCodeFromLink(value.enter)).toBe(value.expect)
    })
  })
})
