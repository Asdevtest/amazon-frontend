import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  FeesValuesWithCalculateBtnCell,
  ProductStatusCell,
  renderFieldValueCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').buyerProductsTableColumns

export const buyerProductsViewColumns = () => [
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
    field: 'feesAndNet',
    headerName: textConsts.feesAndNetField,
    renderCell: params => <FeesValuesWithCalculateBtnCell params={params} />,
    minWidth: 250,
    flex: 1,
    filterable: false,
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
    field: 'profit',
    headerName: textConsts.profitField,
    renderCell: params => renderFieldValueCell(params.value),
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

  {
    field: 'fbaamount',
    headerName: textConsts.fbaamountField,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 150,
    type: 'number',
    flex: 1,
  },
]
