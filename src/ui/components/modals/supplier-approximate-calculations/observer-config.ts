import { action, computed, observable, override } from 'mobx'

export const observerConfig = {
  _storekeepers: observable,
  _productId: observable,
  _currentStorekeeperId: observable,

  storekeepers: computed,
  productId: computed,
  currentStorekeeperId: computed,

  getStorekeepersData: action.bound,
  setCurrentStorekeeper: action.bound,

  onClickResetFilters: override,
}
