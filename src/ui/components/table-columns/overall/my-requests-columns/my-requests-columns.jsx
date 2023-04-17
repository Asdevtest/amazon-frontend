import React from 'react'

import {columnnsKeys} from '@constants/data-grid-columns-keys'
import {freelanceRequestTypeByCode, freelanceRequestTypeTranslate} from '@constants/freelance-request-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  AsinCell,
  MultilineRequestStatusCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShortDateCell,
} from '@components/data-grid-cells/data-grid-cells'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const myRequestsViewColumns = (languageTag, columnMenuSettings, onHover) => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <ShortDateCell params={params} />,
    width: 117,
    type: 'date',
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 62,
  },

  {
    field: 'status',
    headerName: t(TranslationKey.Status),
    renderHeader: params => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Status)}
        isShowIconOnHover={onHover && params.field && onHover === params.field}
        isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => <MultilineRequestStatusCell languageTag={languageTag} status={params.value} />,
    width: 161,
    filterable: false,

    columnKey: columnnsKeys.shared.MY_REQUESTS_ORDERS_STATUS,
  },

  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,

    renderCell: params => (
      <MultilineTextCell withTooltip leftAlign threeLines={params.value.length > 50} text={params.value} />
    ),
    width: 228,
  },

  {
    field: 'typeTask',
    headerName: t(TranslationKey['Request type']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,

    renderCell: params => (
      <MultilineTextCell leftAlign text={freelanceRequestTypeTranslate(freelanceRequestTypeByCode[params.value])} />
    ),
    width: 146,
  },

  {
    field: 'asin',
    headerName: t(TranslationKey.ASIN),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ASIN)} />,

    renderCell: params => <AsinCell text={params.value} product={params.row.originalData} />,
    width: 123,
  },

  {
    field: 'price',
    headerName: t(TranslationKey.Cost),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Cost)} />,

    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,
    type: 'number',
    width: 115,
  },

  {
    field: 'timeoutAt',
    headerName: t(TranslationKey.Deadline),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Deadline)} />,

    renderCell: params => <ShortDateCell params={params} />,
    width: 115,
    type: 'date',
  },

  {
    field: 'allProposals',
    headerName: t(TranslationKey['Total proposals']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Total proposals'])} />, // ПРИМЕР МНОГОСТРОЧНОГО ХЕДЕРА
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 115,
  },

  {
    field: 'verifyingProposals',
    headerName: t(TranslationKey['Waiting selection']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Waiting selection'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 85,
  },

  {
    field: 'atWorkProposals',
    headerName: t(TranslationKey['In the work']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['In the work'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 80,
  },

  {
    field: 'waitedProposals',
    headerName: t(TranslationKey['Waiting check']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Waiting check'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 85,
  },

  {
    field: 'acceptedProposals',
    headerName: t(TranslationKey.Accepted),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Accepted)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 85,
  },
]
