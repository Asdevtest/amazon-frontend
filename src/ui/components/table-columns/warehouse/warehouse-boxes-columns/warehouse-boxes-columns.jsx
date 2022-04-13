import React from 'react'

import {texts} from '@constants/texts'

import {
  NormalActionBtnCell,
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  renderFieldValueCell,
  UserLinkCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseBoxesTableColumns

export const warehouseBoxesViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: textConsts.createdAtField,
    renderCell: params => <NormDateCell params={params} />,
    width: 120,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updatedAtField,
    renderCell: params => <NormDateCell params={params} />,
    width: 120,
    type: 'date',
  },

  {
    field: 'humanFriendlyId',
    headerName: textConsts.boxIdField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 70,
  },

  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 410,
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
    field: 'warehouse',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },

  {
    field: 'logicsTariff',
    headerName: textConsts.logicsTariffField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'client',
    headerName: textConsts.clientNameField,
    renderCell: params => (
      <UserLinkCell name={params.value} userId={params.row.originalData.items[0].product.client?._id} />
    ),
    width: 230,
  },

  {
    field: 'batchId',
    headerName: textConsts.batchField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 140,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 200,

    renderCell: params => (
      <NormalActionBtnCell bTnText={textConsts.actionBtnText} row={params.row.originalData} onClickOkBtn={handlers} />
    ),
    filterable: false,
    sortable: false,
  },
]
