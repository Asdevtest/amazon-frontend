import { GridRenderCellParams } from '@mui/x-data-grid'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { formatCamelCaseString } from '@utils/text'

import { dateCells, numberCells, textCells } from './cell-types'

export const getCellType = (column: string, table: string) => {
  const formedColumnName = formatCamelCaseString(column)
  const formedTableName = formatCamelCaseString(table)

  const headerName = `${formedTableName} ${formedColumnName}`

  if (numberCells.includes(column)) {
    return {
      field: `${table} ${column}`,
      headerName,
      renderHeader: () => <MultilineTextHeaderCell text={headerName} />,

      renderCell: (params: GridRenderCellParams) => {
        return <MultilineTextCell text={params.row?.[table]?.[0]?.[column]} />
      },
      minWidth: 80,

      // table,
      // columnKey: columnnsKeys.shared.QUANTITY,
    }
  } else if (textCells.includes(column)) {
    return {
      field: `${table} ${column}`,
      headerName,
      renderHeader: () => <MultilineTextHeaderCell text={headerName} />,

      renderCell: (params: GridRenderCellParams) => {
        return <MultilineTextCell text={params.row?.[table]?.[0]?.[column]} />
      },
      minWidth: 80,

      // table,
      // columnKey: columnnsKeys.shared.STRING,
    }
  } else if (dateCells.includes(column)) {
    return {
      field: `${table} ${column}`,
      headerName,
      renderHeader: () => <MultilineTextHeaderCell text={headerName} />,
      renderCell: (params: GridRenderCellParams) => (
        <NormDateCell dateWithoutTime value={params.row?.[table]?.[0]?.[column]} />
      ),
      width: 118,

      // table,
      // columnKey: columnnsKeys.shared.DATE,
    }
  }
}
