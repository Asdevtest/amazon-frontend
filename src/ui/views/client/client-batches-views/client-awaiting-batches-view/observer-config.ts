import { action, computed, observable } from 'mobx'

export const observerConfig = {
  curBatch: observable,
  hsCodeData: observable,
  showEditHSCodeModal: observable,
  currentStorekeeperId: observable,
  storekeepersData: observable,
  uploadedFiles: observable,
  showBatchInfoModal: observable,
  showConfirmModal: observable,
  showAddOrEditBatchModal: observable,
  boxesData: observable,
  showBoxViewModal: observable,
  progressValue: observable,
  showProgress: observable,
  productViewMode: observable,

  userInfo: computed,
  platformSettings: computed,

  onClickSaveHsCode: action.bound,
  onClickHsCode: action.bound,
  getStorekeepers: action.bound,
  onSubmitChangeBoxFields: action.bound,
  setCurrentOpenedBatch: action.bound,
  removeBoxFromBatch: action.bound,
  onClickCancelSendToBatchBtn: action.bound,
  onClickAddOrEditBatch: action.bound,
  patchActualShippingCostBatch: action.bound,
  onSubmitAddOrEditBatch: action.bound,
  changeViewModeHandler: action.bound,
}
