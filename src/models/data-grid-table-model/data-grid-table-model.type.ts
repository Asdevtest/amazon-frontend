/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridSortModel } from '@mui/x-data-grid-premium'

import { IGridColumn } from '@typings/shared/grid-column'

export interface DataGridTableModelParams {
  getMainDataMethod: (...args: any) => any
  columnsModel: IGridColumn[]
  tableKey?: string
  fieldsForSearch?: string[]
  defaultGetCurrentDataOptions?: any
  columnsModelConfig?: any
  defaultSortModel?: GridSortModel
}
