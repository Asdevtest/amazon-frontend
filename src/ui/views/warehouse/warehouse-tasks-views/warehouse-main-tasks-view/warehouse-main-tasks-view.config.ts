import { action, computed, observable } from 'mobx'

export const warehouseCanceledTasksConfig = {
  currentTask: observable,
  taskType: observable,
  taskPriority: observable,
  showTaskInfoModal: observable,

  platformSettings: computed,
  downloadTaskFileDisabled: computed,

  onChangeTaskType: action.bound,
  onChangeTaskPriority: action.bound,
  onClickReport: action.bound,
  onChangeTask: action.bound,
}

export const fieldsForSearch = ['asin', 'trackNumberText', 'xid', 'item']

export interface ColumnsProps {
  onChangeTask: (id: string) => void
}
