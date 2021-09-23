import React from 'react'

import {texts} from '@constants/texts'

import {
  BuyerCell,
  renderFieldValueCell,
  ResearcherCell,
  SmallRowImageCell,
  ToFixedCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').clientExchangeTableColumns

export const clientExchangeViewColumns = renderBtns => [
  {
    field: 'image',
    headerName: textConsts.imageField,
    width: 150,
    renderCell: params => <SmallRowImageCell images={params.row.images} />,
    filterable: false,
  },

  {
    field: 'category',
    headerName: textConsts.categoryField,
    renderCell: params => renderFieldValueCell(params.row.category),
    width: 150,
  },

  {
    field: 'amazon',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.row.amazon} fix={2} />,
    width: 150,
    type: 'number',
  },

  {
    field: 'weight',
    headerName: textConsts.weightField,
    renderCell: params => <ToFixedCell value={params.row.weight} fix={2} />,
    width: 150,
    type: 'number',
  },

  {
    field: 'bsr',
    headerName: textConsts.bsrField,
    renderCell: params => renderFieldValueCell(params.row.bsr),
    width: 150,
    type: 'number',
  },

  {
    field: 'fbaamount',
    headerName: textConsts.fbaamountField,
    renderCell: params => renderFieldValueCell(params.row.bsr),
    width: 150,
    type: 'number',
  },

  {
    field: 'createdby',
    headerName: textConsts.researcherField,
    renderCell: params => <ResearcherCell onlyName params={params} />,
    width: 250,
    filterable: false,
  },

  {
    field: 'buyer',
    headerName: textConsts.buyerField,
    renderCell: params => <BuyerCell onlyName params={params} />,
    width: 250,
    filterable: false,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 250,
    renderCell: params => renderBtns(params),
    filterable: false,
  },
]
