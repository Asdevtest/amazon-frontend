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
  dateFrom: string
  dateTo: string
  comment: string
  requestId: string | null
  result?: string
}

export type ChangeCellValueType = (id: string, field: keyof IListingLaunch) => (value: string | number | null) => void

export type ChangeCellCommentValueType = (
  id: string,
  field: keyof IListingLaunch,
) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
