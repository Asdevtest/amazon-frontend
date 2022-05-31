import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  AsinCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
  NormDateCell,
  UserLinkCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const exchangeSupplierNotFoundedColumns = () => [
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
    field: 'amazon',
    headerName: t(TranslationKey.Price),
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
    type: 'number',
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey['Created by']),
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.createdBy?._id} />,
    width: 200,
  },
  {
    field: 'supervisor',
    headerName: t(TranslationKey.Supervisor),
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.checkedBy?._id} />,
    width: 200,
  },

  {
    field: 'buyer',
    headerName: t(TranslationKey.Price),
    renderCell: params => <UserLinkCell name={params.value} userId={params.row.originalData.buyer?._id} />,
    width: 200,
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
