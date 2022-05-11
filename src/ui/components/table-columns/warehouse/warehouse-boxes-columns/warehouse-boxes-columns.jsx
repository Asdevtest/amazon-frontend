import React from 'react'

import {texts} from '@constants/texts'

import {
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  renderFieldValueCell,
  ShortBoxDimensions,
  SuperboxQtyCell,
  UserLinkCell,
  WarehouseBoxesBtnsCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseBoxesTableColumns

export const warehouseBoxesViewColumns = handlers => [
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
    width: 70,
  },

  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 380,
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
    field: 'warehouse',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },

  {
    field: 'logicsTariff',
    headerName: textConsts.logicsTariffField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
  },

  {
    field: 'client',
    headerName: textConsts.clientNameField,
    renderCell: params => (
      <UserLinkCell name={params.value} userId={params.row.originalData.items[0].product.client?._id} />
    ),
    width: 200,
  },

  {
    field: 'dimansions',
    headerName: textConsts.dimansionsField,
    renderCell: params => (
      <ShortBoxDimensions box={params.row.originalData} volumeWeightCoefficient={params.row.volumeWeightCoefficient} />
    ),
    width: 230,
  },

  {
    field: 'batchId',
    headerName: textConsts.batchField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 200,

    renderCell: params => <WarehouseBoxesBtnsCell row={params.row.originalData} handlers={handlers} />,
    filterable: false,
    sortable: false,
  },

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
]
