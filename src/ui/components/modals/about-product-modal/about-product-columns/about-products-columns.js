import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { OrderStatusByCode, OrderStatusTranslate, orderColorByStatus } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  DeadlineCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const aboutProductsColumns = () => [
  {
    field: 'id',
    headerName: t(TranslationKey.ID) + ' / item',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID) + ' / item'} />,
    valueGetter: params => params.row.id,
    renderCell: params => <MultilineTextCell text={params.row.id} />,
    width: 100,

    filterable: false,
    sortable: false,
    disableColumnMenu: true,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: params => (
      <MultilineTextCell
        maxLength={50}
        text={OrderStatusTranslate(OrderStatusByCode[params.row.status])}
        color={orderColorByStatus(OrderStatusByCode[params.row.status])}
      />
    ),
    width: 160,
    sortable: false,

    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_ORDER_IDS_ITEMS,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 130,
    type: 'number',
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },
  {
    field: 'deadline',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: params => <DeadlineCell deadline={params.row.deadline} />,
    width: 100,
    filterable: false,
    disableColumnMenu: true,
  },
]
