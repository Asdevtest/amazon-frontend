/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridColDef } from '@mui/x-data-grid-premium'

export interface DataGridFilterTableModelParams {
  getMainDataMethod: (...args: any) => any
  columnsModel: GridColDef[]
  filtersFields: string[]
  mainMethodURL: string
  fieldsForSearch?: string[]
  tableKey?: string
  defaultGetCurrentDataOptions?: any
  additionalPropertiesColumnMenuSettings?: any
  additionalPropertiesGetFilters?: any
}
