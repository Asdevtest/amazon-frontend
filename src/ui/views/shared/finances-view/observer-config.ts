import { action, computed, observable } from 'mobx'

export const observerConfig = {
  paymentType: observable,
  entityType: observable,

  userRole: computed,

  handleSetPaymentType: action.bound,
  handleSetEntityType: action.bound,
}
