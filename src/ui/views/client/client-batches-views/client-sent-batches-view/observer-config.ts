import { action, observable } from 'mobx'

export const observerConfig = {
  curBatch: observable,
  currentStorekeeperId: observable,
  storekeepersData: observable,
  uploadedFiles: observable,

  isArchive: observable,
  showBatchInfoModal: observable,
  showConfirmModal: observable,

  onTriggerArchive: action.bound,
  onClickTriggerArchOrResetProducts: action.bound,
  onSubmitTriggerArchOrResetProducts: action.bound,
  getStorekeepers: action.bound,
  onClickStorekeeperBtn: action.bound,
  onSubmitChangeBoxFields: action.bound,
  setCurrentOpenedBatch: action.bound,
  patchActualShippingCostBatch: action.bound,
  onClickSaveArrivalDate: action.bound,
  onClickSaveTrackingNumber: action.bound,
}
