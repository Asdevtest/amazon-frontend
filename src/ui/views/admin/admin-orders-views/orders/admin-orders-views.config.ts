import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { ordersStatusGroupTranslate } from './admin-orders-views.constants'
import { AdminOrdersStatusGroup } from './admin-orders-views.types'

export const getSwitcherConfig = () =>
  Object.values(AdminOrdersStatusGroup).map(status => ({
    label: t(TranslationKey[ordersStatusGroupTranslate[status] as keyof typeof TranslationKey]),
    value: status,
  }))
