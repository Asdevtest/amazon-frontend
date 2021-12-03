import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  BuyerCell,
  ResearcherCell,
  SupervisorCell,
  SupplierCell,
  renderFieldValueCell,
  FeesValuesWithCalculateBtnCell,
  ClientCell,
  ToFixedWithDollarSignCell,
  NoActiveBarcodeCell,
  NormDateCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'en').exchangeInventoryColumns

export const exchangeInventoryColumns = () => [
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
    renderCell: params => <AsinCell params={params} />,
    width: 300,
    filterable: false,
    sortable: false,
  },

  {
    field: 'tmpStrategyStatus',
    headerName: textConsts.strategyStatusField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'fees-net',
    headerName: textConsts.feesAndNetField,
    renderCell: params => <FeesValuesWithCalculateBtnCell noCalculate params={params} />,
    width: 150,
    filterable: false,
    sortable: false,
  },
  {
    field: 'amazon',
    headerName: textConsts.priceField,
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
  },

  {
    field: 'barCode',
    headerName: textConsts.barCodeField,
    width: 150,
    renderCell: params => <NoActiveBarcodeCell barCode={params.row.barCode} />,
  },

  {
    field: 'tmpClientName',
    headerName: 'Client',
    renderCell: params => <ClientCell params={params} />,
    width: 200,
  },

  {
    field: 'tmpResearcherName',
    headerName: textConsts.researcherField,
    renderCell: params => <ResearcherCell params={params} />,
    width: 250,
  },
  {
    field: 'supervisor',
    headerName: textConsts.supervisorField,
    renderCell: params => <SupervisorCell params={params} />,
    width: 250,
  },
  {
    field: 'tmpBuyerName',
    headerName: textConsts.buyerField,
    renderCell: params => <BuyerCell params={params} />,
    width: 250,
  },
  {
    field: 'tmpCurrentSupplierName',
    headerName: textConsts.supplierField,
    renderCell: params => <SupplierCell params={params} />,
    width: 170,
    filterable: false,
  },
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },
  {
    field: 'checkedAt',
    headerName: textConsts.checkDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },
  {
    field: 'updaupdatedAtteDate',
    headerName: textConsts.updateDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
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
