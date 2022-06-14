import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineRequestStatusCell,
  MultilineTextAlignLeftCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShortDateCell,
} from '@components/data-grid-cells/data-grid-cells'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const myRequestsViewColumns = () => [
  {
    field: 'updatedAt',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <ShortDateCell params={params} />,
    width: 117,
    type: 'date',
  },

  {
    field: 'status',

    headerName: t(TranslationKey.Status),
    renderCell: params => <MultilineRequestStatusCell status={params.value} />,
    width: 211,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderCell: params => <MultilineTextAlignLeftCell text={params.value} />,
    width: 350,
  },

  {
    field: 'price',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Price)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    width: 120,
  },

  {
    field: 'timeoutAt',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,

    renderCell: params => <ShortDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {
    field: 'allProposals',
    headerName: t(TranslationKey['Total proposals']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total proposals'])} />, // ПРИМЕР МНОГОСТРОЧНОГО ХЕДЕРА
    renderCell: params => (
      <MultilineTextCell text={`${params.value} / ${params.row.originalData.maxAmountOfProposals} `} />
    ),
    width: 120,
  },

  {
    field: 'verifyingProposals',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Awaiting)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },

  {
    field: 'atWorkProposals',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['In the work'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },

  {
    field: 'waitedProposals',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['On review'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },

  {
    field: 'acceptedProposals',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Accepted)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
  },
]
