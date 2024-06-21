import { action, observable } from 'mobx'

export const observerConfig = {
  showConfirmModal: observable,

  onTriggerOpenConfirmModal: action.bound,
  onTriggerOpenRejectModal: action.bound,
  onClickTableRow: action.bound,
  onClickConfirmOrderPriceChangeBtn: action.bound,
  onClickRejectOrderPriceChangeBtn: action.bound,
}
