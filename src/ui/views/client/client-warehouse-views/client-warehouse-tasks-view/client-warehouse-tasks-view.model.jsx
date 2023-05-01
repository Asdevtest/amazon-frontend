/* eslint-disable no-unused-vars */
import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {BoxStatus} from '@constants/box-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {GeneralModel} from '@models/general-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientBoxesViewColumns} from '@components/table-columns/client/client-boxes-columns'
import {clientTasksViewColumns} from '@components/table-columns/client/client-tasks-columns'

import {warehouseTasksDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getTableByColumn, objectToUrlQs} from '@utils/text'
import {t} from '@utils/translations'

const filtersFields = ['operationType', 'status', 'storekeeper', 'priority']

export class ClientWarehouseTasksViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  tasksMy = []

  nameSearchValue = ''

  drawerOpen = false

  currentData = []

  showConfirmModal = false

  showConfirmWithCommentModal = false

  showTaskInfoModal = false

  showProgress = false

  showSuccessInfoModal = false

  modalEditSuccessMessage = ''

  operationType = null

  storekeepersData = []
  currentStorekeeper = undefined

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
  filterModel = {items: []}

  curPage = 0
  rowsPerPage = 15

  curPageForTask = 0
  rowsPerPageForTask = 15
  rowsCount = 0

  densityModel = 'compact'

  selectedStatus = null

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

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = clientTasksViewColumns(this.rowTaskHandlers).map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })

    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})

    // reaction(
    //   () => SettingsModel.languageTag,
    //   () => this.updateColumnsModel(),
    // )
  }

  handleActivePriority(newPriority) {
    runInAction(() => {
      this.currentPriority = newPriority
    })
    this.getTasksMy()
  }

  async updateTaskPriority(taskId, priority, reason) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)

      UserModel.getUserInfo()
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.IN_STOCK)

      runInAction(() => {
        this.storekeepersData = result
      })

      this.getDataGridState()
    } catch (error) {
      console.log(error)
    }
  }

  onClickStorekeeperBtn(storekeeper) {
    runInAction(() => {
      this.selectedBoxes = []

      this.currentStorekeeper = storekeeper ? storekeeper : undefined
    })

    this.getTasksMy()
  }

  handleSelectedStatus(status) {
    runInAction(() => (this.selectedStatus = status))
    this.getTasksMy()
  }

  handleOperationType(type) {
    runInAction(() => (this.operationType = type))
    this.getTasksMy()
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })
    this.getTasksMy()
  }

  async updateTaskComment(taskId, priority, reason) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  startEditTaskPriority(taskId, newPriority) {
    runInAction(() => {
      this.editPriorityData = {taskId, newPriority}
      this.showEditPriorityData = true
    })
  }

  // async updateColumnsModel() {
  //   if (await SettingsModel.languageTag) {
  //     this.getDataGridState()
  //   }
  // }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  // setDataGridState(state) {
  //   const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
  //     'sorting',
  //     'filter',
  //     'pagination',
  //     'density',
  //     'columns',
  //   ])

  //   SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_WAREHOUSE)
  // }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_WAREHOUSE]

    runInAction(() => {
      if (state) {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = state.columnsModel
        this.columnsModel = clientTasksViewColumns(this.rowTaskHandlers).map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      }
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
      this.curPage = 0
    })
  }

  onChangeRowsPerPageForTask(e) {
    runInAction(() => {
      this.rowsPerPageForTask = e
      this.rowsPerPage = e
      this.curPageForTask = 0

      this.getTasksMy()
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeDrawerOpen(e, value) {
    runInAction(() => {
      this.drawerOpen = value
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
      this.getTasksMy()
    })
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedBoxes = model
    })
  }

  getCurrentTaskData() {
    return toJS(this.tasksMy)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      // this.getDataGridState()
      await this.getStorekeepers()
      await this.getTasksMy()

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

  onTriggerDrawer() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage = e => {
    runInAction(() => {
      this.curPage = e
    })
  }

  onChangeCurPageForTask = e => {
    runInAction(() => {
      this.curPageForTask = e
      this.getTasksMy()
    })
  }

  onLeaveColumnField() {
    this.onHover = null
    this.getDataGridState()
  }

  onChangeFullFieldMenuItem(value, field) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        [field]: {
          ...this.columnMenuSettings[field],
          currentFilterData: value,
        },
      }
    })
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
        limit: this.rowsPerPage,
        offset: this.curPageForTask * this.rowsPerPage,
        storekeeperId: this.currentStorekeeper && this.currentStorekeeper._id,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
        priority: this.currentPriority,
        status: this.selectedStatus,
        operationType: this.operationType,
      })

      runInAction(() => {
        this.rowsCount = result.count

        this.tasksMy = warehouseTasksDataConverter(result.rows).sort(sortObjectsArrayByFiledDate('updatedAt'))
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error

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
          [column]: {...this.columnMenuSettings[column], filterData: data},
        }
      }
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
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
        {asin: {$contains: this.nameSearchValue}},
        {amazonTitle: {$contains: this.nameSearchValue}},
        {skusByClient: {$contains: this.nameSearchValue}},
        {id: {$eq: this.nameSearchValue}},
        {item: {$eq: this.nameSearchValue}},
        {humanFriendlyId: {$eq: this.nameSearchValue}},
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
        operationType: {$eq: typeFilter},
      }),

      ...(statusFilter && {
        status: {$eq: statusFilter},
      }),

      ...(storekeeperFilter && {
        storekeeper: {$eq: storekeeperFilter},
      }),

      ...(priorityFilter && {
        priority: {$eq: priorityFilter},
      }),
    })

    return filter
  }

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }

  async cancelTask(taskId, comment) {
    try {
      await ClientModel.cancelTask(taskId, comment)

      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
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
          this.toCancelData = {id, taskId, type}
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

      await this.cancelTask(this.toCancelData.taskId, {clientComment: comment})

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async cancelEditBoxes(id) {
    try {
      await BoxesModel.cancelEditBoxes(id)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async cancelMergeBoxes(id) {
    try {
      await BoxesModel.cancelMergeBoxes(id)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async cancelSplitBoxes(id) {
    try {
      await BoxesModel.cancelSplitBoxes(id)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }
}
