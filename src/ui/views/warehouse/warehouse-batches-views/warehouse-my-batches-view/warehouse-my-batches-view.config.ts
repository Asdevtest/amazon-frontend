import { action, computed, observable } from 'mobx'

export const warehouseMyBatchesConfig = {
  boxesData: observable,
  curBatch: observable,
  showConfirmModal: observable,
  showBatchInfoModal: observable,
  showAddOrEditBatchModal: observable,
  uploadedFiles: observable,
  isArchive: observable,

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
  onClickSaveTrackingNumber: action.bound,
  onClickSaveArrivalDate: action.bound,
  onTriggerArchive: action.bound,
}

export const fieldsForSearch = ['amazonTitle', 'humanFriendlyId', 'asin', 'orderHumanFriendlyId', 'title']

export interface ColumnsProps {
  onClickSaveTrackingNumber: (id: string, trackingNumber: string) => void
  onClickSaveArrivalDate: (id: string, date: string) => void
  isSentBatches: boolean
}
