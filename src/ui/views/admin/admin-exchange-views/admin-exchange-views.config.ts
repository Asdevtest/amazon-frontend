import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { AdminExchangeStatuses, adminExchangeStatusesTranslations } from './admin-exchange.types'

export const getSwitcherConfig = () =>
  Object.values(AdminExchangeStatuses).map(status => ({
    label: t(TranslationKey[adminExchangeStatusesTranslations[status] as keyof typeof TranslationKey]),
    value: status,
  }))
