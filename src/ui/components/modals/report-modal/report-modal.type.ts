import { Dayjs } from 'dayjs'
import { ChangeEvent } from 'react'

import { Launches } from '@typings/enums/launches'
import { IListingLaunch } from '@typings/models/clients/listing-report'
import { IProduct } from '@typings/models/products/product'
import { IRequest } from '@typings/models/requests/request'
import { ILaunch } from '@typings/shared/launch'

export interface ILaunchOption {
  label: string
  value: Launches
}

export interface IRequestWithLaunch extends IRequest {
  launch: ILaunch
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

export type AddRequestType = (launch: ILaunch, request?: IRequest) => void

export interface ReportModalColumnsProps {
  onChangeNumberCellValue: ChangeNumberCellValueType
  onChangeCommentCellValue: ChangeCommentCellValueType
  onChangeDateCellValue: ChangeDateCellValueType
  onAddRequest: AddRequestType
  onRemoveLaunch: (id: string) => void
  product?: IProduct
}

export interface IReportModalModelProps {
  defaultProduct?: IProduct
  reportId?: string
}
