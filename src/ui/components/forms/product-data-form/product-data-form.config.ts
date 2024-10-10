import { action, observable } from 'mobx'

export const productDataFormConfig = {
  archive: observable,
  batch: observable,
  showBatchInfoModal: observable,

  onClickShowBatchInfoModal: action.bound,
  onToggleArchive: action.bound,
  patchActualShippingCostBatch: action.bound,
}

export const searchFields: string[] = ['xid', 'fbaShipment']
