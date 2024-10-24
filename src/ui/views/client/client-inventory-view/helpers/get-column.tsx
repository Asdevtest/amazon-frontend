/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip } from 'antd'
import { KeyboardEvent, MouseEvent, MouseEventHandler } from 'react'

import { GridRenderCellParams } from '@mui/x-data-grid-premium'

import { CheckboxCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { formatDateWithoutTime } from '@utils/date-time'
import { formatCamelCaseString, formatSnakeCaseString } from '@utils/text'

import { IProduct } from '@typings/models/products/product'

import { getColumnKey } from './get-column-key'
import { getColumnValue } from './get-column-value'

export const getColumn = ({
  table,
  column,
  isCounter,
  onClickParsingReportCell,
}: {
  table: string
  column: { name: string; type: string }
  isCounter?: string
  onClickParsingReportCell?: (row: IProduct, table: string) => void
}) => {
  const { name, type } = column

  let headerName = formatCamelCaseString(name)

  if (isCounter) {
    const tableName = formatSnakeCaseString(table)
    headerName = `${tableName} ${headerName}`
  }
  const columnKey = getColumnKey(type)

  return {
    field: `${table}:${name}`,
    headerName,
    renderHeader: () => <MultilineTextHeaderCell text={headerName} />,
    valueGetter: (params: GridRenderCellParams) => {
      return getColumnValue({ params, table, name, type, isCounter: !!isCounter })
    },
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Tooltip title={formatDateWithoutTime(params.row?.reports?.[table]?.updated_at)}>
          <div
            style={{ width: '100%', height: '100%' }}
            onClick={(event: MouseEvent<HTMLDivElement>) => {
              event.stopPropagation()
              onClickParsingReportCell?.(params.row, table)
            }}
          >
            {type === 'boolean' ? (
              <CheckboxCell disabled checked={params.value} />
            ) : (
              <Text isCell text={params.value} />
            )}
          </div>
        </Tooltip>
      )
    },
    width: 150,
    fieldNameFilter: name,
    columnKey,
    table,
  }
}
