import { GridCellParams } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineRequestStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const bindIdeaToRequestColumns = [
  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: (params: GridCellParams) => <MultilineTextCell leftAlign text={params.row.humanFriendlyId} />,
    filterable: false,
    sortable: false,
    width: 70,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: (params: GridCellParams) => <MultilineRequestStatusCell status={params.row.status} />,
    filterable: false,
    sortable: false,
    width: 120,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
    renderCell: (params: GridCellParams) => (
      <MultilineTextCell leftAlign twoLines maxLength={60} text={params.row.title} />
    ),
    filterable: false,
    sortable: false,
    width: 260,
  },

  {
    field: 'spec',
    headerName: t(TranslationKey['Request type']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
    renderCell: (params: GridCellParams) => <MultilineTextCell leftAlign text={params.row.spec?.title} />,
    filterable: false,
    sortable: false,
    width: 100,
  },
]
