import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export enum PermissionsTab {
  ASSIGN_PERMISSIONS = 'ASSIGN_PERMISSIONS',
  ACCESS_TO_PRODUCTS = 'ACCESS_TO_PRODUCTS',
}

export const createPermissionOptions = () => [
  { label: t(TranslationKey['Assign permissions']), value: PermissionsTab.ASSIGN_PERMISSIONS },
  {
    label: t(TranslationKey['Access to products']),
    value: PermissionsTab.ACCESS_TO_PRODUCTS,
  },
]
