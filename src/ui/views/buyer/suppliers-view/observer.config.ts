import { action, observable } from 'mobx'

export const observerConfig = {
  currentTable: observable,

  onChangeRadioButtonOption: action.bound,
}
