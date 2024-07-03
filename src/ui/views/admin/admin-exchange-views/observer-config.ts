import { action, observable } from 'mobx'

export const observerConfig = {
  productCardModal: observable,
  activeCategory: observable,

  onChangeSubCategory: action.bound,
  onClickTableRow: action.bound,
  onClickShowProduct: action.bound,
  onClickProductModal: action.bound,
}
