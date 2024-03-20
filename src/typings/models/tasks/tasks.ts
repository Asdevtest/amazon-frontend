import { ITask } from './task'

export interface ITasksPag {
  count: number
  rows: Array<ITask>
}
