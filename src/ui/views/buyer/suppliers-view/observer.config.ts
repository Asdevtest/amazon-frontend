import { action, observable } from 'mobx'

export const observerConfig = {
  currentTable: observable,

  showAddSupplierModal: observable,

  onChangeRadioButtonOption: action.bound,
  onClickCreateSupplier: action.bound,
}
