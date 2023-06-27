import { isDebug, isProduction } from './env'

describe('Test isDebug()', () => {
  test('Valid props', () => {
    expect(isDebug()).not.toBeNull()
  })
})

describe('Test isProduction()', () => {
  test('Valid props', () => {
    expect(isProduction()).not.toBeNull()
  })
})
