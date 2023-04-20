import {transformAndValidate} from 'class-transformer-validator'
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {mapTaskOperationTypeKeyToEnum, TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {BoxesModel} from '@models/boxes-model'
import {BoxesWarehouseUpdateBoxInTaskContract} from '@models/boxes-model/boxes-model.contracts'
import {OtherModel} from '@models/other-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {warehouseMyTasksViewColumns} from '@components/table-columns/warehouse/my-tasks-columns'

import {warehouseTasksDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {objectToUrlQs} from '@utils/text'
import {onSubmitPostImages} from '@utils/upload-files'

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

  drawerOpen = false
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
    runInAction(() => {
      this.history = history
    })

    if (location.state?.task) {
      this.onClickResolveBtn(location.state?.task)

      const state = {...history.location.state}
      delete state.task
      history.replace({...history.location, state})
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
    runInAction(() => {
      this.filterModel = model
    })
  }

  setDataGridState(state) {
    runInAction(() => {
      this.firstRowId = state.sorting.sortedRows[0]
    })

    SettingsModel.setDataGridState(state, DataGridTablesKeys.WAREHOUSE_MY_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_MY_TASKS]

    runInAction(() => {
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
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
      this.curPage = 0
    })

    this.getTasksMy()
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeDrawerOpen(e, value) {
    runInAction(() => {
      this.drawerOpen = value
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.getTasksMy()
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })
    this.getTasksMy()
  }

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = warehouseMyTasksViewColumns(this.rowHandlers, this.firstRowId).map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedTasks = model
    })
  }

  onClickReportBtn() {
    this.selectedTasks.forEach(el => {
      const taskId = el

      OtherModel.getReportTaskByTaskId(taskId)
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

  onChangeTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
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
          {asin: {$contains: this.nameSearchValue}},
          {
            trackNumberText: {
              [`${
                isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue)) ? '$contains' : '$eq'
              }`]: this.nameSearchValue,
            },
          },
          {id: {$eq: this.nameSearchValue}},
          {item: {$eq: this.nameSearchValue}},
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
        offset: this.curPage * this.rowsPerPage,
        limit: this.rowsPerPage,
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
      runInAction(() => {
        this.error = error
      })
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
      await StorekeeperModel.resolveTask(taskId, {additionalBoxes: newBoxes})
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
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

            // deliveryLength: Number(newBoxes[i].deliveryLength),
            // deliveryWidth: Number(newBoxes[i].deliveryWidth),
            // deliveryHeight: Number(newBoxes[i].deliveryHeight),
            // deliveryMass: Number(newBoxes[i].deliveryMass),
          },
          ['tmpImages'],
        )

        await transformAndValidate(BoxesWarehouseUpdateBoxInTaskContract, box)

        // await transformAndValidate(
        //   operationType === TaskOperationType.RECEIVE
        //     ? BoxesWarehouseUpdateBoxInReceiveTaskContract
        //     : BoxesWarehouseUpdateBoxInTaskSplitMergeEditContract,
        //   box,
        // )
      }

      if (operationType === TaskOperationType.RECEIVE) {
        const requestBoxes = []
        for (let i = 0; i < newBoxes.length; i++) {
          const box = newBoxes[i]

          runInAction(() => {
            this.imagesOfBox = []
          })

          if (box.tmpImages.length > 0) {
            await onSubmitPostImages.call(this, {images: box.tmpImages, type: 'imagesOfBox'})
          }

          const newBox = getObjectFilteredByKeyArrayWhiteList(
            {
              ...box,
              // items: [
              //   {
              //     amount: box.items[0].amount,
              //     orderId: box.items[0].order._id,
              //     productId: box.items[0].product._id,
              //     barCode: box.items[0].barCode,
              //     isBarCodeAlreadyAttachedByTheSupplier: box.items[0].isBarCodeAlreadyAttachedByTheSupplier,
              //     isBarCodeAttachedByTheStorekeeper: box.items[0].isBarCodeAttachedByTheStorekeeper,
              //   },
              // ],

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

        await this.resolveTask(task._id, requestBoxes)

        await this.updateBarcodeAndStatusInOrder(newBoxes[0].items[0].order._id, {
          status: OrderStatusByKey[OrderStatus.VERIFY_RECEIPT],
        })
      } else {
        await this.onSubmitUpdateBoxes(newBoxes)
        await this.resolveTask(task._id)
      }

      if (photos.length > 0) {
        await onSubmitPostImages.call(this, {images: photos, type: 'imagesOfTask'})
      } else {
        runInAction(() => {
          this.imagesOfTask = []
        })
      }

      await this.updateTask(this.selectedTask._id, comment)
      this.setRequestStatus(loadingStatuses.success)

      this.onTriggerEditTaskModal()

      await UserModel.getUserInfo()

      await this.getTasksMy()
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
      this.editPriorityData = {taskId, newPriority}
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

  onClickCancelTask(boxId, taskId, taskType) {
    runInAction(() => {
      this.tmpDataForCancelTask = {boxId, taskId, taskType}
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

  async onClickResolveBtn(item) {
    try {
      const result = await StorekeeperModel.getTaskById(item._id)

      const platformSettingsResult = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = platformSettingsResult.volumeWeightCoefficient
      })

      this.onSelectTask(result)
      this.onTriggerEditTaskModal()
    } catch (error) {
      console.log(error)
    }
  }
}
