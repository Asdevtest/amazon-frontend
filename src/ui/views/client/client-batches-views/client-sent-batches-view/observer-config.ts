import { action, observable } from 'mobx'

export const observerConfig = {
  curBatch: observable,
  currentStorekeeperId: observable,
  storekeepersData: observable,
  hsCodeData: observable,
  productViewMode: observable,
  uploadedFiles: observable,

  isArchive: observable,
  showEditHSCodeModal: observable,
  showBatchInfoModal: observable,
  showConfirmModal: observable,

  onTriggerArchive: action.bound,
  onClickTriggerArchOrResetProducts: action.bound,
  onSubmitTriggerArchOrResetProducts: action.bound,
  onClickSaveHsCode: action.bound,
  onClickHsCode: action.bound,
  getStorekeepers: action.bound,
  onClickStorekeeperBtn: action.bound,
  onSubmitChangeBoxFields: action.bound,
  setCurrentOpenedBatch: action.bound,
  patchActualShippingCostBatch: action.bound,
  changeViewModeHandler: action.bound,
}
