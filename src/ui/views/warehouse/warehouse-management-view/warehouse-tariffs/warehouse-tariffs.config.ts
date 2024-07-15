import { action, observable } from 'mobx'

export const warehouseTariffsConfig = {
  tariffToEdit: observable,
  showAddOrEditWarehouseTariffModal: observable,

  onClickEditTariff: action.bound,
  onCreateTariff: action.bound,
  onEditTariff: action.bound,
  onRemoveTariff: action.bound,
}
