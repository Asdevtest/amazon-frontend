import {getModelNameWithotPostfix} from './text'

describe('Test getModelNameWithotPostfix(modelName)', () => {
  test('Valid props', () => {
    const res = getModelNameWithotPostfix('Static test')

    expect(res).toBe(' test')
  })
})
