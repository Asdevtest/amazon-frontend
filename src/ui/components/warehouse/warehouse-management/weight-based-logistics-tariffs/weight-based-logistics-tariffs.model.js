import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { tariffTypes } from '@constants/keys/tariff-types'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { WeightBasedLogisticsTariffsColumns } from '@components/table/table-columns/warehouse/weight-based-logistics-tariffs'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

export class LogisticsTariffsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  isArchive = false
  yuanToDollarRate = undefined
  storekeeperDestination = undefined

  currentData = []

  logisticsTariffs = []
  tariffToEdit = undefined
  tariffIdToRemove = undefined

  showAddOrEditLogisticTariffModal = false
  showAddOrEditDestinationModal = false
  showConfirmModal = false

  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickSuccess: () => {},
  }

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
    onTriggerArchive: row => this.onTriggerArchiveBtn(row),
  }

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = WeightBasedLogisticsTariffsColumns(
    this.rowHandlers,
    () => this.isArchive,
    () => this.destinationData,
  )

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get userInfo() {
    return UserModel.userInfo
  }

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  constructor({ history }) {
    this.history = history
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.isArchive,
      () => {
        this.loadData()
      },
    )

    reaction(
      () => this.logisticsTariffs,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
  }

  onTriggerArchiveBtn(row) {
    runInAction(() => {
      this.tariffArchiveMove = row
    })

    this.confirmModalSettings = {
      isWarning: false,
      message: row.archive
        ? t(TranslationKey['Are you sure you want to restore the tariff?'])
        : t(TranslationKey['Are you sure you want to move the tariff to the archive?']),
      onClickSuccess: () => this.onSubmitTriggerArchiveBtn(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitTriggerArchiveBtn() {
    try {
      await StorekeeperModel.editLogisticTariff(this.tariffArchiveMove._id, {
        archive: !this.tariffArchiveMove.archive,
      })

      this.onTriggerOpenModal('showConfirmModal')
      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerArchive() {
    runInAction(() => {
      this.isArchive = !this.isArchive
    })
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
    this.getDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.SUB_WAREHOUSE_LOGISTICS_TARIFFS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.SUB_WAREHOUSE_LOGISTICS_TARIFFS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  getCurrentData() {
    return toJS(this.logisticsTariffs)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await this.getLogisticsTariffs()

      this.getDataGridState()

      this.getDestinations()

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  async getDestinations() {
    try {
      const result = await ClientModel.getDestinations()

      const storekeeperDestination = result.find(
        el =>
          el.storekeeper?._id === this.userInfo._id ||
          (el.storekeeper?._id === this.userInfo.masterUser?._id && el.storekeeper),
      )

      // const storekeeperDestination = result.filter(
      //   el =>
      //     el.storekeeper?._id !== this.userInfo._id ||
      //     (el.storekeeper?._id !== this.userInfo.masterUser?._id && el.storekeeper),
      // )

      this.destinationData = result.filter(
        el => el.storekeeper?._id !== this.userInfo._id,
        // ||
        // (el.storekeeper?._id !== this.userInfo.masterUser?._id && el.storekeeper),
      )

      // if (storekeeperDestination) {
      //   runInAction(() => {
      this.storekeeperDestination = storekeeperDestination
      //   })
      // }
    } catch (error) {
      console.log(error)
    }
  }

  setDestinationsFavouritesItem(item) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  onClickAddressBtn() {
    this.onTriggerOpenModal('showAddOrEditDestinationModal')
  }

  async onSubmitChangeDestination(data) {
    try {
      await StorekeeperModel.editStorekeperDestination(data)

      this.onTriggerOpenModal('showAddOrEditDestinationModal')
      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async getLogisticsTariffs() {
    try {
      const result = await StorekeeperModel.getLogisticsTariffs({
        tariffType: tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF,
        archive: this.isArchive,
      })

      runInAction(() => {
        this.logisticsTariffs = addIdDataConverter(result)
      })
    } catch (error) {
      this.logisticsTariffs = []
      console.log(error)
    }
  }

  async onClickEditBtn(row) {
    try {
      this.tariffToEdit = row

      const result = await UserModel.getPlatformSettings()

      this.yuanToDollarRate = result.yuanToDollarRate

      this.onTriggerOpenModal('showAddOrEditLogisticTariffModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitCreateTariff(data) {
    try {
      await StorekeeperModel.createLogisticTariff({
        tariffType: data.tariffType,
        name: data.name,
        description: data.description,
        deliveryTimeInDay: data.deliveryTimeInDay,
        cls: data.cls,
        etd: data.etd,
        eta: data.eta,
        minWeightInKg: Math.min(data.destinationVariations.map(item => Number(item.minWeight))) || 1,
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
        })),
      })

      this.loadData()
      this.onTriggerOpenModal('showAddOrEditLogisticTariffModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitEditTariff(tariffId, data) {
    try {
      await StorekeeperModel.editLogisticTariff(tariffId, {
        name: data.name,
        description: data.description,
        deliveryTimeInDay: data.deliveryTimeInDay,
        cls: data.cls,
        etd: data.etd,
        eta: data.eta,
        minWeightInKg: Math.min(data.destinationVariations.map(item => Number(item.minWeight))) || 1,
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
        })),
      })

      this.loadData()
      this.onTriggerOpenModal('showAddOrEditLogisticTariffModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onClickAddBtn() {
    try {
      this.tariffToEdit = undefined

      const result = await UserModel.getPlatformSettings()

      this.yuanToDollarRate = result.yuanToDollarRate

      this.onTriggerOpenModal('showAddOrEditLogisticTariffModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickCancelBtn() {
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['Data will not be saved!']),
      onClickSuccess: () => this.cancelTheOrder(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  cancelTheOrder() {
    this.onTriggerOpenModal('showAddOrEditLogisticTariffModal')
    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRemoveBtn(row) {
    this.tariffIdToRemove = row._id

    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the tariff?']),
      onClickSuccess: () => this.removeTariff(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async removeTariff() {
    try {
      await StorekeeperModel.removeLogisticTariff(this.tariffIdToRemove)
      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
