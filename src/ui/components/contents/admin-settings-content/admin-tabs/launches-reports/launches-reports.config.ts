import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { LaunchesReportsDateType } from './launches-reports.type'

export const getSelectConfig = () =>
  Object.values(LaunchesReportsDateType).map(item => ({
    value: item,
    label: t(TranslationKey[item]),
  }))
