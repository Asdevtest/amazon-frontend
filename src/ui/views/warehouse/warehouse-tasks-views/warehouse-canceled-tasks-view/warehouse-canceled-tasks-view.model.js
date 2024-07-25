import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TaskStatus, mapTaskStatusEmumToKey } from '@constants/task/task-status'

import { OtherModel } from '@models/other-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { TableSettingsModel } from '@models/table-settings'

import { warehouseCanceledTasksViewColumns } from '@components/table/table-columns/warehouse/canceled-tasks-columns'

import { warehouseTasksDataConverter } from '@utils/data-grid-data-converters'
import { objectToUrlQs } from '@utils/text'

import { loadingStatus } from '@typings/enums/loading-status'

export class WarehouseCanceledTasksViewModel {
  history = undefined
  requestStatus = undefined

  tasksMy = []
  curOpenedTask = {}

  nameSearchValue = ''

  curTaskType = null
  curTaskPriority = null

  selectedTasks = []

  rowHandlers = {
    setCurrentOpenedTask: item => this.setCurrentOpenedTask(item),
  }

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}
  densityModel = 'compact'
  columnsModel = warehouseCanceledTasksViewColumns(this.rowHandlers)

  showTaskInfoModal = false

  get currentData() {
    return this.tasksMy
  }

  get platformSettings() {
    return SettingsModel.platformSettings
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.WAREHOUSE_CANCELED_TASKS)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.WAREHOUSE_CANCELED_TASKS)

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getTasksMy()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
    this.getTasksMy()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getTasksMy()
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getTasksMy()
  }

  onClickOperationTypeBtn(type) {
    this.curTaskType = type

    this.getTasksMy()
  }

  onClickTaskPriorityBtn(type) {
    this.curTaskPriority = type

    this.getTasksMy()
  }

  onSelectionModel(model) {
    this.selectedTasks = model
  }

  onClickReportBtn() {
    this.setRequestStatus(loadingStatus.IS_LOADING)
    this.selectedTasks.forEach((el, index) => {
      const taskId = el

      OtherModel.getReportTaskByTaskId(taskId).then(() => {
        if (index === this.selectedTasks.length - 1) {
          this.setRequestStatus(loadingStatus.SUCCESS)
        }
      })
    })
  }

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
  }

  loadData() {
    try {
      this.getDataGridState()
      this.getTasksMy()
    } catch (error) {
      console.error(error)
    }
  }

  async setCurrentOpenedTask(item) {
    try {
      const response = await StorekeeperModel.getTaskById(item._id)

      runInAction(() => {
        this.curOpenedTask = response
      })

      this.onTriggerOpenModal('showTaskInfoModal')
    } catch (error) {
      console.error(error)
    }
  }

  async getTasksMy() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const filter = objectToUrlQs({
        or: [
          { asin: { $contains: this.nameSearchValue } },
          {
            trackNumberText: {
              [`${
                isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue)) ? '$contains' : '$eq'
              }`]: this.nameSearchValue,
            },
          },
          { id: { $eq: this.nameSearchValue } },
          { item: { $eq: this.nameSearchValue } },
        ].filter(
          el =>
            ((isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))) && !el.id) ||
            !(isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))),
        ),
      })

      const result = await StorekeeperModel.getLightTasksWithPag({
        status: mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED],
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        filters: this.nameSearchValue ? filter : null,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
        operationType: this.curTaskType,
        priority: this.curTaskPriority,
      })

      runInAction(() => {
        this.rowCount = result.count

        this.tasksMy = warehouseTasksDataConverter(result.rows.map(el => ({ ...el, beforeBoxes: el.boxesBefore })))
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.tasksMy = []
      })
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
