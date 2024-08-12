import { GridCellParams } from '@mui/x-data-grid'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, TextCell } from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

export const linkRequestColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'humanFriendlyId',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
      renderCell: (params: GridCellParams) => <TextCell text={params.row.humanFriendlyId} />,

      width: 80,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: (params: GridCellParams) => (
        <TextCell text={MyRequestStatusTranslate(params.row.status)} color={colorByStatus(params.row.status)} />
      ),
      width: 120,
    },

    {
      field: 'title',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
      renderCell: (params: GridCellParams) => <TextCell text={params.row.title} />,
      width: 260,
    },

    {
      field: 'spec',
      headerName: t(TranslationKey['Request type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
      renderCell: (params: GridCellParams) => <TextCell text={params.row.spec?.title} />,
      width: 110,
    },
  ]

  for (const column of columns) {
    column.sortable = false
    column.filterable = false
    column.disableColumnMenu = true
  }

  return columns
}
