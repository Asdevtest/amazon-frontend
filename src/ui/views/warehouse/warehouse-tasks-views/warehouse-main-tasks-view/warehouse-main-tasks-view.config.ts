import { action, computed, observable } from 'mobx'

import { TaskStatus } from '@typings/enums/task-status'
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

export const fieldsForSearch = ['asin', 'trackNumberText', 'xid', 'item']

export interface ColumnsProps {
  onChangeTask: (id: string) => void
  onPickupTask: (task: ITask) => void
  onCancelTask: (boxId: string, taskId: string, taskType: string) => void
  onUpdateTaskPriority: (taskId: string, newPriority: number) => void
  onUpdateTask: (taskId: string, priority: number, reason: string) => void
  status: TaskStatus
}
