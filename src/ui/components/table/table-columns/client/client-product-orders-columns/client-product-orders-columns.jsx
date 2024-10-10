import { t } from 'i18n-js'
import { MdOutlineFilterAlt } from 'react-icons/md'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import {
  OrderStatus,
  OrderStatusByCode,
  OrderStatusByKey,
  OrderStatusTranslate,
  orderColorByStatus,
} from '@constants/orders/order-status'
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

export const clientProductOrdersViewColumns = (handlers, isSomeFilterOn) => [
  {
    field: 'id',
    headerName: t(TranslationKey.ID) + ' / item',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID) + ' / item'} />,
    renderCell: params => <Text isCell text={params.row.xid} />,
    width: 100,
    type: 'number',
  },

  {
    field: 'priorityAndChinaDelivery',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
    width: 90,
    renderCell: params => (
      <PriorityAndChinaDeliverCell
        priority={params.row.priority}
        chinaDelivery={params.row.expressChinaDelivery}
        status={params.row.status}
      />
    ),
    sortable: false,
    filterable: false,
  },

  {
    field: 'asin',
    headerName: 'ASIN',
    renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,
    width: 200,
    renderCell: params => (
      <ProductCell
        asin={params.row.product?.asin}
        image={params.row.product?.images?.[0]}
        sku={params.row.product?.skuByClient}
        title={params.row.product?.amazonTitle}
        superbox={params.row.amount}
      />
    ),
    sortable: false,
  },

  {
    field: 'orderStatus',
    headerName: t(TranslationKey.Status),
    renderHeader: () => {
      const { isActiveFilter } = isSomeFilterOn()

      return (
        <MultilineTextHeaderCell
          isFilterActive={isActiveFilter}
          text={t(TranslationKey.Status)}
          Icon={<MdOutlineFilterAlt size={20} />}
        />
      )
    },

    width: 160,
    renderCell: params => (
      <Text
        isCell
        text={OrderStatusTranslate(OrderStatusByCode[params.row.status])}
        color={orderColorByStatus(OrderStatusByCode[params.row.status])}
      />
    ),

    columnKey: columnnsKeys.shared.PRODUCT_ORDERS_STATUS,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    width: 240,
    renderCell: params => {
      const isRepeatOrder = Number(params.row.status) > Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])
      const currentText = isRepeatOrder ? t(TranslationKey['Repeat order']) : t(TranslationKey['To order'])

      return (
        <ActionButtonsCell
          showFirst
          firstContent={currentText}
          onClickFirst={() => handlers.onClickReorder(params.row, !isRepeatOrder)}
        />
      )
    },
    filterable: false,
    sortable: false,
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    width: 70,
    renderCell: params => <LinkCell value={params.row.barCode} />,
    sortable: false,
    align: 'center',
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params => <Text isCell text={params.row.amount} />,

    type: 'number',
    width: 90,
    sortable: false,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

    renderCell: params => <UserCell name={params.row.storekeeper?.name} id={params.row.storekeeper?._id} />,
    width: 130,
    sortable: false,
  },

  {
    field: 'warehouses',
    headerName: t(TranslationKey['Where to']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Where to'])} />,

    renderCell: params => <Text isCell text={params.row.destination?.name} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'productionTerm',
    headerName: t(TranslationKey['Production time, days']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,

    renderCell: params => {
      const orderSupplier = params.row.orderSupplier

      return orderSupplier ? (
        <Text isCell text={`${orderSupplier?.minProductionTerm} - ${orderSupplier?.maxProductionTerm}`} />
      ) : null
    },
    width: 160,
    sortable: false,
  },

  {
    field: 'deadline',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: params =>
      params.row.status < 20 ? <DeadlineCell deadline={params.row.deadline} /> : <Text isCell text={'-'} />,
    width: 100,
  },

  {
    field: 'needsResearch',
    headerName: t(TranslationKey['Re-search supplier']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Re-search supplier'])} />,

    width: 140,
    renderCell: params => (
      <Text isCell text={params.row.needsResearch ? t(TranslationKey.Yes) : t(TranslationKey.No)} />
    ),
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

    type: 'number',
    width: 140,
    renderCell: params => <Text isCell text={toFixedWithDollarSign(params.row.totalPrice, 2)} />,
  },

  {
    field: 'grossWeightKg',
    headerName: t(TranslationKey['Total weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total weight'])} />,

    type: 'number',
    width: 110,
    renderCell: params => <Text isCell text={toFixedWithKg(params.row.product?.weight * params.row.amount)} />,
    sortable: false,
  },
  {
    field: 'trackingNumberChina',
    headerName: t(TranslationKey['Track number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,

    width: 160,
    renderCell: params => <Text isCell text={params.row.trackingNumberChina} />,
  },

  {
    field: 'buyerComment',
    headerName: t(TranslationKey['Buyer comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,

    renderCell: params => <Text isCell text={params.row.buyerComment} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey['Client comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,

    renderCell: params => <Text isCell text={params.row.clientComment} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    width: 115,
    renderCell: params => <NormDateCell value={params.row.createdAt} />,
    // type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: 115,
    renderCell: params => <NormDateCell value={params.row.updatedAt} />,
    // type: 'date',
  },
]
