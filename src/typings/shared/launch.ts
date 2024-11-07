import { LaunchType } from '@typings/types/launch'

export interface ILaunch {
  type: LaunchType
  value: number
  dateFrom?: string
  dateTo?: string
  comment?: string
  result?: string
  expired?: boolean
  _id?: string
}
