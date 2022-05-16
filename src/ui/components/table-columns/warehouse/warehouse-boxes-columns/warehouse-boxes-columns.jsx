import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

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

import {t} from '@utils/translations'

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
    headerName: t(TranslationKey.ID),
    renderCell: params => renderFieldValueCell(params.value),
    width: 70,
  },

  {
    field: 'orders',
    headerName: t(TranslationKey.Product),
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
    headerName: t(TranslationKey.Quantity),
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
    headerName: t(TranslationKey.Warehouse),
    renderCell: params => renderFieldValueCell(params.value),
    width: 100,
  },

  {
    field: 'logicsTariff',
    headerName: t(TranslationKey.Tariff),
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
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
    field: 'dimansions',
    headerName: t(TranslationKey.Demensions),
    renderCell: params => (
      <ShortBoxDimensions box={params.row.originalData} volumeWeightCoefficient={params.row.volumeWeightCoefficient} />
    ),
    width: 230,
  },

  {
    field: 'batchId',
    headerName: t(TranslationKey.Batch),
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    width: 200,

    renderCell: params => <WarehouseBoxesBtnsCell row={params.row.originalData} handlers={handlers} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderCell: params => <NormDateCell params={params} />,
    width: 120,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 120,
    type: 'date',
  },
]
