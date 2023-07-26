import React from 'react'

import { Radio } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  SmallRowImageCell,
  TrashCell,
  renderFieldValueCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const inventoryColumns = (handlers, selectedRow) => [
  {
    field: '.',
    headerName: '',
    width: 40,
    renderCell: params => (
      <Radio
        color="primary"
        checked={params.row.id === selectedRow?.id}
        onChange={() => handlers.selectRow(params.row)}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    width: 120,
  },

  {
    field: 'image',
    headerName: t(TranslationKey.Image),
    width: 100,
    renderCell: params => <SmallRowImageCell image={params.row.images[0]} />,
    filterable: false,
    sortable: false,
  },
  {
    field: 'amazonTitle',
    headerName: t(TranslationKey.Title),
    width: 110,
    flex: 1,
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
    width: 130,
  },

  {
    field: 'title',
    headerName: 'Title',
    renderCell: params => renderFieldValueCell(params.value),
    width: 120,
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
    width: 110,
  },

  {
    field: 'roi',
    headerName: t(TranslationKey.ROI),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 100,
  },

  {
    field: ' ',
    headerName: '',
    renderCell: params => {
      return (
        <TrashCell
          tooltipText={t(TranslationKey['Remove a position from the list'])}
          onClick={() => handlers.onClickTrash(params.row.asin)}
        />
      )
    },
    width: 60,
  },
]
