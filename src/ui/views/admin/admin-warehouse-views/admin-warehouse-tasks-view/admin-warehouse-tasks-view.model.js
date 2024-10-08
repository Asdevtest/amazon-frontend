import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { AdministratorModel } from '@models/administrator-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { adminTasksViewColumns } from '@components/table/table-columns/admin/tasks-columns'

import { loadingStatus } from '@typings/enums/loading-status'

export class AdminWarehouseTasksViewModel {
  requestStatus = undefined

  curOpenedTask = undefined
  tasksData = []

  get currentData() {
    return this.tasksData
  }

  showTaskInfoModal = false

  rowHandlers = {
    setCurrentOpenedTask: item => this.setCurrentOpenedTask(item),
  }
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = adminTasksViewColumns(this.rowHandlers)
  paginationModel = { page: 0, pageSize: 15 }
  rowsCount = 0
  columnVisibilityModel = {}

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    try {
      this.getDataGridState()

      this.getTasks()
    } catch (error) {
      console.error(error)
    }
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getTasks()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
    this.getTasks()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.ADMIN_TASKS)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.ADMIN_TASKS)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel)
      this.rowsPerPage = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      this.columnsModel = adminTasksViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getTasks()
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  async getTasks() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await AdministratorModel.getTasksPag({
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.tasksData = result.rows
        this.rowsCount = result.count
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)

      runInAction(() => {
        this.tasksVacant = []
        this.rowsCount = 0
      })
    }
  }

  async setCurrentOpenedTask(item) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const task = await StorekeeperModel.getTaskById(item._id)

      runInAction(() => {
        this.curOpenedTask = task
      })

      this.onTriggerOpenModal('showTaskInfoModal')

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
