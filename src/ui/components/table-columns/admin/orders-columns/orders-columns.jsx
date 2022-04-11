import React from 'react'

import {texts} from '@constants/texts'

import {
  ActiveBarcodeCell,
  NormDateCell,
  OrderCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').adminOrdersTableColumns

export const adminOrdersViewColumns = () => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {field: 'id', headerName: 'ID', width: 60},

  {
    field: 'asin',
    headerName: textConsts.ordersField,
    width: 400,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
  },

  {
    field: 'status',
    headerName: textConsts.statusField,
    width: 210,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'barCode',
    headerName: textConsts.barCodeField,
    width: 200,
    renderCell: params => <ActiveBarcodeCell barCode={params.value} />,
  },

  {field: 'amount', headerName: textConsts.amountField, type: 'number', width: 100},

  {
    field: 'warehouses',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 160,
  },

  {
    field: 'storekeeper',
    headerName: textConsts.storekeeperNameField,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.storekeeper?._id} />,
    width: 200,
  },

  {
    field: 'buyer',
    headerName: textConsts.buyerField,
    width: 250,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.buyer?._id} />,
  },

  {
    field: 'totalPrice',
    headerName: textConsts.sumField,
    width: 100,
    type: 'number',
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
  },

  {
    field: 'grossWeightKg',
    headerName: textConsts.grossWeightField,
    width: 100,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
  },
  {
    field: 'trackingNumberChina',
    headerName: textConsts.trackIdField,
    width: 150,
    renderCell: params => renderFieldValueCell(params.value),
  },
]
