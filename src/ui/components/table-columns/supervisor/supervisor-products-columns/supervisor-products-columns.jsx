import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').supervisorProductsTableColumns

export const supervisorProductsViewColumns = () => [
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
    field: 'asinCell',
    headerName: textConsts.asinField,
    renderCell: params => <AsinCell product={params.row.originalData} />,
    minWidth: 350,
    filterable: false,
    flex: 3,
  },

  {
    field: 'status',
    headerName: textConsts.statusField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'strategyStatus',
    headerName: textConsts.strategyStatusField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'amazon',
    headerName: textConsts.amazonPriceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.row.amazon} fix={2} />,
    minWidth: 130,
    type: 'number',
    flex: 1,
  },

  {
    field: 'researcherName',
    headerName: textConsts.researcherField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'buyerName',
    headerName: textConsts.buyerField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'bsr',
    headerName: textConsts.bsrField,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 80,
    type: 'number',
    flex: 1,
  },

  {
    field: 'fbafee',
    headerName: textConsts.fbafeeField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.row.fbafee} fix={2} />,
    minWidth: 90,
    type: 'number',
    flex: 1,
  },
]
