import { isNumber } from '@utils/is-number'

describe('Test isNumber(value)', () => {
  const validTestValue = [
    { enter: 1, expect: true },
    { enter: 1.23, expect: true },
    { enter: 0, expect: true },
    { enter: '1', expect: true },
    { enter: 1.111, expect: true },
  ]

  const unvalidTestValue = [{ enter: undefined, expect: false }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(isNumber(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(isNumber(value.enter)).toBe(value.expect)
    })
  })
})
