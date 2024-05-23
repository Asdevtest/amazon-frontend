import { GridBaseColDef } from '@mui/x-data-grid/models/colDef/gridColDef'

import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'

export interface IGridColumn extends GridBaseColDef {
  table?: DataGridFilterTables
  columnKey?: string
  disableCustomSort?: boolean
}
