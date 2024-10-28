import { action, observable } from 'mobx'

export const observerConfig = {
  showIdeaModal: observable,
  showAddOrEditSupplierModal: observable,

  productId: observable,
  currentIdeaId: observable,
  currentProduct: observable,
  paymentMethods: observable,

  getDataForIdeaModal: action.bound,
}
