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

const textConsts = getLocalizedTexts(texts, 'ru').clientOrdersTableColumns

export const clientOrdersViewColumns = () => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    width: 100,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    width: 100,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'asin',
    headerName: textConsts.ordersField,
    width: 400,
    renderCell: params => <OrderCell product={params.row.originalData.product} />,
  },

  {
    field: 'status',
    headerName: textConsts.statusField,
    width: 230,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'barCode',
    headerName: textConsts.barCodeField,
    width: 150,
    renderCell: params => <ActiveBarcodeCell barCode={params.value} />,
  },

  {
    field: 'amount',
    headerName: textConsts.amountField,
    renderCell: params => renderFieldValueCell(params.value),
    type: 'number',
    width: 90,
  },

  {
    field: 'storekeeper',
    headerName: textConsts.storekeeperNameField,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.storekeeper?._id} />,
    width: 200,
  },

  {
    field: 'warehouses',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 160,
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
    width: 110,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
  },
  {
    field: 'trackingNumberChina',
    headerName: textConsts.trackIdField,
    width: 160,
    renderCell: params => renderFieldValueCell(params.value),
  },
]
