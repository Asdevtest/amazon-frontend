import { action, computed, observable } from 'mobx'

export const shopsViewModelConfig = {
  selectedShop: observable,
  shopModal: observable,
  selectedExportOptions: observable,

  disableUpdateButton: computed,
  exportOptions: computed,

  onRemoveShop: action.bound,
  onEditShop: action.bound,
  onAddShop: action.bound,
  onUpdateShops: action.bound,
  getShopsExport: action.bound,
  onChangeExportOprions: action.bound,
}
