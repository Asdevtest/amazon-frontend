import { GridCellParams } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineRequestStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

export const linkRequestColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'humanFriendlyId',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: (params: GridCellParams) => <MultilineTextCell leftAlign text={params.row.humanFriendlyId} />,

      minWidth: 70,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: (params: GridCellParams) => <MultilineRequestStatusCell status={params.row.status} />,
      minWidth: 120,
    },

    {
      field: 'title',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
      renderCell: (params: GridCellParams) => (
        <MultilineTextCell leftAlign twoLines maxLength={60} text={params.row.title} />
      ),
      minWidth: 260,
    },

    {
      field: 'spec',
      headerName: t(TranslationKey['Request type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
      renderCell: (params: GridCellParams) => <MultilineTextCell threeLines text={params.row.spec?.title} />,
      minWidth: 110,
    },
  ]

  for (const column of columns) {
    column.sortable = false
    column.filterable = false
    column.disableColumnMenu = true
  }

  return columns
}
