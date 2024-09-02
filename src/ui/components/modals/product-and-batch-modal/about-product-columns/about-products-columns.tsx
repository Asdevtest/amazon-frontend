import { GridRowModel } from '@mui/x-data-grid'

import { OrderStatusTranslate } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { DeadlineCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { OrderStatus } from '@typings/enums/order/order-status'

export const aboutProductsColumns = [
  {
    field: 'id',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.ID)} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row.id} />,
    width: 80,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={OrderStatusTranslate(OrderStatus[row.status])} />,
    width: 240,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row.amount} />,
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
