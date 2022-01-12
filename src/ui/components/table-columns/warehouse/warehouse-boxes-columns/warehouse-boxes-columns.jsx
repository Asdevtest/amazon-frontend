import React from 'react'

import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  renderFieldValueCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseBoxesTableColumns

export const warehouseBoxesViewColumns = () => [
  {
    field: 'isDraft',
    headerName: '',
    renderCell: params => (params.row.isDraft ? 'isDraft' : 'OK'),
    width: 60,
    type: 'boolean',
  },

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
    field: 'id',
    headerName: textConsts.boxIdField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 300,
  },

  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 350,
    renderCell: params =>
      params.row.items.length > 1 ? (
        <OrderManyItemsCell box={params.row} />
      ) : (
        <OrderCell product={params.row.items[0].product} superbox={params.row.amount > 1 && params.row.amount} />
      ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'warehouse',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(warehouses[params.value]),
    width: 200,
  },
]
