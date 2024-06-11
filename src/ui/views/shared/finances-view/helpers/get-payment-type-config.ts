import { getPaymentTypeTranslations } from '@constants/finances/get-type-translations'
import { PaymentType } from '@constants/finances/payment-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getPaymentTypeConfig = () => {
  const defaultConfig = [
    {
      label: () => t(TranslationKey.All),
      value: '',
    },
  ]

  const options = Object.values(PaymentType).map(item => ({
    label: () => getPaymentTypeTranslations(item),
    value: item,
  }))

  return defaultConfig.concat(options)
}
