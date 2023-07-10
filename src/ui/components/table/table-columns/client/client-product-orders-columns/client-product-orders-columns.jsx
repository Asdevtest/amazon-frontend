import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React from 'react'

import { t } from 'i18n-js'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import {
  orderColorByStatus,
  OrderStatus,
  OrderStatusByCode,
  OrderStatusByKey,
  OrderStatusTranslate,
} from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  DownloadAndCopyBtnsCell,
  IconHeaderCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormalActionBtnCell,
  NormDateCell,
  OrderCell,
  PriorityAndChinaDeliverCell,
  SuccessActionBtnCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { formatDate, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { timeToDeadlineInHoursAndMins, toFixedWithDollarSign } from '@utils/text'

export const clientProductOrdersViewColumns = (handlers, chosenStatus) => [
  {
    field: 'id',
    headerName: t(TranslationKey.ID) + ' / item',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID) + ' / item'} />,
    renderCell: params => <MultilineTextCell text={params.row.idItem} />,
    width: 100,
    type: 'number',
  },

  {
    field: 'priorityAndChinaDelivery',
    headerName: 'priorityAndChinaDelivery',
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
    field: 'orderStatus',
    headerName: t(TranslationKey.Status),
    renderHeader: () => (
      <MultilineTextHeaderCell
        isFilterActive={chosenStatus() !== 'ALL'}
        text={t(TranslationKey.Status)}
        Icon={FilterAltOutlinedIcon}
      />
    ),

    width: 160,
    renderCell: params => (
      <MultilineTextCell
        leftAlign
        text={OrderStatusTranslate(OrderStatusByCode[params.row.originalData.status], 'client')}
        color={orderColorByStatus(OrderStatusByCode[params.row.originalData.status])}
      />
    ),

    columnKey: columnnsKeys.shared.PRODUCT_ORDERS_STATUS,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    width: 200,
    renderCell: params => (
      <>
        {Number(params.row.originalData.status) > Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]) ? (
          <NormalActionBtnCell
            bTnText={t(TranslationKey['Repeat order'])}
            onClickOkBtn={() => handlers.onClickReorder(params.row.originalData)}
          />
        ) : (
          <SuccessActionBtnCell
            bTnText={t(TranslationKey['To order'])}
            onClickOkBtn={() => handlers.onClickReorder(params.row.originalData)}
          />
        )}
      </>
    ),
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
    sortable: false,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,

    type: 'number',
    width: 80,
    sortable: false,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.storekeeper?._id} />
    ),
    width: 130,
    sortable: false,
  },

  {
    field: 'warehouses',
    headerName: t(TranslationKey['Where to']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Where to'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'productionTerm',
    headerName: t(TranslationKey['Production time']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Production time, days'])} />,

    renderCell: params => <MultilineTextCell text={params.row.originalData?.orderSupplier?.productionTerm} />,
    width: 120,
    sortable: false,
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
  },

  {
    field: 'needsResearch',
    headerName: t(TranslationKey['Re-search supplier']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Re-search supplier'])} />,

    width: 100,
    renderCell: params => <MultilineTextCell text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)} />,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total price'])} />,

    type: 'number',
    width: 140,
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
  },

  {
    field: 'grossWeightKg',
    headerName: t(TranslationKey['Total weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total weight'])} />,

    type: 'number',
    width: 110,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    sortable: false,
  },
  {
    field: 'trackingNumberChina',
    headerName: t(TranslationKey['Track number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,

    width: 160,
    renderCell: params => <MultilineTextCell withTooltip text={params.value} />,
  },

  {
    field: 'buyerComment',
    headerName: t(TranslationKey['Buyer comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,

    renderCell: params => <MultilineTextCell withTooltip leftAlign text={params.value} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey['Client comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,

    renderCell: params => <MultilineTextCell withTooltip leftAlign text={params.value} />,
    width: 120,
    sortable: false,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    width: 120,
    renderCell: params => <NormDateCell value={params.value} />,
    // type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: 140,
    renderCell: params => <NormDateCell value={params.value} />,
    // type: 'date',
  },
]
