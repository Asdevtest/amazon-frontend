import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class WarehouseVacantViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  tasksVacant = []

  drawerOpen = false
  selectedTask = undefined
  showWarningModal = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.WAREHOUSE_VACANT_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_VACANT_TASKS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  getCurrentData() {
    return toJS(this.tasksVacant)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getTasksVacant()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onClickPickupBtn(item) {
    try {
      await StorekeeperModel.pickupTask(item.id)
      this.onTriggerOpenModal('showWarningModal')
      await this.getTasksVacant()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onChangeTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e, value) {
    this.curPage = value
  }

  async getTasksVacant() {
    try {
      const result = await StorekeeperModel.getTasksVacant()

      runInAction(() => {
        this.tasksVacant = result
          .sort(sortObjectsArrayByFiledDate('updateDate'))
          .filter(task => task.status === mapTaskStatusEmumToKey[TaskStatus.NEW])
          .map(el => ({...el, beforeBoxes: el.boxesBefore}))
          .map(order => ({
            ...getObjectFilteredByKeyArrayBlackList(order, ['_id']),
            id: order._id,
          }))
      })
    } catch (error) {
      console.log(error)
      this.error = error

      if (error.body.message === 'По данному запросу ничего не найдено.') {
        runInAction(() => {
          this.tasksVacant = []
        })
      }
    }
  }

  async pickupTask(taskId) {
    try {
      await StorekeeperModel.pickupTask(taskId)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
