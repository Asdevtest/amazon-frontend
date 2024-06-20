import { action, computed, observable } from 'mobx'

export const observerConfig = {
  orderStatusDataBase: observable,
  paymentMethods: observable,
  createBoxesResult: observable,
  paymentAmount: observable,
  selectedOrder: observable,
  currentOrder: observable,
  updateSupplierData: observable,
  dataToCancelOrder: observable,
  readyImages: observable,
  hsCodeData: observable,

  showOrderModal: observable,
  showConfirmModal: observable,
  showPaymentMethodsModal: observable,

  userInfo: computed,
  platformSettings: computed,

  setUpdateSupplierData: action.bound,
  getBuyersOrdersPaymentByStatus: action.bound,
  getSuppliersPaymentMethods: action.bound,
  onClickSaveSupplierBtn: action.bound,
  onClickSaveWithoutUpdateSupData: action.bound,
  onClickUpdataSupplierData: action.bound,
  onClickPaymentMethodsCell: action.bound,
  onSaveOrderItem: action.bound,
  onClickOrder: action.bound,
  onSubmitCancelOrder: action.bound,
  saveOrderPayment: action.bound,
  onSubmitSaveOrder: action.bound,
  onSaveOrder: action.bound,
  onSubmitCreateBoxes: action.bound,
  onCreateBox: action.bound,
  onClickHsCode: action.bound,
}
