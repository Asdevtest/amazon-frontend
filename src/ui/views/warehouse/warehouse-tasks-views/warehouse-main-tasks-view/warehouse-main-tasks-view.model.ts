import { RadioChangeEvent } from 'antd'
import { transformAndValidate } from 'class-transformer-validator'
import { makeObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { TaskOperationType } from '@constants/task/task-operation-type'

import { BoxesModel } from '@models/boxes-model'
import { BoxesWarehouseUpdateBoxInTaskContract } from '@models/boxes-model/boxes-model.contracts'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { OtherModel } from '@models/other-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { onSubmitPostImages } from '@utils/upload-files'

import { TaskStatus } from '@typings/enums/task-status'
import { IBox } from '@typings/models/boxes/box'
import { ITask } from '@typings/models/tasks/task'
import { IPlatformSettings } from '@typings/shared/patform-settings'

import { warehouseMainTasksViewColumns } from './warehouse-main-tasks-view.columns'
import { ColumnsProps, fieldsForSearch, warehouseCanceledTasksConfig } from './warehouse-main-tasks-view.config'

const getTableKey = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.NEW:
      return DataGridTablesKeys.WAREHOUSE_VACANT_TASKS
    case TaskStatus.AT_PROCESS:
      return DataGridTablesKeys.WAREHOUSE_MY_TASKS
    case TaskStatus.SOLVED:
      return DataGridTablesKeys.WAREHOUSE_COMPLETED_TASKS
    case TaskStatus.NOT_SOLVED:
      return DataGridTablesKeys.WAREHOUSE_CANCELED_TASKS
    default:
      return DataGridTablesKeys.WAREHOUSE_MY_TASKS
  }
}

export class WarehouseMainTasksViewModel extends DataGridFilterTableModel {
  currentTask?: ITask
  taskType = null
  taskPriority = null
  showTaskModal = false
  showVerticalChoicesModal = false
  showEditPriorityData = false
  editPriorityData: any = {
    taskId: '',
    newPriority: 10,
  }
  box?: IBox
  showEditBoxModal = false
  images: string[] = []

  get platformSettings() {
    return UserModel.platformSettings as unknown as IPlatformSettings
  }

  constructor(status: TaskStatus) {
    const columnsProps: ColumnsProps = {
      onChangeTask: id => this.onChangeTask(id),
      onPickupTask: task => this.onPickupTask(task),
      onCancelTask: (boxId, taskId, taskType) => this.updateTask(boxId, taskId, taskType),
      onUpdateTaskPriority: (taskId, newPriority) => this.onUpdateTaskPriority(taskId, newPriority),
      onUpdateTask: (taskId, priority, reason) => this.onUpdateTask(taskId, priority, reason),
      status,
    }
    const columnsModel = warehouseMainTasksViewColumns(columnsProps)
    const filtersFields = getFilterFields(columnsModel)
    const defaultGetCurrentDataOptions = () => ({
      status,
      operationType: this.taskType || undefined,
      priority: this.taskPriority || undefined,
    })

    super({
      getMainDataMethod: StorekeeperModel.getLightTasksWithPag,
      columnsModel,
      filtersFields,
      mainMethodURL: 'storekeepers/tasks_light/pag/my?',
      fieldsForSearch,
      tableKey: getTableKey(status),
      defaultGetCurrentDataOptions,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })
    makeObservable(this, warehouseCanceledTasksConfig)

    this.getTableSettingsPreset()
    this.initHistory()

    if (this.history.location.state?.taskId) {
      this.onChangeTask(this.history.location.state?.taskId)

      const state = { ...this.history.location.state }
      delete state.taskId
      this.history.replace({ ...this.history.location, state })
    }
  }

  onChangeTaskType(event: RadioChangeEvent) {
    this.taskType = event.target.value
    this.getCurrentData()
  }

  onChangeTaskPriority(event: RadioChangeEvent) {
    this.taskPriority = event.target.value
    this.getCurrentData()
  }

  onClickReport() {
    this.selectedRows.forEach(taskId => OtherModel.getReportTaskByTaskId(taskId))
  }

  async onChangeTask(id: string) {
    try {
      const response = (await StorekeeperModel.getTaskById(id)) as unknown as ITask

      runInAction(() => {
        this.currentTask = response
      })

      this.onTriggerOpenModal('showTaskModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onPickupTasks() {
    try {
      await StorekeeperModel.pickupManyTasks(this.selectedRows)

      runInAction(() => (this.selectedRows = []))

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onUpdateTask(taskId: string, priority: number, reason: string) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async updateTask(boxId: string, taskId: string, taskType: string) {
    try {
      switch (taskType) {
        case TaskOperationType.MERGE:
          await BoxesModel.cancelMergeBoxes(boxId)
          break

        case TaskOperationType.SPLIT:
          await BoxesModel.cancelSplitBoxes(boxId)
          break

        case TaskOperationType.EDIT:
          await BoxesModel.cancelEditBoxes(boxId)
          break
      }

      await StorekeeperModel.updateTask(taskId, {
        status: TaskStatus.NOT_SOLVED,
      })

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  goToMyTasks() {
    this.onTriggerOpenModal('showVerticalChoicesModal')
    this.history.push('/warehouse/tasks/my-tasks', { taskId: this.currentTask?._id })
    this.currentTask = undefined
  }

  async onPickupTask(task: ITask) {
    try {
      await StorekeeperModel.pickupTask(task._id)

      this.getCurrentData()

      runInAction(() => (this.currentTask = task))

      this.onTriggerOpenModal('showVerticalChoicesModal')
    } catch (error) {
      console.error(error)
    }
  }

  onUpdateTaskPriority(taskId: string, newPriority: number) {
    this.editPriorityData = { taskId, newPriority }
    this.showEditPriorityData = true
  }

  onTriggerShowEditBoxModal(box: IBox) {
    this.box = box

    this.onTriggerOpenModal('showEditBoxModal')
  }

  async onSubmitUpdateBoxes(boxes: IBox[]) {
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i]

      await Promise.all([this.updateBox(box._id, box), this.setBoxBarcodeAttached(box._id, box)])
    }
  }

  async setBoxBarcodeAttached(id: string, box: IBox) {
    try {
      const barcodesAttachedData = box.items.map(item => ({
        orderId: item?.order?._id,
        isBarCodeAttachedByTheStorekeeper: item?.isBarCodeAttachedByTheStorekeeper,
        isBarCodeAlreadyAttachedByTheSupplier: item?.isBarCodeAlreadyAttachedByTheSupplier,
      }))
      await BoxesModel.setBarcodeAttachedCheckboxes(id, barcodesAttachedData)
    } catch (error) {
      console.error(error)
    }
  }

  async updateBox(id: string, data: IBox) {
    try {
      // @ts-ignore
      await onSubmitPostImages.call(this, { images: data.images, type: 'images' })
      data = { ...data, images: [...this.images] }

      const boxItems = data.items.map(item => ({
        orderId: item?.order?._id,
        isTransparencyFileAttachedByTheStorekeeper: item?.isTransparencyFileAttachedByTheStorekeeper,
        isTransparencyFileAlreadyAttachedByTheSupplier: item?.isTransparencyFileAlreadyAttachedByTheSupplier,
      }))

      const updateBoxData = {
        ...getObjectFilteredByKeyArrayWhiteList(
          { ...data, items: boxItems },
          [
            'lengthCmWarehouse',
            'widthCmWarehouse',
            'heightCmWarehouse',
            'weighGrossKgWarehouse',
            'isShippingLabelAttachedByStorekeeper',
            'isBarCodeAttachedByTheStorekeeper',
            'images',
            'items',
          ],
          false,
          (key: any, value: any) => {
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
      console.error(error)
    }
  }

  async updateBarcodeAndStatusInOrder(id: string, data: any) {
    try {
      await StorekeeperModel.updateStatusInOrder(id, data)
    } catch (error) {
      console.error(error)
    }
  }

  async resolveTask(taskId: string, newBoxes?: any) {
    try {
      await StorekeeperModel.resolveTask(taskId, { additionalBoxes: newBoxes })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSolveTask({ task, newBoxes, operationType, comment, photos }: any) {
    try {
      for (let i = 0; i < newBoxes.length; i++) {
        const box = getObjectFilteredByKeyArrayBlackList(
          {
            ...newBoxes[i],
            lengthCmWarehouse: Number(newBoxes[i].lengthCmWarehouse),
            widthCmWarehouse: Number(newBoxes[i].widthCmWarehouse),
            heightCmWarehouse: Number(newBoxes[i].heightCmWarehouse),
            weighGrossKgWarehouse: Number(newBoxes[i].weighGrossKgWarehouse),
          },
          ['images'],
        )

        await transformAndValidate(BoxesWarehouseUpdateBoxInTaskContract, box)
      }

      if (operationType === TaskOperationType.RECEIVE) {
        const requestBoxes = []
        for (let i = 0; i < newBoxes.length; i++) {
          const box = newBoxes[i]

          runInAction(() => {
            this.images = []
          })

          // @ts-ignore
          await onSubmitPostImages.call(this, { images: box.images, type: 'images' })

          const newBox = getObjectFilteredByKeyArrayWhiteList(
            {
              ...box,
              items: box.items.map((el: any) => ({
                amount: el.amount,
                orderId: el.order._id,
                productId: el.product._id,
                barCode: el.barCode,
                isBarCodeAlreadyAttachedByTheSupplier: el.isBarCodeAlreadyAttachedByTheSupplier,
                isBarCodeAttachedByTheStorekeeper: el.isBarCodeAttachedByTheStorekeeper,
                isTransparencyFileAlreadyAttachedByTheSupplier: el.isTransparencyFileAlreadyAttachedByTheSupplier,
                isTransparencyFileAttachedByTheStorekeeper: el.isTransparencyFileAttachedByTheStorekeeper,
                transparencyFile: el.transparencyFile,
              })),
              images: this.images,
            },
            [
              'amount',
              'weighGrossKg',
              'weightFinalAccountingKg',
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
              'isTransparencyFileAlreadyAttachedByTheSupplier',
              'isTransparencyFileAttachedByTheStorekeeper',
              'transparencyFile',
              'shippingLabel',
            ],
          )

          requestBoxes.push(newBox)
        }

        await Promise.all([
          await this.updateBarcodeAndStatusInOrder(newBoxes[0].items[0].order._id, {
            // @ts-ignore
            status: OrderStatusByKey[OrderStatus.VERIFY_RECEIPT],
          }),
          await this.resolveTask(task._id, requestBoxes),
        ])
      } else {
        await this.onSubmitUpdateBoxes(newBoxes)
        await this.resolveTask(task._id)
      }

      if (photos.length > 0) {
        // @ts-ignore
        await onSubmitPostImages.call(this, { images: photos, type: 'images' })
      } else {
        runInAction(() => {
          this.images = []
        })
      }

      await this.updateTaskWithStatus(this.currentTask?._id, comment)

      this.onTriggerOpenModal('showTaskModal')

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async updateTaskWithStatus(taskId?: string, comment?: string, status?: string) {
    try {
      await StorekeeperModel.updateTask(taskId, {
        storekeeperComment: comment || '',
        images: this.images || [],
        status,
      })

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }
}
