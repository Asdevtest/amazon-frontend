import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  UserLinkCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').exchangeCheckingColumns

export const exchangeСreatedColumns = () => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },
  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'asin',
    headerName: textConsts.asinField,
    renderCell: params => <AsinCell product={params.row.originalData} />,
    width: 300,
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
    width: 150,
    type: 'number',
  },

  {
    field: 'createdBy',
    headerName: textConsts.researcherField,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.createdBy?._id} />,
    width: 200,
  },

  {
    field: 'profit',
    headerName: textConsts.profitField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'margin',
    headerName: textConsts.marginField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
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
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
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
]
