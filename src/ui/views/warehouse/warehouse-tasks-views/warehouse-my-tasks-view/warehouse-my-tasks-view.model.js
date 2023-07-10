import { transformAndValidate } from 'class-transformer-validator'
import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { mapTaskOperationTypeKeyToEnum, TaskOperationType } from '@constants/task/task-operation-type'
import { mapTaskStatusEmumToKey, TaskStatus } from '@constants/task/task-status'

import { BoxesModel } from '@models/boxes-model'
import { BoxesWarehouseUpdateBoxInTaskContract } from '@models/boxes-model/boxes-model.contracts'
import { OtherModel } from '@models/other-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { warehouseMyTasksViewColumns } from '@components/table/table-columns/warehouse/my-tasks-columns'

import { warehouseTasksDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDate } from '@utils/date-time'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { objectToUrlQs } from '@utils/text'
import { onSubmitPostImages } from '@utils/upload-files'

export class WarehouseMyTasksViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  tasksMy = []
  currentBox = undefined
  imagesOfTask = []
  imagesOfBox = []

  volumeWeightCoefficient = undefined

  selectedTasks = []

  nameSearchValue = ''

  curTaskType = null
  curTaskPriority = null

  rowCount = 0

  showProgress = false
  progressValue = 0

  showEditTaskModal = false
  showNoDimensionsErrorModal = false
  selectedTask = undefined
  showBarcodeModal = false
  showEditBoxModal = false
  showCancelTaskModal = false
  showConfirmModal = false
  showEditPriorityData = false

  editPriorityData = {
    taskId: null,
    newPriority: null,
  }

  rowHandlers = {
    onClickResolveBtn: item => this.onClickResolveBtn(item),
    onClickCancelTask: (boxid, id, operationType) => this.onClickCancelTask(boxid, id, operationType),
    updateTaskPriority: (taskId, newPriority) => this.startEditTaskPriority(taskId, newPriority),
    updateTaskComment: (taskId, priority, reason) => this.updateTaskComment(taskId, priority, reason),
  }

  sortModel = []
  filterModel = { items: [] }
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}
  densityModel = 'compact'
  columnsModel = warehouseMyTasksViewColumns(this.rowHandlers)

  tmpDataForCancelTask = {}

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history
    })

    if (location.state?.task) {
      this.onClickResolveBtn(location.state?.task)

      const state = { ...history.location.state }
      delete state.task
      history.replace({ ...history.location, state })
    }

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_MY_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_MY_TASKS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
    this.getTasksMy()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
    this.getTasksMy()
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
    this.getTasksMy()
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })
    this.getTasksMy()
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedTasks = model
    })
  }

  onClickReportBtn() {
    this.setRequestStatus(loadingStatuses.isLoading)
    this.selectedTasks.forEach((el, index) => {
      const taskId = el

      OtherModel.getReportTaskByTaskId(taskId).then(() => {
        if (index === this.selectedTasks.length - 1) {
          this.setRequestStatus(loadingStatuses.success)
        }
      })
    })
  }

  getCurrentData() {
    return toJS(this.tasksMy)
  }

  onClickOperationTypeBtn(type) {
    runInAction(() => {
      this.curTaskType = type
    })
    this.getTasksMy()
  }

  onClickTaskPriorityBtn(type) {
    runInAction(() => {
      this.curTaskPriority = type
    })
    this.getTasksMy()
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  async loadData() {
    try {
      this.getDataGridState()
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
    }
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })

    this.getTasksMy()
  }

  onTriggerEditTaskModal() {
    runInAction(() => {
      this.showEditTaskModal = !this.showEditTaskModal
    })
  }

  onSelectTask(task) {
    runInAction(() => {
      this.selectedTask = task
    })
  }

  onTriggerShowEditBoxModal(box) {
    runInAction(() => {
      this.currentBox = box
      this.showEditBoxModal = !this.showEditBoxModal
    })
  }

  async getTasksMy() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const filter = objectToUrlQs({
        or: [
          { asin: { $contains: this.nameSearchValue } },
          {
            trackNumberText: {
              [`${
                isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue)) ? '$contains' : '$eq'
              }`]: this.nameSearchValue,
            },
          },
          { id: { $eq: this.nameSearchValue } },
          { item: { $eq: this.nameSearchValue } },
        ].filter(
          el =>
            ((isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))) && !el.id) ||
            !(isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))),
        ),
        // ...(this.curTaskType && {
        //   operationType: {$eq: this.curTaskType},
        // }),
        // ...(this.curTaskPriority && {
        //   priority: {$eq: this.curTaskPriority},
        // }),
      })

      const result = await StorekeeperModel.getLightTasksWithPag({
        status: mapTaskStatusEmumToKey[TaskStatus.AT_PROCESS],
        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,
        filters: this.nameSearchValue ? filter : null,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
        operationType: this.curTaskType,
        priority: this.curTaskPriority,
      })

      runInAction(() => {
        this.rowCount = result.count

        // this.tasksMyBase = result.rows

        this.tasksMy = warehouseTasksDataConverter(
          result.rows.sort(sortObjectsArrayByFiledDate('updatedAt')).map(el => ({
            ...el,
            beforeBoxes: el.boxesBefore,
          })),
        )
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
        this.tasksMy = []
      })
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onSubmitUpdateBoxes(boxes) {
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i]

      await Promise.all([this.updateBox(box._id, box), this.setBoxBarcodeAttached(box._id, box)])
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
      runInAction(() => {
        this.error = error
      })
    }
  }

  async updateBox(id, data) {
    try {
      if (data.tmpImages.length > 0) {
        await onSubmitPostImages.call(this, { images: data.tmpImages, type: 'imagesOfBox' })

        data = { ...data, images: [...data.images, ...this.imagesOfBox] }
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
            // 'fitsInitialDimensions',
            // 'deliveryLength',
            // 'deliveryHeight',
            // 'deliveryWidth',
            // 'deliveryMass',
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
      runInAction(() => {
        this.error = error
      })
    }
  }

  async updateBarcodeAndStatusInOrder(id, data) {
    try {
      await StorekeeperModel.updateStatusInOrder(id, data)
    } catch (error) {
      runInAction(() => {
        this.error = error
      })
    }
  }

  async resolveTask(taskId, newBoxes) {
    try {
      await StorekeeperModel.resolveTask(taskId, { additionalBoxes: newBoxes })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickSolveTask({ task, newBoxes, operationType, comment, photos }) {
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
          },
          ['tmpImages'],
        )

        await transformAndValidate(BoxesWarehouseUpdateBoxInTaskContract, box)
      }

      if (operationType === TaskOperationType.RECEIVE) {
        const requestBoxes = []
        for (let i = 0; i < newBoxes.length; i++) {
          const box = newBoxes[i]

          runInAction(() => {
            this.imagesOfBox = []
          })

          if (box.tmpImages.length > 0) {
            await onSubmitPostImages.call(this, { images: box.tmpImages, type: 'imagesOfBox' })
          }

          const newBox = getObjectFilteredByKeyArrayWhiteList(
            {
              ...box,
              items: box.items.map(el => ({
                amount: el.amount,
                orderId: el.order._id,
                productId: el.product._id,
                barCode: el.barCode,
                isBarCodeAlreadyAttachedByTheSupplier: el.isBarCodeAlreadyAttachedByTheSupplier,
                isBarCodeAttachedByTheStorekeeper: el.isBarCodeAttachedByTheStorekeeper,
              })),
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
              'trackNumberText',
              'trackNumberFile',
            ],
          )

          requestBoxes.push(newBox)
        }

        await Promise.all([
          await this.updateBarcodeAndStatusInOrder(newBoxes[0].items[0].order._id, {
            status: OrderStatusByKey[OrderStatus.VERIFY_RECEIPT],
          }),
          await this.resolveTask(task._id, requestBoxes),
        ])

        // await this.updateBarcodeAndStatusInOrder(newBoxes[0].items[0].order._id, {
        //   status: OrderStatusByKey[OrderStatus.VERIFY_RECEIPT],
        // })
        // await this.resolveTask(task._id, requestBoxes)
      } else {
        // await Promise.all([await this.onSubmitUpdateBoxes(newBoxes), await this.resolveTask(task._id)])
        await this.onSubmitUpdateBoxes(newBoxes)
        await this.resolveTask(task._id)
      }

      if (photos.length > 0) {
        await onSubmitPostImages.call(this, { images: photos, type: 'imagesOfTask' })
      } else {
        runInAction(() => {
          this.imagesOfTask = []
        })
      }

      await this.updateTask(this.selectedTask._id, comment)
      this.setRequestStatus(loadingStatuses.success)

      this.onTriggerEditTaskModal()

      await Promise.all([UserModel.getUserInfo(), this.getTasksMy()])
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.error = error
      })

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
      runInAction(() => {
        this.error = error
      })
    }
  }

  startEditTaskPriority(taskId, newPriority) {
    runInAction(() => {
      this.editPriorityData = { taskId, newPriority }
      this.showEditPriorityData = true
    })
  }

  async updateTaskPriority(taskId, priority, reason) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)

      UserModel.getUserInfo()
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async updateTaskComment(taskId, priority, reason) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickCancelTask(boxId, taskId, taskType) {
    runInAction(() => {
      this.tmpDataForCancelTask = { boxId, taskId, taskType }
    })
    this.onTriggerOpenModal('showConfirmModal')
  }

  async cancelTaskActionByStatus(comment) {
    switch (mapTaskOperationTypeKeyToEnum[this.tmpDataForCancelTask.taskType]) {
      case TaskOperationType.MERGE:
        await this.onCancelMergeBoxes(this.tmpDataForCancelTask.boxId, this.tmpDataForCancelTask.taskId, comment)
        break

      case TaskOperationType.SPLIT:
        await this.onCancelSplitBoxes(this.tmpDataForCancelTask.boxId, this.tmpDataForCancelTask.taskId, comment)
        break

      case TaskOperationType.EDIT:
        await this.onCancelEditBox(this.tmpDataForCancelTask.boxId, this.tmpDataForCancelTask.taskId, comment)
        break
    }
  }

  async onClickConfirmCancelTask(comment) {
    try {
      await this.cancelTaskActionByStatus(comment)
      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showCancelTaskModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onCancelMergeBoxes(id, taskId, warehouseComment) {
    try {
      await BoxesModel.cancelMergeBoxes(id)
      await this.updateTask(taskId, warehouseComment, mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED])
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onCancelSplitBoxes(id, taskId, warehouseComment) {
    try {
      await BoxesModel.cancelSplitBoxes(id)
      await this.updateTask(taskId, warehouseComment, mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED])
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onCancelEditBox(id, taskId, warehouseComment) {
    try {
      await BoxesModel.cancelEditBoxes(id)
      await this.updateTask(taskId, warehouseComment, mapTaskStatusEmumToKey[TaskStatus.NOT_SOLVED])
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  async onClickResolveBtn(itemId) {
    try {
      const [task, platformSettings] = await Promise.all([
        StorekeeperModel.getTaskById(itemId),
        UserModel.getPlatformSettings(),
      ])

      runInAction(() => {
        this.volumeWeightCoefficient = platformSettings.volumeWeightCoefficient
      })

      this.onSelectTask(task)
      this.onTriggerEditTaskModal()
    } catch (error) {
      console.log(error)
    }
  }
}
