import React from 'react'

import {colorByProductStatus, ProductStatusByCode} from '@constants/product-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  AsinCell,
  MultilineTextHeaderCell,
  NormDateCell,
  MultilineTextCell,
  UserLinkCell,
  ToFixedWithDollarSignCell,
  MultilineStatusCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const supervisorProductsViewColumns = () => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    width: 120,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    width: 150,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    renderCell: params => <AsinCell product={params.row.originalData} />,
    minWidth: 350,
    flex: 3,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 250,
    renderCell: params => (
      <MultilineTextCell
        text={params.value}
        color={colorByProductStatus(ProductStatusByCode[params.row.originalData.status])}
      />
    ),
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,
    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 250,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,

    renderCell: params => <ToFixedWithDollarSignCell value={params.row.amazon} fix={2} />,
    minWidth: 150,
    type: 'number',
    flex: 1,
  },

  {
    field: 'researcherName',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.createdBy?._id} />
    ),
    width: 200,
  },

  {
    field: 'buyerName',
    headerName: t(TranslationKey.Buyer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

    renderCell: params => <UserLinkCell blackText name={params.value} userId={params.row.originalData.buyer?._id} />,
    width: 200,
  },

  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    minWidth: 120,
    type: 'number',
    flex: 1,
  },

  {
    field: 'fbafee',
    headerName: t(TranslationKey['FBA fee , $']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA fee , $'])} />,

    renderCell: params => <ToFixedWithDollarSignCell value={params.row.fbafee} fix={2} />,
    minWidth: 160,
    type: 'number',
    flex: 1,
  },
]
