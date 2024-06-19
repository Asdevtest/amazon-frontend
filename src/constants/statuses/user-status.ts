import { UserRolePrettyMap } from '@constants/keys/user-roles'

import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

export const userStatusTranslateKey = (isActive: boolean) => {
  return isActive ? t(TranslationKey.Active) : t(TranslationKey.Banned)
}

export const userRoleTranslateKey = (role: number) => {
  return UserRolePrettyMap[role]
}

export const userSubStatusTranlateKey = (isSub: boolean) => {
  return isSub ? 'Sub' : 'Master'
}
