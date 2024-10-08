import { action, computed, observable } from 'mobx'

import { TaskStatus } from '@typings/enums/task-status'
import { ITask } from '@typings/models/tasks/task'

export const warehouseCanceledTasksConfig = {
  currentTask: observable,
  taskType: observable,
  taskPriority: observable,
  showTaskInfoModal: observable,
  showVerticalChoicesModal: observable,
  showEditPriorityData: observable,
  editPriorityData: observable,

  platformSettings: computed,

  onChangeTaskType: action.bound,
  onChangeTaskPriority: action.bound,
  onClickReport: action.bound,
  onChangeTask: action.bound,
  onPickupTasks: action.bound,
  updateTaskComment: action.bound,
  updateTaskPriority: action.bound,
  updateTask: action.bound,
  goToMyTasks: action.bound,
  onPickupTask: action.bound,
  onUpdateTaskPriority: action.bound,
}

export const fieldsForSearch = ['asin', 'trackNumberText', 'id', 'item']

export interface ColumnsProps {
  onChangeTask: (id: string) => void
  onPickupTask: (task: ITask) => void
  onCancelTask: (boxId: string, taskId: string, taskType: string) => void
  onUpdateTaskPriority: (taskId: string, newPriority: number) => void
  onUpdateTaskComment: (taskId: string, priority: number, reason: string) => void
  status: TaskStatus
}
