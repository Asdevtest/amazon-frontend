/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip } from 'antd'

import { GridRenderCellParams } from '@mui/x-data-grid-premium'

import { MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { formatSnakeCaseString } from '@utils/text'

import { getColumnKey } from './get-column-key'

export const getColumn = (table: string, column: { name: string; type: string }) => {
  const { name, type } = column

  const headerName = formatSnakeCaseString(name)
  // const columnKey = getColumnKey(type)

  return {
    field: name,
    headerName,
    renderHeader: () => <MultilineTextHeaderCell text={headerName} />,
    valueGetter: (params: GridRenderCellParams) => params.row?.[table]?.[name],
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Tooltip title={params.row?.[table]?.updated_at}>
          <Text isCell text={params.value} />
        </Tooltip>
      )
    },

    width: 150,
    // columnKey,
  }
}
