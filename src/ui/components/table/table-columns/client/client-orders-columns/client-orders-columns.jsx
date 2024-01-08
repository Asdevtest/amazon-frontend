import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { OrderStatus, OrderStatusByCode, OrderStatusByKey, orderColorByStatus } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientActionButtons } from '@components/data-grid/data-grid-cells/client-action-buttons/client-action-buttons'
import {
  DeadlineCell,
  DownloadAndCopyBtnsCell,
  IconHeaderCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  NormalActionBtnCell,
  OrderCell,
  PriorityAndChinaDeliverCell,
  RenderFieldValueCell,
  SuccessActionBtnCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { checkIsHasHttp } from '@utils/checks'
import { formatDate, formatNormDateTime } from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

export const clientOrdersViewColumns = (rowHandlers, getColumnMenuSettings, getOnHover) => [
  {
    field: 'id',
    headerName: t(TranslationKey.ID) + ' / item',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID) + ' / item'} />,
    valueGetter: params => params.row.idItem,
    renderCell: params => <MultilineTextCell text={params.row.idItem} />,
    width: 100,

    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_ORDER_IDS_ITEMS,
  },

  {
    field: 'shopId',
    headerName: t(TranslationKey.Shop),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Shop)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell twoLines text={params.value} />,
    width: 100,
    sortable: false,

    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_SHOPS,
  },

  {
    field: 'priority',
    headerName: t(TranslationKey.Priority),
    renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
    renderCell: params => (
      <PriorityAndChinaDeliverCell
        priority={params.row.originalData.priority}
        chinaDelivery={params.row.originalData.expressChinaDelivery}
        status={params.row.originalData.status}
      />
    ),
    width: 75,
    // sortable: false,

    columnKey: columnnsKeys.client.MY_ORDERS_PRIORITY,
  },

  {
    field: 'asin',
    headerName: 'ASIN',
    renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
    width: 280,
    sortable: false,

    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    renderCell: params => (
      <MultilineTextCell
        maxLength={50}
        text={params.value}
        color={orderColorByStatus(OrderStatusByCode[params.row.originalData.status])}
      />
    ),
    width: 160,
    sortable: false,
    filterable: false,
    columnKey: columnnsKeys.client.ORDERS_STATUS,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: params => (
      <>
        {Number(params.row.originalData.status) > Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]) ? (
          <ClientActionButtons params={params} rowHandlers={rowHandlers} />
        ) : (
          <SuccessActionBtnCell
            bTnText={t(TranslationKey['To order'])}
            onClickOkBtn={e => {
              e.stopPropagation()
              rowHandlers.onClickReorder(params.row.originalData, true)
            }}
          />
        )}
      </>
    ),
    width: 220,
    filterable: false,
    sortable: false,
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,
    width: 170,
    renderCell: params => (
      <DownloadAndCopyBtnsCell value={params.value} isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id} />
    ),
    valueFormatter: params => (checkIsHasHttp(params.value) ? params.value : getAmazonImageUrl(params.value, true)),
    sortable: false,
    filterable: false,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
    type: 'number',
    sortable: false,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,
    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.storekeeper?._id} />
    ),
    width: 160,
    sortable: false,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey['Where to']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Where to'])} />,
    renderCell: params => <RenderFieldValueCell value={params.row.originalData.destination?.name} />,
    valueGetter: params => params.row.originalData.destination?.name,
    width: 140,
    sortable: false,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'productionTerm',
    headerName: t(TranslationKey['Production time']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,
    renderCell: params => <MultilineTextCell text={params.row.originalData.orderSupplier?.productionTerm} />,
    valueGetter: params => params.row.originalData.orderSupplier?.productionTerm,
    width: 120,
    sortable: false,

    columnKey: columnnsKeys.shared.QUANTITY,
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
    valueGetter: params => (params.value ? formatDate(params.value) : ''),
    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'needsResearch',
    headerName: t(TranslationKey['Re-search supplier']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Re-search supplier'])} />,
    renderCell: params => <MultilineTextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
    width: 100,

    columnKey: columnnsKeys.freelancer.FREELANCE_REQUESTS_CONFIRMATION,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    valueFormatter: params => toFixedWithDollarSign(params.value, 2),
    width: 140,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'weight',
    headerName: t(TranslationKey['Total weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total weight'])} />,
    renderCell: params => <ToFixedWithKgSignCell value={params.row.originalData.product?.weight} fix={2} />,
    valueGetter: params => toFixedWithKg(params.row.originalData.product?.weight, 2),
    width: 110,
    type: 'number',
    sortable: false,
    filterable: false,
  },

  {
    field: 'buyerComment',
    headerName: t(TranslationKey['Buyer comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
    width: 200,
    sortable: false,

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey['Client comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
    renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
    width: 200,
    sortable: false,

    columnKey: columnnsKeys.shared.STRING,
  },
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    valueFormatter: params => formatNormDateTime(params.value),
    width: 120,

    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    valueFormatter: params => formatNormDateTime(params.value),
    width: 140,
    // type: 'date',

    columnKey: columnnsKeys.shared.DATE,
  },
]
