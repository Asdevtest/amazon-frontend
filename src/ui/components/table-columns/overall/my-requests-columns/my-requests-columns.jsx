import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineRequestStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShortDateCell,
} from '@components/data-grid-cells/data-grid-cells'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const myRequestsViewColumns = () => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <ShortDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderCell: params => <MultilineRequestStatusCell status={params.value} />,
    width: 150,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 350,
  },

  {
    field: 'price',
    headerName: t(TranslationKey.Price),
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 120,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderCell: params => <ShortDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'allProposals',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total proposals'])} />, // ПРИМЕР МНОГОСТРОЧНОГО ХЕДЕРА
    renderCell: params => (
      <MultilineTextCell text={`${params.value} / ${params.row.originalData.maxAmountOfProposals} `} />
    ),
    width: 120,
  },

  {
    field: 'verifyingProposals',
    headerName: t(TranslationKey.Awaiting),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },

  {
    field: 'atWorkProposals',
    headerName: t(TranslationKey['In the work']),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },

  {
    field: 'waitedProposals',
    headerName: t(TranslationKey['On review']),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },

  {
    field: 'acceptedProposals',
    headerName: t(TranslationKey.Accepted),
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },
]
