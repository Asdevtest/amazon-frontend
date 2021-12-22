import React from 'react'

import {texts} from '@constants/texts'

import {
  EditOrRemoveBtnsCell,
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').clientSearchRequestsTableColumns

export const clientSearchRequestsViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'budget',
    headerName: textConsts.budget,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 130,
    type: 'number',
  },

  {
    field: 'countOfProposals',
    headerName: textConsts.countOfProposals,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },

  {
    field: 'deadline',
    headerName: textConsts.deadline,
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'tmpStrategyStatus',
    headerName: textConsts.strategyStatusField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 250,
    renderCell: params => <EditOrRemoveBtnsCell handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },

  {
    field: 'monthlySales',
    headerName: textConsts.monthlySales,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },

  {
    field: 'size',
    headerName: textConsts.size,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },

  {
    field: 'minAmazonPrice',
    headerName: textConsts.minAmazonPrice,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },

  {
    field: 'maxAmazonPrice',
    headerName: textConsts.maxAmazonPrice,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },

  {
    field: 'minBSR',
    headerName: textConsts.minBSR,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },

  {
    field: 'maxBSR',
    headerName: textConsts.maxBSR,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },

  {
    field: 'minRevenue',
    headerName: textConsts.minRevenue,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },

  {
    field: 'maxRevenue',
    headerName: textConsts.maxRevenue,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },

  {
    field: 'minReviews',
    headerName: textConsts.minReviews,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },

  {
    field: 'maxReviews',
    headerName: textConsts.maxReviews,
    renderCell: params => renderFieldValueCell(params.value),
    width: 130,
    type: 'number',
  },
]
