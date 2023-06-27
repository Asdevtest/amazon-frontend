import { filterEmptyBoxes } from './filters'

describe('Test filterEmptyBoxes(boxes)', () => {
  const validTestValue = [{ enter: [], expect: true }]

  const unvalidTestValue = [
    { enter: 1, expect: null },
    { enter: '', expect: null },
    { enter: false, expect: null },
    { enter: null, expect: null },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(filterEmptyBoxes(value.enter)).not.toBeNull()
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(filterEmptyBoxes(value.enter)).toBe(value.expect)
    })
  })
})
