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
    headerName: 'Номер партии',
    valueGetter: params => params.row.humanFriendlyId,
    renderHeader: () => <MultilineTextHeaderCell text={'Номер партии'} />,
    renderCell: params => <MultilineTextCell text={params.row.humanFriendlyId} />,
    width: 100,
    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_ORDER_IDS_ITEMS,
    filterable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'title',
    headerName: 'Название партии',
    renderHeader: () => <MultilineTextHeaderCell text={'Название партии'} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
    sortable: false,
    columnKey: columnnsKeys.client.ORDERS_STATUS,
    disableColumnMenu: true,
  },
  {
    field: 'amountInBatch',
    headerName: 'Кол-во выбранных това-ров  в партии',
    renderHeader: () => <MultilineTextHeaderCell text={'Кол-во выбранных това-ров  в партии'} />,
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
    headerName: 'Пункт назначения',
    renderHeader: () => <MultilineTextHeaderCell text={'Пункт назначения'} />,
    renderCell: params => <MultilineTextCell text={params.row.boxes[0].destination.name} />,
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'etd',
    headerName: 'ETD: дата отправки',
    renderHeader: () => <MultilineTextHeaderCell text={'ETD: дата отправки'} />,
    renderCell: params => <MultilineTextCell text={formatDate(params.row.boxes[0].logicsTariff.etd)} />,
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'eta',
    headerName: 'ETА: дата прибытия',
    renderHeader: () => <MultilineTextHeaderCell text={'ETD: дата отправки'} />,
    renderCell: params => <MultilineTextCell text={formatDate(params.row.boxes[0].logicsTariff.eta)} />,
    width: 100,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'eta',
    headerName: 'ETА: дата прибытия',
    renderHeader: () => <MultilineTextHeaderCell text={'ETD: дата отправки'} />,
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
