import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { PermissionsTypes } from './user-permissions.types'

export const switcherSettings = () => [
  { label: t(TranslationKey['Permission Groups']), value: PermissionsTypes.GROUP_PERMISSIONS },
  { label: t(TranslationKey.Permissions), value: PermissionsTypes.SINGLE_PERMISSIONS },
]
