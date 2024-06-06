import { UserRolesForAdminPanel } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const switcherConfig = [
  {
    label: () => t(TranslationKey.All),
    value: null,
  },
  ...Object.entries(UserRolesForAdminPanel).map(([role, roleCodeMap]) => ({
    label: () => role.toUpperCase(),
    value: roleCodeMap,
  })),
]

export const filtersFields = [
  'name',
  'email',
  'role',
  'active',
  'rate',
  'balance',
  'balanceFreeze',
  'createdAt',
  'updatedAt',
  'lastSeen',
  'sub',
]

export const fieldsForSearch = ['name', 'email']
