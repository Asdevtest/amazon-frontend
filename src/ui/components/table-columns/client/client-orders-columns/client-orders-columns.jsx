import React from 'react'

import {t} from 'i18n-js'

import {
  orderColorByStatus,
  OrderStatus,
  OrderStatusByCode,
  OrderStatusByKey,
  OrderStatusTranslate,
} from '@constants/order-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  OrderCell,
  MultilineTextCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
  DownloadAndCopyBtnsCell,
  NormalActionBtnCell,
  IconHeaderCell,
  PriorityAndChinaDeliverCell,
  SuccessActionBtnCell,
} from '@components/data-grid-cells/data-grid-cells'

import {formatDateDistanceFromNowStrict, getDistanceBetweenDatesInSeconds} from '@utils/date-time'
import {toFixedWithDollarSign} from '@utils/text'

export const clientOrdersViewColumns = (handlers, firstRowId) => [
  {
    field: 'idItem',
    headerName: t(TranslationKey.ID) + ' / item',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID) + ' / item'} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 60,
    type: 'number',
    sortable: false,
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
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 160,
    renderCell: params => (
      <MultilineTextCell
        leftAlign
        text={OrderStatusTranslate(OrderStatusByCode[params.row.originalData.status], 'client')}
        color={orderColorByStatus(OrderStatusByCode[params.row.originalData.status])}
      />
    ),
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
    renderCell: params => <DownloadAndCopyBtnsCell value={params.value} isFirstRow={firstRowId === params.row.id} />,
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
    field: 'deadline',
    headerName: 'Deadline',
    renderHeader: () => <MultilineTextHeaderCell text={'Deadline'} />,

    renderCell: params => (
      <MultilineTextCell
        color={params.value && getDistanceBetweenDatesInSeconds(params.value) < 86400 ? '#FF1616' : null}
        text={params.value ? formatDateDistanceFromNowStrict(params.value) : ''}
      />
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
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    width: 120,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: 140,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },
]
