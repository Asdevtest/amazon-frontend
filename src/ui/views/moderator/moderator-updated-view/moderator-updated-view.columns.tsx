import { GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

export const moderatorUpdatedColumns = () => [
  {
    field: 'title',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell leftAlign text={row.title} />,
    filterable: false,
    sortable: false,
    width: 200,
  },

  /* {
    field: 'createdAt',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={formatNormDateTime(row.createdAt)} />,
    filterable: false,
    sortable: false,
    width: 95,
  },

  {
    field: 'updatedAt',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={formatNormDateTime(row.updatedAt)} />,
    filterable: false,
    sortable: false,
    width: 95,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
    renderCell: ({ row }: GridRowModel) => (
      <UserLinkCell blackText name={row.createdBy?.name} userId={row.createdBy?._id} />
    ),
    filterable: false,
    sortable: false,
    width: 200,
  }, */
]
