import { GridColDef } from '@mui/x-data-grid'

export const getFilterFields = (columnsModel: GridColDef[]) => columnsModel?.map(el => el.field)
