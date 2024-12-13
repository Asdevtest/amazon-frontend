import { t } from 'i18n-js'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { OrderStatus, OrderStatusByCode, OrderStatusByKey, orderColorByStatus } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  DeadlineCell,
  IconHeaderCell,
  LinkCell,
  MultilineTextHeaderCell,
  NormDateCell,
  PriorityAndChinaDeliverCell,
  ProductCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'

import { IGridColumn } from '@typings/shared/grid-column'

export const ordersColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'xid',
      headerName: 'ID/item',
      renderHeader: () => <MultilineTextHeaderCell text="ID/item" />,
      renderCell: ({ row }) => <Text isCell text={row.xid} />,
      width: 100,
    },
    {
      field: 'priorityAndChinaDelivery',
      headerName: t(TranslationKey.Priority),
      renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
      renderCell: ({ row }) => (
        <PriorityAndChinaDeliverCell
          priority={row.priority}
          chinaDelivery={row.expressChinaDelivery}
          status={row.status}
        />
      ),
      filterable: false,
      width: 90,
    },
    {
      field: 'asin',
      headerName: 'ASIN',
      renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,
      renderCell: ({ row }) => (
        <ProductCell
          asin={row.product?.asin}
          image={row.product?.images?.[0]}
          sku={row.product?.skuByClient}
          title={row.product?.amazonTitle}
        />
      ),
      width: 200,
    },
    {
      field: 'orderStatus',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: ({ row }) => (
        // @ts-ignore
        <Text isCell text={OrderStatus[row.status]} color={orderColorByStatus(OrderStatusByCode[row.status])} />
      ),
      columnKey: columnnsKeys.shared.PRODUCT_ORDERS_STATUS,
      width: 160,
    },
    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }) => {
        // @ts-ignore
        const isRepeatOrder = Number(row.status) > Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])
        const currentText = isRepeatOrder ? t(TranslationKey['Repeat order']) : t(TranslationKey['To order'])

        return <ActionButtonsCell showFirst firstContent={currentText} onClickFirst={() => {}} />
      },
      filterable: false,
      width: 240,
    },
    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,
      renderCell: ({ row }) => <LinkCell value={row.barCode} />,
      width: 70,
    },
    {
      field: 'amount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
      renderCell: ({ row }) => <Text isCell text={row.amount} />,
      width: 90,
    },
    {
      field: 'storekeeper',
      headerName: t(TranslationKey['Int warehouse']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,
      renderCell: ({ row }) => (
        <UserCell name={row.storekeeper?.name} id={row.storekeeper?._id} email={row.storekeeper?.email} />
      ),
      width: 130,
    },
    {
      field: 'warehouses',
      headerName: t(TranslationKey['Where to']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Where to'])} />,
      renderCell: ({ row }) => <Text isCell text={row.destination?.name} />,
      width: 120,
    },
    {
      field: 'productionTerm',
      headerName: t(TranslationKey['Production time, days']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,
      renderCell: ({ row }) => {
        const orderSupplier = row.orderSupplierCard

        return orderSupplier ? (
          <Text isCell text={`${orderSupplier?.minProductionTerm} - ${orderSupplier?.maxProductionTerm}`} />
        ) : null
      },
      width: 160,
    },
    {
      field: 'deadline',
      headerName: t(TranslationKey.Deadline),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
      renderCell: ({ row }) =>
        row.status < 20 ? <DeadlineCell deadline={row.deadline} /> : <Text isCell text={'-'} />,
      width: 100,
    },
    {
      field: 'needsResearch',
      headerName: t(TranslationKey['Re-search supplier']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Re-search supplier'])} />,
      renderCell: ({ row }) => <Text isCell text={row.needsResearch ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
      width: 140,
    },
    {
      field: 'totalPrice',
      headerName: t(TranslationKey['Total price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,
      renderCell: ({ row }) => <Text isCell text={toFixedWithDollarSign(row.totalPrice, 2)} />,
      width: 140,
    },
    {
      field: 'grossWeightKg',
      headerName: t(TranslationKey['Total weight']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total weight'])} />,
      renderCell: ({ row }) => <Text isCell text={toFixedWithKg(row.product?.weight * row.amount)} />,
      width: 110,
    },
    {
      field: 'trackNumberText',
      headerName: t(TranslationKey['Track number']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,
      renderCell: ({ row }) => <Text isCell text={row.trackNumberText} />,
      width: 160,
    },
    {
      field: 'buyerComment',
      headerName: t(TranslationKey['Buyer comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
      renderCell: ({ row }) => <Text isCell text={row.buyerComment} />,
      width: 120,
    },
    {
      field: 'clientComment',
      headerName: t(TranslationKey['Client comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
      renderCell: ({ row }) => <Text isCell text={row.clientComment} />,
      width: 120,
    },
    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: ({ row }) => <NormDateCell value={row.createdAt} />,
      width: 115,
    },
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }) => <NormDateCell value={row.updatedAt} />,
      width: 115,
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}
