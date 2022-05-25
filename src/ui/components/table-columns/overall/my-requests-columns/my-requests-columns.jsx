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
    headerName: 'Updated',
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
<<<<<<< HEAD
    field: 'allProposals',
    headerName: textConsts.offerCount,
    renderCell: params => renderFieldValueCell(`${params.value} / ${params.row.originalData.maxAmountOfProposals} `),
=======
    field: 'offerCount',
    headerName: t(TranslationKey['Total batches']),
    renderCell: params => renderFieldValueCell(params.value),
>>>>>>> 74dd8ffa (translate client role)
    width: 170,
  },

  {
<<<<<<< HEAD
    field: 'verifyingProposals',
    headerName: textConsts.offerAwaits,
=======
    field: 'offerAwaits',
    headerName: t(TranslationKey['Batches are expected']),
>>>>>>> 74dd8ffa (translate client role)
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
  },

  {
<<<<<<< HEAD
    field: 'atWorkProposals',
    headerName: textConsts.offersInWork,
=======
    field: 'offersInWork',
    headerName: t(TranslationKey['Batches in the works']),
>>>>>>> 74dd8ffa (translate client role)
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
  },

  {
<<<<<<< HEAD
    field: 'waitedProposals',
    headerName: textConsts.offersWaitCheck,
=======
    field: 'offersWaitCheck',
    headerName: t(TranslationKey['Batches at the checkout']),
>>>>>>> 74dd8ffa (translate client role)
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
  },

  {
<<<<<<< HEAD
    field: 'acceptedProposals',
    headerName: textConsts.offersAccept,
=======
    field: 'offersAccept',
    headerName: t(TranslationKey['The batches accepted']),
>>>>>>> 74dd8ffa (translate client role)
    renderCell: params => renderFieldValueCell(params.value),
    width: 170,
  },
]
