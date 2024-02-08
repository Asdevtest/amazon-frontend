import { GridColDef } from '@mui/x-data-grid'

export const getFilterFields = (columnsModel: GridColDef[], fieldsToAdd?: string[]) => {
  const fields = columnsModel?.map(el => el.field)

  if (fieldsToAdd) {
    return fields.concat(fieldsToAdd)
  }

  return fields
}
