import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const exchangeNewColumns = () => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
    // type: 'date',
  },
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 150,
    // type: 'date',
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    renderCell: params => {
      const product = params.row.originalData

      return (
        <ProductAsinCell
          image={product?.images?.slice()[0]}
          amazonTitle={product?.amazonTitle}
          asin={product?.asin}
          skusByClient={product?.skusByClient?.slice()[0]}
        />
      )
    },
    width: 300,
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
    headerName: t(TranslationKey.Price),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 150,
    type: 'number',
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.createdBy?._id} />
    ),
    width: 200,
  },
  {
    field: 'supervisor',
    headerName: t(TranslationKey.Supervisor),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Supervisor)} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.checkedBy?._id} />
    ),
    width: 200,
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Profit)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'margin',
    headerName: t(TranslationKey.Margin),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Margin)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'fbafee',
    headerName: t(TranslationKey['FBA fee , $']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA fee , $'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 150,
    type: 'number',
  },
  {
    field: 'fbaamount',
    headerName: t(TranslationKey['FBA Amount']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA Amount'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
    type: 'number',
  },
]
