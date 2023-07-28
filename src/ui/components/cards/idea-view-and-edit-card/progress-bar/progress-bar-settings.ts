import { ideaStatus } from '@constants/statuses/idea-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const progressBarSettings = [
  {
    title: t(TranslationKey['New Ideas']),
    statuses: [ideaStatus.NEW],
  },
  {
    title: t(TranslationKey['On checking']),
    statuses: [ideaStatus.ON_CHECK],
  },
  {
    title: t(TranslationKey['Search for suppliers']),
    statuses: [ideaStatus.SUPPLIER_SEARCH, ideaStatus.SUPPLIER_FOUND, ideaStatus.SUPPLIER_NOT_FOUND],
  },
  {
    title: t(TranslationKey['Create a product card']),
    statuses: [ideaStatus.CARD_CREATING],
  },
  {
    title: t(TranslationKey['Add ASIN']),
    statuses: [ideaStatus.ADDING_ASIN],
  },
  {
    title: t(TranslationKey['Realized ideas']),
    statuses: [ideaStatus.VERIFIED],
  },
  {
    title: t(TranslationKey['Rejected ideas']),
    statuses: [ideaStatus.REJECTED],
  },
]
