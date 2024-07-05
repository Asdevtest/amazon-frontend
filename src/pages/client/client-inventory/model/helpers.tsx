import { GridRenderCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'

import { MultilineTextCell, MultilineTextHeaderCell, NormDateCell } from '@components/data-grid/data-grid-cells'

import { formatCamelCaseString, toFixed } from '@utils/text'

import { dateCells, numberCells, textCells } from './constants'

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
      valueGetter: (params: GridRenderCellParams) => toFixed(params.row?.[table]?.[column], 2),
      renderCell: (params: GridRenderCellParams) => {
        return <MultilineTextCell text={params.row?.[table]?.[column]} />
      },
      minWidth: 150,

      columnKey: columnnsKeys.shared.QUANTITY,
    }
  } else if (textCells.includes(column)) {
    return {
      field: validFieldName,
      headerName,
      renderHeader: () => <MultilineTextHeaderCell text={headerName} />,
      valueGetter: (params: GridRenderCellParams) => params.row?.[table]?.[column],
      renderCell: (params: GridRenderCellParams) => {
        return <MultilineTextCell text={params.row?.[table]?.[column]} />
      },
      minWidth: 150,

      columnKey: columnnsKeys.shared.STRING,
    }
  } else if (dateCells.includes(column)) {
    return {
      field: validFieldName,
      headerName,
      renderHeader: () => <MultilineTextHeaderCell text={headerName} />,
      valueGetter: (params: GridRenderCellParams) => params.row?.[table]?.[column],
      renderCell: (params: GridRenderCellParams) => (
        <NormDateCell dateWithoutTime value={params.row?.[table]?.[column]} />
      ),
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    }
  }
}

export const getValidFieldName = (...strings: string[]): string => {
  const transformedStrings = strings.map((str, index) => {
    let firstLeter = str.charAt(0)

    if (index === 0) {
      firstLeter = firstLeter.toLowerCase()
    } else {
      firstLeter = firstLeter.toUpperCase()
    }

    return firstLeter + str.slice(1)
  })

  return transformedStrings.join('')
}
