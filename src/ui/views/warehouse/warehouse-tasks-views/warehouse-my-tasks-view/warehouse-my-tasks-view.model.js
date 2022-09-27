import {transformAndValidate} from 'class-transformer-validator'
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatusByKey, OrderStatus} from '@constants/order-status'
import {mapTaskOperationTypeKeyToEnum, TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {BoxesModel} from '@models/boxes-model'
import {
  BoxesWarehouseUpdateBoxInReceiveTaskContract,
  BoxesWarehouseUpdateBoxInTaskSplitMergeEditContract,
} from '@models/boxes-model/boxes-model.contracts'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {warehouseMyTasksViewColumns} from '@components/table-columns/warehouse/my-tasks-columns'

import {warehouseTasksDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {onSubmitPostImages} from '@utils/upload-files'

export class WarehouseVacantViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  tasksMy = []
  currentBox = undefined
  imagesOfTask = []
  imagesOfBox = []

  volumeWeightCoefficient = undefined

  showProgress = false
  progressValue = 0

  drawerOpen = false
  showEditTaskModal = false
  showNoDimensionsErrorModal = false
  selectedTask = undefined
  showBarcodeModal = false
  showEditBoxModal = false
  showCancelTaskModal = false
  showConfirmModal = false

  rowHandlers = {
    onClickResolveBtn: item => this.onClickResolveBtn(item),
    onClickCancelTask: (boxid, id, operationType) => this.onClickCancelTask(boxid, id, operationType),
  }

  firstRowId = undefined
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = warehouseMyTasksViewColumns(this.rowHandlers, this.firstRowId)

  tmpDataForCancelTask = {}

  constructor({history, location}) {
    this.history = history

    if (location.state?.task) {
      this.onClickResolveBtn(location.state?.task)
    }

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
    this.filterModel = model
  }

  setDataGridState(state) {
    this.firstRowId = state.sorting.sortedRows[0]

    SettingsModel.setDataGridState(state, DataGridTablesKeys.WAREHOUSE_MY_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_MY_TASKS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = warehouseMyTasksViewColumns(this.rowHandlers, this.firstRowId).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
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
      this.getDataGridState()
      await this.getTasksMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onChangeTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
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
      const result = await StorekeeperModel.getLightTasksMy({
        status: mapTaskStatusEmumToKey[TaskStatus.AT_PROCESS],
      })

      runInAction(() => {
        this.tasksMy = warehouseTasksDataConverter(
          result.sort(sortObjectsArrayByFiledDate('updatedAt')).map(el => ({...el, beforeBoxes: el.boxesBefore})),
        )
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
      await this.setBoxBarcodeAttached(box._id, box)
    }
  }

  async setBoxBarcodeAttached(id, box) {
    try {
      const barcodesAttachedData = box.items.map(item => ({
        orderId: item.order._id,
        isBarCodeAttachedByTheStorekeeper: item.isBarCodeAttachedByTheStorekeeper,
        isBarCodeAlreadyAttachedByTheSupplier: item.isBarCodeAlreadyAttachedByTheSupplier,
      }))

      await BoxesModel.setBarcodeAttachedCheckboxes(id, barcodesAttachedData)
    } catch (error) {
      this.error = error
    }
  }

  async updateBox(id, data) {
    try {
      if (data.tmpImages.length > 0) {
        await onSubmitPostImages.call(this, {images: data.tmpImages, type: 'imagesOfBox'})

        data = {...data, images: [...data.images, ...this.imagesOfBox]}
      }

      const updateBoxData = {
        ...getObjectFilteredByKeyArrayWhiteList(
          data,
          [
            'lengthCmWarehouse',
            'widthCmWarehouse',
            'heightCmWarehouse',
            'weighGrossKgWarehouse',
            'isShippingLabelAttachedByStorekeeper',
            'isBarCodeAttachedByTheStorekeeper',
            'images',
            'fitsInitialDimensions',
            'deliveryLength',
            'deliveryHeight',
            'deliveryWidth',
            'deliveryMass',
          ],
          false,
          (key, value) => {
            if (key === 'images') {
              return value || []
            } else if (key === 'weighGrossKgWarehouse') {
              return value || 0
            } else {
              return value
            }
          },
        ),
      }

      await BoxesModel.updateBox(id, updateBoxData)
    } catch (error) {
      this.error = error
    }
  }

  async updateBarcodeAndStatusInOrder(id, data) {
    try {
      await StorekeeperModel.updateStatusInOrder(id, data)
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

  async onClickSolveTask({task, newBoxes, operationType, comment, photos}) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      for (let i = 0; i < newBoxes.length; i++) {
        const box = getObjectFilteredByKeyArrayBlackList(
          {
            ...newBoxes[i],
            lengthCmWarehouse: Number(newBoxes[i].lengthCmWarehouse),
            widthCmWarehouse: Number(newBoxes[i].widthCmWarehouse),
            heightCmWarehouse: Number(newBoxes[i].heightCmWarehouse),
            weighGrossKgWarehouse: Number(newBoxes[i].weighGrossKgWarehouse),

            deliveryLength: Number(newBoxes[i].deliveryLength),
            deliveryWidth: Number(newBoxes[i].deliveryWidth),
            deliveryHeight: Number(newBoxes[i].deliveryHeight),
            deliveryMass: Number(newBoxes[i].deliveryMass),
          },
          ['tmpImages'],
        )

        await transformAndValidate(
          operationType === TaskOperationType.RECEIVE
            ? BoxesWarehouseUpdateBoxInReceiveTaskContract
            : BoxesWarehouseUpdateBoxInTaskSplitMergeEditContract,
          box,
        )
      }

      if (operationType === TaskOperationType.RECEIVE) {
        const requestBoxes = []
        for (let i = 0; i < newBoxes.length; i++) {
          const box = newBoxes[i]

          this.imagesOfBox = []

          if (box.tmpImages.length > 0) {
            await onSubmitPostImages.call(this, {images: box.tmpImages, type: 'imagesOfBox'})
          }

          const newBox = getObjectFilteredByKeyArrayWhiteList(
            {
              ...box,
              items: [
                {
                  amount: box.items[0].amount,
                  orderId: box.items[0].order._id,
                  productId: box.items[0].product._id,
                  barCode: box.items[0].barCode,
                  isBarCodeAlreadyAttachedByTheSupplier: box.items[0].isBarCodeAlreadyAttachedByTheSupplier,
                  isBarCodeAttachedByTheStorekeeper: box.items[0].isBarCodeAttachedByTheStorekeeper,
                },
              ],
              images: this.imagesOfBox || box.images,
            },
            [
              'amount',
              'weighGrossKg',
              'weightFinalAccountingKg',
              // 'shippingLabel',
              'warehouse',
              'deliveryMethod',
              'lengthCmSupplier',
              'widthCmSupplier',
              'heightCmSupplier',
              'weighGrossKgSupplier',
              'lengthCmWarehouse',
              'widthCmWarehouse',
              'heightCmWarehouse',
              'weighGrossKgWarehouse',
              'isBarCodeAlreadyAttachedByTheSupplier',
              'isBarCodeAttachedByTheStorekeeper',
              'isShippingLabelAttachedByStorekeeper',
              'items',
              'images',
              'fitsInitialDimensions',
            ],
          )

          requestBoxes.push(newBox)
        }

        await this.resolveTask(task._id, requestBoxes)

        await this.updateBarcodeAndStatusInOrder(newBoxes[0].items[0].order._id, {
          status: OrderStatusByKey[OrderStatus.IN_STOCK],
        })
      } else {
        await this.onSubmitUpdateBoxes(newBoxes)
        await this.resolveTask(task._id)
      }

      if (photos.length > 0) {
        await onSubmitPostImages.call(this, {images: photos, type: 'imagesOfTask'})
      } else {
        this.imagesOfTask = []
      }

      await this.updateTask(this.selectedTask._id, comment)
      this.setRequestStatus(loadingStatuses.success)

      this.onTriggerEditTaskModal()

      await this.getTasksMy()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error

      if (error[0]) {
        this.onTriggerOpenModal('showNoDimensionsErrorModal')
      }
    }
  }

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
    this.onTriggerOpenModal('showConfirmModal')
  }

  async cancelTaskActionByStatus(comment) {
    switch (mapTaskOperationTypeKeyToEnum[this.tmpDataForCancelTask.taskType]) {
      case TaskOperationType.MERGE:
        await this.onCancelMergeBoxes(this.tmpDataForCancelTask.boxId, this.tmpDataForCancelTask.taskId, comment)

      case TaskOperationType.SPLIT:
        await this.onCancelSplitBoxes(this.tmpDataForCancelTask.boxId, this.tmpDataForCancelTask.taskId, comment)

      case TaskOperationType.EDIT:
        await this.onCancelEditBox(this.tmpDataForCancelTask.boxId, this.tmpDataForCancelTask.taskId, comment)
    }
  }

  async onClickConfirmCancelTask(comment) {
    try {
      await this.cancelTaskActionByStatus(comment)
      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showCancelTaskModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onCancelMergeBoxes(id, taskId, warehouseComment) {
    try {
      await BoxesModel.cancelMergeBoxes(id)
      await this.updateTask(taskId, warehouseComment, mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED])
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onCancelSplitBoxes(id, taskId, warehouseComment) {
    try {
      await BoxesModel.cancelSplitBoxes(id)
      await this.updateTask(taskId, warehouseComment, mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED])
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onCancelEditBox(id, taskId, warehouseComment) {
    try {
      await BoxesModel.cancelEditBoxes(id)
      await this.updateTask(taskId, warehouseComment, mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED])
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async onClickResolveBtn(item) {
    try {
      const result = await StorekeeperModel.getTaskById(item._id)

      const platformSettingsResult = await UserModel.getPlatformSettings()

      this.volumeWeightCoefficient = platformSettingsResult.volumeWeightCoefficient

      this.onSelectTask(result)
      this.onTriggerEditTaskModal()
    } catch (error) {
      console.log(error)
    }
  }
}
