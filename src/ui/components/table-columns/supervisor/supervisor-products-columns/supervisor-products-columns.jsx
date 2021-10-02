import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').supervisorProductsTableColumns

export const supervisorProductsViewColumns = () => [
  {
    field: 'createdat',
    headerName: textConsts.createDateField,
    minWidth: 150,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
    flex: 2,
  },

  {
    field: 'updateDate',
    headerName: textConsts.updateDateField,
    minWidth: 150,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
    flex: 2,
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
    width: 250,
    renderCell: params => renderFieldValueCell(params.row.tmpStatus),
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
    field: 'tmpResearcherName',
    headerName: textConsts.researcherField,
    renderCell: params => renderFieldValueCell(params.row.tmpResearcherName),
    width: 200,
  },

  {
    field: 'tmpBuyerName',
    headerName: textConsts.buyerField,
    renderCell: params => renderFieldValueCell(params.row.tmpBuyerName),
    width: 200,
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
    field: 'fbafee',
    headerName: textConsts.fbafeeField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.row.fbafee} fix={2} />,
    minWidth: 130,
    type: 'number',
    flex: 1,
  },
]
