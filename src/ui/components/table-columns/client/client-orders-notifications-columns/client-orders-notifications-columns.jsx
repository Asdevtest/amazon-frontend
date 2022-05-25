import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  ClientNotificationsBtnsCell,
  ActiveBarcodeCell,
  NormDateCell,
  OrderCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const clientOrdersNotificationsViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    width: 100,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'totalPriceChanged',
    headerName: t(TranslationKey['Pay more']),
    width: 100,
    renderCell: params => renderFieldValueCell((params.value - params.row.originalData.totalPrice).toFixed(2)),
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    width: 250,
    renderCell: params => <ClientNotificationsBtnsCell handlers={handlers} row={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Orders),
    width: 400,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
  },

  {
    field: 'buyerComment',
    headerName: t(TranslationKey['Buyer comment to order']),
    renderCell: params => renderFieldValueCell(params.value),
    width: 450,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    width: 150,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    width: 150,
    renderCell: params => <ActiveBarcodeCell barCode={params.value} />,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderCell: params => renderFieldValueCell(params.value),
    type: 'number',
    width: 150,
  },

  {
    field: 'warehouses',
    headerName: t(TranslationKey.Destination),
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'totalPrice',
    headerName: t(TranslationKey['Total price']),
    width: 160,
    type: 'number',
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
  },

  {
    field: 'grossWeightKg',
    headerName: t(TranslationKey['Total weight']),
    width: 160,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
  },
  {
    field: 'trackingNumberChina',
    headerName: t(TranslationKey['Track number']),
    width: 160,
    renderCell: params => renderFieldValueCell(params.value),
  },
]
