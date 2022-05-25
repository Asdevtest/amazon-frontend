import React from 'react'

import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {renderFieldValueCell, ScrollingCell} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {t} from '@utils/translations'

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
    headerName: t(TranslationKey.Title),
    renderCell: params => <ScrollingCell value={params.value} />,
    width: 250,
  },

  {
    field: 'stockValue',
    headerName: t(TranslationKey.Quantity),
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'reserved',
    headerName: t(TranslationKey.Reserved),
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
    headerName: t(TranslationKey.Comment),
    renderCell: params => <ScrollingCell value={params.value} />,
    width: 250,
  },

  {
    field: 'daysOfStockLeft',
    headerName: textConsts.daysOfStockLeftField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
  {
    field: 'sentToFba',
    headerName: textConsts.sentToFbaField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
  {
    field: 'fbaPrepStock',
    headerName: textConsts.fbaPrepStockField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
  {
    field: 'ordered',
    headerName: t(TranslationKey.Ordered),
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
]
