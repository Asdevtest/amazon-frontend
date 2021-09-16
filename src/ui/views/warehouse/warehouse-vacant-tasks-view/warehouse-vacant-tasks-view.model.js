import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {StorekeeperModel} from '@models/storekeeper-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'

export class WarehouseVacantViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  tasksVacant = []

  drawerOpen = false
  rowsPerPage = 15
  curPage = 1
  selectedTask = undefined
  showWarningModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
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
      await StorekeeperModel.pickupTask(item._id)
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

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  async getTasksVacant() {
    try {
      const result = await StorekeeperModel.getTasksVacant()

      runInAction(() => {
        this.tasksVacant = result
          .sort(sortObjectsArrayByFiledDate('updateDate'))
          .filter(task => task.status === mapTaskStatusEmumToKey[TaskStatus.NEW])
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

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
