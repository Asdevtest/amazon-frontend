import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { AdministratorModel } from '@models/administrator-model'
import { GeneralModel } from '@models/general-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { adminTasksViewColumns } from '@components/table/table-columns/admin/tasks-columns'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getTableByColumn, objectToUrlQs } from '@utils/text'

const filtersFields = []

export class AdminWarehouseTasksViewModel {
  history = undefined
  requestStatus = undefined

  tasksData = []
  curOpenedTask = {}
  currentData = []

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

  showTaskInfoModal = false

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.tasksData,
      () => (this.currentData = this.getCurrentData()),
    )
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getDataGridState()

      await this.getTasks()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_TASKS]

    runInAction(() => {
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
    })
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

  getCurrentData() {
    return toJS(this.tasksData)
  }

  async getTasks() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await AdministratorModel.getTasksPag({
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

        filters: this.getFilters(),
      })

      runInAction(() => {
        this.tasksData = result.rows
        this.rowsCount = result.count
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)

      if (error.body.message === 'По данному запросу ничего не найдено.') {
        runInAction(() => {
          this.tasksVacant = []
        })
      }
    }
  }

  async setCurrentOpenedTask(item) {
    try {
      const [task, result] = await Promise.all([
        StorekeeperModel.getTaskById(item._id),
        UserModel.getPlatformSettings(),
      ])

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
        this.curOpenedTask = task
      })
      this.onTriggerOpenModal('showTaskInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  // * Filtration

  getFilters(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(this.columnMenuSettings, '', exclusion, filtersFields, [
        'asin',
        'skusByClient',
        'amazonTitle',
      ]),
    )
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
    this.getTasks()
  }

  onClickResetFilters() {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      ...dataGridFiltersInitializer(filtersFields),
    }

    this.getTasks()
    this.getDataGridState()
  }

  setFilterRequestStatus(requestStatus) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      filterRequestStatus: requestStatus,
    }
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatuses.isLoading)

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'tasks'),
        column,

        `admins/orders/pag?filters=${this.getFilters(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }

      this.setFilterRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      [field]: {
        ...this.columnMenuSettings[field],
        currentFilterData: value,
      },
    }
  }
}
