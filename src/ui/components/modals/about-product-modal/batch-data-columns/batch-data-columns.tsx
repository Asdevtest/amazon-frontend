import { GridRenderCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormalActionBtnCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { formatDate } from '@utils/date-time'
import { t } from '@utils/translations'

export const batchDataColumns = (rowHandler: (guid: string) => void) => [
  {
    field: 'id',
    headerName: t(TranslationKey['Batch number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch number'])} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.row.humanFriendlyId} />,
    width: 100,
    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_ORDER_IDS_ITEMS,
    filterable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'title',
    headerName: t(TranslationKey['Batch title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch title'])} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 100,
    sortable: false,
    columnKey: columnnsKeys.client.ORDERS_STATUS,
    disableColumnMenu: true,
  },
  {
    field: 'amountInBatch',
    headerName: t(TranslationKey['Quantity of the selected item in the batch']),
    renderHeader: () => (
      <MultilineTextHeaderCell text={t(TranslationKey['Quantity of the selected item in the batch'])} />
    ),
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 170,
    type: 'number',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    columnKey: columnnsKeys.shared.QUANTITY,
  },
  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.row.boxes[0].destination.name} />,
    width: 110,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'etd',
    headerName: t(TranslationKey['ETD (date of shipment)']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETD (date of shipment)'])} />,
    renderCell: (params: GridRenderCellParams) => (
      <MultilineTextCell text={formatDate(params.row.boxes[0].logicsTariff.etd)} />
    ),
    width: 120,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'eta',
    headerName: t(TranslationKey['ETA (arrival date)']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETA (arrival date)'])} />,
    renderCell: (params: GridRenderCellParams) => (
      <MultilineTextCell text={formatDate(params.row.boxes[0].logicsTariff.eta)} />
    ),
    width: 120,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    width: 180,
    renderCell: (params: GridRenderCellParams) => (
      <NormalActionBtnCell
        bTnText={t(TranslationKey['Watch the batch'])}
        onClickOkBtn={() => rowHandler(params.row._id)}
      />
    ),
    filterable: false,
    sortable: false,
    disableColumnMenu: true,
  },
]
