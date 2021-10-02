import React from 'react'

import {texts} from '@constants/texts'

import {
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').researcherProductsTableColumns

export const researcherProductsViewColumns = () => [
  {
    field: 'id',
    headerName: textConsts.asinField,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 150,
    flex: 1,
  },

  {
    field: 'tmpStatus',
    headerName: textConsts.statusField,
    width: 350,
    renderCell: params => renderFieldValueCell(params.row.tmpStatus),
  },

  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    minWidth: 250,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
    flex: 1,
  },

  {
    field: 'amazon',
    headerName: textConsts.amazonPriceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.row.amazon} fix={2} />,
    minWidth: 150,
    type: 'number',
    flex: 1,
  },

  {
    field: 'bsr',
    headerName: textConsts.bsrField,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 150,
    type: 'number',
    flex: 1,
  },
]
