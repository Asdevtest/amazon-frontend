import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  renderFieldValueCell,
  DateCell,
  ToFixedWithDollarSignCell,
  BarcodeCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').clientInventoryColumns

export const clientInventoryColumns = ({barCodeHandlers}) => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    renderCell: params => <DateCell params={params} />,
    width: 150,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    renderCell: params => <DateCell params={params} />,
    width: 150,
    type: 'date',
  },

  {
    field: 'asinCell',
    headerName: textConsts.asinField,
    renderCell: params => <AsinCell params={params} />,
    width: 300,
    filterable: false,
    sortable: false,
  },
  {
    field: 'amazon',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.row.amazon} fix={2} />,
    width: 130,
  },

  {
    field: 'profit',
    headerName: textConsts.profitField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.row.profit} fix={2} />,
    width: 130,
    type: 'number',
  },

  {
    field: 'margin',
    headerName: textConsts.marginField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.row.margin} fix={2} />,
    width: 130,
    type: 'number',
  },
  {
    field: 'bsr',
    headerName: textConsts.bsrField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },

  {
    field: 'fbafee',
    headerName: textConsts.fbaField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.row.fbafee} fix={2} />,
    width: 130,
    type: 'number',
  },

  {
    field: 'fbaamount',
    headerName: textConsts.fbaAmountField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },

  {
    field: 'barCode',
    headerName: textConsts.barcodeField,
    renderCell: params => <BarcodeCell params={params} handlers={barCodeHandlers} />,
    width: 130,
  },
]
