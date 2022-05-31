import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineRequestStatusCell,
  MultilineTextCell,
  NormDateCell,
  renderFieldValueCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const myRequestsViewColumns = () => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
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
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 150,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },

  {
    field: 'allProposals',
    headerName: t(TranslationKey['Total proposals']),
    renderCell: params => renderFieldValueCell(`${params.value} / ${params.row.originalData.maxAmountOfProposals} `),
    width: 170,
  },

  {
    field: 'verifyingProposals',
    headerName: t(TranslationKey.Awaiting),
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
  },

  {
    field: 'atWorkProposals',
    headerName: t(TranslationKey['In the work']),
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
  },

  {
    field: 'waitedProposals',
    headerName: t(TranslationKey['On review']),
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
  },

  {
    field: 'acceptedProposals',
    headerName: t(TranslationKey.Accepted),
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
  },
]
