import { action, observable } from 'mobx'

export const observerConfig = {
  activeCategory: observable,

  onClickTableRow: action.bound,
  onChangeActiveCategory: action.bound,
}
