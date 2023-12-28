import { Checkbox } from '@mui/material'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { OrderStatus, OrderStatusByCode, OrderStatusByKey, orderColorByStatus } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  DownloadAndCopyBtnsCell,
  IconHeaderCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  PaymentMethodsCell,
  PriorityAndChinaDeliverCell,
  RenderFieldValueCell,
  UserLinkCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { convertDaysToSeconds, formatDate, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { timeToDeadlineInHoursAndMins, toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const BuyerReadyForPaymentColumns = (rowHandlers, getColumnMenuSettings, isShowPartialPayment = false) => {
  const arr = [
    {
      field: 'id',
      headerName: t(TranslationKey.ID) + ' / item',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID) + ' / item'} />,
      renderCell: params => <MultilineTextCell text={params.row.idAndItem} />,
      valueGetter: params => params.row.idAndItem,

      sortable: true,
      width: 100,

      columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_ORDER_IDS_ITEMS,
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
      sortable: false,
      width: 60,

      columnKey: columnnsKeys.buyer.ORDERS_PRIORITY,
    },

    {
      field: 'asin',
      headerName: 'ASIN',
      renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,
      renderCell: params => <OrderCell product={params.row.originalData.product} />,
      sortable: false,
      valueGetter: params =>
        `ASIN: ${params.row.originalData.product.asin ?? ''}, SKU: ${
          params.row.originalData.product.skuByClient ?? ''
        }`,
      width: 280,

      columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
    },

    {
      field: 'paymentDetailsAttached',
      headerName: t(TranslationKey['Payment documents']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Payment documents'])} />,
      renderCell: params => (
        <Checkbox sx={{ pointerEvents: 'none' }} checked={params.row.originalData.paymentDetailsAttached} />
      ),
      valueGetter: params => params.row.originalData.paymentDetailsAttached,
      width: 120,
      align: 'center',

      columnKey: columnnsKeys.freelancer.FREELANCE_REQUESTS_CONFIRMATION,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: params => (
        <MultilineTextCell
          text={params.value}
          maxLength={50}
          color={orderColorByStatus(OrderStatusByCode[params.row.originalData.status])}
        />
      ),
      width: 140,
      sortable: false,

      columnKey: columnnsKeys.client.ORDERS_STATUS,
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
      field: 'totalPrice',
      headerName: t(TranslationKey.Price),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,
      renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.row.originalData.totalPrice, 2)} />,
      valueGetter: params => toFixedWithDollarSign(params.row.originalData.totalPrice, 2),
      width: 90,
      type: 'number',

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'paymentMethod',
      headerName: t(TranslationKey['Payment methods']),
      renderHeader: params => (
        <MultilineTextHeaderCell
          text={t(TranslationKey['Payment methods'])}
          isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
        />
      ),
      renderCell: params => (
        <PaymentMethodsCell
          paymentMethods={params.row.originalData.payments}
          onClickCell={() => rowHandlers.onClickPaymentMethodsCell(params.row.originalData)}
        />
      ),
      valueGetter: params => params.row.originalData.payments.map(payment => payment?.paymentMethod?.title).join(', '),
      width: 180,
      sortable: false,

      columnKey: columnnsKeys.shared.PAYMENTS,
    },

    {
      field: 'priceInYuan',
      headerName: t(TranslationKey['To pay']) + ', Ұ',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['To pay']) + ', Ұ'} />,

      renderCell: params => (
        <MultilineTextCell
          text={
            toFixed(
              params.row.originalData.partialPayment
                ? params.row.originalData.partialPaymentAmountRmb
                : params.row.originalData.priceInYuan,
              2,
            ) || '0'
          }
        />
      ),
      valueGetter: params =>
        toFixed(
          params.row.originalData.partialPayment
            ? params.row.originalData.partialPaymentAmountRmb
            : params.row.originalData.priceInYuan,
          2,
        ) || '0',
      type: 'number',
      width: 115,

      columnKey: columnnsKeys.buyer.TO_PAY,
    },

    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,
      renderCell: params => (
        <DownloadAndCopyBtnsCell
          showViewTooltip={false}
          value={params.value}
          isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        />
      ),
      width: 140,
      sortable: false,
      filterable: false,
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

      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'productionTerm',
      headerName: t(TranslationKey['Production time']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,
      renderCell: params => <MultilineTextCell text={params.row.originalData.orderSupplier?.productionTerm} />,
      valueGetter: params => params.row.originalData.orderSupplier?.productionTerm ?? '',
      width: 120,
      sortable: false,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'deadline',
      headerName: t(TranslationKey.Deadline),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,
      renderCell: params => {
        const deadline = params.row.originalData.deadline

        return params.row.originalData.status < 20 ? (
          <MultilineTextCell
            withLineBreaks
            tooltipText={deadline ? timeToDeadlineInHoursAndMins({ date: deadline }) : ''}
            color={deadline && getDistanceBetweenDatesInSeconds(deadline) < 86400 ? '#FF1616' : null}
            text={deadline ? formatDate(deadline) : ''}
          />
        ) : (
          <MultilineTextCell text={'-'} />
        )
      },
      valueGetter: params => (params.row.originalData.deadline ? formatDate(params.row.originalData.deadline) : ''),
      width: 100,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'paymentDateToSupplier',
      headerName: t(TranslationKey['Payment date']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Payment date'])} />,
      renderCell: params => (
        <MultilineTextCell
          withLineBreaks
          color={
            Math.abs(getDistanceBetweenDatesInSeconds(params.row.originalData.paymentDateToSupplier)) >
              convertDaysToSeconds(params.row.originalData.orderSupplier?.productionTerm) &&
            params.row.originalData.status === OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER] &&
            !!params.row.originalData.orderSupplier?.productionTerm
              ? '#FF1616'
              : null
          }
          text={
            params.row.originalData.paymentDateToSupplier
              ? formatDate(params.row.originalData.paymentDateToSupplier)
              : ''
          }
        />
      ),
      valueGetter: params => formatDate(params.row.originalData.paymentDateToSupplier) ?? '',
      width: 115,

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
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
      renderCell: params => (
        <UserMiniCell userName={params.value} userId={params.row.originalData.product.client?._id} />
      ),
      width: 180,
      sortable: false,

      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
      renderCell: params => <RenderFieldValueCell value={params.row.originalData.destination?.name} />,
      valueGetter: params => params.row.originalData.destination?.name,
      width: 130,
      sortable: false,

      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'clientComment',
      headerName: t(TranslationKey['Client comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
      renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
      width: 400,
      sortable: false,

      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'buyerComment',
      headerName: t(TranslationKey['Buyer comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
      renderCell: params => <MultilineTextCell leftAlign threeLines maxLength={140} text={params.value} />,
      width: 400,
      sortable: false,

      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 100,
      // type: 'date',

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

      renderCell: params => <NormDateCell value={params.value} />,
      width: 100,
      // type: 'date',

      columnKey: columnnsKeys.shared.DATE,
    },
  ]

  if (isShowPartialPayment) {
    arr.splice(9, 0, {
      field: 'partiallyPaid',
      headerName: t(TranslationKey['Paid for']) + ', Ұ',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Paid for']) + ', Ұ'} />,
      renderCell: params => <MultilineTextCell text={toFixed(params.row.originalData.partiallyPaid, 2) || '0'} />,
      width: 110,
      type: 'number',

      columnKey: columnnsKeys.shared.QUANTITY,
    })
  }

  return arr
}
