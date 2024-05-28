import { Dayjs } from 'dayjs'
import { ChangeEvent } from 'react'

import { Launches } from '@typings/enums/launches'

export interface ILaunchOption {
  label: string
  value: Launches
}

export interface IListingLaunch {
  _id: string
  type: Launches
  value: number
  comment: string
  requestId: string | null
  result: string
  dateFrom: string | null
  dateTo: string | null
}

export type ChangeNumberCellValueType = (
  id: string,
  field: keyof IListingLaunch,
) => (value: string | number | null) => void

export type ChangeCommentCellValueType = (
  id: string,
  field: keyof IListingLaunch,
) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

export type ChangeDateCellValueType = (
  id: string,
  field: keyof IListingLaunch,
) => (dates: null | (Dayjs | null)[], dateStrings: string[]) => void
