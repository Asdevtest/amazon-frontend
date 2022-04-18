import React from 'react'

import {texts} from '@constants/texts'

import {
  BatchBoxesCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').batchesTableColumns

export const batchesViewColumns = () => [
  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 600,
    renderCell: params => <BatchBoxesCell boxes={params.row.originalData.boxes} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'destination',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },

  {
    field: 'humanFriendlyId',
    headerName: textConsts.humanFriendlyIdField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
  },

  {
    field: 'tariff',
    headerName: textConsts.deliveryField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'finalWeight',
    headerName: textConsts.weightField,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 160,
  },

  {
    field: 'totalPrice',
    headerName: textConsts.toralPriceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 160,
  },
]
