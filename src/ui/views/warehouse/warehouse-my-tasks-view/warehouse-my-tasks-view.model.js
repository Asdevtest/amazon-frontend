import {transformAndValidate} from 'class-transformer-validator'
import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {BoxesModel} from '@models/boxes-model'
import {BoxesWarehouseUpdateBoxInTaskContract} from '@models/boxes-model/boxes-model.contracts'
import {StorekeeperModel} from '@models/storekeeper-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

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
  showNoDimensionsErrorModal = false
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

  async onSubmitUpdateBoxes(boxes) {
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i]

      await this.updateBox(box._id, box)
    }
  }

  async updateBox(id, data) {
    try {
      const updateBoxData = {
        ...getObjectFilteredByKeyArrayWhiteList(data, [
          'lengthCmWarehouse',
          'widthCmWarehouse',
          'heightCmWarehouse',
          'weighGrossKgWarehouse',
          'volumeWeightKgWarehouse',
          'weightFinalAccountingKgWarehouse',
        ]),
      }
      await transformAndValidate(BoxesWarehouseUpdateBoxInTaskContract, updateBoxData)

      await BoxesModel.updateBox(id, updateBoxData)
    } catch (error) {
      this.error = error

      if (error[0].constraints.isNotEmpty) {
        this.onTriggerOpenModal('showNoDimensionsErrorModal')
      }
    }
  }

  async onClickSolveTask(newBoxes, operationType) {
    try {
      if (operationType === TaskOperationType.RECEIVE) {
        const requestBoxes = newBoxes.map(box =>
          getObjectFilteredByKeyArrayBlackList(
            {
              ...box,
              items: [
                {
                  ...box.items[0],
                  amount: box.items[0].amount,
                  order: box.items[0].order._id,
                  product: box.items[0].product._id,
                },
              ],
            },
            ['_id', 'status', 'createdBy', 'lastModifiedBy'],
          ),
        )

        await BoxesModel.approveBoxesOperation(requestBoxes, this.selectedTask.boxesBefore[0]._id)
      } else {
        this.onSubmitUpdateBoxes(newBoxes)
        await BoxesModel.approveBoxesOperation(this.selectedTask.boxes[0]._id)
      }

      await StorekeeperModel.updateTask(this.selectedTask._id, {
        status: mapTaskStatusEmumToKey[TaskStatus.SOLVED],
      })

      await this.getTasksMy()

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

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
