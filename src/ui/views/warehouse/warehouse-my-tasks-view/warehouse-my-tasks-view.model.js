import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {BoxesModel} from '@models/boxes-model'
import {StorekeeperModel} from '@models/storekeeper-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'

export class WarehouseVacantViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  tasksMy = []
  currentBox = undefined

  drawerOpen = false
  rowsPerPage = 15
  curPage = 1
  showEditTaskModal = false
  selectedTask = undefined
  showBarcodeModal = false
  showEditBoxModal = false
  tmpBarCode = undefined

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

  onClickSaveBarcode(barCode) {
    this.tmpBarCode = barCode
    this.onTriggerShowBarcodeModal()
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

  onTriggerEditTaskModal() {
    this.showEditTaskModal = !this.showEditTaskModal
  }

  onSelectTask(task) {
    this.selectedTask = task
  }

  onTriggerShowBarcodeModal() {
    this.showBarcodeModal = !this.showBarcodeModal
  }

  onTriggerShowEditBoxModal(box) {
    this.currentBox = box
    this.showEditBoxModal = !this.showEditBoxModal
  }

  async getTasksMy() {
    try {
      const result = await StorekeeperModel.getTasksMy()
      runInAction(() => {
        this.tasksMy = result.sort(sortObjectsArrayByFiledDate('createDate'))
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async updateBox(id, data) {
    try {
      await BoxesModel.updateBox(id, data)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onClickSolveTask() {
    try {
      if (this.tmpBarCode) {
        const boxesIds = this.selectedTask.boxes.map(box => box._id)
        for (let index = 0; index < boxesIds.length; index++) {
          const boxId = boxesIds[index]
          await BoxesModel.updateBox(boxId, {barCode: this.tmpBarCode})
        }
      }
      await BoxesModel.approveBoxesOperation(this.selectedTask.boxes[0]._id)
      await StorekeeperModel.updateTask(this.selectedTask._id, {
        status: mapTaskStatusEmumToKey[TaskStatus.SOLVED],
      })
      this.onTriggerEditTaskModal()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onCancelMergeBoxes(id) {
    try {
      await BoxesModel.cancelMergeBoxes(id)
      this.getTasksVacant()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onCancelSplitBoxes(id) {
    try {
      await BoxesModel.cancelSplitBoxes(id)
      this.getTasksVacant()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
