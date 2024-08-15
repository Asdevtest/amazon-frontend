import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'

import { MultilineTextHeaderCell, NormDateCell } from '@components/data-grid/data-grid-cells'

import { IGridColumn } from '@typings/shared/grid-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const ordersColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'date',
      headerName: 'Date',
      renderHeader: () => <MultilineTextHeaderCell text="Date" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.BUSINESS_REPORTS
    }

    column.sortable = false
  }

  return columns
}
