import { ILightTasks } from '../administrator-model/light-tasks'

interface ILightTasksPag {
  count?: number

  rows?: Array<ILightTasks>
}
