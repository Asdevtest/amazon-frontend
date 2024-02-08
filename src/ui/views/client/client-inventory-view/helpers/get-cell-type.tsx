import { GridRenderCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { formatCamelCaseString } from '@utils/text'

import { dateCells, numberCells, textCells } from '../cell-types'

import { getValidFieldName } from './get-valid-field-name'

export const getCellType = (column: string, table: string) => {
  const formedColumnName = formatCamelCaseString(column)
  const formedTableName = formatCamelCaseString(table)
  const validFieldName = getValidFieldName(table, column)

  const headerName = `${formedTableName} ${formedColumnName}`

  if (numberCells.includes(column)) {
    return {
      field: validFieldName,
      headerName,
      renderHeader: () => <MultilineTextHeaderCell text={headerName} />,

      renderCell: (params: GridRenderCellParams) => {
        return <MultilineTextCell text={params.row?.[table]?.[column]} />
      },
      minWidth: 80,

      columnKey: columnnsKeys.shared.QUANTITY,
    }
  } else if (textCells.includes(column)) {
    return {
      field: validFieldName,
      headerName,
      renderHeader: () => <MultilineTextHeaderCell text={headerName} />,

      renderCell: (params: GridRenderCellParams) => {
        return <MultilineTextCell text={params.row?.[table]?.[column]} />
      },
      minWidth: 80,

      columnKey: columnnsKeys.shared.STRING,
    }
  } else if (dateCells.includes(column)) {
    return {
      field: validFieldName,
      headerName,
      renderHeader: () => <MultilineTextHeaderCell text={headerName} />,
      renderCell: (params: GridRenderCellParams) => (
        <NormDateCell dateWithoutTime value={params.row?.[table]?.[column]} />
      ),
      width: 118,

      columnKey: columnnsKeys.shared.DATE,
    }
  }
}
