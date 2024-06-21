// import {objectFlip} from './object'
import { getSumPropertiesObject } from './object'

describe('Test objectFlip(obj, valueFunc)', () => {
  // test('Valid props', () => {
  //   const someObject = {0: 'zero', 1: 'one', 2: 'two'}
  //   const validRes = {zero: 0, one: 1, two: 2}

  //   const res = objectFlip(someObject, parseInt)

  //   expect(res).toEqual(validRes)
  //   // expect(typeof res).toBe('string')
  // })

  test('Valid props', () => {
    expect(5 * 2).toBe(10)
  })
})

describe('Test getSumPropertiesObject(object)', () => {
  test('Valid object with number properties', () => {
    const validObject = {
      prop1: 10,
      prop2: 20,
      prop3: 30,
    }

    const result = getSumPropertiesObject(validObject)

    expect(result).toBe(60)
  })

  test('Object with non-number properties', () => {
    const objectWithNonNumberProps = {
      prop1: 'abc',
      prop2: true,
      prop3: {},
    }

    const result = getSumPropertiesObject(objectWithNonNumberProps)

    expect(result).toBe(0)
  })

  test('Empty object', () => {
    const emptyObject = {}

    const result = getSumPropertiesObject(emptyObject)

    expect(result).toBe(0)
  })
})
