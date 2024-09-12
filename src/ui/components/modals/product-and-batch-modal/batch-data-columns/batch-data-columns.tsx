import { GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { formatDate } from '@utils/date-time'
import { t } from '@utils/translations'

export const batchDataColumns = (handleOpenBatchModal: (id: string) => void) => [
  {
    field: 'id',
    headerName: t(TranslationKey['Batch number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch number'])} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row.humanFriendlyId} />,
    width: 90,
  },

  {
    field: 'title',
    headerName: t(TranslationKey['Batch title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch title'])} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row.title} />,
    width: 120,
  },

  {
    field: 'amountInBatch',
    headerName: t(TranslationKey['Quantity of the selected item in the batch']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Quantity of the selected item in the batch'])} />
    ),
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row.amountInBatch} />,
    width: 165,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row?.boxes?.[0]?.destination?.name} />,
    width: 145,
  },

  {
    field: 'etd',
    headerName: t(TranslationKey['ETD (date of shipment)']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETD (date of shipment)'])} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={formatDate(row.boxes[0].logicsTariff.etd)} />,
    width: 110,
  },

  {
    field: 'eta',
    headerName: t(TranslationKey['ETA (arrival date)']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETA (arrival date)'])} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={formatDate(row.boxes[0].logicsTariff.eta)} />,
    width: 110,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: ({ row }: GridRowModel) => (
      <ActionButtonsCell
        showFirst
        firstContent={t(TranslationKey['Watch the batch'])}
        onClickFirst={() => handleOpenBatchModal(row._id)}
      />
    ),
    width: 180,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
]
