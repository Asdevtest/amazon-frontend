import { action, observable } from 'mobx'

export const observerConfig = {
  currentTable: observable,

  supplierIdToEdit: observable,
  isSupplierCardsActive: observable,
  supplierCardIdToEdit: observable,
  tablesHandlers: observable,

  showAddSupplierModal: observable,
  showAddSupplierProductModal: observable,

  onChangeRadioButtonOption: action.bound,
  onClickCreateSupplier: action.bound,
  onClickEdit: action.bound,
  onClickDelete: action.bound,
  onCloseAddSupplierModal: action.bound,
  onCloseAddSupplierProductModal: action.bound,
  onClickAddSupplierProduct: action.bound,
  onClickEditSupplierCard: action.bound,
  onClickDeleteSupplierCard: action.bound,
  onTriggerArchive: action.bound,
}
