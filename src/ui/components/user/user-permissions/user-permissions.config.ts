import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export enum ITabsIndex {
  GROUP_PERMISSIONS,
  SINGLE_PERMISSIONS,
}

export const switcherSettings = [
  { label: () => t(TranslationKey['Permission Groups']), value: ITabsIndex.GROUP_PERMISSIONS },
  { label: () => t(TranslationKey.Permissions), value: ITabsIndex.SINGLE_PERMISSIONS },
]
