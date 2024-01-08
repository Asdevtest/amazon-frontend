import { GridRenderCellParams } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { OrderStatusByCode, OrderStatusTranslate, orderColorByStatus } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  DeadlineCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const aboutProductsColumns = [
  {
    field: 'id',
    headerName: t(TranslationKey.ID) + ' / item',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID) + ' / item'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.row.id} />,
    width: 100,

    filterable: false,
    sortable: false,
    disableColumnMenu: true,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    valueGetter: (params: GridRenderCellParams) =>
      OrderStatusTranslate(OrderStatusByCode[params.value as keyof typeof OrderStatusByCode]),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: (params: GridRenderCellParams) => (
      <MultilineTextCell
        maxLength={50}
        text={OrderStatusTranslate(OrderStatusByCode[params.row.status as keyof typeof OrderStatusByCode])}
        color={orderColorByStatus(OrderStatusByCode[params.row.status as keyof typeof OrderStatusByCode])}
      />
    ),
    width: 160,
    sortable: false,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
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
    renderCell: (params: GridRenderCellParams) => <DeadlineCell deadline={params.row.deadline} />,
    width: 100,
    filterable: false,
    disableColumnMenu: true,
  },
]
