import React from 'react'

import {texts} from '@constants/texts'

import {NormDateCell, renderFieldValueCell, ScrollingCell} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').clientDailySellerBoardColumns

export const clientLast30DaySellerBoardColumns = () => [
  {
    field: 'date',
    headerName: textConsts.createDateField,
    renderCell: params => <NormDateCell params={params} />,
    minWidth: 100,
    type: 'date',
  },

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
    field: 'name',
    headerName: textConsts.titleField,
    renderCell: params => <ScrollingCell value={params.value} />,
    width: 250,
  },
  {
    field: 'unitsorganic',
    headerName: textConsts.unitsorganicField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
  {
    field: 'unitsppc',
    headerName: textConsts.unitsppcField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
  {
    field: 'netprofit',
    headerName: textConsts.netprofitField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
]
