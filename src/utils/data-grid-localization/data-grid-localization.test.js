import { getLocalizationByLanguageTag } from './data-grid-localization'

describe('Test getLocalizationByLanguageTag()', () => {
  test('Unvalid props', () => {
    expect(getLocalizationByLanguageTag()).not.toBeNull()
  })
})
