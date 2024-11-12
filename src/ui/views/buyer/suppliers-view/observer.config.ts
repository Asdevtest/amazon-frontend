import { action, observable } from 'mobx'

export const observerConfig = {
  currentTable: observable,

  supplierIdToEdit: observable,

  showAddSupplierModal: observable,

  onChangeRadioButtonOption: action.bound,
  onClickCreateSupplier: action.bound,
  onClickEdit: action.bound,
  onClickDelete: action.bound,
}
