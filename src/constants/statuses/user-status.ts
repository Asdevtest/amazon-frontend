import { t } from '@utils/translations'

import { Roles } from '@typings/enums/roles'

import { TranslationKey } from '../translations/translation-key'

export const userStatusTranslateKey = (isActive: boolean) => {
  return isActive ? t(TranslationKey.Active) : t(TranslationKey.Banned)
}

export const userRoleTranslateKey = (role: number) => {
  return Roles[role]
}

export const userSubStatusTranlateKey = (isSub: boolean) => {
  return isSub ? 'Sub' : 'Master'
}
