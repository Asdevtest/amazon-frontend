import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  FeesValuesWithCalculateBtnCell,
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').buyerProductsTableColumns

export const buyerProductsViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    minWidth: 100,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    minWidth: 100,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'asinCell',
    headerName: textConsts.asinField,
    renderCell: params => <AsinCell product={params.row.originalData} />,
    minWidth: 350,
    filterable: false,
    sortable: false,
    flex: 3,
  },

  {
    field: 'status',
    headerName: textConsts.statusField,
    width: 300,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'strategyStatus',
    headerName: textConsts.strategyStatusField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'feesAndNet',
    headerName: textConsts.feesAndNetField,
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
    headerName: textConsts.amazonPriceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    minWidth: 130,
    type: 'number',
    flex: 1,
  },

  {
    field: 'profit',
    headerName: textConsts.profitField,
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
    headerName: textConsts.fbaamountField,
    renderCell: params => renderFieldValueCell(params.value),
    minWidth: 130,
    type: 'number',
    flex: 1,
  },
]
