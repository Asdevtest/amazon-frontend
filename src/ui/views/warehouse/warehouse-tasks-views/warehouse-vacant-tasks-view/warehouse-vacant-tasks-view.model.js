import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {warehouseVacantTasksViewColumns} from '@components/table-columns/warehouse/vacant-tasks-columns'

import {warehouseTasksDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

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

  volumeWeightCoefficient = undefined

  showTwoVerticalChoicesModal = false
  showTaskInfoModal = false

  rowHandlers = {
    onClickPickupBtn: item => this.onClickPickupBtn(item),
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
    const tasks = this.tasksVacant.filter(task => model.includes(task.id))
    const res = tasks.reduce((ac, el) => ac.concat(el.id), [])
    runInAction(() => {
      this.selectedTasks = res
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
    })
  }

  // this.batches = this.batchesData.filter(item =>
  //   item.originalData.boxes.some(
  //     box =>
  //       box.items.some(item =>
  //         item.product.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
  //       ) ||
  //       box.items.some(item => item.product.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase())),
  //   ),
  // )

  getCurrentData() {
    const nameSearchValue = this.nameSearchValue.trim()
    if (nameSearchValue) {
      return toJS(
        this.tasksVacant.filter(
          el =>
            el.asin?.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
            el.orderId?.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
            el.item?.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
            el.originalData?.beforeBoxes.some(box =>
              box?.trackNumberText.toLowerCase().includes(nameSearchValue.toLowerCase()),
            ),
        ),
      )
    } else {
      return toJS(this.tasksVacant)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getTasksVacant()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onClickPickupBtn(item) {
    try {
      await StorekeeperModel.pickupTask(item._id)

      this.loadData()
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

      this.onTriggerOpenModal('showTwoVerticalChoicesModal')
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
  }

  async getTasksVacant() {
    try {
      const result = await StorekeeperModel.getLightTasksVacant()

      runInAction(() => {
        this.tasksVacant = warehouseTasksDataConverter(
          result
            .sort(sortObjectsArrayByFiledDate('updatedAt'))
            .filter(task => task.status === mapTaskStatusEmumToKey[TaskStatus.NEW])
            .map(el => ({...el, beforeBoxes: el.boxesBefore})),
        )
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error

        this.tasksVacant = []
      })
    }
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
