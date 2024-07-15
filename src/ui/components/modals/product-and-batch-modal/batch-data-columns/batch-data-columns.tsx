import { GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'

import { formatDate } from '@utils/date-time'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const batchDataColumns = (handleOpenBatchModal: (id: string) => void) => [
  {
    field: 'id',
    headerName: t(TranslationKey['Batch number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch number'])} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row.humanFriendlyId} />,
    minWidth: 90,
  },

  {
    field: 'title',
    headerName: t(TranslationKey['Batch title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch title'])} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell maxLength={18} text={row.title} />,
    minWidth: 120,
  },

  {
    field: 'amountInBatch',
    headerName: t(TranslationKey['Quantity of the selected item in the batch']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Quantity of the selected item in the batch'])} />
    ),
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row.amountInBatch} />,
    minWidth: 165,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row?.boxes?.[0]?.destination?.name} />,
    minWidth: 145,
  },

  {
    field: 'etd',
    headerName: t(TranslationKey['ETD (date of shipment)']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETD (date of shipment)'])} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={formatDate(row.boxes[0].logicsTariff.etd)} />,
    minWidth: 110,
  },

  {
    field: 'eta',
    headerName: t(TranslationKey['ETA (arrival date)']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETA (arrival date)'])} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={formatDate(row.boxes[0].logicsTariff.eta)} />,
    minWidth: 110,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: ({ row }: GridRowModel) => (
      <ActionButtonsCell
        isFirstButton
        firstButtonElement={t(TranslationKey['Watch the batch'])}
        firstButtonStyle={ButtonStyle.PRIMARY}
        onClickFirstButton={() => handleOpenBatchModal(row._id)}
      />
    ),
    minWidth: 180,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
]
