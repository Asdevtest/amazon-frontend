import { action, computed, observable } from 'mobx'

export const observerConfig = {
  _storekeepers: observable,
  _productId: observable,
  _currentStorekeeperId: observable,

  storekeepers: computed,
  productId: computed,
  currentStorekeeperId: computed,

  getStorekeepersData: action.bound,
}
