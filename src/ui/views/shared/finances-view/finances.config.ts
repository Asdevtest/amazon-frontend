import { EntityType } from '@constants/finances/entity-type'
import { getEntityTypeTranslations } from '@constants/finances/get-type-translations'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getEntityTypeConfig = (showAllTypes: boolean) => {
  const defaultConfig = [
    {
      label: () => t(TranslationKey.All),
      value: '',
    },
  ]

  let allTypes = Object.values(EntityType)

  if (!showAllTypes) {
    allTypes = allTypes.slice(0, 4)
  }

  const options = allTypes.map(item => ({
    label: () => getEntityTypeTranslations(item),
    value: item,
  }))

  return defaultConfig.concat(options)
}

export const getPaymentTypeConfig = () => [
  {
    label: () => t(TranslationKey.All),
    value: '',
  },
  {
    label: () => t(TranslationKey.Replenish),
    value: 'REPLENISH',
  },
  {
    label: () => t(TranslationKey.Fine),
    value: 'FINE',
  },
]
