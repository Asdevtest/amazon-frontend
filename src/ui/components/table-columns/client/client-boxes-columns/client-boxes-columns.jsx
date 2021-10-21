import React from 'react'

import {texts} from '@constants/texts'

import {
  IdCell,
  NoActiveBarcodeCell,
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
    field: 'id',
    headerName: textConsts.boxIdField,
    renderCell: params => <IdCell id={params.row.id} />,
    width: 130,
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
    field: '_id',
    headerName: textConsts.ordersId,
    renderCell: params => <IdCell id={params.row._id} />,
    width: 300,
  },

  {
    field: 'tmpBarCode',
    headerName: textConsts.barCode,
    renderCell: params => <NoActiveBarcodeCell barCode={params.row.tmpBarCode} />,
    width: 200,
  },

  {
    field: 'tmpAsin',
    headerName: textConsts.asinField,
    renderCell: params => renderFieldValueCell(params.row.tmpAsin),
    width: 150,
  },

  {
    field: 'tmpQty',
    headerName: textConsts.qtyField,
    renderCell: params =>
      params.row.amount > 1 ? (
        <SuperboxQtyCell qty={params.row.tmpQty} superbox={params.row.amount} />
      ) : params.row.items.length > 1 ? (
        'X'
      ) : (
        renderFieldValueCell(params.row.tmpQty)
      ),
    width: 150,
    type: 'number',
  },

  {
    field: 'tmpMaterial',
    headerName: textConsts.materialField,
    renderCell: params => renderFieldValueCell(params.row.tmpMaterial),
    width: 150,
  },

  {
    field: 'tmpWarehouses',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.row.tmpWarehouses),
    width: 200,
  },

  {
    field: 'tmpAmazonPrice',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.row.tmpAmazonPrice} fix={2} />,
    width: 200,
    type: 'number',
  },

  {
    field: 'tmpFinalWeight',
    headerName: textConsts.weightField,
    renderCell: params => <ToFixedWithKgSignCell value={params.row.tmpFinalWeight} fix={2} />,
    type: 'number',
    width: 200,
  },

  {
    field: 'tmpGrossWeight',
    headerName: textConsts.grossWeightField,
    renderCell: params => <ToFixedWithKgSignCell value={params.row.tmpGrossWeight} fix={2} />,
    type: 'number',
    width: 200,
  },

  {
    field: 'tmpTrackingNumberChina',
    headerName: textConsts.trackIdField,
    renderCell: params => renderFieldValueCell(params.row.tmpTrackingNumberChina),
    width: 150,
  },
]
