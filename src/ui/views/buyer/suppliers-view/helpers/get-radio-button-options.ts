import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { TableView } from '../suppliers-view.type'

export const getRadioButtonOptions = () =>
  Object.values(TableView).map(value => ({
    label: t(TranslationKey[value]),
    value,
  }))
