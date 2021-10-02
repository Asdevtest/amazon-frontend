import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {mapTaskOperationTypeKeyToEnum, mapTaskOperationTypeToLabel} from '@constants/task-operation-type'
import {mapTaskStatusKeyToEnum} from '@constants/task-status'

import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'

export class AdminWarehouseTasksViewModel {
  history = undefined
  requestStatus = undefined

  error = undefined

  tasksData = []
  curOpenedTask = {}

  drawerOpen = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  showTaskInfoModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getTasks()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.ADMIN_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_TASKS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize
    }
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
    return toJS(this.tasksData)
  }

  async getTasks() {
    try {
      const result = await StorekeeperModel.getTasksVacant() // необходим отдельный запрос для админа

      runInAction(() => {
        this.tasksData = result
          .sort(sortObjectsArrayByFiledDate('updateDate'))
          .map(el => ({...el, beforeBoxes: el.boxesBefore}))
          .map(order => ({
            ...order,
            id: order._id,
            tmpOperationType: mapTaskOperationTypeToLabel[mapTaskOperationTypeKeyToEnum[order.operationType]],
            tmpStatus: mapTaskStatusKeyToEnum[order.status],
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

  setCurrentOpenedTask(item) {
    this.curOpenedTask = item
    this.onTriggerOpenModal('showTaskInfoModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onChangeCurPage = e => {
    this.curPage = e.page
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
  }
}
