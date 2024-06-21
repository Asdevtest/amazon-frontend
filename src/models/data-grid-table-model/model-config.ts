import { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'

export const sortModelInitialValue: GridSortModel = [{ field: '', sort: 'desc' }]
export const paginationModelInitialValue: GridPaginationModel = { page: 0, pageSize: 15 }
export const filterModelInitialValue: GridFilterModel = { items: [] }
