import { action, computed, observable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { WarehouseTabs } from './warehouse-management.types'

export const warehouseTariffsConfig = {
  tariffToEdit: observable,
  showAddOrEditWarehouseTariffModal: observable,
  tabIndex: observable,
  isArchive: observable,
  storekeeperDestination: observable,
  showAddOrEditLogisticTariffModal: observable,
  showAddOrEditDestinationModal: observable,
  destinationData: observable,

  userInfo: computed,
  destinationsFavourites: computed,
  platformSettings: computed,

  onClickEditTariff: action.bound,
  onCreateWarehouseTariff: action.bound,
  onEditWarehouseTariff: action.bound,
  onRemoveWarehouseTariff: action.bound,
  onChangeTabIndex: action.bound,
  onToggleArchive: action.bound,
  onTriggerArchive: action.bound,
  getDestinations: action.bound,
  setDestinationsFavouritesItem: action.bound,
  onChangeDestination: action.bound,
  onCreateLogicticTariff: action.bound,
  onEditLogisticTariff: action.bound,
  onRemoveLogisticTariff: action.bound,
  onClickAddWarehouseTariff: action.bound,
  onClickAddLogisticTariff: action.bound,
}

export const createSwitcherConfig = () => [
  { label: t(TranslationKey['Weight-based logistics tariffs']), value: WarehouseTabs.LOGISTICS_TARIFFS },
  { label: t(TranslationKey['Tariffs of warehouse services']), value: WarehouseTabs.WAREHOUSE_SERVICES },
]
