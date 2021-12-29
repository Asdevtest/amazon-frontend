import React from 'react'

import {texts} from '@constants/texts'

import {
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').clientSearchRequestsTableColumns

export const freelancerCustomSearchRequestsViewColumns = () => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 200,
    type: 'date',
  },

  {
    field: 'timeoutAt',
    headerName: textConsts.timeoutDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 200,
    type: 'date',
  },

  {
    field: 'name',
    headerName: textConsts.nameRequestField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'maxAmountOfProposals',
    headerName: textConsts.maxAmountOfProposalsField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
    type: 'number',
  },

  {
    field: 'price',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 200,
    type: 'number',
  },
]
