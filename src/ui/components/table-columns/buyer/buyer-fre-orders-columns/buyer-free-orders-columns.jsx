import React from 'react'

import {texts} from '@constants/texts'

import {
  ActiveBarcodeCell,
  OrderCell,
  renderFieldValueCell,
  NormDateCell,
  NormalActionBtnCell,
  UserLinkCell,
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
    field: 'asin',
    headerName: textConsts.ordersField,
    width: 400,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
  },

  {field: 'amount', headerName: textConsts.amountField, type: 'number', width: 100},

  {
    field: 'barCode',
    headerName: textConsts.barcodeField,
    renderCell: params => <ActiveBarcodeCell barCode={params.value} />,
    width: 200,
  },

  {
    field: 'storekeeper',
    headerName: textConsts.storekeeperNameField,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.storekeeper?._id} />,
    width: 200,
  },

  {
    field: 'client',
    headerName: textConsts.clientNameField,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.createdBy?._id} />,
    width: 200,
  },

  {
    field: 'warehouses',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'clientComment',
    headerName: textConsts.clientCommentField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 300,
  },
]
