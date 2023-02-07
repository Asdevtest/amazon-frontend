import {TranslationKey} from '@constants/translations/translation-key'

import {t} from '@utils/translations'

import {renderTooltipTitle} from './renders'

describe('Test renderTooltipTitle(categoryTitle, userRole)', () => {
  const validTestValue = [
    {
      categoryTitle: t(TranslationKey.Dashboard),
      userRole: 40,
      expect: t(TranslationKey['Statistics on goods/orders/finances']),
    },
    {
      categoryTitle: t(TranslationKey.Dashboard),
      userRole: 30,
      expect: t(TranslationKey['Statistics on goods/orders/finances']),
    },
    {
      categoryTitle: t(TranslationKey.Dashboard),
      userRole: 20,
      expect: t(TranslationKey['Statistics on goods/orders/finances']),
    },
    {
      categoryTitle: t(TranslationKey.Dashboard),
      userRole: 10,
      expect: t(TranslationKey['Statistics on goods, orders and boxes']),
    },
    {
      categoryTitle: t(TranslationKey.Dashboard),
      userRole: 45,
      expect: t(TranslationKey['Statistics on goods/orders/finances']),
    },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(renderTooltipTitle(value.categoryTitle, value.userRole)).toEqual(value.expect)
    })
  })
})
