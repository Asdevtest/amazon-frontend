import React from 'react'

import {texts} from '@constants/texts'

import {
  ClientOrdersNotificationsBtnsCell,
  ActiveBarcodeCell,
  NormDateCell,
  OrderCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrdersTableColumns

export const clientOrdersNotificationsViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    width: 100,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'totalPriceChanged',
    headerName: textConsts.neededToPayExtraField,
    width: 250,
    renderCell: params => renderFieldValueCell((params.value - params.row.originalData.totalPrice).toFixed(2)),
  },

  {
    field: 'deliveryCostToTheWarehouse',
    headerName: textConsts.forDeliveryFromTheWarehouse,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 250,
    renderCell: params => <ClientOrdersNotificationsBtnsCell handlers={handlers} row={params.row.originalData} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'asin',
    headerName: textConsts.ordersField,
    width: 400,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
  },

  {
    field: 'buyerComment',
    headerName: textConsts.buyerCommentField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 450,
  },

  {
    field: 'status',
    headerName: textConsts.statusField,
    width: 150,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'barCode',
    headerName: textConsts.barCodeField,
    width: 150,
    renderCell: params => <ActiveBarcodeCell barCode={params.value} />,
  },

  {
    field: 'amount',
    headerName: textConsts.amountField,
    renderCell: params => renderFieldValueCell(params.value),
    type: 'number',
    width: 150,
  },

  {
    field: 'warehouses',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'totalPrice',
    headerName: textConsts.sumField,
    width: 160,
    type: 'number',
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
  },

  {
    field: 'grossWeightKg',
    headerName: textConsts.grossWeightField,
    width: 160,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
  },
  {
    field: 'trackingNumberChina',
    headerName: textConsts.trackIdField,
    width: 160,
    renderCell: params => renderFieldValueCell(params.value),
  },
]
