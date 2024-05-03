import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { TariffModalType } from '@typings/shared/tariff-modal'

export const getTitleModal = (modalType?: TariffModalType) => {
  let title = 'Approximate calculation'

  if (modalType) {
    title = modalType
  }

  return t(TranslationKey[title as keyof typeof TranslationKey])
}
