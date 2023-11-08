import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { ClientModel } from '@models/client-model'
import { SettingsModel } from '@models/settings-model'

import { destinationsColumns } from '@components/table/table-columns/admin/destinations-columns'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

export class AdminSettingsDestinationsModel {
  requestStatus = undefined

  destinations = []

  showConfirmModal = false
  showAddOrEditDestinationModal = false

  sortModel = []
  filterModel = { items: [] }
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  destinationToEdit = undefined
  destinationIdToRemove = undefined
  confirmModalSettings = {
    isWarning: true,
    message: '',
    onClickSuccess: () => {},
  }
  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }

  columnsModel = destinationsColumns(this.rowHandlers)

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()

      await this.getDestinations()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getDestinations() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await ClientModel.getDestinations().then(result => {
        runInAction(() => {
          this.destinations = addIdDataConverter(result)
        })
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.destinations = []

      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  getCurrentData() {
    return toJS(this.destinations)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_DESTINATIONS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_DESTINATIONS)
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  onChangePaginationModel(model) {
    this.paginationModel = model

    this.setDataGridState()
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
  }

  onClickRemoveBtn(row) {
    this.destinationIdToRemove = row._id
    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the destination?']),
      onClickSuccess: () => this.onRemoveDestination(),
    }

    this.onClickToggleConfirmModal()
  }

  onClickEditBtn(row) {
    this.destinationToEdit = row

    this.onClickToggleAddOrEditModal()
  }

  onClickAddBtn() {
    this.destinationToEdit = undefined

    this.onClickToggleAddOrEditModal()
  }

  onClickCancelBtn() {
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['The data will not be saved!']),
      onClickSuccess: () => this.cancelTheOrder(),
    }

    this.onClickToggleConfirmModal()
  }

  cancelTheOrder() {
    this.onClickToggleAddOrEditModal()
    this.onClickToggleConfirmModal()
  }

  async onCreateDestination(data) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.createDestination(data)

      this.onClickToggleAddOrEditModal()

      await this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onEditDestination(data, destinationId) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.editDestination(destinationId, data)

      this.onClickToggleAddOrEditModal()

      await this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onRemoveDestination() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.removeDestination(this.destinationIdToRemove)

      this.onClickToggleConfirmModal()

      await this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  onClickToggleAddOrEditModal() {
    this.onTriggerOpenModal('showAddOrEditDestinationModal')
  }

  onClickToggleConfirmModal() {
    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
