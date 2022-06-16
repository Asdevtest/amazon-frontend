import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateWithoutTimeCell,
  renderFieldValueCell,
  ScrollingCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const clientLast30DaySellerBoardColumns = () => [
  {
    field: 'date',
    headerName: t(TranslationKey.Date),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Date)} />,

    renderCell: params => <NormDateWithoutTimeCell params={params} />,
    minWidth: 80,
    type: 'date',
  },

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
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    renderCell: params => <ScrollingCell value={params.value} />,
    width: 250,
  },
  {
    field: 'unitsorganic',
    headerName: 'Unitsorganic',
    renderHeader: () => <MultilineTextHeaderCell text={'Unitsorganic'} />,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
  {
    field: 'unitsppc',
    headerName: 'Unitsppc',
    renderHeader: () => <MultilineTextHeaderCell text={'Unitsppc'} />,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
  {
    field: 'netprofit',
    headerName: 'Netprofit',
    renderHeader: () => <MultilineTextHeaderCell text={'Netprofit'} />,
    renderCell: params => renderFieldValueCell(params.value),
    width: 250,
  },
]
