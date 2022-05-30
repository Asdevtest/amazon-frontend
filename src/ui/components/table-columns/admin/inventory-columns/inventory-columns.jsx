import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

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

import {t} from '@utils/translations'

export const exchangeInventoryColumns = () => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderCell: params => <AsinCell product={params.row.originalData} />,
    width: 300,
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },

  {
    field: 'fees-net',
    headerName: t(TranslationKey['Fees & Net']),
    renderCell: params => <FeesValuesWithCalculateBtnCell noCalculate product={params.row.originalData} />,
    width: 150,
    filterable: false,
    sortable: false,
  },
  {
    field: 'amazon',
    headerName: t(TranslationKey.Price),
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
  },

  {
    field: 'barCode',
    headerName: t(TranslationKey.BarCode),
    width: 150,
    renderCell: params => <ActiveBarcodeCell barCode={params.value} />,
  },

  {
    field: 'clientName',
    headerName: t(TranslationKey.Client),
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.client?._id} />,
    width: 200,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey['Created by']),
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.createdBy?._id} />,
    width: 250,
  },
  {
    field: 'supervisor',
    headerName: t(TranslationKey.Supervisor),
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.checkedBy?._id} />,
    width: 250,
  },

  {
    field: 'buyer',
    headerName: t(TranslationKey.Buyer),
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.buyer?._id} />,
    width: 250,
  },
  {
    field: 'currentSupplierName',
    headerName: t(TranslationKey.Supplier),
    renderCell: params => <SupplierCell product={params.row.originalData} />,
    width: 170,
    filterable: false,
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'margin',
    headerName: t(TranslationKey.Margin),
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
    type: 'number',
  },
  {
    field: 'fbafee',
    headerName: t(TranslationKey['FBA fee , $']),
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'fbaamount',
    headerName: t(TranslationKey['FBA Amount']),
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
    type: 'number',
  },
]
