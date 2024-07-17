import { OrderStatusByCode, OrderStatusTranslate, orderColorByStatus } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  DownloadAndCopyBtnsCell,
  IconHeaderCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  OrderCell,
  PriorityAndChinaDeliverCell,
  ShortDateCell,
} from '@components/data-grid/data-grid-cells'

import { toFixed, toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const clientOrdersNotificationsViewColumns = handlers => {
  const columns = [
    {
      field: 'createdAt',

      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      headerName: t(TranslationKey.Created),
      width: 90,
      renderCell: params => <ShortDateCell value={params.value} />,
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
      field: 'id',
      headerName: t(TranslationKey.ID),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

      renderCell: params => <MultilineTextCell text={params.row.id} />,
      type: 'number',
      width: 60,
    },

    {
      field: 'priceChanged',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Pay more'])} />,
      headerName: t(TranslationKey['Pay more']),
      width: 100,
      renderCell: params => (
        <MultilineTextCell text={toFixed(params.row.totalPriceChanged - params.row.totalPrice, 2)} />
      ),
      type: 'number',
      disableCustomSort: true,
    },

    {
      field: 'action',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
      headerName: t(TranslationKey.Action),
      width: 160,
      renderCell: params => (
        <ActionButtonsCell
          isFirstButton
          isSecondButton
          firstButtonElement={t(TranslationKey.Confirm)}
          firstButtonStyle={ButtonStyle.PRIMARY}
          secondButtonElement={t(TranslationKey.Reject)}
          secondButtonStyle={ButtonStyle.DANGER}
          onClickFirstButton={() => handlers.onTriggerOpenConfirmModal(params.row)}
          onClickSecondButton={() => handlers.onTriggerOpenRejectModal(params.row)}
        />
      ),
      filterable: false,
      disableCustomSort: true,
    },

    {
      field: 'asin',
      headerName: t(TranslationKey.Orders),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Orders)} />,

      width: 250,
      renderCell: params => <OrderCell product={params.row.product} />,
      disableCustomSort: true,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

      width: 230,
      renderCell: params => {
        const statusCode = OrderStatusByCode[params.value]

        return (
          <MultilineTextCell
            leftAlign
            maxLength={56}
            text={OrderStatusTranslate(statusCode)}
            color={orderColorByStatus(statusCode)}
          />
        )
      },
      disableCustomSort: true,
    },

    {
      field: 'totalPrice',
      headerName: t(TranslationKey['Planned cost']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Planned cost'])} />,

      type: 'number',
      width: 130,
      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    },

    {
      field: 'totalPriceChanged',
      headerName: t(TranslationKey['Actual cost']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Actual cost'])} />,

      type: 'number',
      width: 110,
      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    },

    {
      field: 'costPerUnit',
      headerName: t(TranslationKey['Cost of purchase per piece.']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Cost of purchase per piece.'])} />,

      type: 'number',
      width: 120,
      renderCell: params => (
        <MultilineTextCell text={toFixedWithDollarSign(params.row.totalPriceChanged / params.row.amount, 2)} />
      ),
      disableCustomSort: true,
    },

    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

      width: 210,
      renderCell: params => <DownloadAndCopyBtnsCell value={params.row.product.barCode} />,
      disableCustomSort: true,
    },

    {
      field: 'amount',
      headerName: t(TranslationKey.Quantity),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
      renderCell: params => <MultilineTextCell text={params.value} />,

      type: 'number',
      width: 100,
    },

    {
      field: 'warehouses',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
      renderCell: params => <MultilineTextCell text={params.row.destination?.name} />,
      disableCustomSort: true,
      width: 150,
    },

    {
      field: 'grossWeightKg',
      headerName: t(TranslationKey['Total weight']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total weight'])} />,
      renderCell: params => (
        <MultilineTextCell text={toFixedWithKg(params.row.product.weight * params.row.amount, 2)} />
      ),

      disableCustomSort: true,

      type: 'number',
      width: 100,
    },

    {
      field: 'buyerComment',
      headerName: t(TranslationKey['Buyer comment to order']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment to order'])} />,
      renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
      disableCustomSort: true,
      width: 225,
    },
  ]

  for (const column of columns) {
    column.sortable = false
  }

  return columns
}
