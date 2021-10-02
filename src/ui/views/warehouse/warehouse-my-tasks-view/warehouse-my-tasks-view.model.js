import {transformAndValidate} from 'class-transformer-validator'
import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatusByKey, OrderStatus} from '@constants/order-status'
import {
  mapTaskOperationTypeKeyToEnum,
  mapTaskOperationTypeToLabel,
  TaskOperationType,
} from '@constants/task-operation-type'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {BoxesModel} from '@models/boxes-model'
import {BoxesWarehouseUpdateBoxInTaskContract} from '@models/boxes-model/boxes-model.contracts'
import {OtherModel} from '@models/other-model'
import {SettingsModel} from '@models/settings-model'
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

  showProgress = false
  progressValue = 0

  drawerOpen = false
  showEditTaskModal = false
  showNoDimensionsErrorModal = false
  selectedTask = undefined
  showBarcodeModal = false
  showEditBoxModal = false
  showCancelTaskModal = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  tmpDataForCancelTask = {}

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.WAREHOUSE_MY_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_MY_TASKS]

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
    return toJS(this.tasksMy)
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

  setTmpWarehouseComment(e) {
    this.tmpDataForCancelTask = {...this.tmpDataForCancelTask, comment: e.target.value}
  }

  onChangeTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e.page
  }

  onTriggerEditTaskModal() {
    this.showEditTaskModal = !this.showEditTaskModal
  }

  onSelectTask(task) {
    this.selectedTask = task
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
          .map(el => ({...el, beforeBoxes: el.boxesBefore}))
          .map(order => ({
            ...order,
            id: order._id,
            tmpOperationType: mapTaskOperationTypeToLabel[mapTaskOperationTypeKeyToEnum[order.operationType]],
          }))
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitPostImages({images, type}) {
    this[type] = []
    const loadingStep = 100 / images.length

    this.showProgress = true

    for (let i = 0; i < images.length; i++) {
      const image = images[i]

      await this.onPostImage(image, type)

      this.progressValue = this.progressValue + loadingStep
    }

    this.showProgress = false
    this.progressValue = 0
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

        data = {...data, images: [...data.images, ...this.imagesOfBox]}
      }

      const updateBoxData = {
        ...getObjectFilteredByKeyArrayWhiteList(data, [
          'lengthCmWarehouse',
          'widthCmWarehouse',
          'heightCmWarehouse',
          'weighGrossKgWarehouse',
          'volumeWeightKgWarehouse',
          'isShippingLabelAttachedByStorekeeper',
          'images',
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

  async resolveTask(taskId, newBoxes) {
    try {
      await StorekeeperModel.resolveTask(taskId, {additionalBoxes: newBoxes})
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  // eslint-disable-next-line no-unused-vars
  async onClickSolveTask({task, newBoxes, operationType, comment, photos}) {
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
            ['_id', 'id', 'status', 'createdBy', 'lastModifiedBy', 'createdAt', 'tmpImages'],
          ),
        )
        // await this.resolveTask(task.id, requestBoxes)

        await BoxesModel.approveBoxesOperation(requestBoxes, this.selectedTask.boxesBefore[0]._id) //  этот метод пока на беке не исправят ошибку 500(написал на бек)
        await this.updateBarcodeAndStatusInOrder(newBoxes[0].items[0].order._id, {
          status: OrderStatusByKey[OrderStatus.IN_STOCK],
        })
      } else {
        await this.onSubmitUpdateBoxes(newBoxes)
        await this.resolveTask(task.id)
      }

      if (photos.length > 0) {
        await this.onSubmitPostImages({images: photos, type: 'imagesOfTask'})
      }

      await this.updateTask(this.selectedTask.id, comment, mapTaskStatusEmumToKey[TaskStatus.SOLVED]) // запрос не работает пока поле статуса обязательно(написал в чат бека))

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

  // async onClickSolveTask({newBoxes, operationType, comment, photos}) {
  //   try {
  //     for (let i = 0; i < newBoxes.length; i++) {
  //       const box = getObjectFilteredByKeyArrayBlackList(newBoxes[i], ['tmpImages'])

  //       await transformAndValidate(BoxesWarehouseUpdateBoxInTaskContract, box)
  //     }

  //     if (operationType === TaskOperationType.RECEIVE) {
  //       if (newBoxes[0].tmpImages.length > 0) {
  //         await this.onSubmitPostImages({images: newBoxes[0].tmpImages, type: 'imagesOfBox'})
  //       }

  //       const requestBoxes = newBoxes.map(box =>
  //         getObjectFilteredByKeyArrayBlackList(
  //           {
  //             ...box,
  //             items: [
  //               {
  //                 ...box.items[0],
  //                 amount: box.items[0].amount,
  //                 order: box.items[0].order._id,
  //                 product: box.items[0].product._id,
  //               },
  //             ],
  //             images: this.imagesOfBox,
  //           },
  //           ['_id', 'status', 'createdBy', 'lastModifiedBy', 'createdAt', 'tmpImages'],
  //         ),
  //       )

  //       await BoxesModel.approveBoxesOperation(requestBoxes, this.selectedTask.boxesBefore[0]._id)
  //       await this.updateBarcodeAndStatusInOrder(newBoxes[0].items[0].order._id, {
  //         status: OrderStatusByKey[OrderStatus.IN_STOCK],
  //       })
  //     } else {
  //       await this.onSubmitUpdateBoxes(newBoxes)
  //       await BoxesModel.approveBoxesOperation(this.selectedTask.boxes[0]._id)
  //     }

  //     if (photos.length > 0) {
  //       await this.onSubmitPostImages({images: photos, type: 'imagesOfTask'})
  //     }

  //     await this.updateTask(this.selectedTask.id, TaskStatus.SOLVED, comment)

  //     await this.getTasksMy()

  //     this.onTriggerEditTaskModal()
  //   } catch (error) {
  //     console.log(error)
  //     this.error = error

  //     if (error[0]) {
  //       this.onTriggerOpenModal('showNoDimensionsErrorModal')
  //     }
  //   }
  // }

  async updateTask(taskId, comment, status) {
    try {
      await StorekeeperModel.updateTask(taskId, {
        storekeeperComment: comment || '',
        images: this.imagesOfTask || [],
        status,
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickCancelTask(boxId, taskId, taskType) {
    this.tmpDataForCancelTask = {boxId, taskId, taskType}
    this.onTriggerOpenModal('showCancelTaskModal')
  }

  async cancelTaskActionByStatus() {
    switch (mapTaskOperationTypeKeyToEnum[this.tmpDataForCancelTask.taskType]) {
      case TaskOperationType.MERGE:
        await this.onCancelMergeBoxes(
          this.tmpDataForCancelTask.boxId,
          this.tmpDataForCancelTask.taskId,
          this.tmpDataForCancelTask.comment,
        )

      case TaskOperationType.SPLIT:
        await this.onCancelSplitBoxes(
          this.tmpDataForCancelTask.boxId,
          this.tmpDataForCancelTask.taskId,
          this.tmpDataForCancelTask.comment,
        )

      case TaskOperationType.EDIT:
        await this.onCancelEditBox(
          this.tmpDataForCancelTask.boxId,
          this.tmpDataForCancelTask.taskId,
          this.tmpDataForCancelTask.comment,
        )
    }
  }

  async onClickConfirmCancelTask() {
    try {
      await this.cancelTaskActionByStatus()
      this.onTriggerOpenModal('showCancelTaskModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onCancelMergeBoxes(id, taskId, warehouseComment) {
    try {
      await BoxesModel.cancelMergeBoxes(id)
      await this.updateTask(taskId, TaskStatus.NOT_SOLVED, warehouseComment)
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onCancelSplitBoxes(id, taskId, warehouseComment) {
    try {
      await BoxesModel.cancelSplitBoxes(id)
      await this.updateTask(taskId, TaskStatus.NOT_SOLVED, warehouseComment)
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onCancelEditBox(id, taskId, warehouseComment) {
    try {
      await BoxesModel.cancelEditBoxesByStorekeeper(id)
      await this.updateTask(taskId, TaskStatus.NOT_SOLVED, warehouseComment)
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onClickResolveBtn(item) {
    this.onSelectTask(item)
    this.onTriggerEditTaskModal()
  }
}
