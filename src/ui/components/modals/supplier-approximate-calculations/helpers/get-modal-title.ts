import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { TariffModal } from '@typings/enums/tariff-modal'

export const getTitleModal = (modalType?: TariffModal) => {
  let title = 'Approximate calculation'

  if (modalType) {
    title = modalType
  }

  return t(TranslationKey[title as keyof typeof TranslationKey])
}
