import { ideaStatus } from '@constants/statuses/idea-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const progressBarSettings = [
  {
    title: () => t(TranslationKey['New ideas']),
    statuses: [ideaStatus.NEW],
    intervalName: 'intervalStatusNew',
  },
  {
    title: () => t(TranslationKey['On checking']),
    statuses: [ideaStatus.ON_CHECK],
    intervalName: 'intervalStatusOnCheck',
  },
  {
    title: () => t(TranslationKey['Search for suppliers']),
    statuses: [ideaStatus.SUPPLIER_SEARCH, ideaStatus.SUPPLIER_FOUND, ideaStatus.SUPPLIER_NOT_FOUND],
    intervalName: 'intervalStatusSearchFoundNotFound',
  },
  {
    title: () => t(TranslationKey['Creating a product card']),
    statuses: [ideaStatus.CARD_CREATING],
    intervalName: 'intervalStatusProductCreating',
  },
  {
    title: () => t(TranslationKey['Adding ASIN']),
    statuses: [ideaStatus.ADDING_ASIN],
    intervalName: 'intervalStatusAddingAsin',
  },
  {
    title: () => t(TranslationKey['Realized ideas']),
    statuses: [ideaStatus.VERIFIED],
    intervalName: 'intervalStatusFinished',
  },
  {
    title: () => t(TranslationKey.Rejected),
    statuses: [ideaStatus.REJECTED],
    intervalName: 'intervalStatusRejected',
  },
  {
    title: () => t(TranslationKey['Idea closed']),
    statuses: [ideaStatus.CLOSED],
    intervalName: 'intervalsSum',
  },
]
