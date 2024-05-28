import { Launches } from '@typings/enums/launches'

export interface ILaunchOption {
  label: string
  value: Launches
}

export interface IListingLaunch {
  _id: string
  type: Launches
  value: number
  dateFrom: string
  dateTo: string
  comment: string
  requestId: string
}
