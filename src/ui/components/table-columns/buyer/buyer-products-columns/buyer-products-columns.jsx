import React from 'react'

import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  AsinCell,
  FeesValuesWithCalculateBtnCell,
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {t} from '@utils/translations'

const textConsts = getLocalizedTexts(texts, 'ru').buyerProductsTableColumns

export const buyerProductsViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    minWidth: 100,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    minWidth: 100,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderCell: params => <AsinCell product={params.row.originalData} />,
    minWidth: 350,
    flex: 3,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    width: 300,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'feesAndNet',
    headerName: t(TranslationKey['Fees & Net']),
    renderCell: params => (
      <FeesValuesWithCalculateBtnCell
        noCalculate={!['30', '40', '50', '60'].includes(params.row.status)}
        product={params.row.originalData}
        onClickCalculate={handlers.onClickFeesCalculate}
      />
    ),
    minWidth: 170,
    flex: 1,
    filterable: false,
    sortable: false,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    minWidth: 130,
    type: 'number',
    flex: 1,
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    minWidth: 130,
    type: 'number',
    flex: 1,
  },

  {
    field: 'bsr',
    headerName: textConsts.bsrField,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 130,
    type: 'number',
    flex: 1,
  },

  {
    field: 'fbaamount',
    headerName: t(TranslationKey['Recommend amount']),
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 130,
    type: 'number',
    flex: 1,
  },
]
