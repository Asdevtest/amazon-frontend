import React from 'react'

import {colorByProductStatus, ProductStatusByCode} from '@constants/product-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  AsinCell,
  FeesValuesWithCalculateBtnCell,
  MultilineTextHeaderCell,
  NormDateCell,
  MultilineTextCell,
} from '@components/data-grid-cells/data-grid-cells'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const buyerProductsViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    minWidth: 120,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    minWidth: 150,
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

    width: 300,
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

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 250,
  },

  {
    field: 'feesAndNet',
    headerName: t(TranslationKey['Fees & Net']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Fees & Net'])} />,

    renderCell: params => (
      <FeesValuesWithCalculateBtnCell
        noCalculate={!['30', '40', '50', '60'].includes(params.row.status)}
        product={params.row.originalData}
        onClickCalculate={handlers.onClickFeesCalculate}
      />
    ),
    minWidth: 200,
    flex: 1,
    filterable: false,
    sortable: false,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    minWidth: 130,
    type: 'number',
    flex: 1,
  },

  {
    field: 'profit',
    headerName: t(TranslationKey.Profit),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Profit)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    minWidth: 130,
    type: 'number',
    flex: 1,
  },

  {
    field: 'bsr',
    headerName: t(TranslationKey.BSR),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    minWidth: 130,
    type: 'number',
    flex: 1,
  },

  {
    field: 'fbaamount',
    headerName: t(TranslationKey['Recommend amount']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Recommend amount'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    minWidth: 150,
    type: 'number',
    flex: 1,
  },
]
