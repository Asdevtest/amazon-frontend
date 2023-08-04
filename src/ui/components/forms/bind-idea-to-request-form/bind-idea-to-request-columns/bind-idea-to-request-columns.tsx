import React from 'react'

import { GridCellParams } from '@mui/x-data-grid'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineRequestStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

export const bindIdeaToRequestColumns = () => [
  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    width: 50,
    renderCell: (params: GridCellParams) => <MultilineTextCell leftAlign text={params.value} />,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
    width: 161,
    renderCell: (params: GridCellParams) => <MultilineRequestStatusCell leftAlign status={params.value} />,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
    width: 228,
    renderCell: (params: GridCellParams) => <MultilineTextCell leftAlign text={params.value} />,
  },

  {
    field: 'typeTask',
    headerName: t(TranslationKey['Request type']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
    width: 110,
    renderCell: (params: GridCellParams) => (
      <MultilineTextCell
        leftAlign
        text={freelanceRequestTypeTranslate(freelanceRequestTypeByCode[params.value as number])}
      />
    ),
  },
]
