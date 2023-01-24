import {roundSafely} from './calculation'

describe('Test roundSafely  (num)', () => {
  test('Valid props', () => {
    // const res = roundSafely(100)

    expect(roundSafely(100)).toBe(100)
    // expect(typeof res).toBe('number')
  })

  // test('Valid props', () => {
  //   expect(5 * 2).toBe(10)
  // })
})
