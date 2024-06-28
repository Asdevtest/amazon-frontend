import { action, computed, observable } from 'mobx'

export const observerConfig = {
  productCardModal: observable,

  userInfo: computed,

  onClickTableRow: action.bound,
  onClickProductModal: action.bound,
  onClickShowProduct: action.bound,
}
