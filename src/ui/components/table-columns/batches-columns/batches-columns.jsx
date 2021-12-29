import React from 'react'

import {texts} from '@constants/texts'

import {
  BatchBoxesCell,
  NormalActionBtnCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  ToFixedWithKgSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').batchesTableColumns

export const batchesViewColumns = handlers => [
  {
    field: 'orders',
    headerName: textConsts.ordersField,
    width: 600,
    renderCell: params => <BatchBoxesCell boxes={params.row.originalData.boxes} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'warehouses',
    headerName: textConsts.warehouseField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'delivery',
    headerName: textConsts.deliveryField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'finalWeight',
    headerName: textConsts.weightField,
    renderCell: params => <ToFixedWithKgSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 200,
  },

  {
    field: 'totalPrice',
    headerName: textConsts.toralPriceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    type: 'number',
    width: 250,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 250,
    renderCell: params => (
      <NormalActionBtnCell
        bTnText={textConsts.showBtn}
        onClickOkBtn={() => handlers.setCurrentOpenedBatch(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
  },
]
