import {getModelNameWithotPostfix, getShortenStringIfLongerThanCount} from './text'

describe('Test getShortenStringIfLongerThanCount(str, count)', () => {
  test('Valid props', () => {
    const res = getShortenStringIfLongerThanCount('qwerty', 2)

    expect(res).toBe('qw...')
    expect(typeof res).toBe('string')
  })

  test('str short than count', () => {
    const res = getShortenStringIfLongerThanCount('qwerty', 7)

    expect(res).toBe('qwerty')
    expect(typeof res).toBe('string')
  })
})

describe('Test getModelNameWithotPostfix(modelName)', () => {
  test('Valid props', () => {
    const res = getModelNameWithotPostfix('Static test')

    expect(res).toBe(' test')
  })
})
