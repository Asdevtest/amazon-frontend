import React from 'react'

import {texts} from '@constants/texts'

import {
  ClientOrdersNotificationsBtnsCell,
  NoActiveBarcodeCell,
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
    renderCell: params => renderFieldValueCell(params.row.totalPriceChanged - params.row.totalPrice),
  },

  {
    field: 'deliveryCostToTheWarehouse',
    headerName: textConsts.forDeliveryFromTheWarehouse,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 400,
    renderCell: params => <OrderCell product={params.row.product} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'tmpStatus',
    headerName: textConsts.statusField,
    width: 150,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'tmpBarCode',
    headerName: textConsts.barCodeField,
    width: 150,
    renderCell: params => <NoActiveBarcodeCell barCode={params.row.tmpBarCode} />,
  },

  {
    field: 'amount',
    headerName: textConsts.amountField,
    renderCell: params => renderFieldValueCell(params.value),
    type: 'number',
    width: 150,
  },

  {
    field: 'tmpWarehouses',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'tmpTotalPrice',
    headerName: textConsts.sumField,
    width: 160,
    type: 'number',
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
  },

  {
    field: 'tmpGrossWeightKg',
    headerName: textConsts.grossWeightField,
    width: 160,
    renderCell: params => <ToFixedWithKgSignCell value={params.row.tmpGrossWeightKg} fix={2} />,
  },
  {
    field: 'trackingNumberChina',
    headerName: textConsts.trackIdField,
    width: 160,
    renderCell: params => renderFieldValueCell(params.value),
  },
  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 250,
    renderCell: params => <ClientOrdersNotificationsBtnsCell handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },
]
