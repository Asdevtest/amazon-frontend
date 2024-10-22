import { action, computed, observable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { TaskPriority } from '@typings/enums/task/task-priority'
import { TaskStatus } from '@typings/enums/task/task-status'
import { TaskType } from '@typings/enums/task/task-type'
import { ITask } from '@typings/models/tasks/task'

export const warehouseCanceledTasksConfig = {
  currentTask: observable,
  taskType: observable,
  taskPriority: observable,
  showTaskModal: observable,
  showVerticalChoicesModal: observable,
  showEditPriorityData: observable,
  editPriorityData: observable,
  box: observable,
  showEditBoxModal: observable,
  images: observable,

  platformSettings: computed,

  onChangeTaskType: action.bound,
  onChangeTaskPriority: action.bound,
  onClickReport: action.bound,
  onChangeTask: action.bound,
  onPickupTasks: action.bound,
  onUpdateTask: action.bound,
  updateTask: action.bound,
  goToMyTasks: action.bound,
  onPickupTask: action.bound,
  onUpdateTaskPriority: action.bound,
  updateTaskWithStatus: action.bound,
  onClickSolveTask: action.bound,
  resolveTask: action.bound,
  updateBarcodeAndStatusInOrder: action.bound,
  updateBox: action.bound,
  setBoxBarcodeAttached: action.bound,
  onSubmitUpdateBoxes: action.bound,
  onTriggerShowEditBoxModal: action.bound,
}

export const fieldsForSearch = ['asin', 'trackNumberText', 'orderXid', 'item']

export interface ColumnsProps {
  onChangeTask: (id: string) => void
  onPickupTask: (task: ITask) => void
  onCancelTask: (boxId: string, taskId: string, taskType: string) => void
  onUpdateTaskPriority: (taskId: string, newPriority: number) => void
  onUpdateTask: (taskId: string, priority: number, reason: string) => void
  status: TaskStatus
}

export const taskPriorityOptions = () => [
  { label: t(TranslationKey['All priorities']), value: null },
  { label: t(TranslationKey.TASK_LOW_PRIORITY_KEY), value: TaskPriority.LONG },
  { label: t(TranslationKey.TASK_STANDART_PRIORITY_KEY), value: TaskPriority.STANDART },
  { label: t(TranslationKey.Urgent), value: TaskPriority.URGENT },
  { label: t(TranslationKey.Problematic), value: TaskPriority.PROBLEMATIC },
]

export const taskTypeOptions = (hideCondition?: boolean) => [
  { label: t(TranslationKey['All tasks']), value: null },
  { label: t(TranslationKey.Edit), value: TaskType.EDIT },
  { label: t(TranslationKey.Merge), value: TaskType.MERGE },
  ...(hideCondition ? [] : [{ label: t(TranslationKey.Receive), value: TaskType.RECEIVE }]),
  { label: t(TranslationKey.Split), value: TaskType.SPLIT },
]

export const getTableKey = (status: TaskStatus) => {
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
