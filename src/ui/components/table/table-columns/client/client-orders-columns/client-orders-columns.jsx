/* eslint-disable no-unused-vars */
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
} from '@constants/statuses/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

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
  RenderFieldValueCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { formatDate, getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { timeToDeadlineInHoursAndMins, toFixedWithDollarSign } from '@utils/text'
import { colorByProductStatus, ProductStatusByCode } from '@constants/product/product-status'
import { boxStatusTranslateKey, colorByBoxStatus } from '@constants/statuses/box-status'

export const clientOrdersViewColumns = (onClickReorder, getColumnMenuSettings, getOnHover) => [
  {
    field: 'id',
    headerName: t(TranslationKey.ID) + ' / item',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID) + ' / item'} />,
    renderCell: params => <MultilineTextCell text={params.row.idItem} />,
    width: 100,

    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_ORDER_IDS_ITEMS,
  },

  {
    field: 'shopIds',
    headerName: t(TranslationKey.Shop),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Shop)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
    sortable: false,

    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_SHOPS,
  },

  {
    field: 'priority',
    headerName: t(TranslationKey['Priority and Express Delivery']),
    renderHeader: params => (
      <MultilineTextHeaderCell
        component={<img src="/assets/icons/bookmark.svg" />}
        isShowIconOnHover={getOnHover() && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => (
      <PriorityAndChinaDeliverCell
        isRequest
        priority={params.row.originalData.priority}
        chinaDelivery={params.row.originalData.expressChinaDelivery}
        status={params.row.originalData.status}
      />
    ),
    width: 60,
    sortable: false,

    columnKey: columnnsKeys.client.FREELANCE_REQUESTS_PRIORITY,
  },

  {
    field: 'asin',
    headerName: 'ASIN',
    renderHeader: () => <MultilineTextHeaderCell text={'ASIN'} />,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
    width: 290,
    sortable: false,

    columnKey: columnnsKeys.client.INVENTORY_PRODUCT,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Status)}
        isShowIconOnHover={getOnHover && params.field && getOnHover() === params.field}
        isFilterActive={getColumnMenuSettings()?.[params.field]?.currentFilterData?.length}
      />
    ),
    renderCell: params => (
      <MultilineTextCell
        text={params.value}
        color={colorByProductStatus(ProductStatusByCode[params.row.originalData.status])}
      />
    ),
    width: 100,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
    renderCell: params => (
      <>
        {Number(params.row.originalData.status) > Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT]) ? (
          <NormalActionBtnCell
            smallActionBtn
            bTnText={t(TranslationKey['Repeat order'])}
            onClickOkBtn={e => {
              e.stopPropagation()
              onClickReorder(params.row.originalData)
            }}
          />
        ) : (
          <SuccessActionBtnCell
            smallActionBtn
            bTnText={t(TranslationKey['To order'])}
            onClickOkBtn={e => {
              e.stopPropagation()
              onClickReorder(params.row.originalData)
            }}
          />
        )}
      </>
    ),
    width: 200,
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
    filterable: false,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 80,
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

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey['Where to']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Where to'])} />,
    renderCell: params => <RenderFieldValueCell value={params.row.originalData.destination?.name} />,
    width: 120,
    sortable: false,

    columnKey: columnnsKeys.shared.STRING,
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
    width: 140,
    type: 'number',

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'weight',
    headerName: t(TranslationKey['Total weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total weight'])} />,
    renderCell: params => <ToFixedWithKgSignCell value={params.row.originalData.product?.weight} fix={2} />,
    width: 110,
    type: 'number',
    sortable: false,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'buyerComment',
    headerName: t(TranslationKey['Buyer comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment'])} />,
    renderCell: params => <MultilineTextCell withTooltip leftAlign threeLines text={params.value} />,
    width: 120,
    sortable: false,

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'clientComment',
    headerName: t(TranslationKey['Client comment']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Client comment'])} />,
    renderCell: params => <MultilineTextCell withTooltip leftAlign threeLines text={params.value} />,
    width: 120,
    sortable: false,

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
    // type: 'date',

    columnKey: columnnsKeys.shared.DATE,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 140,
    // type: 'date',

    columnKey: columnnsKeys.shared.DATE,
  },
]
