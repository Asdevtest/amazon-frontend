import React from 'react'

import {texts} from '@constants/texts'

import {
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').clientSearchRequestsTableColumns

export const researcherCustomSearchRequestsViewColumns = () => [
  {
    field: 'tmpCreatedAt',
    headerName: textConsts.createDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 200,
    type: 'date',
  },

  {
    field: 'tmpTimeoutAt',
    headerName: textConsts.timeoutDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 200,
    type: 'date',
  },

  {
    field: 'tmpName',
    headerName: textConsts.nameRequestField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'tmpMaxAmountOfProposals',
    headerName: textConsts.maxAmountOfProposalsField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
    type: 'number',
  },

  {
    field: 'tmpPrice',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 200,
    type: 'number',
  },

  // {
  //   field: 'action',
  //   headerName: textConsts.actionField,
  //   width: 250,
  //   renderCell: params => <EditOrRemoveBtnsCell handlers={handlers} row={params.row} />,
  //   filterable: false,
  //   sortable: false,
  // },
]
