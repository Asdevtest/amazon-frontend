import { action, observable } from 'mobx'

export const observerConfig = {
  paymentType: observable,
  entityType: observable,

  handleSetPaymentType: action.bound,
  handleSetEntityType: action.bound,
}
