import { action, computed, observable } from 'mobx'

export const observerConfig = {
  curBatch: observable,
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
  curBox: observable,

  userInfo: computed,

  getStorekeepers: action.bound,
  onSubmitChangeBoxFields: action.bound,
  setCurrentOpenedBatch: action.bound,
  removeBoxFromBatch: action.bound,
  onClickCancelSendToBatchBtn: action.bound,
  onClickAddOrEditBatch: action.bound,
  patchActualShippingCostBatch: action.bound,
  onSubmitAddOrEditBatch: action.bound,
  changeViewModeHandler: action.bound,
  onClickStorekeeperBtn: action.bound,
  setCurrentOpenedBox: action.bound,
}
