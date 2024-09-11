import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const SupervisorDashboardCardDataKey = {
  ALL_PRODUCTS: 'ALL_PRODUCTS',
  SUCCESS_PRODUCTS: 'SUCCESS_PRODUCTS',
  PAYED_PRODUCTS: 'PAYED_PRODUCTS',

  NEW_PRODUCTS_AT_RESEARCHER: 'NEW_PRODUCTS_AT_RESEARCHER',
  NEW_PRODUCTS_AT_CLIENT: 'NEW_PRODUCTS_AT_CLIENT',
  AWAIT_SOLVE: 'AWAIT_SOLVE',

  ON_CHECKING: 'ON_CHECKING',

  IN_SEARCH_PRODUCTS: 'IN_SEARCH_PRODUCTS',
  REJECTED_PRODUCTS: 'REJECTED_PRODUCTS',

  REPLENISH: 'REPLENISH',
  FINES: 'FINES',
}

export const getSupervisorDashboardCardConfig = () => [
  {
    key: 'PRODUCTS',
    title: t(TranslationKey.Products),
    subTitle: t(TranslationKey['Your product list data']),
    items: [
      {
        dataKey: SupervisorDashboardCardDataKey.ALL_PRODUCTS,
        title: t(TranslationKey['Total products']),

        route: '/supervisor/products',
      },
      {
        dataKey: SupervisorDashboardCardDataKey.SUCCESS_PRODUCTS,
        title: t(TranslationKey['Published on the stock exchange']),

        route: '/supervisor/products',
      },
      {
        dataKey: SupervisorDashboardCardDataKey.PAYED_PRODUCTS,
        title: t(TranslationKey.Paid),

        route: '/supervisor/products',
      },

      {
        dataKey: SupervisorDashboardCardDataKey.REJECTED_PRODUCTS,
        title: t(TranslationKey.Rejected),
        isNegative: true,
        route: '/supervisor/products',
      },
    ],
  },

  {
    key: 'CHECK',
    title: t(TranslationKey.Checking),
    subTitle: t(TranslationKey['Data on product checks']),
    items: [
      {
        dataKey: SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_RESEARCHER,
        title: t(TranslationKey['To check from the resercher']),

        route: '/supervisor/ready-to-check-by-researcher',
      },
      {
        dataKey: SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT,
        title: t(TranslationKey['New search from the client']),

        route: '/supervisor/ready-to-check-by-client',
      },
      {
        dataKey: SupervisorDashboardCardDataKey.ON_CHECKING,
        title: t(TranslationKey['On review']),

        route: '/supervisor/products',
      },
      {
        dataKey: SupervisorDashboardCardDataKey.AWAIT_SOLVE,
        title: t(TranslationKey['Waiting to be checked']),

        route: '/supervisor/products',
      },

      {
        dataKey: SupervisorDashboardCardDataKey.IN_SEARCH_PRODUCTS,
        title: t(TranslationKey['In the work of a Buyer']),

        route: '/supervisor/products',
      },
    ],
  },

  {
    key: 'FINANCES',
    title: t(TranslationKey.Finances),
    subTitle: t(TranslationKey['Accrual data']),
    items: [
      {
        dataKey: SupervisorDashboardCardDataKey.REPLENISH,
        title: t(TranslationKey.Accruals),

        route: '/supervisor/finances',
      },
      {
        dataKey: SupervisorDashboardCardDataKey.FINES,
        title: t(TranslationKey.Fines),
        isNegative: true,
        route: '/supervisor/finances',
      },
    ],
  },
]
