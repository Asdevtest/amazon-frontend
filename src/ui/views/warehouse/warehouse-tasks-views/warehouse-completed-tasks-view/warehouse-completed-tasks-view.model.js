import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TaskStatus, mapTaskStatusEmumToKey } from '@constants/task/task-status'

import { OtherModel } from '@models/other-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { warehouseCompletedTasksViewColumns } from '@components/table/table-columns/warehouse/completed-tasks-columns'

import { warehouseTasksDataConverter } from '@utils/data-grid-data-converters'
import { objectToUrlQs } from '@utils/text'

import { loadingStatus } from '@typings/enums/loading-status'

export class WarehouseCompletedViewModel {
  history = undefined
  requestStatus = undefined

  completedTasks = []
  completedTasksBase = []
  curOpenedTask = {}

  selectedTasks = []

  curTaskType = null
  curTaskPriority = null

  nameSearchValue = ''

  rowHandlers = {
    setCurrentOpenedTask: item => this.setCurrentOpenedTask(item),
  }

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}
  densityModel = 'compact'
  columnsModel = warehouseCompletedTasksViewColumns(this.rowHandlers)

  showTaskInfoModal = false

  get currentData() {
    return this.completedTasks
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.WAREHOUSE_COMPLETED_TASKS)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.WAREHOUSE_COMPLETED_TASKS)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getCompletedTasksPagMy()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
    this.getCompletedTasksPagMy()
  }

  onClickOperationTypeBtn(event) {
    const currentValue = event.target.value
    this.curTaskType = currentValue

    this.getCompletedTasksPagMy()
  }

  onClickTaskPriorityBtn(event) {
    const currentValue = event.target.value
    this.curTaskPriority = currentValue

    this.getCompletedTasksPagMy()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getCompletedTasksPagMy()
  }

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
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

  loadData() {
    try {
      this.getDataGridState()
      this.getCompletedTasksPagMy()
    } catch (error) {
      console.error(error)
    }
  }

  async getCompletedTasksPagMy() {
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
        status: mapTaskStatusEmumToKey[TaskStatus.SOLVED],
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

        this.completedTasksBase = result.rows

        this.completedTasks = warehouseTasksDataConverter(
          this.completedTasksBase.map(el => ({ ...el, beforeBoxes: el.boxesBefore })),
        )
      })
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      runInAction(() => {
        this.batches = []
        this.completedTasks = []
      })
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue.trim()

    this.getCompletedTasksPagMy()
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

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
