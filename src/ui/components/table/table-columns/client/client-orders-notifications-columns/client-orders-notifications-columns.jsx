import { OrderStatusByCode, OrderStatusTranslate, orderColorByStatus } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  IconHeaderCell,
  LinkCell,
  MultilineTextHeaderCell,
  NormDateCell,
  PriorityAndChinaDeliverCell,
  ProductCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { toFixed, toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

export const clientOrdersNotificationsViewColumns = handlers => {
  const columns = [
    {
      field: 'createdAt',

      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      headerName: t(TranslationKey.Created),
      width: 90,
      renderCell: params => <NormDateCell value={params.value} />,
    },

    {
      field: 'priorityAndChinaDelivery',
      headerName: 'priorityAndChinaDelivery',
      renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
      width: 45,
      renderCell: params => (
        <PriorityAndChinaDeliverCell
          priority={params.row.priority}
          chinaDelivery={params.row.expressChinaDelivery}
          status={params.row.status}
        />
      ),
      disableCustomSort: true,
      filterable: false,
    },

    {
      field: 'xid',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

      renderCell: params => <Text isCell text={params.row.xid} />,
      type: 'number',
      width: 65,
    },

    {
      field: 'priceChanged',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Pay more'])} />,
      headerName: t(TranslationKey['Pay more']),
      width: 100,
      renderCell: params => <Text isCell text={toFixed(params.row.totalPriceChanged - params.row.totalPrice, 2)} />,
      type: 'number',
      disableCustomSort: true,
    },

    {
      field: 'action',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
      headerName: t(TranslationKey.Action),
      width: 130,
      renderCell: params => (
        <ActionButtonsCell
          showFirst
          showSecond
          secondDanger
          firstContent={t(TranslationKey.Confirm)}
          secondContent={t(TranslationKey.Reject)}
          onClickFirst={() => handlers.onTriggerOpenConfirmModal(params.row)}
          onClickSecond={() => handlers.onTriggerOpenRejectModal(params.row)}
        />
      ),
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.Orders),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Orders)} />,

      width: 170,
      renderCell: params => (
        <ProductCell
          asin={params.row.product?.asin}
          image={params.row.product?.images?.[0]}
          sku={params.row.product?.skuByClient}
          title={params.row.product?.amazonTitle}
        />
      ),
      disableCustomSort: true,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

      width: 230,
      renderCell: params => {
        const statusCode = OrderStatusByCode[params.value]

        return <Text isCell text={OrderStatusTranslate(statusCode)} color={orderColorByStatus(statusCode)} />
      },
      disableCustomSort: true,
    },

    {
      field: 'totalPrice',
      headerName: t(TranslationKey['Planned cost']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Planned cost'])} />,

      type: 'number',
      width: 130,
      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,
    },

    {
      field: 'totalPriceChanged',
      headerName: t(TranslationKey['Actual cost']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Actual cost'])} />,

      type: 'number',
      width: 110,
      renderCell: params => <Text isCell text={toFixedWithDollarSign(params.value, 2)} />,
    },

    {
      field: 'costPerUnit',
      headerName: t(TranslationKey['Cost of purchase per piece.']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Cost of purchase per piece.'])} />,

      type: 'number',
      width: 120,
      renderCell: params => (
        <Text isCell text={toFixedWithDollarSign(params.row.totalPriceChanged / params.row.amount, 2)} />
      ),
      disableCustomSort: true,
    },

    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

      width: 70,
      renderCell: params => <LinkCell value={params.row.product.barCode} />,
      disableCustomSort: true,
    },

    {
      field: 'amount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
      renderCell: params => <Text isCell text={params.value} />,

      type: 'number',
      width: 100,
    },

    {
      field: 'warehouses',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
      renderCell: params => <Text isCell text={params.row.destination?.name} />,
      disableCustomSort: true,
      width: 150,
    },

    {
      field: 'grossWeightKg',
      headerName: t(TranslationKey['Total weight']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total weight'])} />,
      renderCell: params => <Text isCell text={toFixedWithKg(params.row.product.weight * params.row.amount, 2)} />,

      disableCustomSort: true,

      type: 'number',
      width: 100,
    },

    {
      field: 'buyerComment',
      headerName: t(TranslationKey['Buyer comment to order']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment to order'])} />,
      renderCell: params => <Text isCell text={params.value} />,
      disableCustomSort: true,
      width: 225,
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}
