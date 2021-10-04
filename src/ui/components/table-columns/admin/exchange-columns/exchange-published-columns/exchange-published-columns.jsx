import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  DateCell,
  SupervisorCell,
  renderFieldValueCell,
  ResearcherCell,
  BuyerCell,
  SupplierCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').exchangeCheckingColumns

export const exchangePublishedColumns = () => [
  {
    field: 'createdat',
    headerName: textConsts.createDateField,
    renderCell: params => <DateCell params={params} />,
    width: 150,
    type: 'date',
  },
  {
    field: 'updateDate',
    headerName: textConsts.updateDateField,
    renderCell: params => <DateCell params={params} />,
    width: 150,
    type: 'date',
  },

  {
    field: 'asinCell',
    headerName: textConsts.asinField,
    renderCell: params => <AsinCell params={params} />,
    width: 300,
    filterable: false,
    sortable: false,
  },
  {
    field: 'amazon',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
    type: 'number',
  },

  {
    headerName: textConsts.barCodeField,
    width: 150,
  },
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    renderCell: params => <DateCell params={params} />,
    width: 150,
    type: 'date',
  },
  {
    field: 'updatedAt',
    renderCell: params => <DateCell params={params} />,
  },

  {
    field: 'createdBy',
    headerName: textConsts.researcherField,
    renderCell: params => <ResearcherCell params={params} />,
    width: 200,
  },
  {
    field: 'supervisor',
    headerName: textConsts.supervisorField,
    renderCell: params => <SupervisorCell params={params} />,
    width: 200,
  },
  {
    field: 'buyer',
    headerName: textConsts.buyerField,
    renderCell: params => <BuyerCell params={params} />,
    width: 200,
  },
  {
    field: 'currentSupplier',
    headerName: textConsts.supplierField,
    renderCell: params => <SupplierCell params={params} />,
    width: 150,
  },

  {
    field: 'profit',
    headerName: textConsts.profitField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'margin',
    headerName: textConsts.marginField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'bsr',
    headerName: textConsts.bsrField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
    type: 'number',
  },
  {
    field: 'fbafee',
    headerName: textConsts.fbaField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'fbaamount',
    headerName: textConsts.fbaAmountField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
    type: 'number',
  },
]
