import { action, observable } from 'mobx'

export const observerConfig = {
  currentTable: observable,

  supplierIdToShow: observable,
  supplierIdToEdit: observable,
  isSupplierCardsActive: observable,
  supplierCardIdToEdit: observable,
  tablesHandlers: observable,
  showOnlySupplierId: observable,

  showSupplierModal: observable,
  showAddSupplierModal: observable,
  showAddSupplierProductModal: observable,
  showBindSupplierCardToProductModal: observable,

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
  onOpenSupplierModal: action.bound,
  onCloseSupplierModal: action.bound,
  onClickBindProduct: action.bound,
  onCloseBindProductModal: action.bound,
}
