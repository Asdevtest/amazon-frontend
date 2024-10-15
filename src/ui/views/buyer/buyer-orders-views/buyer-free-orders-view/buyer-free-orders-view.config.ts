import { action, observable } from 'mobx'

export const observerConfig = {
  curOrder: observable,
  showVerticalChoicesModal: observable,

  goToMyOrders: action.bound,
  onClickTableRowBtn: action.bound,
  onPickupSomeItems: action.bound,
  onClickContinueWorkButton: action.bound,
}
