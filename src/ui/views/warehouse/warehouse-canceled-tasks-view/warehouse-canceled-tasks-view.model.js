import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {StorekeeperModel} from '@models/storekeeper-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'

export class WarehouseCanceledTasksViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  tasksMy = []
  curOpenedTask = {}

  drawerOpen = false
  rowsPerPage = 15
  curPage = 1

  showTaskInfoModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getTasksMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  setCurrentOpenedTask(item) {
    this.curOpenedTask = item
    this.onTriggerOpenModal('showTaskInfoModal')
  }

  onChangeTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  async getTasksMy() {
    try {
      const result = await StorekeeperModel.getTasksMy()

      runInAction(() => {
        this.tasksMy = result
          .sort(sortObjectsArrayByFiledDate('createDate'))
          .filter(task => task.status === mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED])
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
