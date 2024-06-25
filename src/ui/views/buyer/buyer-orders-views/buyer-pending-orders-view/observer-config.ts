import { action, observable } from 'mobx'

export const observerConfig = {
  selectedOrder: observable,
  showOrderModal: observable,
  showConfirmModal: observable,
  showProgress: observable,
  paymentMethods: observable,
  hsCodeData: observable,
  progressValue: observable,
  readyImages: observable,

  onSaveOrderItem: action.bound,
  onClickOrder: action.bound,
  onSubmitSaveOrder: action.bound,
  onSaveOrder: action.bound,
  getSuppliersPaymentMethods: action.bound,
  onClickSaveSupplierBtn: action.bound,
  onClickHsCode: action.bound,
}
