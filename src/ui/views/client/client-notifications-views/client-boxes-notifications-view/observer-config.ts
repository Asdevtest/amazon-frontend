import { action, computed, observable } from 'mobx'

export const observerConfig = {
  curBox: observable,
  showBoxViewModal: observable,
  showEditHSCodeModal: observable,
  boxes: observable,
  showConfirmModal: observable,
  uploadedFiles: observable,

  userInfo: computed,

  onTriggerOpenConfirmModal: action.bound,
  onTriggerOpenRejectModal: action.bound,
  setCurrentOpenedBox: action.bound,
  onClickConfirmOrderPriceChangeBtn: action.bound,
  onClickRejectOrderPriceChangeBtn: action.bound,
  handleRejectFewBoxes: action.bound,
  handleChangePriceFewBoxes: action.bound,
  handleSaveChangePrice: action.bound,
}
