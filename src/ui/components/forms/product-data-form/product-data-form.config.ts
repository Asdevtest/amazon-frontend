import { action, computed, observable } from 'mobx'

export const productDataFormConfig = {
  rows: computed,

  batchArchive: observable,
  batch: observable,
  showBatchInfoModal: observable,

  onClickShowBatchInfoModal: action.bound,
  onToggleArchive: action.bound,
  patchActualShippingCostBatch: action.bound,
}
