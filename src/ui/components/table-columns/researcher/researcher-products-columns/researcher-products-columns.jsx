import React from 'react'

import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {t} from '@utils/translations'

const textConsts = getLocalizedTexts(texts, 'ru').researcherProductsTableColumns

export const researcherProductsViewColumns = () => [
  {
    field: 'asin',
    headerName: textConsts.asinField,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 150,
    flex: 1,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    width: 350,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    minWidth: 250,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
    flex: 1,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
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
