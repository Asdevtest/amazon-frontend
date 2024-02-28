import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { ClientModel } from '@models/client-model'
import { SettingsModel } from '@models/settings-model'

import { destinationsColumns } from '@components/table/table-columns/admin/destinations'

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

  get currentData() {
    return this.destinations
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    try {
      this.getDataGridState()

      this.getDestinations()
    } catch (error) {
      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getDestinations() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const response = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = addIdDataConverter(response)
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
      this.destinations = []
    }
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_DESTINATIONS]

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
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
      await AdministratorModel.createDestination(data)

      this.onClickToggleAddOrEditModal()

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async onEditDestination(data, destinationId) {
    try {
      await AdministratorModel.editDestination(destinationId, data)

      this.onClickToggleAddOrEditModal()

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async onRemoveDestination() {
    try {
      await AdministratorModel.removeDestination(this.destinationIdToRemove)

      this.onClickToggleConfirmModal()

      this.loadData()
    } catch (error) {
      console.log(error)
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
