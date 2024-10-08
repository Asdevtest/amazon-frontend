import { RadioChangeEvent } from 'antd'
import { makeObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TaskOperationType } from '@constants/task/task-operation-type'

import { BoxesModel } from '@models/boxes-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { OtherModel } from '@models/other-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { TaskStatus } from '@typings/enums/task-status'
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
  showTaskInfoModal = false
  showVerticalChoicesModal = false
  showEditPriorityData = false
  editPriorityData: any = {
    taskId: '',
    newPriority: 10,
  }

  get platformSettings() {
    return UserModel.platformSettings as unknown as IPlatformSettings
  }

  constructor(status: TaskStatus) {
    const columnsProps: ColumnsProps = {
      onChangeTask: id => this.onChangeTask(id),
      onPickupTask: task => this.onPickupTask(task),
      onCancelTask: (boxId, taskId, taskType) => this.updateTask(boxId, taskId, taskType),
      onUpdateTaskPriority: (taskId, newPriority) => this.onUpdateTaskPriority(taskId, newPriority),
      onUpdateTaskComment: (taskId, priority, reason) => this.updateTaskComment(taskId, priority, reason),
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

      this.onTriggerOpenModal('showTaskInfoModal')
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

  async updateTaskComment(taskId: string, priority: number, reason: string) {
    try {
      await StorekeeperModel.updateTaskPriority(taskId, priority, reason)

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async updateTaskPriority(taskId: string, priority: number, reason: string) {
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
    this.history.push('/warehouse/tasks/my-tasks', { task: this.currentTask?._id })
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
}
