/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridBaseColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

import { IRadioBottonsSetting } from '@components/shared/radio-buttons/radio-buttons'

export interface IGridColumn<T = any> extends GridBaseColDef {
  table?: T
  columnKey?: string
  disableCustomSort?: boolean
  hideEmptyObject?: boolean
  fields?: IRadioBottonsSetting[]
  transformValueMethod?: (value: any) => string
  columnMenuConfig?: any
  sortOptions?: 'asc' | 'desc'
}
