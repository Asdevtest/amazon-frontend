/* eslint-disable no-unused-vars */
import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { mapTaskStatusEmumToKey, TaskStatus } from '@constants/task/task-status'

import { OtherModel } from '@models/other-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { warehouseCompletedTasksViewColumns } from '@components/table/table-columns/warehouse/completed-tasks-columns'

import { warehouseTasksDataConverter } from '@utils/data-grid-data-converters'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { objectToUrlQs } from '@utils/text'

export class WarehouseCompletedViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  completedTasks = []
  completedTasksBase = []
  curOpenedTask = {}

  currentData = []
  selectedTasks = []

  curTaskType = null
  curTaskPriority = null

  rowCount = 0

  volumeWeightCoefficient = undefined

  nameSearchValue = ''

  rowHandlers = {
    setCurrentOpenedTask: item => this.setCurrentOpenedTask(item),
  }

  sortModel = []
  filterModel = { items: [] }
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = warehouseCompletedTasksViewColumns(this.rowHandlers)

  showTaskInfoModal = false

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.completedTasks,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.getCompletedTasksPagMy()
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_COMPLETED_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_COMPLETED_TASKS]

    runInAction(() => {
      if (state) {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = warehouseCompletedTasksViewColumns(this.rowHandlers).map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      }
    })
  }

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = warehouseCompletedTasksViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e

      this.curPage = 0
    })

    this.getCompletedTasksPagMy()
  }

  onClickOperationTypeBtn(type) {
    runInAction(() => {
      this.curTaskType = type
    })
    this.getCompletedTasksPagMy()
  }

  onClickTaskPriorityBtn(type) {
    runInAction(() => {
      this.curTaskPriority = type
    })
    this.getCompletedTasksPagMy()
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.getCompletedTasksPagMy()
  }

  getCurrentData() {
    return toJS(this.completedTasks)
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedTasks = model
    })
  }

  onClickReportBtn() {
    this.setRequestStatus(loadingStatuses.isLoading)
    this.selectedTasks.forEach((el, index) => {
      const taskId = el

      OtherModel.getReportTaskByTaskId(taskId).then(() => {
        if (index === this.selectedTasks.length - 1) {
          this.setRequestStatus(loadingStatuses.success)
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
      this.setRequestStatus(loadingStatuses.isLoading)

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
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      runInAction(() => {
        this.batches = []
        this.completedTasks = []
      })
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })
    this.getCompletedTasksPagMy()
  }

  async setCurrentOpenedTask(item) {
    try {
      const result = await StorekeeperModel.getTaskById(item._id)

      const platformSettingsResult = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = platformSettingsResult.volumeWeightCoefficient

        this.curOpenedTask = result
      })
      this.onTriggerOpenModal('showTaskInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })

    this.getCompletedTasksPagMy()
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
