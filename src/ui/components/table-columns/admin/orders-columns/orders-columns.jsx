import React from 'react'

import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {
  BoxCell,
  GrossWeightCell,
  OrderCell,
  OrderSum,
  renderFieldValueCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').adminOrdersTableColumns

export const adminOrdersViewColumns = () => [
  {field: 'id', headerName: 'ID', width: 150},

  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 300,
    renderCell: params => <OrderCell product={params.row.product} />,
    filterable: false,
  },

  {
    field: 'barCode',
    headerName: textConsts.boxesField,
    width: 130,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {field: 'amount', headerName: textConsts.amountField, type: 'number', width: 130},

  {
    field: 'box',
    headerName: textConsts.boxField,
    width: 160,
    renderCell: params => <BoxCell params={params} />,
    filterable: false,
  },

  {
    field: 'warehouse',
    headerName: textConsts.warehouseField,
    width: 160,
    renderCell: params => (!params.value ? 'N/A' : warehouses[params.value]),
  },

  {
    field: 'totalPrice',
    headerName: textConsts.sumField,
    width: 160,
    type: 'number',
    renderCell: params => <OrderSum params={params} />,
    filterable: false,
  },
  {
    field: 'weighGrossKg',
    headerName: textConsts.weightField,
    width: 160,
    type: 'number',
    renderCell: params => renderFieldValueCell(params.value),
  },
  {
    field: 'volumeWeightKg',
    headerName: textConsts.grossWeightField,
    width: 160,
    renderCell: params => <GrossWeightCell params={params} />,
    filterable: false,
  },
  {
    field: 'trackId',
    headerName: textConsts.trackIdField,
    width: 160,
    renderCell: params => renderFieldValueCell(params.value),
  },
]
