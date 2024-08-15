import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, TextCell, UserLinkCell } from '@components/data-grid/data-grid-cells'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const businessReportsColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'date',
      headerName: 'Date',
      renderHeader: () => <MultilineTextHeaderCell text="Date" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'totalOrderItems',
      headerName: 'Total order items',
      renderHeader: () => <MultilineTextHeaderCell text="Total order items" />,

      renderCell: params => <TextCell text={toFixed(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'unitsOrdered',
      headerName: 'Units ordered',
      renderHeader: () => <MultilineTextHeaderCell text="Units ordered" />,

      renderCell: params => <TextCell text={toFixed(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'orderedProductSales',
      headerName: 'Ordered product sales',
      renderHeader: () => <MultilineTextHeaderCell text="Ordered product sales" />,

      renderCell: params => <TextCell text={toFixed(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'avgUnits',
      headerName: 'Avg units',
      renderHeader: () => <MultilineTextHeaderCell text="Avg units" />,

      renderCell: params => <TextCell text={toFixed(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'avgSales',
      headerName: 'Avg sales',
      renderHeader: () => <MultilineTextHeaderCell text="Avg sales" />,

      renderCell: params => <TextCell text={toFixed(params.value, 2)} />,
      width: 115,
      columnKey: columnnsKeys.shared.NUMBER,
    },

    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <TextCell text={params.row?.shop?.name} />,
      width: 90,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'client',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => <UserLinkCell blackText name={params.row.client?.name} userId={params.row.client?._id} />,
      width: 110,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
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
