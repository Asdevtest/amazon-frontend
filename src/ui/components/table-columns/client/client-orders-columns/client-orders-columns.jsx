import React from 'react'

import {texts} from '@constants/texts'

import {
  NoActiveBarcodeCell,
  NormDateCell,
  OrderCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrdersTableColumns

export const clientOrdersViewColumns = () => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    width: 100,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    width: 100,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 400,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'status',
    headerName: textConsts.statusField,
    width: 230,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'barCode',
    headerName: textConsts.barCodeField,
    width: 150,
    renderCell: params => <NoActiveBarcodeCell barCode={params.value} />,
  },

  {
    field: 'amount',
    headerName: textConsts.amountField,
    renderCell: params => renderFieldValueCell(params.value),
    type: 'number',
    width: 90,
  },

  {
    field: 'warehouses',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 160,
  },

  {
    field: 'totalPrice',
    headerName: textConsts.sumField,
    width: 100,
    type: 'number',
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
  },

  {
    field: 'grossWeightKg',
    headerName: textConsts.grossWeightField,
    width: 110,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
  },
  {
    field: 'trackingNumberChina',
    headerName: textConsts.trackIdField,
    width: 160,
    renderCell: params => renderFieldValueCell(params.value),
  },
]
