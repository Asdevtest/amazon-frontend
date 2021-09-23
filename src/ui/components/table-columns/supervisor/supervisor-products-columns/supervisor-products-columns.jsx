import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  BuyerCell,
  NormDateCell,
  ProductStatusCell,
  renderFieldValueCell,
  ResearcherCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').supervisorProductsTableColumns

export const supervisorProductsViewColumns = () => [
  {
    field: 'asinCell',
    headerName: textConsts.asinField,
    renderCell: params => <AsinCell params={params} />,
    minWidth: 350,
    filterable: false,
    flex: 3,
  },

  {
    field: 'status',
    headerName: textConsts.statusField,
    renderCell: params => <ProductStatusCell status={params.value} />,
    minWidth: 350,
    flex: 3,
    filterable: false,
  },

  {
    field: 'createdat',
    headerName: textConsts.createDateField,
    minWidth: 250,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
    flex: 2,
  },

  {
    field: 'checkedat',
    headerName: textConsts.updateDateField,
    minWidth: 250,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
    flex: 2,
  },

  {
    field: 'amazon',
    headerName: textConsts.amazonPriceField,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 150,
    type: 'number',
    flex: 1,
  },

  {
    field: 'createdby',
    headerName: textConsts.researcherField,
    renderCell: params => <ResearcherCell params={params} />,
    width: 250,
    filterable: false,
  },

  {
    field: 'buyer',
    headerName: textConsts.buyerField,
    renderCell: params => <BuyerCell params={params} />,
    width: 250,
    filterable: false,
  },

  {
    field: 'bsr',
    headerName: textConsts.bsrField,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 150,
    type: 'number',
    flex: 1,
  },

  {
    field: 'fbafee',
    headerName: textConsts.fbafeeField,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 150,
    type: 'number',
    flex: 1,
  },
]
