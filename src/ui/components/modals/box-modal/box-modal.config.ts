import { action, computed, observable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export enum BoxTabs {
  BOX_INFO,
  ORDER_INFO,
}

export const switcherSettings = () => [
  {
    label: t(TranslationKey['Box info']),
    value: BoxTabs.BOX_INFO,
  },

  {
    label: t(TranslationKey['Order info']),
    value: BoxTabs.ORDER_INFO,
  },
]

export const observerConfig = {
  showEditHSCodeModal: observable,
  activeTab: observable,
  onUpdateData: observable,

  userInfo: computed,
  isClient: computed,
  isStorekeeper: computed,
  isBuyer: computed,
  isEdit: computed,
  disableSaveButton: computed,

  onClickHsCode: action.bound,
  onSubmitChangeBoxFields: action.bound,
  setActiveTab: action.bound,
  onChangeField: action.bound,
  onChangeTrackNumberFile: action.bound,
}
