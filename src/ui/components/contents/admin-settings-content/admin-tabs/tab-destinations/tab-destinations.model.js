import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'
import { ClientModel } from '@models/client-model'
import { AdministratorModel } from '@models/administrator-model'

import { destinationsColumns } from '@components/table/table-columns/admin/destinations-columns'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

export class AdminSettingsDestinationsModel {
  history = undefined

  destinations = []

  requestStatus = ''

  showConfirmModal = false
  showAddOrEditDestinationModal = false

  sortModel = []
  filterModel = { items: [] }
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  destinationToEditToEdit = undefined
  destinationIdToRemove = undefined
  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickSuccess: () => {},
  }
  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }

  columnsModel = destinationsColumns(this.rowHandlers)

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getDestinations()

      this.getDataGridState()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  async getDestinations() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = addIdDataConverter(result)
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
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
  }

  onChangePaginationModel(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })

    this.setDataGridState()
  }

  onClickRemoveBtn(row) {
    runInAction(() => {
      this.destinationIdToRemove = row._id
      this.confirmModalSettings = {
        isWarning: true,
        message: t(TranslationKey['Are you sure you want to delete the destination?']),
        onClickSuccess: () => this.removeDestination(),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickEditBtn(row) {
    runInAction(() => {
      this.destinationToEdit = row
    })

    this.onTriggerOpenModal('showAddOrEditDestinationModal')
  }

  onClickAddBtn() {
    runInAction(() => {
      this.destinationToEdit = undefined
    })

    this.onTriggerOpenModal('showAddOrEditDestinationModal')
  }

  onClickCancelBtn() {
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: false,
        message: t(TranslationKey['The data will not be saved!']),
        onClickSuccess: () => this.cancelTheOrder(),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  cancelTheOrder() {
    this.onTriggerOpenModal('showAddOrEditDestinationModal')
    this.onTriggerOpenModal('showConfirmModal')
  }

  async createDestination(data) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.createDestination(data)

      this.onTriggerOpenModal('showAddOrEditDestinationModal')

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async editDestination(data, destinationId) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.editDestination(destinationId, data)

      this.onTriggerOpenModal('showAddOrEditDestinationModal')

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async removeDestination() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.removeDestination(this.destinationIdToRemove)

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
