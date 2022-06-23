import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  ClientNotificationsBtnsCell,
  ActiveBarcodeCell,
  NormDateCell,
  OrderCell,
  MultilineTextHeaderCell,
  MultilineTextCell,
  MultilineStatusCell,
} from '@components/data-grid-cells/data-grid-cells'

import {toFixedWithDollarSign, toFixedWithKg} from '@utils/text'
import {t} from '@utils/translations'

export const clientOrdersNotificationsViewColumns = handlers => [
  {
    field: 'createdAt',

    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    headerName: t(TranslationKey.Created),
    width: 100,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'priceChanged',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Pay more'])} />,
    headerName: t(TranslationKey['Pay more']),
    width: 100,
    renderCell: params => (
      <MultilineTextCell
        text={(params.row.originalData.totalPriceChanged - params.row.originalData.totalPrice).toFixed(2)}
      />
    ),
  },

  {
    field: 'action',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
    headerName: t(TranslationKey.Action),
    width: 250,
    renderCell: params => <ClientNotificationsBtnsCell handlers={handlers} row={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Orders),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Orders)} />,

    width: 400,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
  },

  {
    field: 'buyerComment',
    headerName: t(TranslationKey['Buyer comment to order']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Buyer comment to order'])} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 450,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 150,
    renderCell: params => <MultilineStatusCell status={params.value} />,
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BarCode)} />,

    width: 150,
    renderCell: params => <ActiveBarcodeCell barCode={params.value} />,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 150,
  },

  {
    field: 'warehouses',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Planned cost']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Planned cost'])} />,

    width: 160,
    type: 'number',
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
  },

  {
    field: 'totalPriceChanged',
    headerName: t(TranslationKey['Actual cost']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Actual cost'])} />,

    width: 160,
    type: 'number',
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
  },

  {
    field: 'costPerUnit',
    headerName: t(TranslationKey['Cost per unit in the USA']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Cost per unit in the USA'])} />,

    width: 160,
    type: 'number',
    renderCell: params => (
      <MultilineTextCell
        text={toFixedWithDollarSign(params.row.originalData.totalPriceChanged / params.row.amount, 2)}
      />
    ),
  },

  {
    field: 'grossWeightKg',
    headerName: t(TranslationKey['Total weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total weight'])} />,

    width: 160,
    renderCell: params => <MultilineTextCell text={toFixedWithKg(params.value, 2)} />,
  },
  {
    field: 'trackingNumberChina',
    headerName: t(TranslationKey['Track number']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Track number'])} />,

    width: 160,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },
]
