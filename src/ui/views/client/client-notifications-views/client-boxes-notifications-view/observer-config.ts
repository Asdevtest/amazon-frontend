import { action, observable } from 'mobx'

export const observerConfig = {
  curBox: observable,
  showBoxViewModal: observable,
  boxes: observable,
  showConfirmModal: observable,
  uploadedFiles: observable,

  onTriggerOpenConfirmModal: action.bound,
  onTriggerOpenRejectModal: action.bound,
  setCurrentOpenedBox: action.bound,
  onClickConfirmOrderPriceChangeBtn: action.bound,
  onClickRejectOrderPriceChangeBtn: action.bound,
  handleRejectFewBoxes: action.bound,
  handleChangePriceFewBoxes: action.bound,
  handleSaveChangePrice: action.bound,
}
