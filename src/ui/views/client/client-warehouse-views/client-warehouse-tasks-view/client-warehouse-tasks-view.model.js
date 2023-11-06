import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BoxStatus } from '@constants/statuses/box-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TaskStatus, mapTaskStatusEmumToKey } from '@constants/task/task-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { GeneralModel } from '@models/general-model'
import { OtherModel } from '@models/other-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { clientTasksViewColumns } from '@components/table/table-columns/client/client-tasks-columns'

import { warehouseTasksDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDate } from '@utils/date-time'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'

const filtersFields = ['operationType', 'status', 'storekeeper', 'priority']

export class ClientWarehouseTasksViewModel {
  history = undefined
  requestStatus = undefined

  tasksMy = []

  nameSearchValue = ''

  currentData = []
  selectedBoxes = []

  showConfirmModal = false

  showConfirmWithCommentModal = false

  showTaskInfoModal = false

  showProgress = false

  showSuccessInfoModal = false

  modalEditSuccessMessage = ''

  storekeepersData = []

  showWarningInfoModal = false

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  onHover = null

  confirmModalSettings = {
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  activeFilters = {
    priority: [],
    status: [],
    storekeeper: [],
    type: [],
  }

  currentPriority = null

  showEditPriorityData = false

  editPriorityData = {
    taskId: null,
    newPriority: null,
  }

  rowTaskHandlers = {
    onClickTaskInfo: item => this.setCurrentOpenedTask(item),
    onClickCancelBtn: (id, taskId, type) => this.onClickCancelBtn(id, taskId, type),
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    updateTaskPriority: (taskId, newPriority) => this.startEditTaskPriority(taskId, newPriority),
    updateTaskComment: (taskId, priority, reason) => this.updateTaskComment(taskId, priority, reason),
  }

  columnsModel = clientTasksViewColumns(this.rowTaskHandlers)

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  handleActivePriority(newPriority) {
    this.currentPriority = newPriority

    this.getTasksMy()
  }

  async updateTaskPriority(taskId, priority, reason) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)

      UserModel.getUserInfo()
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
    }
  }

  onHoverColumnField(field) {
    this.onHover = field
  }

  async getStorekeepers() {
    try {
      this.getDataGridState()
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.IN_STOCK)
      runInAction(() => {
        this.storekeepersData = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    this.getTasksMy()
  }

  async updateTaskComment(taskId, priority, reason) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)
    } catch (error) {
      console.log(error)
    }
  }

  startEditTaskPriority(taskId, newPriority) {
    this.editPriorityData = { taskId, newPriority }
    this.showEditPriorityData = true
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.getTasksMy()
    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.getTasksMy()
    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_WAREHOUSE_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_WAREHOUSE_TASKS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.getTasksMy()
    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.selectedBoxes = model
  }

  onClickReportBtn() {
    this.setRequestStatus(loadingStatuses.isLoading)
    this.selectedBoxes.forEach((el, index) => {
      const taskId = el

      OtherModel.getReportTaskByTaskId(taskId).then(() => {
        if (index === this.selectedBoxes.length - 1) {
          this.setRequestStatus(loadingStatuses.success)
        }
      })
    })
  }

  getCurrentTaskData() {
    return toJS(this.tasksMy)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()

      await Promise.all([this.getStorekeepers(), this.getTasksMy()])

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async setCurrentOpenedTask(item) {
    try {
      const task = await StorekeeperModel.getTaskById(item._id)

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.curOpenedTask = task
      })

      this.onTriggerOpenModal('showTaskInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  onLeaveColumnField() {
    this.onHover = null
    this.getDataGridState()
  }

  selectFilterForField(field, filter, fieldKey) {
    if (Array.isArray(filter)) {
      return (this.activeFilters[field] = filter)
    }

    if (fieldKey && this.activeFilters[field].some(el => filter[fieldKey] === el[fieldKey])) {
      this.activeFilters[field] = this.activeFilters[field].filter(el => filter[fieldKey] !== el[fieldKey])
    } else if (!fieldKey && this.activeFilters[field].includes(filter)) {
      this.activeFilters[field] = this.activeFilters[field].filter(el => filter !== el)
    } else {
      this.activeFilters[field].push(filter)
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

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getFilter()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    ...filtersFields.reduce(
      (ac, cur) =>
        (ac = {
          ...ac,
          [cur]: {
            filterData: [],
            currentFilterData: [],
          },
        }),
      {},
    ),
  }

  async getTasksMy() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await ClientModel.getTasks({
        filters: this.getFilter(),
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

        storekeeperId: this.activeFilters.storekeeper.map(el => el._id).join(',') || undefined,
        priority: this.activeFilters.priority.join(','),
        status: this.activeFilters.status.join(','),
        operationType: this.activeFilters.type.join(','),
      })

      runInAction(() => {
        this.rowsCount = result.count

        this.tasksMy = warehouseTasksDataConverter(result.rows).sort(sortObjectsArrayByFiledDate('updatedAt'))
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.tasksMy = []
      })
    }
  }

  async onClickFilterBtn(column) {
    try {
      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'boxes'),
        column,

        `client/tasks/by_boxes?filters=${this.getFilter(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  getFilter(exclusion) {
    // const idFilter = exclusion !== 'id' && this.columnMenuSettings.id.currentFilterData.join(',')
    const typeFilter =
      exclusion !== 'operationType' && this.columnMenuSettings.operationType.currentFilterData.join(',')
    const statusFilter = exclusion !== 'status' && this.columnMenuSettings.status.currentFilterData.join(',')
    const storekeeperFilter =
      exclusion !== 'storekeeper' && this.columnMenuSettings.storekeeper.currentFilterData.join(',')
    const priorityFilter = exclusion !== 'priority' && this.columnMenuSettings.priority.currentFilterData.join(',')

    const filter = objectToUrlQs({
      or: [
        { asin: { $contains: this.nameSearchValue } },
        { amazonTitle: { $contains: this.nameSearchValue } },
        { skusByClient: { $contains: this.nameSearchValue } },
        { id: { $eq: this.nameSearchValue } },
        { item: { $eq: this.nameSearchValue } },
        { humanFriendlyId: { $eq: this.nameSearchValue } },
      ].filter(
        el =>
          ((isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))) &&
            !el.id &&
            !el.humanFriendlyId) ||
          !(isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))),
      ),

      // ...(idFilter && {
      //   id: {$eq: idFilter},
      // }),

      ...(typeFilter && {
        operationType: { $eq: typeFilter },
      }),

      ...(statusFilter && {
        status: { $eq: statusFilter },
      }),

      ...(storekeeperFilter && {
        storekeeper: { $eq: storekeeperFilter },
      }),

      ...(priorityFilter && {
        priority: { $eq: priorityFilter },
      }),
    })

    return filter
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  async cancelTask(taskId, comment) {
    try {
      await ClientModel.cancelTask(taskId, comment)

      await this.getTasksMy()
    } catch (error) {
      console.log(error)
    }
  }

  onClickCancelBtnByAction(actionType, id) {
    switch (actionType) {
      case 'merge':
        return this.cancelMergeBoxes(id)

      case 'split':
        return this.cancelSplitBoxes(id)

      case 'edit':
        return this.cancelEditBoxes(id)
    }
  }

  async onClickCancelBtn(id, taskId, type) {
    try {
      const task = await StorekeeperModel.getTaskById(taskId)

      if (task.status !== mapTaskStatusEmumToKey[TaskStatus.NEW]) {
        this.getTasksMy()

        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: true,
            title: t(TranslationKey['The warehouse has already taken the task to work']),
          }
        })

        this.onTriggerOpenModal('showWarningInfoModal')
      } else {
        runInAction(() => {
          this.toCancelData = { id, taskId, type }
        })

        this.onTriggerOpenModal('showConfirmWithCommentModal')
      }
    } catch (e) {
      console.log(e)
    }
  }

  async onClickCancelAfterConfirm(comment) {
    try {
      await this.onClickCancelBtnByAction(this.toCancelData.type, this.toCancelData.id)

      this.onTriggerOpenModal('showConfirmWithCommentModal')

      await this.cancelTask(this.toCancelData.taskId, { clientComment: comment })

      await this.getTasksMy()
    } catch (error) {
      console.log(error)
    }
  }

  async cancelEditBoxes(id) {
    try {
      await BoxesModel.cancelEditBoxes(id)

      await this.getTasksMy()
    } catch (error) {
      console.log(error)
    }
  }

  async cancelMergeBoxes(id) {
    try {
      await BoxesModel.cancelMergeBoxes(id)

      await this.getTasksMy()
    } catch (error) {
      console.log(error)
    }
  }

  async cancelSplitBoxes(id) {
    try {
      await BoxesModel.cancelSplitBoxes(id)

      await this.getTasksMy()
    } catch (error) {
      console.log(error)
    }
  }
}
