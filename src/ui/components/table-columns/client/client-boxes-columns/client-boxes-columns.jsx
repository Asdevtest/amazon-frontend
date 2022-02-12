import React from 'react'

import {texts} from '@constants/texts'

import {
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  renderFieldValueCell,
  SuperboxQtyCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').clientBoxesTableColumns

export const clientBoxesViewColumns = () => [
  {
    field: 'isDraft',
    headerName: '',
    renderCell: params => (params.value ? 'isDraft' : 'OK'),
    width: 60,
    type: 'boolean',
  },

  {
    field: 'humanFriendlyId',
    headerName: textConsts.boxIdField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 50,
  },

  {
    field: 'createdAt',
    headerName: textConsts.createdAtField,
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updatedAtField,
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },

  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 400,
    renderCell: params =>
      params.row.originalData.items.length > 1 ? (
        <OrderManyItemsCell box={params.row.originalData} />
      ) : (
        <OrderCell
          product={params.row.originalData.items[0].product}
          superbox={params.row.originalData.amount > 1 && params.row.originalData.amount}
        />
      ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'qty',
    headerName: textConsts.qtyField,
    renderCell: params =>
      params.row.originalData.amount > 1 ? (
        <SuperboxQtyCell qty={params.row.qty} superbox={params.row.originalData.amount} />
      ) : (
        renderFieldValueCell(params.value)
      ),
    width: 110,
    type: 'number',
  },

  {
    field: 'warehouses',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 160,
  },

  {
    field: 'deliveryMethod',
    headerName: textConsts.deliveryField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
  },

  {
    field: 'amazonPrice',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 120,
    type: 'number',
  },

  {
    field: 'finalWeight',
    headerName: textConsts.weightField,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 140,
  },

  {
    field: 'grossWeight',
    headerName: textConsts.grossWeightField,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 120,
  },
]
