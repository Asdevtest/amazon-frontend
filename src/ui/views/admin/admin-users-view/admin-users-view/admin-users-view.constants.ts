import { UserRole, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const getSwitcherConfig = () => {
  const switcherConfig = [
    UserRole.CANDIDATE,
    UserRole.CLIENT,
    UserRole.RESEARCHER,
    UserRole.STOREKEEPER,
    UserRole.BUYER,
    UserRole.FREELANCER,
  ].map(userRole => ({
    label: () => `${userRole}S`,
    value: mapUserRoleEnumToKey[userRole],
  }))

  return [
    {
      label: () => t(TranslationKey.All),
      value: null,
    },
    ...switcherConfig,
  ]
}

export const fieldsForSearch = ['name', 'email']
