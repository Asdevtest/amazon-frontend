import { action, computed, observable, override } from 'mobx'

export const observerConfig = {
  curOrder: observable,
  showTwoVerticalChoicesModal: observable,

  isSomeFilterOn: computed,

  onClickResetFilters: action.bound,
  goToMyOrders: action.bound,
  onClickTableRowBtn: action.bound,
  onPickupSomeItems: action.bound,
  onClickContinueWorkButton: action.bound,
}
