import { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'
import { GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid-premium'

export const sortModelInitialValue: GridSortModel = [{ field: '', sort: 'desc' }]
export const paginationModelInitialValue: GridPaginationModel = { page: 0, pageSize: 15 }
export const filterModelInitialValue: GridFilterModel = { items: [] }
export const defaultPinnedColumns = {
  left: [GRID_CHECKBOX_SELECTION_COL_DEF.field],
  right: [],
}
