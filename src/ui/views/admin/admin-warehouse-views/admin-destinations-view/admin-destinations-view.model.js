import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { ClientModel } from '@models/client-model'
import { TableSettingsModel } from '@models/table-settings'

import { destinationsColumns } from '@components/table/table-columns/admin/destinations-columns'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

export class AdminDestinationsViewModel {
  history = undefined
  requestStatus = undefined

  destinations = []
  logisticsDestinations = []
  destinationToEdit = undefined
  destinationIdToRemove = undefined

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
  }

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = destinationsColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get currentData() {
    return this.destinations
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.ADMIN_DESTINATIONS)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.ADMIN_DESTINATIONS)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  loadData() {
    try {
      this.getDataGridState()
      this.getDestinations()
    } catch (error) {
      console.error(error)
    }
  }

  async getDestinations() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = addIdDataConverter(result)
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      runInAction(() => {
        this.destinations = []
      })
      console.error(error)

      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  onClickEditBtn(row) {
    this.destinationToEdit = row

    this.onTriggerOpenModal('showAddOrEditDestinationModal')
  }

  async onSubmitCreateDestination(data) {
    try {
      await AdministratorModel.createDestination(data)

      this.onTriggerOpenModal('showAddOrEditDestinationModal')

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitEditDestination(data, destinationId) {
    try {
      await AdministratorModel.editDestination(destinationId, data)

      this.onTriggerOpenModal('showAddOrEditDestinationModal')

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onClickAddBtn() {
    this.destinationToEdit = undefined

    this.onTriggerOpenModal('showAddOrEditDestinationModal')
  }

  onClickCancelBtn() {
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['The data will not be saved!']),
      onClickSuccess: () => this.cancelTheOrder(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  cancelTheOrder() {
    this.onTriggerOpenModal('showAddOrEditDestinationModal')
    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRemoveBtn(row) {
    this.destinationIdToRemove = row._id

    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the destination?']),
      onClickSuccess: () => this.removeDestination(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async removeDestination() {
    try {
      await AdministratorModel.removeDestination(this.destinationIdToRemove)

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
