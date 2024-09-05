import { RadioChangeEvent } from 'antd'
import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { tariffTypes } from '@constants/keys/tariff-types'

import { ClientModel } from '@models/client-model'
import { DataGridTableModel } from '@models/data-grid-table-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { IDestination } from '@typings/shared/destinations'
import { IFullUser } from '@typings/shared/full-user'
import { ILogicTariff } from '@typings/shared/logic-tariff'
import { IPlatformSettings } from '@typings/shared/patform-settings'

import { getColumns } from './helpers/get-columns'
import { getMainDataMethod } from './helpers/get-main-data-method'
import { getTableKey } from './helpers/get-table-key'
import { logisticsTariffsColumns } from './warehouse-logistics-tariffs.columns'
import { warehouseTariffsConfig } from './warehouse-management.config'
import { WarehouseTabs } from './warehouse-management.types'

export class WarehouseTariffModel extends DataGridTableModel {
  tariffToEdit?: ILogicTariff
  showAddOrEditWarehouseTariffModal = false
  tabIndex = WarehouseTabs.LOGISTICS_TARIFFS
  isArchive = false
  storekeeperDestination?: IDestination
  showAddOrEditLogisticTariffModal = false
  showAddOrEditDestinationModal = false
  destinationData: IDestination[] = []

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }
  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }
  get platformSettings() {
    return UserModel.platformSettings as unknown as IPlatformSettings
  }

  constructor() {
    const columnsProps = {
      onRemoveWarehouseTariff: (id: string) => this.onRemoveWarehouseTariff(id),
      onClickEditTariff: (row: ILogicTariff) => this.onClickEditTariff(row),
      onRemoveLogisticTariff: (id: string) => this.onRemoveLogisticTariff(id),
      onTriggerArchive: (row: ILogicTariff) => this.onTriggerArchive(row),
      isArchive: () => this.isArchive,
    }

    const defaultGetCurrentDataOptions = () => {
      if (this.tabIndex === WarehouseTabs.LOGISTICS_TARIFFS) {
        return {
          tariffType: tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF,
          archive: this.isArchive,
        }
      } else {
        return {}
      }
    }

    super({
      getMainDataMethod: StorekeeperModel.getLogisticsTariffs,
      columnsModel: logisticsTariffsColumns(columnsProps),
      tableKey: DataGridTablesKeys.WAREHOUSE_MANAGEMENT_LOGISTICS_TARIFFS,
      fieldsForSearch: ['name'],
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
      defaultGetCurrentDataOptions,
    })

    this.getTableSettingsPreset()
    this.getDestinations()

    makeObservable(this, warehouseTariffsConfig)
  }

  onClickAddWarehouseTariff() {
    this.tariffToEdit = undefined
    this.onTriggerOpenModal('showAddOrEditWarehouseTariffModal')
  }

  onClickEditTariff(row: ILogicTariff) {
    this.tariffToEdit = row
    this.tabIndex
      ? this.onTriggerOpenModal('showAddOrEditWarehouseTariffModal')
      : this.onTriggerOpenModal('showAddOrEditLogisticTariffModal')
  }

  async onCreateWarehouseTariff(data: ILogicTariff) {
    try {
      await StorekeeperModel.createWarehouseTariff(data)

      this.onTriggerOpenModal('showAddOrEditWarehouseTariffModal')
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onEditWarehouseTariff(id: string, data: ILogicTariff) {
    try {
      await StorekeeperModel.editWarehouseTariff(id, data)

      this.onTriggerOpenModal('showAddOrEditWarehouseTariffModal')

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onRemoveWarehouseTariff(id: string) {
    try {
      await StorekeeperModel.removeWarehouseTariff(id)
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  onChangeTabIndex(event: RadioChangeEvent) {
    const currentValue = event.target.value
    this.tabIndex = currentValue
    this.tableKey = getTableKey(currentValue)

    const columnsProps = {
      onRemoveWarehouseTariff: (id: string) => this.onRemoveWarehouseTariff(id),
      onClickEditTariff: (row: ILogicTariff) => this.onClickEditTariff(row),
      onRemoveLogisticTariff: (id: string) => this.onRemoveLogisticTariff(id),
      onTriggerArchive: (row: ILogicTariff) => this.onTriggerArchive(row),
      isArchive: () => this.isArchive,
    }

    this.getMainDataMethod = getMainDataMethod(this.tabIndex)
    const columns = getColumns(this.tabIndex)(columnsProps)

    this.columnsModel = columns
    this.defaultColumnsModel = columns

    this.getTableSettingsPreset()
  }

  onToggleArchive() {
    this.isArchive = !this.isArchive
    this.getCurrentData()
  }

  async onTriggerArchive(row: ILogicTariff) {
    try {
      await StorekeeperModel.editLogisticTariff(row._id, { archive: !row.archive })

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async getDestinations() {
    try {
      const result = (await ClientModel.getDestinations()) as unknown as IDestination[]

      this.destinationData = result.filter(el => el.storekeeper?._id !== this.userInfo._id)
      const storekeeperDestination = result.find(
        el =>
          el.storekeeper?._id === this.userInfo?._id ||
          (el.storekeeper?._id === this.userInfo?.masterUser?._id && el.storekeeper),
      )

      if (storekeeperDestination) {
        this.storekeeperDestination = storekeeperDestination
      }
    } catch (error) {
      console.error(error)
    }
  }

  setDestinationsFavouritesItem(item: IDestination) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  async onChangeDestination(data: IDestination) {
    try {
      await StorekeeperModel.editStorekeperDestination(data)

      this.getDestinations()
      this.onTriggerOpenModal('showAddOrEditDestinationModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onCreateLogicticTariff(data: ILogicTariff) {
    try {
      const requestData = {
        tariffType: data.tariffType,
        name: data.name,
        description: data.description,
        deliveryTimeInDay: data.deliveryTimeInDay,
        cls: data.cls,
        etd: data.etd,
        eta: data.eta,
        minWeightInKg: Math.min(...data.destinationVariations.map(item => Number(item.minWeight))) || 1,
        archive: data.archive,
        conditionsByRegion: {
          west: {
            rate: null,
          },
          central: {
            rate: null,
          },
          east: {
            rate: null,
          },
          yuanToDollarRate: data.yuanToDollarRate,
        },
        destinationVariations: data.destinationVariations.map(destinationVariation => ({
          destinationId: destinationVariation?.destination?._id,
          minWeight: destinationVariation?.minWeight,
          maxWeight: destinationVariation?.maxWeight,
          pricePerKgRmb: destinationVariation?.pricePerKgRmb,
          pricePerKgUsd: destinationVariation?.pricePerKgUsd,
          minBoxWeight: Number(destinationVariation?.minBoxWeight),
        })),
      }
      await StorekeeperModel.createLogisticTariff(requestData)

      this.onTriggerOpenModal('showAddOrEditLogisticTariffModal')

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onEditLogisticTariff(id: string, data: ILogicTariff) {
    try {
      const requestData = {
        name: data.name,
        description: data.description,
        deliveryTimeInDay: data.deliveryTimeInDay,
        cls: data.cls,
        etd: data.etd,
        eta: data.eta,
        minWeightInKg: Math.min(...data.destinationVariations.map(item => Number(item.minWeight))) || 1,
        archive: data.archive,
        conditionsByRegion: {
          west: {
            rate: null,
          },
          central: {
            rate: null,
          },
          east: {
            rate: null,
          },
          yuanToDollarRate: data.yuanToDollarRate,
        },
        destinationVariations: data.destinationVariations.map(destinationVariation => ({
          _id: destinationVariation._id,
          destinationId: destinationVariation?.destination?._id,
          minWeight: destinationVariation?.minWeight,
          maxWeight: destinationVariation?.maxWeight,
          pricePerKgRmb: destinationVariation?.pricePerKgRmb,
          pricePerKgUsd: destinationVariation?.pricePerKgUsd,
          minBoxWeight: Number(destinationVariation?.minBoxWeight),
        })),
      }
      await StorekeeperModel.editLogisticTariff(id, requestData)

      this.onTriggerOpenModal('showAddOrEditLogisticTariffModal')

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onRemoveLogisticTariff(id: string) {
    try {
      await StorekeeperModel.removeLogisticTariff(id)

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }
}
