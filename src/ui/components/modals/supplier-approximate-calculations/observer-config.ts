import { action, computed, observable, override } from 'mobx'

export const observerConfig = {
  storekeepers: observable,
  productId: observable,
  supplierId: observable,
  orderId: observable,

  boxId: observable,
  boxData: observable,
  currentVariationId: observable,
  initialDestinationId: observable,
  currentDestinationId: observable,
  currentLogicsTariffId: observable,
  currentStorekeeperId: observable,

  isStrictVariationSelect: observable,
  boxItems: observable,
  handleSave: observable,

  role: computed,

  getStorekeepersData: action.bound,
  setCurrentStorekeeper: action.bound,
  getBoxData: action.bound,
  handleChangeStrictVariation: action.bound,
  handleSetVariation: action.bound,
  handleChangeActiveProduct: action.bound,
  setMainMethodURL: action.bound,
  handleSaveVariationTariff: action.bound,
  handleResetVariationTariff: action.bound,
  setActualData: action.bound,

  onClickResetFilters: override,
  isSomeFilterOn: override,
}
