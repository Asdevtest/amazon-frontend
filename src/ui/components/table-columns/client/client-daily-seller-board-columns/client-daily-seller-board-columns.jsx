import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {MultilineTextHeaderCell, MultilineTextCell, ScrollingCell} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const clientDailySellerBoardColumns = () => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
  },

  {
    field: 'sku',
    headerName: t(TranslationKey.SKU),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.SKU)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
  },

  {
    field: 'title',
    headerName: 'Title',
    renderHeader: () => <MultilineTextHeaderCell text={'Title'} />,

    renderCell: params => <ScrollingCell value={params.value} />,
    width: 250,
  },

  {
    field: 'fbaFbmStock',
    headerName: 'FBA/FBM Stock',
    renderHeader: () => <MultilineTextHeaderCell text={'FBA/FBM Stock'} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
  },

  {
    field: 'reserved',
    headerName: 'Reserved',
    renderHeader: () => <MultilineTextHeaderCell text={'Reserved'} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey.ROI),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ROI)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
  },

  {
    field: 'comment',
    headerName: 'Comment',
    renderHeader: () => <MultilineTextHeaderCell text={'Comment'} />,

    renderCell: params => <ScrollingCell value={params.value} />,
    width: 250,
  },

  {
    field: 'daysOfStockLeft',
    headerName: t(TranslationKey.DaysOfStockLeft),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.DaysOfStockLeft)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 250,
  },
  {
    field: 'sentToFba',
    headerName: t(TranslationKey.SentToFba),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.SentToFba)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 250,
  },
  {
    field: 'fbaPrepStock',
    headerName: t(TranslationKey.FbaPrepStock),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.FbaPrepStock)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 250,
  },
  {
    field: 'ordered',
    headerName: 'Ordered',
    renderHeader: () => <MultilineTextHeaderCell text={'Ordered'} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 250,
  },
]
