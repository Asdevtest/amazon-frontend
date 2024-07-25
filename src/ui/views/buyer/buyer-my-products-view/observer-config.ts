import { action, observable } from 'mobx'

export const observerConfig = {
  productCardModal: observable,

  onClickTableRow: action.bound,
  onClickProductModal: action.bound,
  onClickShowProduct: action.bound,
}
