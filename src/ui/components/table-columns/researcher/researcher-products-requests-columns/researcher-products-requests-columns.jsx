import React from 'react'

import {texts} from '@constants/texts'

import {
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').researcherProductsRequestsTableColumns

export const researcherProductsRequestsViewColumns = () => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    minWidth: 250,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'deadline',
    headerName: textConsts.deadline,
    minWidth: 250,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'tmpStrategyStatus',
    headerName: textConsts.strategyStatusField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'tmpCostOfOneProposal',
    headerName: textConsts.costOfOneProposal,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    minWidth: 150,
    type: 'number',
    flex: 1,
  },

  {
    field: 'countOfProposals',
    headerName: textConsts.countOfProposals,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 150,
    type: 'number',
    flex: 1,
  },
]
