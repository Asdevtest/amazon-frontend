import {getShortenStringIfLongerThanCount} from './change-string-length'

describe('Test getShortenStringIfLongerThanCount(str, count)', () => {
  test('normal props', () => {
    const res = getShortenStringIfLongerThanCount('qwerty', 2)

    expect(res).toBe('qw...')
    expect(typeof res).toBe('string')
  })

  test('str short than count', () => {
    const res = getShortenStringIfLongerThanCount('qwerty', 2)

    expect(res).toBe('qw...')
    expect(typeof res).toBe('string')
  })

  // первый пример
  // test('Test 2', () => {
  //   expect(Math.max(1, 5, 10)).not.toBe(5)
  // })
})
