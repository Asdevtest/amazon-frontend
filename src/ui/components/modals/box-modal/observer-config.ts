import { action, computed, observable } from 'mobx'

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
  handleChangeField: action.bound,
  handleChangeTrackNumberFile: action.bound,
}
