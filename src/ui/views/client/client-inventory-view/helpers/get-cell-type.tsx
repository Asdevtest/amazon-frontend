import { GridRenderCellParams } from '@mui/x-data-grid'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { dateCells, numberCells, textCells } from './cell-types'

export const getCellType = (column: string, table: string) => {
  if (numberCells.includes(column)) {
    return {
      field: `${table} ${column}`,
      headerName: `${table} ${column}`,
      renderHeader: () => <MultilineTextHeaderCell text={`${table} ${column}`} />,

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
      headerName: `${table} ${column}`,
      renderHeader: () => <MultilineTextHeaderCell text={`${table} ${column}`} />,

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
      headerName: `${table} ${column}`,
      renderHeader: () => <MultilineTextHeaderCell text={`${table} ${column}`} />,
      renderCell: (params: GridRenderCellParams) => (
        <NormDateCell dateWithoutTime value={params.row?.[table]?.[0]?.[column]} />
      ),
      width: 118,

      // table,
      // columnKey: columnnsKeys.shared.DATE,
    }
  }
}
