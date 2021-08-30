import {transformAndValidate} from 'class-transformer-validator'
import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {BoxesModel} from '@models/boxes-model'
import {BoxesWarehouseUpdateBoxInTaskContract} from '@models/boxes-model/boxes-model.contracts'
import {OtherModel} from '@models/other-model'
import {StorekeeperModel} from '@models/storekeeper-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class WarehouseVacantViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  tasksMy = []
  currentBox = undefined
  imagesOfTask = []
  imagesOfBox = []

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
        this.tasksMy = result
          .sort(sortObjectsArrayByFiledDate('updateDate'))
          .filter(task => task.status === mapTaskStatusEmumToKey[TaskStatus.AT_PROCESS])
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitPostImages({images, type}) {
    this[type] = []

    for (let i = 0; i < images.length; i++) {
      const image = images[i]

      await this.onPostImage(image, type)
    }
  }

  async onPostImage(imageData, imagesType) {
    const formData = new FormData()
    formData.append('filename', imageData)

    try {
      const imageFile = await OtherModel.postImage(formData)

      this[imagesType].push('https://api1.kurakste.ru/uploads/' + imageFile.data.fileName)
    } catch (error) {
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
      if (data.tmpImages.length > 0) {
        await this.onSubmitPostImages({images: data.tmpImages, type: 'imagesOfBox'})

        data = {...data, images: this.imagesOfBox}
      }

      const updateBoxData = {
        ...getObjectFilteredByKeyArrayWhiteList(data, [
          'lengthCmWarehouse',
          'widthCmWarehouse',
          'heightCmWarehouse',
          'weighGrossKgWarehouse',
          'volumeWeightKgWarehouse',
          'weightFinalAccountingKgWarehouse',
          'isShippingLabelAttachedByStorekeeper',
          // 'images' КАК РАЗРЕШАТЬ ЭТО ПОЛЕ - РАСКОММЕНТИРОВАТЬ
        ]),
      }

      await BoxesModel.updateBox(id, updateBoxData)
    } catch (error) {
      this.error = error
    }
  }

  async updateBarcodeAndStatusInOrder(id, data) {
    try {
      await StorekeeperModel.updateBarcodeAndStatusInOrder(id, data)
    } catch (error) {
      this.error = error
    }
  }

  async onClickSolveTask({newBoxes, operationType, comment, photos}) {
    try {
      for (let i = 0; i < newBoxes.length; i++) {
        const box = getObjectFilteredByKeyArrayBlackList(newBoxes[i], ['tmpImages'])

        await transformAndValidate(BoxesWarehouseUpdateBoxInTaskContract, box)
      }

      if (operationType === TaskOperationType.RECEIVE) {
        if (newBoxes[0].tmpImages.length > 0) {
          await this.onSubmitPostImages({images: newBoxes[0].tmpImages, type: 'imagesOfBox'})
        }

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
              images: this.imagesOfBox,
            },
            ['_id', 'status', 'createdBy', 'lastModifiedBy', 'createdAt', 'tmpImages'],
          ),
        )

        await BoxesModel.approveBoxesOperation(requestBoxes, this.selectedTask.boxesBefore[0]._id)
      } else {
        await this.onSubmitUpdateBoxes(newBoxes)
        await BoxesModel.approveBoxesOperation(this.selectedTask.boxes[0]._id)
      }

      if (photos.length > 0) {
        await this.onSubmitPostImages({images: photos, type: 'imagesOfTask'})

        comment = comment + '\n' + this.imagesOfTask.join(' \n ')
      }

      await this.updateTask(this.selectedTask._id, TaskStatus.SOLVED, comment)

      await this.getTasksMy()

      this.onTriggerEditTaskModal()
    } catch (error) {
      console.log(error)
      this.error = error

      if (error[0]) {
        this.onTriggerOpenModal('showNoDimensionsErrorModal')
      }
    }
  }

  async updateTask(taskId, status, comment) {
    try {
      await StorekeeperModel.updateTask(taskId, {
        status: mapTaskStatusEmumToKey[status],
        storekeeperComment: comment || '',
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onCancelMergeBoxes(id, taskId) {
    try {
      await BoxesModel.cancelMergeBoxes(id)
      await this.updateTask(taskId, TaskStatus.NOT_SOLVED)
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onCancelSplitBoxes(id, taskId) {
    try {
      await BoxesModel.cancelSplitBoxes(id)
      await this.updateTask(taskId, TaskStatus.NOT_SOLVED)
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onCancelEditBox(id, taskId) {
    try {
      await BoxesModel.cancelEditBoxesByStorekeeper(id)
      await this.updateTask(taskId, TaskStatus.NOT_SOLVED)
      await this.getTasksMy()
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
