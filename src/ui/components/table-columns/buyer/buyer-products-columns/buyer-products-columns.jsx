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
    minWidth: 150,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    minWidth: 150,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'asinCell',
    headerName: textConsts.asinField,
    renderCell: params => <AsinCell params={params} />,
    minWidth: 350,
    filterable: false,
    sortable: false,
    flex: 3,
  },

  {
    field: 'tmpStatus',
    headerName: textConsts.statusField,
    width: 300,
    renderCell: params => renderFieldValueCell(params.row.tmpStatus),
  },

  {
    field: 'feesAndNet',
    headerName: textConsts.feesAndNetField,
    renderCell: params => (
      <FeesValuesWithCalculateBtnCell
        noCalculate={!['30', '40', '50', '60'].includes(params.row.status)}
        params={params}
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
    renderCell: params => <ToFixedWithDollarSignCell value={params.row.amazon} fix={2} />,
    minWidth: 130,
    type: 'number',
    flex: 1,
  },

  {
    field: 'profit',
    headerName: textConsts.profitField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.row.profit} fix={2} />,
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
