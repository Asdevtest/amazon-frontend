/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip } from 'antd'

import { GridRenderCellParams } from '@mui/x-data-grid-premium'

import { MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { formatDateWithoutTime } from '@utils/date-time'
import { formatSnakeCaseString } from '@utils/text'

import { getColumnKey } from './get-column-key'

export const getColumn = (table: string, column: { name: string; type: string }, isCounter?: string) => {
  const { name, type } = column

  let headerName = formatSnakeCaseString(name)

  if (isCounter) {
    const tableName = formatSnakeCaseString(table)
    headerName = `${tableName} ${headerName}`
  }
  // const columnKey = getColumnKey(type)

  return {
    field: table + name,
    headerName,
    renderHeader: () => <MultilineTextHeaderCell text={headerName} />,
    valueGetter: (params: GridRenderCellParams) => {
      let value: unknown = 0

      if (type === 'date') {
        value = formatDateWithoutTime(params.row?.reports?.[table]?.[name])
      } else if (isCounter) {
        value = params.row?.reports?.[table]
      } else {
        params.row?.reports?.[table]?.[name]
      }

      return value
    },
    renderCell: (params: GridRenderCellParams) => (
      <Tooltip title={params.row?.reports?.[table]?.updated_at}>
        <div>
          <Text isCell text={params.value} />
        </div>
      </Tooltip>
    ),
    width: 150,
    // columnKey,
  }
}
