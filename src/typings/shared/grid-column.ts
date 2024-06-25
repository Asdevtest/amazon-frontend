/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridBaseColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

import { IRadioBottonsSetting } from '@components/shared/radio-buttons/radio-buttons'

export interface IGridColumn extends GridBaseColDef {
  table?: DataGridFilterTables
  columnKey?: string
  disableCustomSort?: boolean
  hideEmptyObject?: boolean
  fields?: IRadioBottonsSetting[]
  transformValueMethod?: (value: string) => string
  columnMenuConfig?: any
}
