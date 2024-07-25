import { GridCellParams } from '@mui/x-data-grid'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, TextCell } from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

export const bindIdeaToRequestColumns = [
  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: (params: GridCellParams) => <TextCell text={params.row.humanFriendlyId} />,
    filterable: false,
    sortable: false,
    width: 70,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: (params: GridCellParams) => (
      <TextCell text={MyRequestStatusTranslate(params.row.status)} color={colorByStatus(params.row.status)} />
    ),
    filterable: false,
    sortable: false,
    width: 120,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
    renderCell: (params: GridCellParams) => <TextCell text={params.row.title} />,
    filterable: false,
    sortable: false,
    width: 260,
  },

  {
    field: 'spec',
    headerName: t(TranslationKey['Request type']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
    renderCell: (params: GridCellParams) => <TextCell text={params.row.spec?.title} />,
    filterable: false,
    sortable: false,
    width: 110,
  },
]
