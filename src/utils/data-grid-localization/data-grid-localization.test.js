import {getLocalizationByLanguageTag} from './data-grid-localization'

describe('Test getLocalizationByLanguageTag(str, max)', () => {
  test('Unvalid props', () => {
    expect(getLocalizationByLanguageTag()).not.toBeNull()
  })
})
