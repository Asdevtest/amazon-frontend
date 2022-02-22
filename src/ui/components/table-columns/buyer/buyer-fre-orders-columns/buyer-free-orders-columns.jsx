import React from 'react'

import {texts} from '@constants/texts'

import {
  NoActiveBarcodeCell,
  OrderCell,
  renderFieldValueCell,
  NormDateCell,
  NormalActionBtnCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').buyerFreeOrdersTableColumns

export const buyerFreeOrdersViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: textConsts.createdAtField,
    renderCell: params => <NormDateCell params={params} />,
    width: 120,
    type: 'date',
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 170,
    renderCell: params => (
      <NormalActionBtnCell bTnText={textConsts.pickUp} onClickOkBtn={() => handlers.onClickTableRowBtn(params.row)} />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 400,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
    filterable: false,
    sortable: false,
  },

  {field: 'amount', headerName: textConsts.amountField, type: 'number', width: 100},

  {
    field: 'barCode',
    headerName: textConsts.barcodeField,
    renderCell: params => <NoActiveBarcodeCell barCode={params.value} />,
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
    width: 150,
  },

  {
    field: 'clientComment',
    headerName: textConsts.clientCommentField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 300,
  },
]
