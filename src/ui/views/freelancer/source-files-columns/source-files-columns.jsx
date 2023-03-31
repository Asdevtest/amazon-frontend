/* eslint-disable no-unused-vars */
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React from 'react'

import {freelanceRequestTypeByCode, freelanceRequestTypeTranslate} from '@constants/freelance-request-type'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  ShortDateCell,
  MultilineTextHeaderCell,
  MultilineTextCell,
  MultilineRequestStatusCell,
  UserMiniCell,
  NormalActionBtnCell,
  AsinCell,
  VacantRequestPriceCell,
  EditOrRemoveIconBtnsCell,
} from '@components/data-grid-cells/data-grid-cells'

import {timeToDeadlineInDaysAndHours, toFixed, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const sourceFilesColumns = (handlers, languageTag) => [
  {
    field: 'title',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
    renderCell: params => <MultilineTextCell text={params.value || '-'} />,
    width: 205,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,
    renderCell: params => <MultilineTextCell text={params.value || '-'} />,
    width: 50,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <ShortDateCell params={params} />,
    width: 97,
    type: 'date',
  },

  {
    field: 'performer',
    headerName: t(TranslationKey.Performer),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Performer)} />,
    width: 112,
    renderCell: params => <UserMiniCell user={params.sub ? params.row.sub : params.row.createdBy} />,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
    width: 112,
    renderCell: params => <UserMiniCell user={params.row.createdBy} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 510,
    renderCell: params => (
      <EditOrRemoveIconBtnsCell
        tooltipFirstButton={t(TranslationKey['Change store name or links to reports'])}
        tooltipSecondButton={t(TranslationKey['Remove a store from your list'])}
        handlers={handlers}
        row={params.row}
      />
    ),

    filterable: false,
    sortable: false,
  },
]
