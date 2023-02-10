/* eslint-disable no-unused-vars */
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React from 'react'

import {orderColorByStatus, OrderStatusByCode} from '@constants/order-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  OrderCell,
  MultilineTextCell,
  NormDateCell,
  UserLinkCell,
  MultilineTextHeaderCell,
  DownloadAndCopyBtnsCell,
  RenderFieldValueCell,
  MultilineTextAlignLeftCell,
  IconHeaderCell,
  PriorityAndChinaDeliverCell,
} from '@components/data-grid-cells/data-grid-cells'

import {formatDate, getDistanceBetweenDatesInSeconds} from '@utils/date-time'
import {timeToDeadlineInHoursAndMins, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const buyerMyOrdersViewColumns = firstRowId => [
  {
    field: 'id',
    headerName: t(TranslationKey.ID) + ' / item',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID) + ' / item'} />,

    width: 60,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'priorityAndChinaDelivery',
    headerName: t(TranslationKey['Priority and Express Delivery']),
    renderHeader: () => <IconHeaderCell url={'/assets/icons/bookmark.svg'} />,
    width: 60,
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

    width: 400,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
    sortable: false,
  },
  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} Icon={FilterAltOutlinedIcon} />,

    width: 130,
    renderCell: params => (
      <MultilineTextCell
        text={params.value}
        color={orderColorByStatus(OrderStatusByCode[params.row.originalData.status])}
      />
    ),
    sortable: false,
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

    width: 160,
    renderCell: params => <DownloadAndCopyBtnsCell value={params.value} isFirstRow={firstRowId === params.row.id} />,
    sortable: false,
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
  },

  {
    field: 'productionTerm',
    headerName: t(TranslationKey['Production time']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,

    renderCell: params => <MultilineTextCell text={params.row.originalData.orderSupplier.productionTerm} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'deadline',
    headerName: 'Deadline',
    renderHeader: () => <MultilineTextHeaderCell text={'Deadline'} />,

    renderCell: params => (
      <MultilineTextCell
        withLineBreaks
        tooltipText={params.value ? timeToDeadlineInHoursAndMins({date: params.value}) : ''}
        color={params.value && getDistanceBetweenDatesInSeconds(params.value) < 86400 ? '#FF1616' : null}
        text={params.value ? formatDate(params.value) : ''}
      />
    ),
    width: 200,
  },

  {
    field: 'paymentDateToSupplier',
    headerName: 'Payment date',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Payment date'])} />,

    renderCell: params => (
      <MultilineTextCell
        withLineBreaks
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
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.product.client?._id} />
    ),
    width: 150,
    sortable: false,
  },

  {
    field: 'warehouses',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,

    renderCell: params => <RenderFieldValueCell value={params.value} />,
    width: 130,
    sortable: false,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey['Client comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,

    renderCell: params => <MultilineTextAlignLeftCell withTooltip text={params.value} />,
    width: 400,
    sortable: false,
  },

  {
    field: 'buyerComment',
    headerName: t(TranslationKey['Buyer comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,

    renderCell: params => <MultilineTextAlignLeftCell fourLines withTooltip text={params.value} />,
    width: 400,
    sortable: false,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell params={params} />,
    width: 130,
    type: 'date',
  },
]
