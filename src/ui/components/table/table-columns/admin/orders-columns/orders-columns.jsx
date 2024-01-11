import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { OrderStatusByCode, OrderStatusTranslate, orderColorByStatus } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  DownloadAndCopyBtnsCell,
  IconHeaderCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  PriorityAndChinaDeliverCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const adminOrdersViewColumns = () => [
  {
    field: 'id',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 100,
  },
  {
    field: 'priorityAndChinaDelivery',
    headerName: 'priorityAndChinaDelivery',
    renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
    width: 60,
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
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    width: 265,
    renderCell: params => <OrderCell product={params.row.product} />,
    sortable: false,
    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 220,
    renderCell: params => (
      <MultilineTextCell
        text={OrderStatusTranslate(OrderStatusByCode[params.value])}
        color={orderColorByStatus(OrderStatusByCode[params.value])}
        maxLength={40}
      />
    ),

    sortable: false,
    columnKey: columnnsKeys.client.ORDERS_STATUS,
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    width: 170,
    renderCell: params => <DownloadAndCopyBtnsCell value={params.row.product.barCode} />,

    filterable: false,
    sortable: false,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 150,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.row.product.client?.name} userId={params.row.product.client?._id} />
    ),
    width: 200,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey.Storekeeper),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Storekeeper)} />,

    renderCell: params => <UserLinkCell blackText name={params.value?.name} userId={params.value?._id} />,
    width: 200,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'buyer',
    headerName: t(TranslationKey.Buyer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

    width: 200,
    renderCell: params => <UserLinkCell blackText name={params.value?.name} userId={params.value?._id} />,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'partialPaymentAmountRmb',
    headerName: t(TranslationKey['Pay more']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Pay more'])} />,

    width: 140,
    type: 'number',
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

    width: 150,
    type: 'number',
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'weight',
    headerName: t(TranslationKey['Gross weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Gross weight'])} />,

    width: 160,
    renderCell: params => <ToFixedWithKgSignCell value={params.row.product.weight} fix={2} />,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,

    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 150,

    columnKey: columnnsKeys.shared.DATE,
  },
]
