import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextHeaderCell,
  NormDateWithoutTimeCell,
  MultilineTextCell,
  ScrollingCell,
  NormDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const clientLast30DaySellerBoardColumns = () => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
    // type: 'date',
  },
  {
    field: 'shopName',
    headerName: t(TranslationKey.Shop),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,
  },

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
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    renderCell: params => <ScrollingCell value={params.value} />,
    width: 250,
  },

  {
    field: 'date',
    headerName: t(TranslationKey.Date),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Date)} />,

    renderCell: params => <NormDateWithoutTimeCell value={params.value} />,
    minWidth: 80,
    // type: 'date',
  },
  {
    field: 'unitsorganic',
    headerName: 'Unitsorganic',
    renderHeader: () => <MultilineTextHeaderCell text={'Unitsorganic'} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,
  },
  {
    field: 'unitsppc',
    headerName: 'Unitsppc',
    renderHeader: () => <MultilineTextHeaderCell text={'Unitsppc'} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 200,
  },
  {
    field: 'netprofit',
    headerName: 'Netprofit',
    renderHeader: () => <MultilineTextHeaderCell text={'Netprofit'} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 250,
  },
]
