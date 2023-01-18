import {getModelNameWithotPostfix} from './text'

describe('Text test', () => {
  test('Valid value', () => {
    expect(getModelNameWithotPostfix('Static test').toBe('test'))
  })
})
