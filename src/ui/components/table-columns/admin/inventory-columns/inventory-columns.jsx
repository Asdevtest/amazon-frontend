import React from 'react'

import {texts} from '@constants/texts'

import {
  AsinCell,
  SupplierCell,
  renderFieldValueCell,
  FeesValuesWithCalculateBtnCell,
  ToFixedWithDollarSignCell,
  ActiveBarcodeCell,
  NormDateCell,
  UserLinkCell,
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
    field: 'asin',
    headerName: textConsts.asinField,
    renderCell: params => <AsinCell product={params.row.originalData} />,
    width: 300,
  },

  {
    field: 'strategyStatus',
    headerName: textConsts.strategyStatusField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'fees-net',
    headerName: textConsts.feesAndNetField,
    renderCell: params => <FeesValuesWithCalculateBtnCell noCalculate product={params.row.originalData} />,
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
    renderCell: params => <ActiveBarcodeCell barCode={params.value} />,
  },

  {
    field: 'clientName',
    headerName: 'Client',
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.client?._id} />,
    width: 200,
  },

  {
    field: 'createdBy',
    headerName: textConsts.researcherField,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.createdBy?._id} />,
    width: 250,
  },
  {
    field: 'supervisor',
    headerName: textConsts.supervisorField,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.checkedBy?._id} />,
    width: 250,
  },

  {
    field: 'buyer',
    headerName: textConsts.buyerField,
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.buyer?._id} />,
    width: 250,
  },
  {
    field: 'currentSupplierName',
    headerName: textConsts.supplierField,
    renderCell: params => <SupplierCell product={params.row.originalData} />,
    width: 170,
    filterable: false,
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
