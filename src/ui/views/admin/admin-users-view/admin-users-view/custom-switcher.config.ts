import { UserRole, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { ISwitcherSettings } from '@components/shared/custom-switcher/custom-switcher'

import { t } from '@utils/translations'

const filterableRoles = [
  UserRole.CANDIDATE,
  UserRole.CLIENT,
  UserRole.RESEARCHER,
  UserRole.STOREKEEPER,
  UserRole.BUYER,
  UserRole.FREELANCER,
]

const getSwitcherConfig = (userRoles: string[]) => {
  const defaultConfig: ISwitcherSettings[] = [
    {
      label: () => t(TranslationKey.All),
      value: null,
    },
  ]

  const options = Object.values(userRoles).map(item => ({
    label: () => `${item}S`,
    value: mapUserRoleEnumToKey[item],
  }))

  return defaultConfig.concat(options)
}

export const switcherConfig = getSwitcherConfig(filterableRoles)
