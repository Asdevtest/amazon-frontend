import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TaskOperationType, mapTaskOperationTypeKeyToEnum } from '@constants/task/task-operation-type'
import { TaskStatus, mapTaskStatusEmumToKey } from '@constants/task/task-status'

import { BoxesModel } from '@models/boxes-model'
import { OtherModel } from '@models/other-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { warehouseVacantTasksViewColumns } from '@components/table/table-columns/warehouse/vacant-tasks-columns'

import { warehouseTasksDataConverter } from '@utils/data-grid-data-converters'
import { objectToUrlQs } from '@utils/text'

import { loadingStatus } from '@typings/enums/loading-status'

export class WarehouseVacantViewModel {
  history = undefined
  requestStatus = undefined

  tasksVacant = []

  selectedTask = undefined
  curOpenedTask = undefined
  tmpDataForCancelTask = undefined
  selectedTasks = []

  get currentData() {
    return this.tasksVacant
  }

  nameSearchValue = ''

  curTaskType = null
  curTaskPriority = null

  showTwoVerticalChoicesModal = false
  showTaskInfoModal = false
  showEditPriorityData = false
  showConfirmModal = false

  editPriorityData = {
    taskId: null,
    newPriority: null,
  }

  rowHandlers = {
    onClickPickupBtn: item => this.onClickPickupBtn(item),
    onClickCancelTask: (boxid, id, operationType) => this.onClickCancelTask(boxid, id, operationType),
    updateTaskPriority: (taskId, newPriority) => this.startEditTaskPriority(taskId, newPriority),
    updateTaskComment: (taskId, priority, reason) => this.updateTaskComment(taskId, priority, reason),
  }

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}
  densityModel = 'compact'
  columnsModel = warehouseVacantTasksViewColumns(this.rowHandlers)

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
    this.getTasksVacant()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getTasksVacant()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
    this.getTasksVacant()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_VACANT_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_VACANT_TASKS]

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
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

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
    this.getTasksVacant()
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getTasksVacant()
  }

  onClickOperationTypeBtn(type) {
    this.curTaskType = type

    this.getTasksVacant()
  }

  onClickTaskPriorityBtn(type) {
    this.curTaskPriority = type

    this.getTasksVacant()
  }

  loadData() {
    try {
      this.getDataGridState()

      this.getTasksVacant()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickPickupBtn(item) {
    try {
      await StorekeeperModel.pickupTask(item._id)

      this.loadData()

      await UserModel.getUserInfo()
      runInAction(() => {
        this.curTask = item
      })
      this.onTriggerOpenModal('showTwoVerticalChoicesModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickPickupManyTasksBtn() {
    try {
      await StorekeeperModel.pickupManyTasks(this.selectedTasks)
      this.loadData()
      runInAction(() => {
        this.selectedTasks = []
      })
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

  goToMyTasks() {
    this.history.push('/warehouse/tasks/my-tasks', { task: toJS(this.curTask._id) })
    this.onTriggerOpenModal('showTwoVerticalChoicesModal')
  }

  startEditTaskPriority(taskId, newPriority) {
    this.editPriorityData = { taskId, newPriority }
    this.showEditPriorityData = true
  }

  async updateTaskPriority(taskId, priority, reason) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)

      UserModel.getUserInfo()

      await this.getTasksVacant()
    } catch (error) {
      console.error(error)
    }
  }

  async updateTaskComment(taskId, priority, reason) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)

      UserModel.getUserInfo()

      await this.getTasksVacant()
    } catch (error) {
      console.error(error)
    }
  }

  async getTasksVacant() {
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

      const result = await StorekeeperModel.getLightTasksVacantPag({
        status: mapTaskStatusEmumToKey[TaskStatus.NEW],
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

        this.tasksVacant = warehouseTasksDataConverter(
          result?.rows?.map(el => ({
            ...el,
            beforeBoxes: el?.boxesBefore,
          })),
        )
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.tasksVacant = []
      })
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  onClickCancelTask(boxId, taskId, taskType) {
    this.tmpDataForCancelTask = { boxId, taskId, taskType }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onClickConfirmCancelTask(comment) {
    try {
      await this.cancelTaskActionByStatus(comment)

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async cancelTaskActionByStatus(comment) {
    switch (mapTaskOperationTypeKeyToEnum[this.tmpDataForCancelTask.taskType]) {
      case TaskOperationType.MERGE:
        await BoxesModel.cancelMergeBoxes(this.tmpDataForCancelTask.boxId)
        break

      case TaskOperationType.SPLIT:
        await BoxesModel.cancelSplitBoxes(this.tmpDataForCancelTask.boxId)
        break

      case TaskOperationType.EDIT:
        await BoxesModel.cancelEditBoxes(this.tmpDataForCancelTask.boxId)
        break
    }

    this.updateTask(this.tmpDataForCancelTask.taskId, comment, mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED])
  }

  async updateTask(taskId, comment, status) {
    try {
      await StorekeeperModel.updateTask(taskId, {
        storekeeperComment: comment || '',
        images: [],
        status,
      })

      this.getTasksVacant()
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
