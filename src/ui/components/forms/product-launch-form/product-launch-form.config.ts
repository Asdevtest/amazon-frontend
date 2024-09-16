import { action, computed, observable } from 'mobx'

export const productLaunchConfig = {
  radioValue: observable,
  selectedProduct: observable,

  disabledSubmit: computed,
  asinOptions: computed,

  onChangeRadioValue: action.bound,
  onChangeProduct: action.bound,
  onGetProducts: action.bound,
  onPopupScroll: action.bound,
  onDropdownVisibleChange: action.bound,
}

export enum RadioValue {
  NEW = 0,
  VARIATION = 1,
}
