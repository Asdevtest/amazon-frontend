import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  BuyerCell,
  ResearcherCell,
  SupervisorCell,
  SupplierCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  NoActiveBarcodeCell,
  NormDateCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').exchangeSupplierFoundedColumns

export const exchangeSupplierFoundedColumns = () => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },
  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'asinCell',
    headerName: textConsts.asinField,
    renderCell: params => <AsinCell product={params.row.originalData} />,
    width: 300,
    filterable: false,
    sortable: false,
  },

  {
    field: 'strategyStatus',
    headerName: textConsts.strategyStatusField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
  {
    field: 'amazon',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
    type: 'number',
  },

  {
    field: 'barCode',
    headerName: textConsts.barcodeField,
    width: 150,
    renderCell: params => <NoActiveBarcodeCell barCode={params.value} />,
  },

  {
    field: 'createdBy',
    headerName: textConsts.researcherField,
    renderCell: params => <ResearcherCell product={params.row.originalData} />,
    width: 200,
  },
  {
    field: 'supervisor',
    headerName: textConsts.supervisorField,
    renderCell: params => <SupervisorCell product={params.row.originalData} />,
    width: 200,
  },
  {
    field: 'buyer',
    headerName: textConsts.buyerField,
    renderCell: params => <BuyerCell product={params.row.originalData} />,
    width: 200,
  },
  {
    field: 'currentSupplier',
    headerName: textConsts.supplierField,
    renderCell: params => <SupplierCell product={params.row.originalData} />,
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
