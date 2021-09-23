import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  DateCell,
  PriceCell,
  SupervisorCell,
  renderFieldValueCell,
  ResearcherCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').exchangeSupplierSearchColumns

export const exchangeSupplierSearchColumns = () => [
  {
    field: 'asinCell',
    headerName: textConsts.asinField,
    renderCell: params => <AsinCell params={params} />,
    width: 300,
    filterable: false,
  },
  {
    field: 'amazon',
    headerName: textConsts.priceField,
    renderCell: params => <PriceCell price={params.row.amazon} />,
    width: 150,
    type: 'number',
  },

  {
    field: 'createdat',
    headerName: textConsts.createDateField,
    renderCell: params => <DateCell params={params} />,
    width: 150,
    type: 'date',
  },

  {
    field: 'updateDate',
    headerName: textConsts.updateDateField,
    renderCell: params => <DateCell params={params} />,
    width: 150,
    type: 'date',
  },

  {
    field: 'createdby',
    headerName: textConsts.researcherField,
    renderCell: params => <ResearcherCell params={params} />,
    width: 200,
    filterable: false,
  },
  {
    field: 'supervisor',
    headerName: textConsts.supervisorField,
    renderCell: params => <SupervisorCell params={params} />,
    width: 150,
    filterable: false,
  },

  {
    field: 'profit',
    headerName: textConsts.profitField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
    type: 'number',
  },
  {
    field: 'margin',
    headerName: textConsts.marginField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
    type: 'number',
  },
  {
    field: 'bsr',
    headerName: textConsts.bsrField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
    type: 'number',
  },
  {
    field: 'fbafee',
    headerName: textConsts.fbaField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
    type: 'number',
  },
  {
    field: 'fbaamount',
    headerName: textConsts.fbaAmountField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
    type: 'number',
  },
  {
    field: 'barCode',
    headerName: textConsts.barcodeField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },
]
