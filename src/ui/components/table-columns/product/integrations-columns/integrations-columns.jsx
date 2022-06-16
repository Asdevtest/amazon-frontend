import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {MultilineTextHeaderCell, renderFieldValueCell, ScrollingCell} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const productIntegrationsColumns = () => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'sku',
    headerName: t(TranslationKey.SKU),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.SKU)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    renderCell: params => <ScrollingCell value={params.value} />,
    width: 250,
  },

  {
    field: 'stockValue',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'reserved',
    headerName: t(TranslationKey.Reserved),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Reserved)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey.ROI),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ROI)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'comment',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    renderCell: params => <ScrollingCell value={params.value} />,
    width: 250,
  },

  {
    field: 'daysOfStockLeft',
    headerName: t(TranslationKey.DaysOfStockLeft),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.DaysOfStockLeft)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
  {
    field: 'sentToFba',
    headerName: t(TranslationKey.SentToFba),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.SentToFba)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
  {
    field: 'fbaPrepStock',
    headerName: t(TranslationKey.FbaPrepStock),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.FbaPrepStock)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
  {
    field: 'ordered',
    headerName: t(TranslationKey.Ordered),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Ordered)} />,

    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
]
