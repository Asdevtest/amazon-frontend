import { action, computed, observable, override } from 'mobx'

export const supervisorProductsConfig = {
  switcherFilterStatuses: observable,

  isSomeFilterOn: override,

  userInfo: computed,

  onClickStatusFilterButton: action.bound,
  onClickTableRow: action.bound,
  onClickProductModal: action.bound,
}

export const additionalFields = ['asin', 'amazonTitle', 'skuByClient']
