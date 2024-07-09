import { action, observable } from 'mobx'

export const userBalanceConfig = {
  user: observable,
  showReplenishModal: observable,
  showWithdrawModal: observable,

  onTriggerReplenishModal: action.bound,
  onTriggerWithdrawModal: action.bound,
  getUserInfo: action.bound,
  makePayment: action.bound,
}
