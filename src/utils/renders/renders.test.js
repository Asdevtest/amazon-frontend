import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { renderAttentionTooltipTitle, renderTooltipTitle } from './renders'

describe('Test renderTooltipTitle(categoryTitle, userRole)', () => {
  const buyer = 40
  const checkIsBuyer = [
    {
      categoryTitle: t(TranslationKey.Dashboard),
      expect: t(TranslationKey['Statistics on goods/orders/finances']),
    },
    {
      categoryTitle: t(TranslationKey['Free Orders']),
      expect: t(TranslationKey['All orders available for pickup']),
    },
    {
      categoryTitle: t(TranslationKey['Supplier search']),
      expect: t(TranslationKey['All available tasks for finding a supplier']),
    },
    {
      categoryTitle: t(TranslationKey.Users),
      expect: t(TranslationKey['Manage the list of employees']),
    },
    {
      categoryTitle: t(TranslationKey.Finances),
      expect: t(TranslationKey["Detailed description of the movement of the user's money"]),
    },
    {
      categoryTitle: t(TranslationKey['My products']),
      expect: t(TranslationKey['List of items taken by Bayer to find a supplier']),
    },
    {
      categoryTitle: t(TranslationKey['My orders']),
      expect: t(TranslationKey['Management of all orders assigned to Bayer']),
    },
  ]
  checkIsBuyer.forEach(value => {
    test('Valid props', () => {
      expect(renderTooltipTitle(value.categoryTitle, buyer)).toEqual(value.expect)
    })
  })

  const researcher = 30
  const checkIsResearcher = [
    {
      categoryTitle: t(TranslationKey.Dashboard),
      expect: t(TranslationKey['Statistics on goods/orders/finances']),
    },
    {
      categoryTitle: t(TranslationKey['My products']),
      expect: t(TranslationKey['List of products created by the Researcher']),
    },
    {
      categoryTitle: t(TranslationKey.Users),
      expect: t(TranslationKey['Manage the list of employees']),
    },
    {
      categoryTitle: t(TranslationKey.Finances),
      expect: t(TranslationKey["Detailed description of the movement of the user's money"]),
    },
  ]
  checkIsResearcher.forEach(value => {
    test('Valid props', () => {
      expect(renderTooltipTitle(value.categoryTitle, researcher)).toEqual(value.expect)
    })
  })

  const supervisor = 20
  const checkIsSupervisor = [
    {
      categoryTitle: t(TranslationKey.Dashboard),
      expect: t(TranslationKey['Statistics on goods/orders/finances']),
    },
    {
      categoryTitle: t(TranslationKey['Ready to check']),
      expect: t(TranslationKey['All product cards available for checking']),
    },
    {
      categoryTitle: t(TranslationKey.Users),
      expect: t(TranslationKey['Manage the list of employees']),
    },
    {
      categoryTitle: t(TranslationKey.Finances),
      expect: t(TranslationKey["Detailed description of the movement of the user's money"]),
    },
    {
      categoryTitle: t(TranslationKey['My products']),
      expect: t(TranslationKey['The list of goods cards assigned to the supervisor for verification']),
    },
  ]
  checkIsSupervisor.forEach(value => {
    test('Valid props', () => {
      expect(renderTooltipTitle(value.categoryTitle, supervisor)).toEqual(value.expect)
    })
  })

  const client = 10
  const checkIsClient = [
    {
      categoryTitle: t(TranslationKey.Dashboard),
      expect: t(TranslationKey['Statistics on goods, orders and boxes']),
    },
    {
      categoryTitle: t(TranslationKey.Freelance),
      expect: t(TranslationKey['Requests and proposals for them']),
    },
    {
      categoryTitle: t(TranslationKey['My requests']),
      expect: t(TranslationKey['List of created requests']),
    },
    {
      categoryTitle: t(TranslationKey['Vacant requests']),
      expect: t(TranslationKey['Actual requests on the exchange']),
    },
    {
      categoryTitle: t(TranslationKey['My proposals']),
      expect: t(TranslationKey['Proposals made for other requests']),
    },
    {
      categoryTitle: t(TranslationKey.Inventory),
      expect: t(TranslationKey['List of your products']),
    },
    {
      categoryTitle: t(TranslationKey['Commodity exchange']),
      expect: t(TranslationKey['Exchange with product cards available for purchase']),
    },
    {
      categoryTitle: t(TranslationKey['My orders']),
      expect: t(TranslationKey['List of orders taken']),
    },
    {
      categoryTitle: t(TranslationKey['My warehouse']),
      expect: t(TranslationKey['Managing the boxes that are in the prep center']),
    },
    {
      categoryTitle: t(TranslationKey['My batches']),
      expect: t(TranslationKey['List of batches and management of boxes related to them']),
    },
    {
      categoryTitle: t(TranslationKey.Users),
      expect: t(TranslationKey['Manage the list of employees']),
    },
    {
      categoryTitle: t(TranslationKey.Shops),
      expect: t(TranslationKey['A list of your added Amazon stores with reports on them']),
    },
    {
      categoryTitle: t(TranslationKey.Finances),
      expect: t(TranslationKey["Detailed description of the movement of the user's money"]),
    },
    {
      categoryTitle: t(TranslationKey.Notifications),
      expect: t(TranslationKey['Important notifications on changes in order price, batch or irrelevant tariff']),
    },
    {
      categoryTitle: t(TranslationKey['On orders']),
      expect: t(TranslationKey['Notifications of required surcharges for the order']),
    },
    {
      categoryTitle: t(TranslationKey['On boxes']),
      expect: t(TranslationKey['Notices of required surcharges per box in a batch']),
    },
    {
      categoryTitle: t(TranslationKey['On boxes tariffs']),
      expect: t(TranslationKey['Notifications about the need to change to a new tariff']),
    },
  ]
  checkIsClient.forEach(value => {
    test('Valid props', () => {
      expect(renderTooltipTitle(value.categoryTitle, client)).toEqual(value.expect)
    })
  })

  const storekeeper = 45
  const checkIsStorekeeper = [
    {
      categoryTitle: t(TranslationKey.Dashboard),
      expect: t(TranslationKey['Statistics on goods/orders/finances']),
    },
    {
      categoryTitle: t(TranslationKey.Tasks),
      expect: t(TranslationKey['New, current and completed/rejected box tasks']),
    },
    {
      categoryTitle: t(TranslationKey['My warehouse']),
      expect: t(TranslationKey['List of boxes that are in stock']),
    },
    {
      categoryTitle: t(TranslationKey['My batches']),
      expect: t(TranslationKey['Management of batches and boxes related to them']),
    },
    {
      categoryTitle: t(TranslationKey.Users),
      expect: t(TranslationKey['Manage the list of employees']),
    },
    {
      categoryTitle: t(TranslationKey.Finances),
      expect: t(TranslationKey["Detailed description of the movement of the user's money"]),
    },
    {
      categoryTitle: t(TranslationKey['Warehouse management']),
      expect: t(TranslationKey['Management of tariffs for logistics and warehousing services']),
    },
  ]
  checkIsStorekeeper.forEach(value => {
    test('Valid props', () => {
      expect(renderTooltipTitle(value.categoryTitle, storekeeper)).toEqual(value.expect)
    })
  })
})

describe('Test renderAttentionTooltipTitle(categoryTitle, userRole)', () => {
  const client = 10
  const validTestValue = [
    {
      enter: t(TranslationKey['On orders']),
      expect: t(TranslationKey['If the surcharge is declined, the order will be cancelled']),
    },
    {
      enter: t(TranslationKey['On boxes']),
      expect: t(TranslationKey['If the surcharge is declined, the box is returned to stock']),
    },
    {
      enter: t(TranslationKey['On boxes tariffs']),
      expect: t(TranslationKey['If you reject the tariff change, the box is returned to the stock']),
    },
  ]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(renderAttentionTooltipTitle(value.enter, client)).toBe(value.expect)
    })
  })
})
