/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { GridColDef } from '@mui/x-data-grid-premium'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BoxStatus } from '@constants/statuses/box-status'
import { TaskOperationType } from '@constants/task/task-operation-type'
import { TaskStatus, mapTaskStatusEmumToKey } from '@constants/task/task-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { OtherModel } from '@models/other-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'
import { ITask } from '@typings/shared/my-payment'

import { clientTasksViewColumns } from './client-tasks-columns'
import { observerConfig } from './observer-config'

export class ClientWarehouseTasksViewModel extends DataGridFilterTableModel {
  showProgress = false
  storekeepersData: IStorekeeper[] = []

  selectedPriority = 'all'
  selectedStatus = 'all'
  selectedStorekeeper = 'all'
  selectedType = 'all'
  curOpenedTask: ITask | null = null

  showConfirmWithCommentModal = false
  showTaskInfoModal = false
  showEditPriorityData = false

  editPriorityData = {
    taskId: '',
    newPriority: 0,
  }

  toCancelData: any = null

  get userInfo() {
    return UserModel.userInfo
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  get isDisabledDownload() {
    return (
      !this.selectedRows?.length ||
      this.selectedRows?.length > 1 ||
      this.currentData
        ?.filter((el: any) => this.selectedRows?.includes(el?._id))
        ?.some((box: any) => box?.operationType !== TaskOperationType.RECEIVE)
    )
  }

  constructor() {
    const rowTaskHandlers = {
      updateTaskPriority: (taskId: string, newPriority: number) => this.startEditTaskPriority(taskId, newPriority),
      updateTaskComment: (taskId: string, priority: number, reason: string) =>
        this.updateTaskComment(taskId, priority, reason),
      onClickTaskInfo: (item: ITask) => this.setCurrentOpenedTask(item),
      onClickCancelBtn: (boxId: string, taskId: string, operationType: string) =>
        this.onClickCancelBtn(boxId, taskId, operationType),
    }

    const columnsModel = clientTasksViewColumns(rowTaskHandlers) as GridColDef[]

    const defaultGetCurrentDataOptions = () => ({
      storekeeperId: this.selectedStorekeeper === 'all' ? undefined : this.selectedStorekeeper,
      priority: this.selectedPriority === 'all' ? undefined : this.selectedPriority,
      status: this.selectedStatus === 'all' ? undefined : this.selectedStatus,
      operationType: this.selectedType === 'all' ? undefined : this.selectedType,
    })

    super({
      getMainDataMethod: ClientModel.getTasks,
      columnsModel,
      filtersFields: [],
      mainMethodURL: 'client/tasks/by_boxes?',
      fieldsForSearch: ['asin', 'amazonTitle', 'skuByClient', 'id', 'item', 'xid'],
      tableKey: DataGridTablesKeys.CLIENT_WAREHOUSE_TASKS,
      defaultGetCurrentDataOptions,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })
    makeObservable(this, observerConfig)

    this.getStorekeepers()
    this.getTableSettingsPreset()
  }

  setFilters(filterCategory: string, value: string) {
    // @ts-ignore
    this[filterCategory] = value

    this.getCurrentData()
  }

  async updateTaskPriority(taskId: string, priority: number, reason: string) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)

      await this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async getStorekeepers() {
    try {
      this.getDataGridState()
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.IN_STOCK)

      runInAction(() => {
        this.storekeepersData = result as IStorekeeper[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  async updateTaskComment(taskId: string, priority: number, reason: string) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  startEditTaskPriority(taskId: string, newPriority: number) {
    this.editPriorityData = { taskId, newPriority }
    this.showEditPriorityData = true
  }

  onClickReportBtn() {
    this.setRequestStatus(loadingStatus.IS_LOADING)
    this.selectedRows.forEach((el, index) => {
      const taskId = el

      OtherModel.getReportTaskByTaskId(taskId).then(() => {
        if (index === this.selectedRows.length - 1) {
          this.setRequestStatus(loadingStatus.SUCCESS)
        }
      })
    })
  }

  async setCurrentOpenedTask(item: ITask) {
    try {
      const task = (await StorekeeperModel.getTaskById(item._id)) as unknown as ITask

      runInAction(() => {
        this.curOpenedTask = task
      })

      this.onTriggerOpenModal('showTaskInfoModal')
    } catch (error) {
      console.error(error)
    }
  }

  async cancelTask(taskId: string, comment: { clientComment: string }) {
    try {
      await ClientModel.cancelTask(taskId, comment)
    } catch (error) {
      console.error(error)
    }
  }

  onClickCancelBtnByAction(actionType: string, id: string) {
    switch (actionType) {
      case 'merge':
        return this.cancelMergeBoxes(id)

      case 'split':
        return this.cancelSplitBoxes(id)

      case 'edit':
        return this.cancelEditBoxes(id)
    }
  }

  async onClickCancelBtn(boxId: string, taskId: string, operationType: string) {
    try {
      const task = await StorekeeperModel.getTaskById(taskId)

      if (task.status !== mapTaskStatusEmumToKey[TaskStatus.NEW as keyof typeof mapTaskStatusEmumToKey]) {
        this.getCurrentData()

        toast.warning(t(TranslationKey['The warehouse has already taken the task to work']))
      } else {
        runInAction(() => {
          this.toCancelData = { id: boxId, taskId, type: operationType }
        })

        this.onTriggerOpenModal('showConfirmWithCommentModal')
      }
    } catch (e) {
      console.error(e)
    }
  }

  async onClickCancelAfterConfirm(comment: string) {
    try {
      await this.onClickCancelBtnByAction(this.toCancelData.type, this.toCancelData.id)

      this.onTriggerOpenModal('showConfirmWithCommentModal')

      await this.cancelTask(this.toCancelData.taskId, { clientComment: comment })

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async cancelEditBoxes(id: string) {
    try {
      await BoxesModel.cancelEditBoxes(id)
    } catch (error) {
      console.error(error)
    }
  }

  async cancelMergeBoxes(id: string) {
    try {
      await BoxesModel.cancelMergeBoxes(id)
    } catch (error) {
      console.error(error)
    }
  }

  async cancelSplitBoxes(id: string) {
    try {
      await BoxesModel.cancelSplitBoxes(id)
    } catch (error) {
      console.error(error)
    }
  }
}
