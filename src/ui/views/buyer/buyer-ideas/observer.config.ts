import { action, observable } from 'mobx'

export const observerConfig = {
  showIdeaModal: observable,
  showAddSupplierProductModal: observable,

  productId: observable,
  currentIdeaId: observable,
  currentProduct: observable,

  getDataForIdeaModal: action.bound,
  onClickAddSupplierButton: action.bound,
  onClickSaveSupplierBtn: action.bound,
  setIdeaSupplierFound: action.bound,
  setIdeaSupplierNotFound: action.bound,
}
