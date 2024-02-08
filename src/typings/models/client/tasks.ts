import { ITask } from '../shared/task'

export interface IClientTasks {
  count?: number

  rows?: Array<ITask>
}
