import React from 'react'

import {texts} from '@constants/texts'

import {
  NoActiveBarcodeCell,
  OrderCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').adminOrdersTableColumns

export const adminOrdersViewColumns = () => [
  {field: 'id', headerName: 'ID', width: 100},

  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 350,
    renderCell: params => <OrderCell product={params.row.product} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'tmpStatus',
    headerName: textConsts.statusField,
    width: 150,
    renderCell: params => renderFieldValueCell(params.row.tmpStatus),
  },

  {
    field: 'tmpBarCode',
    headerName: textConsts.barCodeField,
    width: 200,
    renderCell: params => <NoActiveBarcodeCell barCode={params.row.tmpBarCode} />,
  },

  {field: 'amount', headerName: textConsts.amountField, type: 'number', width: 130},

  {
    field: 'tmpWarehouses',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.row.tmpWarehouses),
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
]
