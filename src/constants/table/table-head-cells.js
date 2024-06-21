import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export const BUYER_MY_ORDERS_MODAL_HEAD_CELLS = () => [
  '',
  t(TranslationKey.Title),
  t(TranslationKey.Price),
  t(TranslationKey['Avg. shipping cost per 1 pc.']),
  t(TranslationKey.Quantity),
  t(TranslationKey.Total),
  t(TranslationKey.Supplier),
]
