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
  const validTestValue = [
    {enter: 'Static text', expect: ' text'},
    {enter: ' Static', expect: ' '},
    {enter: 'Static', expect: ''},
  ]

  const unvalidTestValue = [{enter: 100}, {enter: true}, {enter: undefined}]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(getModelNameWithotPostfix(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(getModelNameWithotPostfix(value.enter)).toBeNull()
    })
  })
})

describe('Test trimBarcode(value)', () => {
  const validTestValue = [
    {enter: 'Some long message', expect: ' message'},
    {enter: '123456789', expect: '23456789'},
  ]

  const unvalidTestValue = [
    {enter: '', expect: ''},
    {enter: 123456789, expect: 123456789},
    {enter: null, expect: null},
    {enter: undefined, expect: undefined},
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(trimBarcode(value.enter)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(trimBarcode(value.enter)).toBe(value.expect)
    })
  })
})

describe('Test toFixed(int, x)', () => {
  const validTestValue = [
    {enter: 10, x: 1, expect: '10.0'},
    {enter: 20.456798, x: 1, expect: '20.5'},
    {enter: 1.456123, x: 4, expect: '1.4561'},
  ]

  const unvalidTestValue = [
    {enter: '10', x: 1, expect: '10'},
    {enter: null, x: 1, expect: null},
    {enter: undefined, x: 4, expect: undefined},
    {enter: false, x: 4, expect: false},
    {enter: 10, x: undefined, expect: '10'},
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(toFixed(value.enter, value.x)).toBe(value.expect)
    })
  })

  unvalidTestValue.forEach(value => {
    test('Unvalid props', () => {
      expect(toFixed(value.enter, value.x)).toBe(value.expect)
    })
  })
})
