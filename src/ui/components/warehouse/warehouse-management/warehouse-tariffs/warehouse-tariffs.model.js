import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'

import { warehouseTariffsColumns } from '@components/table/table-columns/warehouse/warehouse-tariffs-columns'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

export class WarehouseTariffModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  warehouseTariffs = []
  tariffToEdit = undefined
  tariffIdToRemove = undefined

  showAddOrEditWarehouseTariffModal = false
  showConfirmModal = false

  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickSuccess: () => {},
  }

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = warehouseTariffsColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  constructor({ history }) {
    this.history = history
    makeAutoObservable(this, undefined, { autoBind: true })
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
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_SELF_TARIFFS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_SELF_TARIFFS]

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
    return toJS(this.warehouseTariffs)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await this.getWarehouseTariffs()

      this.getDataGridState()

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  async getWarehouseTariffs() {
    try {
      const result = await StorekeeperModel.getWarehouseTariffs()

      runInAction(() => {
        this.warehouseTariffs = addIdDataConverter(result)
      })
    } catch (error) {
      this.warehouseTariffs = []
      console.log(error)
    }
  }

  onClickEditBtn(row) {
    this.tariffToEdit = row

    this.onTriggerOpenModal('showAddOrEditWarehouseTariffModal')
  }

  async onSubmitCreateTariff(data) {
    try {
      await StorekeeperModel.createWarehouseTariff(data)

      this.onTriggerOpenModal('showAddOrEditWarehouseTariffModal')
      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitEditTariff(tariffId, data) {
    try {
      await StorekeeperModel.editWarehouseTariff(tariffId, data)

      this.onTriggerOpenModal('showAddOrEditWarehouseTariffModal')
      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickAddBtn() {
    this.tariffToEdit = undefined

    this.onTriggerOpenModal('showAddOrEditWarehouseTariffModal')
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
    this.onTriggerOpenModal('showAddOrEditWarehouseTariffModal')
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
      await StorekeeperModel.removeWarehouseTariff(this.tariffIdToRemove)

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
