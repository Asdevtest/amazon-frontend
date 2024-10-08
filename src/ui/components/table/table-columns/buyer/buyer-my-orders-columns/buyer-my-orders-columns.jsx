import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { OrderStatus, OrderStatusByCode, OrderStatusByKey, orderColorByStatus } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  DeadlineCell,
  DownloadAndCopyBtnsCell,
  IconHeaderCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  PriorityAndChinaDeliverCell,
  UserLinkCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'

import { convertDaysToSeconds, formatDate, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const buyerMyOrdersViewColumns = () => [
  {
    field: 'id',
    headerName: t(TranslationKey.ID) + ' / item',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID) + ' / item'} />,
    renderCell: params => (
      <MultilineTextCell text={params.row.originalData.idAndItem ?? `${params.row.originalData.id}  / -`} />
    ),
    sortable: true,
  },

  {
    field: 'priorityAndChinaDelivery',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
    width: 90,
    renderCell: params => (
      <PriorityAndChinaDeliverCell
        priority={params.row.originalData.priority}
        chinaDelivery={params.row.originalData.expressChinaDelivery}
        status={params.row.originalData.status}
      />
    ),
    sortable: false,
    filterable: false,
  },

  {
    field: 'asin',
    headerName: 'ASIN',
    renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,

    width: 280,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
    sortable: false,
  },
  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 130,
    renderCell: params => (
      <MultilineTextCell
        text={params.value}
        color={orderColorByStatus(OrderStatusByCode[params.row.originalData.status])}
      />
    ),
    sortable: false,

    columnKey: columnnsKeys.buyer.MY_ORDERS_STATUS,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,

    width: 90,
    type: 'number',
    sortable: false,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey.Price),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.row.originalData.totalPrice, 2)} />,
    type: 'number',
    width: 90,
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    width: 140,
    renderCell: params => (
      <DownloadAndCopyBtnsCell value={params.value} isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id} />
    ),
    sortable: false,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.storekeeper?._id} />
    ),
    width: 120,
    sortable: false,
  },

  {
    field: 'productionTerm',
    headerName: t(TranslationKey['Production time']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,

    renderCell: params => {
      const currentSupplier = params.row.originalData?.orderSupplier

      return (
        <MultilineTextCell text={`${currentSupplier?.minProductionTerm} - ${currentSupplier?.maxProductionTerm}`} />
      )
    },
    valueGetter: params => {
      const currentSupplier = params.row.originalData?.orderSupplier

      return `${currentSupplier?.minProductionTerm} - ${currentSupplier?.maxProductionTerm}`
    },
    width: 120,
    sortable: false,
  },

  {
    field: 'deadline',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
    renderCell: params =>
      params.row.originalData.status < 20 ? (
        <DeadlineCell deadline={params.row.deadline} />
      ) : (
        <MultilineTextCell text={'-'} />
      ),
    width: 100,
  },

  {
    field: 'paymentDateToSupplier',
    headerName: 'Payment date',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Payment date'])} />,

    renderCell: params => (
      <MultilineTextCell
        withLineBreaks
        color={
          Math.abs(getDistanceBetweenDatesInSeconds(params.row.originalData.paymentDateToSupplier)) >
            convertDaysToSeconds(params.row.originalData?.orderSupplier?.productionTerm) &&
          params.row.originalData.status === OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER] &&
          !!params.row.originalData?.orderSupplier?.productionTerm
            ? '#FF1616'
            : null
        }
        text={
          params.row.originalData.paymentDateToSupplier ? formatDate(params.row.originalData.paymentDateToSupplier) : ''
        }
      />
    ),
    width: 115,
  },

  {
    field: 'needsResearch',
    headerName: t(TranslationKey['Re-search supplier']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Re-search supplier'])} />,

    width: 100,
    renderCell: params => <MultilineTextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,

    renderCell: params => (
      <UserMiniCell
        userName={params.row.originalData.product.client?.name}
        userId={params.row.originalData.product.client?._id}
      />
    ),
    width: 180,
    sortable: false,
  },

  {
    field: 'warehouses',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => <MultilineTextCell leftAlign threeLines text={params.value} />,
    width: 130,
    sortable: false,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey['Client comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,

    renderCell: params => <MultilineTextCell alignLeft threeLines maxLength={140} text={params.value} />,
    width: 400,
    sortable: false,
  },

  {
    field: 'buyerComment',
    headerName: t(TranslationKey['Buyer comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,

    renderCell: params => <MultilineTextCell alignLeft threeLines maxLength={140} text={params.value} />,
    width: 400,
    sortable: false,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 100,
    // type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 100,
    // type: 'date',
  },
]
