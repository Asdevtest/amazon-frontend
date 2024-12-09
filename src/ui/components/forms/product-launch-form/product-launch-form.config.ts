import { action, computed, observable } from 'mobx'

export const productLaunchConfig = {
  radioValue: observable,
  selectedProduct: observable,

  disabledSubmit: computed,
  asinOptions: computed,
  defaultAsinOption: computed,

  onChangeRadioValue: action.bound,
  onChangeProduct: action.bound,
  onDropdownVisibleChange: action.bound,
}

export enum RadioValue {
  NEW,
  VARIATION,
}
