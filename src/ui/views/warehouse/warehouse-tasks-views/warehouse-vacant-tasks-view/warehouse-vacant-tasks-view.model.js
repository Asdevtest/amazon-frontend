import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {OtherModel} from '@models/other-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {warehouseVacantTasksViewColumns} from '@components/table-columns/warehouse/vacant-tasks-columns'

import {warehouseTasksDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {objectToUrlQs} from '@utils/text'
import {t} from '@utils/translations'

export class WarehouseVacantViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  tasksVacant = []

  drawerOpen = false
  selectedTask = undefined
  curOpenedTask = {}

  selectedTasks = []

  nameSearchValue = ''

  curTaskType = null
  curTaskPriority = null

  rowCount = 0

  showAcceptMessage = undefined
  acceptMessage = undefined

  volumeWeightCoefficient = undefined

  showTwoVerticalChoicesModal = false
  showTaskInfoModal = false

  rowHandlers = {
    onClickPickupBtn: item => this.onClickPickupBtn(item),
    updateTaskPriority: (taskId, newPriority) => this.updateTaskPriority(taskId, newPriority),
  }

  firstRowId = undefined
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = warehouseVacantTasksViewColumns(this.rowHandlers, this.firstRowId)

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})
    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.firstRowId,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.getTasksVacant()
  }

  setDataGridState(state) {
    runInAction(() => {
      this.firstRowId = state.sorting.sortedRows[0]
    })
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_VACANT_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_VACANT_TASKS]

    runInAction(() => {
      if (state) {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = warehouseVacantTasksViewColumns(this.rowHandlers, this.firstRowId).map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      }
    })
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedTasks = model
    })
  }

  onClickReportBtn() {
    this.selectedTasks.forEach(el => {
      const taskId = el

      OtherModel.getReportTaskByTaskId(taskId)
    })
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e

      this.curPage = 0
    })

    this.getTasksVacant()
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
    })

    this.getTasksVacant()
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })
    this.getTasksVacant()
  }

  onClickOperationTypeBtn(type) {
    runInAction(() => {
      this.curTaskType = type
    })
    this.getTasksVacant()
  }

  onClickTaskPriorityBtn(type) {
    runInAction(() => {
      this.curTaskPriority = type
    })
    this.getTasksVacant()
  }

  getCurrentData() {
    return toJS(this.tasksVacant)
  }

  async loadData() {
    try {
      this.getDataGridState()
      await this.getTasksVacant()
    } catch (error) {
      console.log(error)
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
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickPickupManyTasksBtn() {
    try {
      await StorekeeperModel.pickupManyTasks(this.selectedTasks)
      this.loadData()
      runInAction(() => {
        this.selectedTasks = []
      })

      runInAction(() => {
        this.acceptMessage = t(TranslationKey['Taken on board'])
        this.showAcceptMessage = true
        if (this.showAcceptMessage) {
          setTimeout(() => {
            this.acceptMessage = ''
            this.showAcceptMessage = false
          }, 3000)
        }
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
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

  goToMyTasks() {
    this.history.push('/warehouse/tasks/my-tasks', {task: toJS(this.curTask)})
    this.onTriggerOpenModal('showTwoVerticalChoicesModal')
  }

  onChangeTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })

    this.getTasksVacant()
  }

  async updateTaskPriority(taskId, priority) {
    try {
      await StorekeeperModel.updateTask(taskId, {
        priority,
      })

      UserModel.getUserInfo()
      this.getTasksVacant()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async getTasksVacant() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const filter = objectToUrlQs({
        or: [
          {asin: {$contains: this.nameSearchValue}},
          {
            trackNumberText: {
              [`${
                isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue)) ? '$contains' : '$eq'
              }`]: this.nameSearchValue,
            },
          },
          {id: {$eq: this.nameSearchValue}},
          {item: {$eq: this.nameSearchValue}},
        ].filter(
          el =>
            ((isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))) && !el.id) ||
            !(isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))),
        ),
      })

      const result = await StorekeeperModel.getLightTasksVacantPag({
        status: mapTaskStatusEmumToKey[TaskStatus.NEW],
        offset: this.curPage * this.rowsPerPage,
        limit: this.rowsPerPage,
        filters: this.nameSearchValue ? filter : null,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
        operationType: this.curTaskType,
        priority: this.curTaskPriority,
      })

      runInAction(() => {
        this.rowCount = result.count

        // this.tasksMyBase = result.rows

        this.tasksVacant = warehouseTasksDataConverter(result?.rows?.map(el => ({...el, beforeBoxes: el?.boxesBefore})))
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error

        this.tasksVacant = []
      })
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
