import { LaunchType } from '@typings/types/launch'

export interface ILaunch {
  type: LaunchType
  value: number
  dateTo?: string
  expired?: boolean
  _id?: string
}
