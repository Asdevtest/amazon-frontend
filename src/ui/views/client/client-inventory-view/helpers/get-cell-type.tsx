import { GridCellParams } from '@mui/x-data-grid'

import { MultilineTextCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

import { numberCells } from './cell-types'

export const getCellType = (column: string, table: string) => {
  if (numberCells.includes(column)) {
    return {
      field: column,
      headerName: column,
      renderHeader: () => <MultilineTextHeaderCell text={column} />,

      renderCell: (params: GridCellParams) => <MultilineTextCell text={params.row[table][column]} />,
      minWidth: 80,

      // table: DataGridFilterTables.SELLERBOARD_LAST_30_DAYS,
      // columnKey: columnnsKeys.shared.DATE,
    }
  }
}
