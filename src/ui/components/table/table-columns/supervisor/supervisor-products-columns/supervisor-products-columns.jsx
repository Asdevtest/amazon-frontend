import React from 'react'

import {colorByProductStatus, ProductStatusByCode, productStatusTranslateKey} from '@constants/product/product-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ProductAsinCell,
  ToFixedWithDollarSignCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const supervisorProductsViewColumns = () => [
  {
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    renderCell: params => <ProductAsinCell product={params.row.originalData} />,
    width: 350,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 150,
    renderCell: params => (
      <MultilineTextCell
        text={t(productStatusTranslateKey(ProductStatusByCode[params.value]))}
        color={colorByProductStatus(ProductStatusByCode[params.row.originalData.status])}
      />
    ),
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,
    renderCell: params => <MultilineStatusCell status={params.value} />,
    width: 120,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,

    renderCell: params => <ToFixedWithDollarSignCell value={params.row.amazon} fix={2} />,
    type: 'number',
    width: 100,
  },

  {
    field: 'researcherName',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

    renderCell: params => (
      <UserLinkCell blackText name={params.value} userId={params.row.originalData.createdBy?._id} />
    ),
    width: 170,
  },

  {
    field: 'buyerName',
    headerName: t(TranslationKey.Buyer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Buyer)} />,

    renderCell: params => <UserLinkCell blackText name={params.value} userId={params.row.originalData.buyer?._id} />,
    width: 170,
  },

  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 70,
  },

  {
    field: 'fbafee',
    headerName: t(TranslationKey['FBA fee , $']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['FBA fee , $'])} />,

    renderCell: params => <ToFixedWithDollarSignCell value={params.row.fbafee} fix={2} />,
    type: 'number',
    minWidth: 100,
  },

  {
    field: 'ordered',
    headerName: t(TranslationKey.Ordered),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Ordered)} />,

    renderCell: params => (
      <MultilineTextCell
        customTextStyles={
          params.value
            ? {
                background: 'linear-gradient(180deg, #00B746 0%, #03A03F 100%)',
                '-webkit-background-clip': 'text',
                '-webkit-text-fill-color': 'transparent',
              }
            : {
                background: 'linear-gradient(180deg, #FF1616 0%, #DF0C0C 100%)',
                '-webkit-background-clip': 'text',
                '-webkit-text-fill-color': 'transparent',
              }
        }
        color={params.value ? '#00b746' : 'red'}
        text={params.value ? t(TranslationKey.Yes) : t(TranslationKey.No)}
      />
    ),
    minWidth: 50,
    type: 'boolean',
  },

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

    minWidth: 150,
    flex: 1,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },
]
