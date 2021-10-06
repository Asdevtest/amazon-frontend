import React from 'react'

import {texts} from '@constants/texts'

import {
  NoActiveBarcodeCell,
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
    width: 150,
    type: 'date',
  },

  {
    field: 'tmpStatus',
    headerName: textConsts.statusField,
    width: 200,
    renderCell: params => renderFieldValueCell(params.row.tmpStatus),
  },

  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 300,
    renderCell: params => <OrderCell product={params.row.product} />,
    filterable: false,
    sortable: false,
  },

  {field: 'amount', headerName: textConsts.amountField, type: 'number', width: 130},

  {
    field: 'updatedAt',
    headerName: textConsts.updatedAtField,
    renderCell: params => <NormDateCell params={params} />,
    width: 150,
    type: 'date',
  },

  {
    field: 'tmpBarCode',
    headerName: textConsts.barcodeField,
    renderCell: params => <NoActiveBarcodeCell barCode={params.row.tmpBarCode} />,
    width: 200,
  },

  {
    field: 'tmpWarehouses',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.row.tmpWarehouses),
    width: 200,
  },

  {
    field: 'tmpDeliveryMethod',
    headerName: textConsts.deliveryField,
    renderCell: params => renderFieldValueCell(params.row.tmpDeliveryMethod),
    width: 200,
  },

  {
    field: 'clientComment',
    headerName: textConsts.clientCommentField,
    renderCell: params => renderFieldValueCell(params.row.clientComment),
    width: 300,
  },

  {
    field: 'buyerComment',
    headerName: textConsts.buyerCommentField,
    renderCell: params => renderFieldValueCell(params.row.clientComment),
    width: 300,
  },
]
