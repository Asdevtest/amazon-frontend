import { GridRowModel } from '@mui/x-data-grid'

import { OrderStatusTranslate, orderColorByStatus } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  DeadlineCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

import { OrderStatus } from '@typings/enums/order'

export const aboutProductsColumns = [
  {
    field: 'id',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.ID)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row.id} />,
    width: 80,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: ({ row }: GridRowModel) => (
      <MultilineTextCell
        maxLength={50}
        text={OrderStatusTranslate(OrderStatus[row.status])}
        color={orderColorByStatus(OrderStatus[row.status])}
      />
    ),
    width: 240,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={row.amount} />,
    width: 130,
  },

  {
    field: 'deadline',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Deadline)} />,
    renderCell: ({ row }: GridRowModel) => <DeadlineCell deadline={row.deadline} />,
    width: 130,
  },
]
