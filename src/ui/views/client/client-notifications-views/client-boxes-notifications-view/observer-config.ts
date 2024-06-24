import { action, computed, observable } from 'mobx'

export const observerConfig = {
  curBox: observable,
  showBoxViewModal: observable,
  hsCodeData: observable,
  showEditHSCodeModal: observable,
  boxes: observable,
  showConfirmModal: observable,
  uploadedFiles: observable,

  userInfo: computed,

  onTriggerOpenConfirmModal: action.bound,
  onClickSaveHsCode: action.bound,
  onClickHsCode: action.bound,
  onTriggerOpenRejectModal: action.bound,
  onSubmitChangeBoxFields: action.bound,
  setCurrentOpenedBox: action.bound,
  onClickConfirmOrderPriceChangeBtn: action.bound,
  onClickRejectOrderPriceChangeBtn: action.bound,
  handleRejectFewBoxes: action.bound,
  handleChangePriceFewBoxes: action.bound,
  handleSaveChangePrice: action.bound,
}
