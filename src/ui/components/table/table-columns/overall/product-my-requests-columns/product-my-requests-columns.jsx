import React from 'react'

import {freelanceRequestTypeByCode, freelanceRequestTypeTranslate} from '@constants/statuses/freelance-request-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  MultilineRequestStatusCell,
  MultilineTextAlignLeftCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ProductMyRequestsBtnsCell,
  ShortDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const productMyRequestsViewColumns = (languageTag, handlers) => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <ShortDateCell params={params} />,
    width: 120,
    type: 'date',
    headerAlign: 'center',
  },

  {
    field: 'humanFriendlyId',
    headerName: 'ID',
    renderHeader: () => <MultilineTextHeaderCell text={'ID'} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 60,
    headerAlign: 'center',
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,

    renderCell: params => <MultilineRequestStatusCell languageTag={languageTag} status={params.value} />,
    width: 160,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    renderCell: params => <MultilineTextAlignLeftCell text={params.value} />,
    width: 400,
  },

  {
    field: 'typeTask',
    headerName: t(TranslationKey['Request type']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,

    renderCell: params => (
      <MultilineTextCell leftAlign text={freelanceRequestTypeTranslate(freelanceRequestTypeByCode[params.value])} />
    ),
    width: 145,
  },

  {
    field: 'price',
    headerName: t(TranslationKey.Cost),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Cost)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 115,
    headerAlign: 'center',
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,

    renderCell: params => <ShortDateCell params={params} />,
    width: 115,
    type: 'date',
    headerAlign: 'center',
  },

  {
    field: 'allProposals',
    headerName: t(TranslationKey['Total proposals']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total proposals'])} />, // ПРИМЕР МНОГОСТРОЧНОГО ХЕДЕРА
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 115,
    headerAlign: 'center',
  },

  {
    field: 'acceptedProposals',
    headerName: t(TranslationKey.Accepted),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Accepted)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 85,
    headerAlign: 'center',
  },

  {
    field: 'actions',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    // width: 330,
    renderCell: params => <ProductMyRequestsBtnsCell row={params.row.originalData} handlers={handlers} />,
    filterable: false,
    sortable: false,
    flex: 1,
  },
]
