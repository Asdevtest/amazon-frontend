import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  renderFieldValueCell,
  SuperboxQtyCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const adminBoxesViewColumns = () => [
  {
    field: 'isDraft',
    headerName: '',
    renderCell: params => (params.value ? 'isDraft' : 'OK'),
    width: 60,
    type: 'boolean',
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderCell: params => renderFieldValueCell(params.value),
    width: 80,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderCell: params => (
      <UserLinkCell name={params.value} userId={params.row.originalData.items[0].product.client?._id} />
    ),
    width: 200,
  },
  {
    field: 'storekeeper',
    headerName: t(TranslationKey.Storekeeper),
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.storekeeper?._id} />,
    width: 250,
  },

  {
    field: 'orders',
    headerName: t(TranslationKey.Product),
    width: 350,
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
    headerName: t(TranslationKey.Quantity),
    renderCell: params =>
      params.row.originalData.amount > 1 ? (
        <SuperboxQtyCell qty={params.row.qty} superbox={params.row.originalData.amount} />
      ) : (
        renderFieldValueCell(params.value)
      ),
    width: 120,
    type: 'number',
  },

  {
    field: 'warehouses',
    headerName: t(TranslationKey.Warehouse),
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'amazonPrice',
    headerName: t(TranslationKey['Total price']),
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 130,
    type: 'number',
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 130,
  },

  {
    field: 'grossWeight',
    headerName: t(TranslationKey['Gross weight']),
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 130,
  },

  {
    field: 'trackingNumberChina',
    headerName: t(TranslationKey['Track number']),
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },
]
