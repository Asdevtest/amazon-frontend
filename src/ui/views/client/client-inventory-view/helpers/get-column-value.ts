import { GridRenderCellParams } from '@mui/x-data-grid-premium'

import { formatDateWithoutTime } from '@utils/date-time'

export const getColumnValue = ({
  params,
  table,
  name,
  type,
  isCounter,
}: {
  params: GridRenderCellParams
  table: string
  name: string
  type: string
  isCounter: boolean
}) => {
  const columns = params.row?.reports?.[table]
  let value: unknown = 0

  if (Array.isArray(columns)) {
    const lastColumn = columns[columns.length - 1]

    if (type === 'date') {
      value = formatDateWithoutTime(lastColumn?.[name])
    } else {
      value = lastColumn?.[name]
    }
  } else if (isCounter) {
    value = columns
  } else if (type === 'date') {
    value = formatDateWithoutTime(columns?.[name])
  } else {
    value = columns?.[name]
  }

  return value
}
