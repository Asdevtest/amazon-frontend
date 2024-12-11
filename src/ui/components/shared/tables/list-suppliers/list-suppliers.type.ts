export enum ModalNames {
  SUPPLIER = 'showAddOrEditSupplierModal',
  CALCULATION = 'showSupplierApproximateCalculationsModal',
  CONFIRM = 'showConfirmModal',
  SUPPLIER_CARD = 'showAddSupplierProductModal',
  BIND_SUPPLIER_CARD_TO_PRODUCT = 'showBindSupplierCardToProductModal',
}

export enum ModalModes {
  ADD,
  ADD_SUPPLIER_CARD,
  ADD_SUPPLIER_CARD_TO_PRODUCT,
  EDIT,
  VIEW,
  ACCEPT,
  ACCERT_REVOKE,
  DELETE,
}
