import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TaskStatus, mapTaskStatusEmumToKey } from '@constants/task/task-status'

import { OtherModel } from '@models/other-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { warehouseCompletedTasksViewColumns } from '@components/table/table-columns/warehouse/completed-tasks-columns'

import { warehouseTasksDataConverter } from '@utils/data-grid-data-converters'
import { objectToUrlQs } from '@utils/text'

export class WarehouseCompletedViewModel {
  history = undefined
  requestStatus = undefined

  completedTasks = []
  completedTasksBase = []
  curOpenedTask = {}

  currentData = []
  selectedTasks = []

  curTaskType = null
  curTaskPriority = null

  volumeWeightCoefficient = undefined

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

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.completedTasks,
      () => (this.currentData = this.getCurrentData()),
    )
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_COMPLETED_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_COMPLETED_TASKS]

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
    this.getCompletedTasksPagMy()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
    this.getCompletedTasksPagMy()
  }

  onClickOperationTypeBtn(type) {
    this.curTaskType = type

    this.getCompletedTasksPagMy()
  }

  onClickTaskPriorityBtn(type) {
    this.curTaskPriority = type

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

  getCurrentData() {
    return toJS(this.completedTasks)
  }

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
  }

  onSelectionModel(model) {
    this.selectedTasks = model
  }

  onClickReportBtn() {
    this.setRequestStatus(loadingStatuses.IS_LOADING)
    this.selectedTasks.forEach((el, index) => {
      const taskId = el

      OtherModel.getReportTaskByTaskId(taskId).then(() => {
        if (index === this.selectedTasks.length - 1) {
          this.setRequestStatus(loadingStatuses.SUCCESS)
        }
      })
    })
  }

  async loadData() {
    try {
      this.getDataGridState()
      await this.getCompletedTasksPagMy()
    } catch (error) {
      console.log(error)
    }
  }

  async getCompletedTasksPagMy() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

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
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      runInAction(() => {
        this.batches = []
        this.completedTasks = []
      })
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getCompletedTasksPagMy()
  }

  async setCurrentOpenedTask(item) {
    try {
      const [task, platformSettings] = await Promise.all([
        StorekeeperModel.getTaskById(item._id),
        UserModel.getPlatformSettings(),
      ])

      runInAction(() => {
        this.volumeWeightCoefficient = platformSettings.volumeWeightCoefficient

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
}
