import React from 'react'

import {texts} from '@constants/texts'

import {
  ActiveBarcodeCell,
  OrderCell,
  renderFieldValueCell,
  NormDateCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').buyerMyOrdersTableColumns

export const buyerMyOrdersViewColumns = () => [
  {
    field: 'createdAt',
    headerName: textConsts.createdAtField,
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updatedAtField,
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'status',
    headerName: textConsts.statusField,
    width: 200,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 300,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
    filterable: false,
    sortable: false,
  },

  {field: 'amount', headerName: textConsts.amountField, type: 'number', width: 130},

  {
    field: 'barCode',
    headerName: textConsts.barcodeField,
    renderCell: params => <ActiveBarcodeCell barCode={params.value} />,
    width: 200,
  },

  {
    field: 'warehouses',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'deliveryMethod',
    headerName: textConsts.deliveryField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'clientComment',
    headerName: textConsts.clientCommentField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 300,
  },

  {
    field: 'buyerComment',
    headerName: textConsts.buyerCommentField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 300,
  },
]
