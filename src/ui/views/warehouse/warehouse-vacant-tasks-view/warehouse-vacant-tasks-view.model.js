import {makeAutoObservable, runInAction} from 'mobx'

import {VACANT_TASKS_DATA} from '@constants/mocks'

import {StorekeeperModel} from '@models/storekeeper-model'

export class WarehouseVacantViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  tasksVacant = [...VACANT_TASKS_DATA]
  currentBox = undefined

  drawerOpen = false
  rowsPerPage = 5
  curPage = 1
  showEditTaskModal = false
  selectedTask = undefined
  showBarcodeModal = false
  showEditBoxModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onClickSaveBarcode() {}

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

  onTriggerEditTaskModal() {
    if (this.showEditTaskModal === false) {
      this.selectedTask = this.tasksVacant[this.selectedTaskIndex]
      this.pickupTask(this.tasksVacant[this.selectedTaskIndex].taskId)
    }

    this.showEditTaskModal = !this.showEditTaskModal
  }

  onSelectTaskIndex(index) {
    this.selectedTaskIndex = index
  }

  onTriggerShowBarcodeModal() {
    this.showBarcodeModal = !this.showBarcodeModal
  }

  onTriggerShowEditBoxModal(box) {
    this.currentBox = box
    this.showEditBoxModal = !this.showEditBoxModal
  }

  async getTasksVacant() {
    try {
      const result = await StorekeeperModel.getTasksVacant()
      runInAction(() => {
        this.tasksVacant = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async updateBox() {
    try {
      await StorekeeperModel.updateBox()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async pickupBox(boxId) {
    try {
      await StorekeeperModel.pickupBox(boxId)
    } catch (error) {
      console.log(error)
      this.error = error
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
}
