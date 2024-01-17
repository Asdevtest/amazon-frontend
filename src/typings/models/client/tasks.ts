import { ILightTasks } from '../administrator-model/light-tasks'

export interface IClientTasks {
  count?: number

  rows?: Array<ILightTasks>
}
