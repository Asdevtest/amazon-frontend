import { action, computed, observable } from 'mobx'

export const warehouseAwaitingBatchesConfig = {
  boxesData: observable,
  curBatch: observable,
  showConfirmModal: observable,
  showBatchInfoModal: observable,
  showAddOrEditBatchModal: observable,
  uploadedFiles: observable,

  isInvalidTariffBoxSelected: computed,
  isNeedConfirmPriceBoxSelected: computed,
  userInfo: computed,
  platformSettings: computed,

  onSubmitChangeBoxFields: action.bound,
  onClickAddOrEditBatch: action.bound,
  onSubmitAddOrEditBatch: action.bound,
  setCurrentOpenedBatch: action.bound,
  patchActualShippingCostBatch: action.bound,
  confirmSendToStorekeeper: action.bound,
  onClickConfirmSendToBatchBtn: action.bound,
}

export const fieldsForSearch = ['amazonTitle', 'humanFriendlyId', 'asin', 'orderHumanFriendlyId', 'title']
