/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridColDef, GridSortModel } from '@mui/x-data-grid-premium'

export interface DataGridTableModelParams {
  getMainDataMethod: (...args: any) => any
  columnsModel: GridColDef[]
  tableKey?: string
  fieldsForSearch?: string[]
  defaultGetCurrentDataOptions?: any
  columnsModelConfig?: any
  defaultSortModel?: GridSortModel
}
