import { ITask } from '../shared/task'

export interface ITasksPag {
  count?: number
  rows?: Array<ITask>
}
