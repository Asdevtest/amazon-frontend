import React from 'react'

import {colorByProductStatus, ProductStatusByCode} from '@constants/product-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateCell,
  MultilineTextCell,
  AsinCell,
  ToFixedWithDollarSignCell,
  MultilineStatusCell,
  MultilineTextAlignLeftCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const researcherProductsViewColumns = () => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextCell text={t(TranslationKey.ASIN)} />,

    renderCell: params => <AsinCell text={params.value} product={params.row.originalData} />,
    width: 180,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    width: 280,
    renderCell: params => (
      <MultilineTextCell
        leftAlign
        text={params.value}
        color={colorByProductStatus(ProductStatusByCode[params.row.originalData.status])}
      />
    ),
  },

  {
    field: 'strategyStatus',
    headerName: t(TranslationKey.Strategy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Strategy)} />,

    renderCell: params => <MultilineStatusCell leftAlign status={params.value} />,
    width: 180,
  },

  {
    field: 'amazon',
    headerName: t(TranslationKey['Amazon price']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Amazon price'])} />,

    renderCell: params => <ToFixedWithDollarSignCell leftAlign value={params.row.amazon} fix={2} />,

    type: 'number',
    width: 150,
    // flex: 1,
  },

  // {
  //   field: 'bsr',
  //   headerName: t(TranslationKey.BSR),
  //   renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.BSR)} />,

  //   renderCell: params => <MultilineTextCell text={params.value} />,
  //   type: 'number',
  //   minWidth: 150,

  //   flex: 1,
  // },

  {
    field: 'supervisorComment',
    headerName: t(TranslationKey["Supervisor's comment"]),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey["Supervisor's comment"])} />,

    renderCell: params => <MultilineTextAlignLeftCell withTooltip text={params.value} />,

    filterable: false,
    sortable: false,
    flex: 1,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,

    minWidth: 150,
    renderCell: params => <NormDateCell params={params} />,
    type: 'date',
  },
]
