/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip } from 'antd'
import { KeyboardEvent, MouseEvent, MouseEventHandler } from 'react'

import { GridRenderCellParams } from '@mui/x-data-grid-premium'

import { MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { formatDateWithoutTime } from '@utils/date-time'
import { formatCamelCaseString, formatSnakeCaseString } from '@utils/text'

import { IProduct } from '@typings/models/products/product'

import { getColumnKey } from './get-column-key'

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
      let value: unknown = 0

      if (type === 'date') {
        value = formatDateWithoutTime(params.row?.reports?.[table]?.[name])
      } else if (isCounter) {
        value = params.row?.reports?.[table]
      } else if (Array?.isArray(params.row?.reports?.[table])) {
        const dataArray = params.row?.reports?.[table]
        value = dataArray?.[dataArray?.length - 1]?.[name] || ''
      } else {
        value = params.row?.reports?.[table]?.[name]
      }

      return value
    },
    renderCell: (params: GridRenderCellParams) => {
      console.log('params.value :>> ', params.value)

      return (
        <Tooltip title={formatDateWithoutTime(params.row?.reports?.[table]?.updated_at)}>
          <div
            style={{ width: '100%', height: '100%' }}
            onClick={(event: MouseEvent<HTMLDivElement>) => {
              event.stopPropagation()
              onClickParsingReportCell?.(params.row, table)
            }}
          >
            <Text isCell text={params.value} />
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
