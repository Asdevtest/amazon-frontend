import { BaseOptionType } from 'antd/es/select'
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

export const createSelectLabel = (label: BaseOptionType) => {
  // The key contains the counter value, and if the counter is null, the key equals the value.
  return Number.isInteger(label.key) ? `${label.label} (${label.key})` : label.label
}
