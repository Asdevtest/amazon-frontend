import React from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  renderFieldValueCell,
  TrashCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const sourceColumns = () => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },

  {
    field: 'sku',
    headerName: t(TranslationKey.SKU),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 140,
  },

  {
    field: 'title',
    headerName: 'Title',
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'fbaFbmStock',
    headerName: 'FBA/FBM Stock',
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 140,
  },

  {
    field: 'reserved',
    headerName: 'Reserved',
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey.ROI),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 70,
  },
]

export const chosenGoodsColumns = handlers => [
  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },

  {
    field: 'sku',
    headerName: t(TranslationKey.SKU),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 140,
  },

  {
    field: 'title',
    headerName: 'Title',
    renderCell: params => renderFieldValueCell(params.value),
    width: 200,
  },

  {
    field: 'fbaFbmStock',
    headerName: 'FBA/FBM Stock',
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 140,
  },

  {
    field: 'reserved',
    headerName: 'Reserved',
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey.ROI),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 70,
  },

  {
    field: ' ',
    headerName: '',
    renderCell: params => (
      <TrashCell
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        tooltipText={t(TranslationKey['Remove from the list'])}
        onClick={() => handlers.onClickTrash(params.row.asin)}
      />
    ),
    width: 60,
  },
]
