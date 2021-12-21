import React from 'react'

import {texts} from '@constants/texts'

import {
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').freelancerProductsRequestsTableColumns

export const typeOfRequests = {
  NICHE: 'NICHE',
  PRODUCT: 'PRODUCT',
}

const standartColumns = [
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
    field: 'tmpCostOfOneProposal',
    headerName: textConsts.costOfOneProposal,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    minWidth: 250,
    type: 'number',
  },

  {
    field: 'countOfProposals',
    headerName: textConsts.countOfProposals,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 250,
    type: 'number',
  },

  {
    field: 'limitOfProposals',
    headerName: textConsts.limitOfProposals,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 250,
    type: 'number',
  },
]

const extraProductColumns = [
  {
    field: 'tmpStrategyStatus',
    headerName: textConsts.strategyStatusField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
    flex: 1,
  },
]

export const freelancerProductsRequestsViewColumns = type => {
  switch (type) {
    case typeOfRequests.NICHE:
      return standartColumns
    case typeOfRequests.PRODUCT:
      return standartColumns.concat(extraProductColumns)
  }
}
