/* eslint-disable no-unused-vars */
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React from 'react'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { orderColorByStatus, OrderStatus, OrderStatusByCode, OrderStatusByKey } from '@constants/statuses/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  DownloadAndCopyBtnsCell,
  IconHeaderCell,
  MultilineTextAlignLeftCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  PriorityAndChinaDeliverCell,
  RenderFieldValueCell,
  StringListCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { convertDaysToSeconds, formatDate, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { timeToDeadlineInHoursAndMins, toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'
import { Checkbox } from '@mui/material'

export const BuyerReadyForPaymentColumns = (rowHandlers, getColumnMenuSettings, isShowPartialPayment = false) => {
  const arr = [
    {
      field: 'idAndItem',
      headerName: t(TranslationKey.ID) + ' / item',
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID) + ' / item'} />,
      renderCell: params => <MultilineTextCell text={params.value} />,
      sortable: false,
      width: 100,

      columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_ORDER_IDS_ITEMS,
    },

    {
      field: 'priority',
      headerName: t(TranslationKey['Priority and Express Delivery']),
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
      width: 400,

      columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
    },

    {
      field: 'paymentDetailsAttached',
      headerName: t(TranslationKey['Payment documents']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Payment documents'])} />,
      renderCell: params => (
        <MultilineTextCell
          text={<Checkbox sx={{ pointerEvents: 'none' }} checked={params.row.originalData.paymentDetailsAttached} />}
        />
      ),
      width: 100,

      columnKey: columnnsKeys.freelancer.FREELANCE_REQUESTS_CONFIRMATION,
    },

    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} Icon={FilterAltOutlinedIcon} />,
      renderCell: params => (
        <MultilineTextCell
          text={params.value}
          color={orderColorByStatus(OrderStatusByCode[params.row.originalData.status])}
        />
      ),
      width: 130,
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
      renderCell: params => {
        return (
          <StringListCell
            sourceString={params?.row?.originalData?.payments?.map(method => method?.paymentMethod?.title)}
            maxItemsDisplay={3}
            maxLettersInItem={15}
            onClickCell={() => rowHandlers.onClickPaymentMethodsCell(params?.row?.originalData)}
          />
        )
      },
      width: 178,
      align: 'center',
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
      type: 'number',
      width: 90,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'barCode',
      headerName: t(TranslationKey.BarCode),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,
      renderCell: params => (
        <DownloadAndCopyBtnsCell
          value={params.value}
          isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        />
      ),
      width: 160,
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
      width: 160,
      sortable: false,

      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'productionTerm',
      headerName: t(TranslationKey['Production time']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,
      renderCell: params => <MultilineTextCell text={params.row.originalData.orderSupplier?.productionTerm} />,
      width: 120,
      sortable: false,

      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'deadline',
      headerName: 'Deadline',
      renderHeader: () => <MultilineTextHeaderCell text={'Deadline'} />,
      renderCell: params =>
        params.row.originalData.status < 20 ? (
          <MultilineTextCell
            withLineBreaks
            tooltipText={params.value ? timeToDeadlineInHoursAndMins({ date: params.value }) : ''}
            color={params.value && getDistanceBetweenDatesInSeconds(params.value) < 86400 ? '#FF1616' : null}
            text={params.value ? formatDate(params.value) : ''}
          />
        ) : (
          <MultilineTextCell text={'-'} />
        ),
      width: 200,

      columnKey: columnnsKeys.shared.DATE,
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
        <UserLinkCell blackText name={params.value} userId={params.row.originalData.product.client?._id} />
      ),
      width: 150,
      sortable: false,

      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'destination',
      headerName: t(TranslationKey.Destination),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
      renderCell: params => <RenderFieldValueCell value={params.row.originalData.destination?.name} />,
      width: 130,
      sortable: false,

      columnKey: columnnsKeys.shared.OBJECT,
    },

    {
      field: 'clientComment',
      headerName: t(TranslationKey['Client comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
      renderCell: params => <MultilineTextAlignLeftCell fourLines withTooltip text={params.value} />,
      width: 400,
      sortable: false,

      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'buyerComment',
      headerName: t(TranslationKey['Buyer comment']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
      renderCell: params => <MultilineTextAlignLeftCell fourLines withTooltip text={params.value} />,
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
      width: 130,
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
