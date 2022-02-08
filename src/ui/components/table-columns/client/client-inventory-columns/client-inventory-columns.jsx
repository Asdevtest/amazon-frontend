import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  BarcodeCell,
  NormDateCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').clientInventoryColumns

export const clientInventoryColumns = barCodeHandlers => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    renderCell: params => <NormDateCell params={params} />,
    minWidth: 100,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    renderCell: params => <NormDateCell params={params} />,
    minWidth: 100,
    type: 'date',
  },

  {
    field: 'asinCell',
    headerName: textConsts.asinField,
    renderCell: params => <AsinCell product={params.row.originalData} />,
    minWidth: 300,
    filterable: false,
    sortable: false,
  },

  {
    field: 'status',
    headerName: textConsts.statusField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 400,
  },

  {
    field: 'strategyStatus',
    headerName: textConsts.strategyStatusField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'amazon',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    minWidth: 110,
    headerAlign: 'center',
  },

  {
    field: 'profit',
    headerName: textConsts.profitField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    minWidth: 110,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'margin',
    headerName: textConsts.marginField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    minWidth: 110,
    type: 'number',
    headerAlign: 'center',
  },
  {
    field: 'bsr',
    headerName: textConsts.bsrField,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 110,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'fbafee',
    headerName: textConsts.fbaField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    minWidth: 110,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'fbaamount',
    headerName: textConsts.fbaAmountField,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 110,
    type: 'number',
    headerAlign: 'center',
  },

  {
    field: 'barCode',
    headerName: textConsts.barcodeField,
    renderCell: params => <BarcodeCell product={params.row.originalData} handlers={barCodeHandlers} />,
    minWidth: 110,
    headerAlign: 'center',
  },
]
