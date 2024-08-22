/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGridColumn } from '@typings/shared/grid-column'

export interface DataGridTableModelParams {
  getMainDataMethod: (...args: any) => any
  columnsModel: IGridColumn[]
  tableKey?: string
  fieldsForSearch?: string[]
  defaultGetCurrentDataOptions?: any
}
