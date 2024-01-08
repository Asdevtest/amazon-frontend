import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { OrderStatusByCode, OrderStatusTranslate, orderColorByStatus } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  DeadlineCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormalActionBtnCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { formatDate } from '@utils/date-time'
import { t } from '@utils/translations'

export const batchDataColumns = () => [
  {
    field: 'id',
    headerName: t(TranslationKey['Batch number']),
    valueGetter: params => params.row.humanFriendlyId,
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch number'])} />,
    renderCell: params => <MultilineTextCell text={params.row.humanFriendlyId} />,
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
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
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
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,
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
    renderCell: params => <MultilineTextCell text={params.row.boxes[0].destination.name} />,
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'etd',
    headerName: t(TranslationKey['ETD (date of shipment)']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETD (date of shipment)'])} />,
    renderCell: params => <MultilineTextCell text={formatDate(params.row.boxes[0].logicsTariff.etd)} />,
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'eta',
    headerName: t(TranslationKey['ETA (arrival date)']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['ETA (arrival date)'])} />,
    renderCell: params => <MultilineTextCell text={formatDate(params.row.boxes[0].logicsTariff.eta)} />,
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    width: 200,
    renderCell: params => <NormalActionBtnCell bTnText={t(TranslationKey['Watch the batch'])} />,
    filterable: false,
    sortable: false,
  },
]
