import { EntityType } from '@constants/finances/entity-type'
import { getEntityTypeTranslations } from '@constants/finances/get-type-translations'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getEntityTypeConfig = () => {
  const defaultConfig = [
    {
      label: () => t(TranslationKey.All),
      value: '',
    },
  ]

  const options = Object.values(EntityType).map(item => ({
    label: () => getEntityTypeTranslations(item),
    value: item,
  }))

  return defaultConfig.concat(options)
}
