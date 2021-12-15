import React from 'react'

import {texts} from '@constants/texts'

import {renderFieldValueCell, ScrollingCell} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').clientDailySellerBoardColumns

export const clientDailySellerBoardColumns = () => [
  {
    field: 'asin',
    headerName: textConsts.asinField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'sku',
    headerName: textConsts.skuField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'title',
    headerName: textConsts.titleField,
    renderCell: params => <ScrollingCell value={params.value} />,
    width: 250,
  },

  {
    field: 'stockValue',
    headerName: textConsts.stockValueField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'reserved',
    headerName: textConsts.reservedField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'roi',
    headerName: textConsts.roiField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'comment',
    headerName: textConsts.commentField,
    renderCell: params => <ScrollingCell value={params.value} />,
    width: 250,
  },
]
